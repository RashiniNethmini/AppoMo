const router = require("express").Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require ("multer");
const fs = require('fs');
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const { google } = require('googleapis');
const crypto = require('crypto');
let ServiceProvider = require("../models/ServiceProvider");
let generatedOTP =null;



// const storage = multer.diskStorage({   // uploading image
//     destination: (req,file,cb)=>{
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb)=>{
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({storage:storage})
// router.route("/add").post(upload.single('logo'),(req,res) => {
router.route("/add").post((req,res) => {

    const providerType = req.body.providerType;
    const logo = req.body.logo;
    // const logo = req.file.filename;
    const username = req.body.username;
    const  password = req.body.password;
    const serviceProviderName = req.body.serviceProviderName;
    const address = req.body.address;
    const email = req.body.email;
    const ceoName = req.body.ceoName;
    const regNo = req.body.regNo;
    const workingDates = req.body.workingDates;
    const workingHours = req.body.workingHours;
    const noOfAppoinments = req.body.noOfAppoinments;

    
    // const existingUser = ServiceProvider.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).send({ status: "User already exists" });
    // }

    // const hashedPassword = bcrypt.hash(password, 10);
    
    const newServiceProvider = new ServiceProvider({
        providerType,
        logo
        // :{
        //     data: fs.readFileSync('uploads/',req.file.filename),
        //     contentType:"image/png"
        // }
        ,
        username,
        password,
        //password: hashedPassword,
        serviceProviderName,
        address,
        email,
        ceoName,
        regNo,
        workingDates,
        workingHours,
        noOfAppoinments,
            
        

    })
    newServiceProvider.save().then(()=>{
        res.json("Service Provider Added")
    }).catch((err)=>{
        console.log(err);
    })
})



router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await ServiceProvider.findOne({ username, password });
  
      if (user) {
        res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
});

