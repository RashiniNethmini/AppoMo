const router = require('express').Router();
const nodemailer = require('nodemailer');



// // Generate a unique password reset token
// function generateResetToken() {
//     // Replace with your token generation logic (e.g., using a library like `crypto-random-string`)
//     const cryptoRandomString = require('crypto-random-string');
//     const token = cryptoRandomString({ length: 32, type: 'url-safe' });
//     return token;
//   }

// Send password reset email
const sendPasswordResetEmail = (email) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'disaranu9@gmail.com',
        pass: 'zxykocfcqbncvqoo',
       }
    //   host: 'smtp.gmail.com',
    //   port: 587,
     });
  
    const mailOptions = {
      from: 'disaranu9@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: 'Click the link below to reset your password:',
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            res.json({ success: false, message: 'Failed to send password reset email' });
          } else {
            console.log('Email sent:', info.response);
            res.json({ success: true, message: 'Password reset email sent' });
          }
    });
  };

// Route to handle password reset
router.post('/forgotPw', async (req, res) => {
  const { email } = req.body;

  // Generate a unique token for password reset
  // const resetToken = await generateResetToken();

  // Send password reset email
  // const resetLink = `http://AppoMo/ResetPwd/${resetToken}`;
  sendPasswordResetEmail(email);

  res.json({ success: true, message: 'Password reset email sent' });
});

module.exports = router;