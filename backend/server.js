import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

// ESM: compute __dirname from import.meta.url
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load .env from backend folder
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Global error handlers to help debugging crashes
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // don't exit; keep server alive for debugging
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
  // don't exit; keep server alive for debugging
});

// CORS - allow Vite dev server and localhost in development
const allowedOrigin = process.env.VITE_DEV_ORIGIN || 'http://localhost:5173';
if (process.env.NODE_ENV === 'production') {
  app.use(cors({ origin: allowedOrigin }));
} else {
  app.use(cors({ origin: true, credentials: true, exposedHeaders: ['X-Error-Message'] }));
}

app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// ----- Nodemailer (Gmail) -----
let transporter = null;
let emailConfigured = false;
let isEthereal = false;
let etherealAccount = null;
if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  // Verify SMTP credentials asynchronously and non-fatally
  (async () => {
    try {
      await transporter.verify();
      console.log('✉️ SMTP ready - emails will be sent');
      emailConfigured = true;
    } catch (err) {
      console.warn('⚠️ SMTP verify failed:', err && err.message ? err.message : err);
      emailConfigured = false;
      // Try to create an Ethereal test account for dev if Gmail fails
      try {
        etherealAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({ host: 'smtp.ethereal.email', port: 587, auth: { user: etherealAccount.user, pass: etherealAccount.pass } });
        isEthereal = true;
        emailConfigured = true;
        console.log('ℹ️ Using Ethereal test account for email testing. Preview at message URL after send.');
      } catch (e2) {
        console.warn('⚠️ Failed to create Ethereal test account:', e2 && e2.message ? e2.message : e2);
      }
      // Do NOT exit process; allow server to run so dev can debug credentials
    }
  })();
} else {
  console.warn('⚠️ GMAIL_USER or GMAIL_PASS not provided in backend/.env — falling back to Ethereal for dev');
  // Create Ethereal account for development so email sending works without Gmail
  (async () => {
    try {
      etherealAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({ host: 'smtp.ethereal.email', port: 587, auth: { user: etherealAccount.user, pass: etherealAccount.pass } });
      isEthereal = true;
      emailConfigured = true;
      console.log('ℹ️ Ethereal test account created for dev emails');
    } catch (err) {
      console.warn('⚠️ Could not create Ethereal test account:', err && err.message ? err.message : err);
      emailConfigured = false;
    }
  })();
}

