import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const { firstName, lastName, email, phone, message } = req.method === 'POST' ? req.body : req.query;

  if (!firstName || !email || !message) {
    return res.status(400).json({ message: 'firstName, email, and message are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Contact from ${firstName} ${lastName || ''}`,
      html: `<p>Name: ${firstName} ${lastName || ''}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phone || 'N/A'}</p>
             <p>Message: ${message}</p>`
    });

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}