router.route("/google-login").post(async (req, res) => {
    try {
      const { tokenId } = req.body;
  
      // Verify the Google ID token
      const client = new OAuth2Client("YOUR_CLIENT_ID");
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: "YOUR_CLIENT_ID",
      });
      const payload = ticket.getPayload();
      const { email } = payload;
  
      // Check if the user exists in the database
      const user = await ServiceProvider.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, "secret-key");
  
      res.json({ token });
      res.json("Login Successful");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

    //start
    
  // Send OTP via email
  const sendOTP = (email, otp) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Replace with your email service provider
      auth: {
        user: 'nadunidhanushika@gmail.com', // Replace with your email address
        pass: 'pxpqyrtrqlcvyuua' // Replace with your email password
        
      }
    });
  
    const mailOptions = {
      from: 'nadunidhanushika@gmail.com', // Replace with your email address
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        generatedOTP=otp;
      }
    });
  };
  
  // Route for sending OTP
  router.post('/send-otp', (req, res) => {
    const { email } = req.body;
  
    // Generate and send the OTP
    const otpLength = 4; // Length of the OTP
    const digits = '0123456789'; // Possible digits in the OTP
    let otp = '';
    for (let i = 0; i < otpLength; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    sendOTP(email, otp);

  
    
  
    res.status(200).json({ message: 'OTP sent successfully' });
  });

  
router.post('/verify-account', (req, res) => {
    const {  enteredOTP } = req.body;
    console.log(generatedOTP);
    console.log(enteredOTP);
  
    // Retrieve the generated OTP from the database or session
   // Replace with your implementation
  
    if (enteredOTP === generatedOTP) {
      // OTP is correct
      // Perform further actions or grant access to the user
      res.status(200).json({ message: 'OTP verification successful' });
    } else {
      // OTP is incorrect
      res.status(400).json({ message: 'Invalid OTP' });
    }
  });
  

router.route("/").get((req,res)=>{
    ServiceProvider.find().then((serviceproviders)=>{
        res.json(serviceproviders)
    }).catch((err)=>{
        cosole.log(err)
    })
})


router.route("/update/:id").put (async (req,res)=>{
    let serviceProviderId=req.params.id;
    const{ type,
        username,
        password,
        serviceProviderName,
        address,
        email,
        ceoName,
        regNo,
        logo,
        workingDates,
        workingHours,
        noOfAppoinments}=req.body;

    const updateServiceprovider={
        type,
        username,
        password,
        serviceProviderName,
        address,
        email,
        ceoName,
        regNo,
        logo,
        workingDates,
        workingHours,
        noOfAppoinments,
    }

    const update=await ServiceProvider.findOneAndUpdate(
            {
                "$or":[
                    {
                       "serviceProviderName":{$regex:serviceProviderId}
                    }
                ]
              
        }
        , updateServiceprovider)
    .then(()=>{
    res.status(200).send({status:"Service Provider updated"})
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with updating data"});
    })

})

router.route("/up/:id").put (async (req,res)=>{
    let serviceProviderId=req.params.id;
    const{ type,
        username,
        password,
        serviceProviderName,
        address,
        email,
        ceoName,
        regNo,
        logo,
        workingDates,
        workingHours,
        noOfAppoinments}=req.body;

    const upServiceprovider={
        type,
        username,
        password,
        serviceProviderName,
        address,
        email,
        ceoName,
        regNo,
        logo,
        workingDates,
        workingHours,
        noOfAppoinments
    }

    const up =await ServiceProvider.findOneAndUpdate(
            {
                "$or":[
                    {
                       "email":{$regex:serviceProviderId}
                    }
                ]
              
        }
        , upServiceprovider)
    .then(()=>{
    res.status(200).send({status:"Service Provider updated"})
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with updating data"});
    })

})

// router.route("/get/:id").get(async(req,res)=>{
//     let serviceProviderId=req.params.id;   
   
//     const select=await ServiceProvider.findById(serviceProviderId)
//     .then((serviceprovider)=>{
//     res.status(200).send({status:"Service Provider fetched",serviceprovider})
   
//     }).catch((err)=>{
//     console.log(err);
//     res.status(500).send({status:"Error with get service provider"});
//     })
// })

router.route("/get/:id").get(async(req,res)=>{
    console.log(req.params.id);   

    let SP=await ServiceProvider.find(
        {
            "$or":[
                {
                    "providerType":{$regex:'Service Center'},
                   "address":{$regex:req.params.id}
                }
            ]
        }
    )
    // res.send(data);
    .then((SP)=>{
    res.send(SP)
   
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with get Appointment"});
    })
})

router.route("/search/:id").get(async(req,res)=>{
    console.log(req.params.id);  
    const{ 
        password}=req.body; 

    let SPP=await ServiceProvider.find(
        {
            "$or":[
                {
                   "serviceProviderName":{$regex:req.params.id}
                }
            ]
        },'password'
    )
    // res.send(data);
    .then((SPP)=>{
    res.send(SPP);
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with get Appointment"});
    })
})

router.route("/searchE/:id").get(async(req,res)=>{
    console.log(req.params.id);  
    
    let SPP=await ServiceProvider.find(
        {
            "$or":[
                {
                   "serviceProviderName":{$regex:req.params.id}
                }
            ]
        },
    )
    // res.send(data);
    .then((SPP)=>{
    res.send(SPP);
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with get Appointment"});
    })
})


router.route("/getSC").get(async(req,res)=>{
    console.log(req.params.id);   

    let SC=await ServiceProvider.aggregate([
        {
            $match: {
                providerType:'Service Center'
            }
          },
          {
            $sort: {
              starRating:-1
            }
          },
        // {
        //     "$or":[
        //         {
        //            "providerType":{$regex:'Service Center'}
        //         }
        //     ]
        // }
        ])
    // res.send(data);
    .then((SC)=>{
    res.send(SC)
   
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with get Appointment"});
    })
})

router.route("/getr/:id").get(async(req,res)=>{
        let serviceProviderId=req.params.id;   
       
        const select=await ServiceProvider.findById(serviceProviderId)
        .then((serviceprovider)=>{
        res.status(200).send({status:"Service Provider fetched",serviceprovider})
    }).catch((err)=>{
            console.log(err);
            res.status(500).send({status:"Error with get service provider"});
            })
        })

module.exports = router;