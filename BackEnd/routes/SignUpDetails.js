const router = require("express").Router();
const SignUpDetails = require('../models/SignUpDetails');
const nodemailer = require("nodemailer");

router.route("/add").post((req,res) => {

    const serviceProviderName = req.body.serviceProviderName;
    const email = req.body.email;
    const regNo = req.body.regNo;
    const status = req.body.status;
    

    const newSignUpDetails = new SignUpDetails({
        serviceProviderName,
        email,
        regNo,
        status
       
    })
    newSignUpDetails.save().then(()=>{
      
        res.json("Sign Up Details Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    SignUpDetails.find({ status: "" }).then((SignUpDetails)=>{
        res.json(SignUpDetails)
    }).catch((err)=>{
        console.log(err)
    })
});

router.route("/accepted").get((req,res)=>{
  SignUpDetails.find({ status: "accepted" }).then((SignUpDetails)=>{
      res.json(SignUpDetails)
  }).catch((err)=>{
      console.log(err)
  })
})

router.route("/rejected").get((req,res)=>{
  SignUpDetails.find({ status: "rejected" }).then((SignUpDetails)=>{
      res.json(SignUpDetails)
  }).catch((err)=>{
      console.log(err)
  })
})




//start
let gotp = '';
    
const sendOTP = (email, verificationCode) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nadunidhanushika@gmail.com',
        pass: 'pxpqyrtrqlcvyuua'
      }
    });
  
    const mailOptions = {
      from: 'nadunidhanushika@gmail.com',
      to: email,
      subject: 'Registration Number Verification',
      text: `Your Verification Number is: ${verificationCode}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        
        gotp = verificationCode;
        
        
      }
    });
};
   
router.post('/send-otp', (req, res) => {
    const { email } = req.body;
    let verificationCode = '';
    
    const verificationCodeLength = 6;
    const digits = '0123456789';
    for (let i = 0; i < verificationCodeLength; i++) {
        verificationCode += digits[Math.floor(Math.random() * 10)];
    }
    sendOTP(email, verificationCode);
  
    res.status(200).json({ message: 'Verification Code sent successfully' });
});
  
router.post('/verify-account', (req, res) => {
    const { enteredOTP } = req.body;
    console.log(gotp);
    console.log(enteredOTP);
  
    if (enteredOTP === gotp) {
      res.status(200).json({ message: 'Registration verification successful' });
      console.log('Verified Account')
    } else {
      res.status(400).json({ message: 'Invalid Verification Code' });
    }
});
//end


    
const sendRejected = (email) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nadunidhanushika@gmail.com',
        pass: 'pxpqyrtrqlcvyuua'
      }
    });
  
    const mailOptions = {
      from: 'nadunidhanushika@gmail.com',
      to: email,
      subject: 'Registration Number Verification',
      text: `Cannot Verify your registration number. Please enter the correct registration number and try again for signup process.`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
            
      }
    });
};
   
router.post('/send-rejected', (req, res) => {
    const { email } = req.body;  
    sendRejected(email);
  res.status(200).json({ message: 'Verification Code sent successfully' });
});


router.put('/AorR/:regNo', (req, res) => {
  const { regNo } = req.params;
  const { status } = req.body;

  SignUpDetails.findOneAndUpdate({ regNo }, { $set: { status } }, { new: true })
      .then((updatedSignUpDetails) => {
          res.json(updatedSignUpDetails);
          console.log('Status Updated');
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json("Failed to update Sign Up Details");
      });
});


module.exports = router;