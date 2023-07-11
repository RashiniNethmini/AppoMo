const router = require('express').Router();
const nodemailer = require('nodemailer');

// POST /send-invoice endpoint
router.post('/send-invoice', async (req, res) => {
  try {
    const { email, invoiceHTML } = req.body;

    // Create a transporter using your email service details
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nadunidhanushika@gmail.com',
        pass: 'pxpqyrtrqlcvyuua',
      },
      host: 'smtp.gmail.com',
      port: 587,
    });

    // Compose the email message
    const mailOptions = {
      from: 'nadunidhanushika@gmail.com', 
      to: email, 
      subject: 'Invoice for Device Repair Services',
      html: invoiceHTML, // Use the HTML content received from the frontend
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result.response);
    res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'An error occurred while sending the email' });
    }
});

module.exports = router;