// ----- Firebase Admin (Realtime Database) -----
let rtdb = null;
const rtdbPath = process.env.FIRESTORE_COLLECTION || 'portfolio';
if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
  try {
    const admin = require('firebase-admin');
    // resolve service account path relative to backend folder
    let svcPathCandidate = path.isAbsolute(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
      ? process.env.FIREBASE_SERVICE_ACCOUNT_PATH
      : path.join(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
    const fs = require('fs');
    // If provided path doesn't exist, try common fallback at project root
    if (!fs.existsSync(svcPathCandidate)) {
      const fallback = path.join(__dirname, '..', 'portfolio-c3bcb-firebase-adminsdk-fbsvc-dd9a792c73.json');
      if (fs.existsSync(fallback)) {
        console.warn(`⚠️ service account path ${svcPathCandidate} not found; using fallback ${fallback}`);
        svcPathCandidate = fallback;
      } else {
        throw new Error(`Service account file not found at ${svcPathCandidate} and fallback ${fallback}`);
      }
    }
    const serviceAccount = require(svcPathCandidate);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL || `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
    rtdb = admin.database();
    console.log('✅ Firebase Admin initialized (RTDB)');
  } catch (err) {
    console.warn('⚠️ Failed to initialize Firebase Admin:', err && err.message ? err.message : err);
    rtdb = null;
  }
} else {
  console.warn('⚠️ FIREBASE_SERVICE_ACCOUNT_PATH not provided in backend/.env');
}

// Helper to send email
async function sendEmail({ firstName, lastName, email, phone, message }) {
  if (!emailConfigured || !transporter) throw new Error('Email not configured');
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `📩 New Contact Form Message - ${firstName} ${lastName || ''}`,
    html: `
      <h2>New Contact Form Message</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <div style="background:#f5f5f5;padding:12px">${message}</div>
    `
  };
  return transporter.sendMail(mailOptions);
}

// POST /contact - main endpoint used by frontend
app.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body || {};
    if (!firstName || !email || !message) {
      return res.status(400).json({ code: 400, message: 'Please include firstName, email and message.' });
    }

    // Save to Realtime DB if available (non-blocking)
    if (rtdb) {
      try {
        const ref = rtdb.ref(`/${rtdbPath}`);
        await ref.push({ firstName, lastName, email, phone, message, createdAt: new Date().toISOString() });
        console.log('📥 Saved message to RTDB');
      } catch (dbErr) {
        console.warn('⚠️ RTDB write failed:', dbErr && dbErr.message ? dbErr.message : dbErr);
      }
    }

    // Send email (throw if not configured)
    try {
      const info = await sendEmail({ firstName, lastName, email, phone, message });
      console.log('✉️ Email sent');
      // If using Ethereal, include preview URL in logs
      if (isEthereal) {
        const preview = nodemailer.getTestMessageUrl(info);
        console.log('🔗 Ethereal preview URL:', preview);
      }
    } catch (emailErr) {
      console.warn('⚠️ Email send failed:', emailErr && emailErr.message ? emailErr.message : emailErr);
      // return 500 with error in header/body
      const devMsg = process.env.NODE_ENV === 'production' ? 'Failed to send email' : (emailErr && emailErr.message ? emailErr.message : String(emailErr));
      res.setHeader('X-Error-Message', devMsg);
      res.setHeader('Access-Control-Expose-Headers', 'X-Error-Message');
      return res.status(500).json({ code: 500, message: devMsg });
    }

    return res.status(200).json({ code: 200, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('/contact error', err);
    const devMsg = process.env.NODE_ENV === 'production' ? 'Server error' : (err && err.message ? err.message : String(err));
    res.setHeader('X-Error-Message', devMsg);
    res.setHeader('Access-Control-Expose-Headers', 'X-Error-Message');
    return res.status(500).json({ code: 500, message: devMsg });
  }
});

// GET /send-contact - convenience: send contact via querystring
app.get('/send-contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.query || {};
    if (!firstName || !email || !message) return res.status(400).json({ ok: false, message: 'firstName,email,message required' });
    // push to RTDB
    if (rtdb) {
      try { await rtdb.ref(`/${rtdbPath}`).push({ firstName, lastName, email, phone, message, createdAt: new Date().toISOString() }); } catch (e) { console.warn('RTDB push fail', e && e.message ? e.message : e); }
    }
    // send email
    const info = await sendEmail({ firstName, lastName, email, phone, message });
    const out = { ok: true, message: 'Email sent' };
    if (isEthereal) out.preview = nodemailer.getTestMessageUrl(info) || null;
    return res.json(out);
  } catch (err) {
    console.error('/send-contact error', err);
    const devMsg = err && err.message ? err.message : String(err);
    res.setHeader('X-Error-Message', devMsg);
    res.setHeader('Access-Control-Expose-Headers', 'X-Error-Message');
    return res.status(500).json({ ok: false, message: devMsg });
  }
});

// GET /send-sample-email - sends a simple sample email
app.get('/send-sample-email', async (req, res) => {
  if (!emailConfigured) return res.json({ ok: false, message: 'Email not configured' });
  try {
    const fromAddr = process.env.GMAIL_USER || (etherealAccount && etherealAccount.user) || 'no-reply@example.com';
    const toAddr = process.env.GMAIL_USER || (etherealAccount && etherealAccount.user) || 'no-reply@example.com';
    const info = await transporter.sendMail({ from: fromAddr, to: toAddr, subject: '🧪 Sample', text: 'Sample email from backend' });
    const out = { ok: true, id: info && info.messageId };
    if (isEthereal) out.preview = nodemailer.getTestMessageUrl(info) || null;
    return res.json(out);
  } catch (err) {
    console.error('/send-sample-email error', err);
    const devMsg = err && err.message ? err.message : String(err);
    res.setHeader('X-Error-Message', devMsg);
    res.setHeader('Access-Control-Expose-Headers', 'X-Error-Message');
    return res.status(500).json({ ok: false, message: devMsg });
  }
});

// Health
app.get('/health', (req, res) => res.json({ status: 'ok', emailConfigured: emailConfigured, rtdb: !!rtdb }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Backend listening on http://localhost:${PORT}`));
