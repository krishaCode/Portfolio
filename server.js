import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio Contact API is running!',
    endpoints: {
      'POST /contact': 'Send contact form data'
    }
  });
});

// Create transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS  // Your App Password (NOT your regular password)
  }
});

// Contact form endpoint
app.post('/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  
  const { firstName, lastName, email, phone, message } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ 
      code: 400, 
      message: "Please fill in all required fields." 
    });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'gampalagekm@gmail.com',
    subject: `New Contact Form Message from ${firstName} ${lastName}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
    replyTo: email
  };

  try {
    console.log('Attempting to send email...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
    
    // Check if we have valid credentials
    if (process.env.EMAIL_PASS === 'your_app_password_here' || 
        process.env.EMAIL_PASS === 'demo_mode' || 
        process.env.EMAIL_PASS === 'replace_with_app_password' ||
        process.env.EMAIL_PASS === 'abcd efgh ijkl mnop') {
      console.log('=== DEMO MODE - Set up Gmail App Password for real emails ===');
      console.log('Contact Form Submission:');
      console.log('- Name:', firstName, lastName);
      console.log('- Email:', email);
      console.log('- Phone:', phone || 'Not provided');
      console.log('- Message:', message);
      console.log('- Would be sent to: gampalagekm@gmail.com');
      console.log('========================================================');
      
      // Simulate successful email sending for demo
      res.status(200).json({ 
        code: 200, 
        message: `Thank you ${firstName}! Your message has been received. (Demo Mode - Set up App Password for real emails)` 
      });
      return;
    }
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    res.status(200).json({ code: 200, message: "Message sent successfully!" });
  } catch (error) {
    console.error('Detailed error sending email:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    res.status(500).json({ 
      code: 500, 
      message: "Failed to send message. Please check server logs." 
    });
  }
});

const PORT = process.env.PORT || 5000;

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the API: http://localhost:${PORT}/`);
}).on('error', (error) => {
  console.error('Server error:', error);
});