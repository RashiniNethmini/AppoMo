const router = require('express').Router();
const nodemailer = require('nodemailer');

let otp; // Variable to store the generated OTP

function generateOTP() {
  // Replace with your OTP generation logic
  const otpValue = Math.floor(1000 + Math.random() * 9000);
  console.log('Generated OTP:', otpValue);
  return otpValue.toString();
}

const sendOTPEmail = (email, otpValue, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'disaranu9@gmail.com',
      pass: 'zxykocfcqbncvqoo',
    }
    
  });
  console.log('Sending OTP email to:', email);
  console.log('OTP Value:', otpValue);

  const mailOptions = {
    from: 'disaranu9@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Your OTP is: ${otpValue}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.json({ success: false, message: 'Failed to send OTP email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ success: true, message: 'OTP email sent' });
    }
  });
};

router.post('/forgotPw', async (req, res) => {
  const { email } = req.body;

  otp = generateOTP(); // Store the generated OTP in the variable
  sendOTPEmail(email, otp, res);

  res.json({ success: true, message: 'OTP email sent' });
});

router.post('/validateOTP', (req, res) => {
  const { enteredOTP } = req.body;
  console.log('Entered OTP:', enteredOTP);
  console.log('Stored OTP:', otp);

  if (otp === enteredOTP) { // Compare the stored OTP with the entered OTP
    res.json({ success: true, message: 'OTP is valid' });
    console.log('OTP correct')
  } else {
    res.json({ success: false, message: 'Invalid OTP' });
    console.log('OTP incorrect')
  }
});

module.exports = router;
