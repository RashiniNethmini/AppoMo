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



// router.route("/add").post ((req,res) => {
// Create a storage engine for multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads'); // Specify the destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     // Generate a unique filename for the uploaded file
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// Create a multer instance with the storage engine
// const upload = multer({ storage: storage });

// router.route('/add', upload.single('logo'), (req, res) => {
router.route("/add").post((req,res) => {

    const providerType = req.body.providerType;
    const logo = req.body.logo;
    const username = req.body.username;
    const  password = req.body.password;
    const serviceProviderName = req.body.serviceProviderName;
    const address = req.body.address;
    const email = req.body.email;
    const ceoName = req.body.ceoName;
    const regNo = req.body.regNo;
    // const workingDates = req.body.workingDates;
    // const workingHours = req.body.workingHours;
    // const noOfAppoinments = req.body.noOfAppoinments;

    
    // const existingUser = ServiceProvider.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({ message: 'User already exists' });
    // }

    // const hashedPassword = bcrypt.hash(password, 10);

    const newServiceProvider = new ServiceProvider({
        providerType,
        logo, 
        // req.file.filename,
        // :{
        //     data: fs.readFileSync('uploads/',req.file.filename),
        //     contentType:"image/png"
        // },
        username,
        password,
        serviceProviderName,
        address,
        email,
        ceoName,
        regNo,
        // workingDates,
        // workingHours,
        // noOfAppoinments,
            
        

    })
    newServiceProvider.save().then(()=>{
        // const oldUser = newServiceProvider.findOne((email));
        // if(oldUser){
        //    return res.json({error: "User "});
        // }
        res.json("Service Provider Added")
    }).catch((err)=>{
        console.log(err);
    })
})

// router.route("/login").post (async (req,res) => {
//     try {
//         const { email, password } = req.body;
//     const user = await ServiceProvider.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'secret-key');
//     res.json({ token });
//     }catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }

//     // const username = req.body.username;
//     // const  password = req.body.password;
//     // const user = newServiceProvider.findOne((username));
//     // if(!user){
//     //     return res.json({error : ""});
//     // }

// })


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
let gotp = '';
  // Send OTP via email
const sendOTP = (email, otp) => {
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
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // Store the generated OTP in the session or database
      gotp = otp;
      
      
    }
  });
};


// Route for sending OTP
router.post('/send-otp', (req, res) => {
  const { email } = req.body;
  let otp = '';
  // Generate and send the OTP
  const otpLength = 4;
  const digits = '0123456789';
  for (let i = 0; i < otpLength; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  sendOTP(email, otp);

  res.status(200).json({ message: 'OTP sent successfully' });
});

router.post('/verify-account', (req, res) => {
  const { enteredOTP } = req.body;
  console.log(gotp);
  console.log(enteredOTP);

  if (enteredOTP === gotp) {
    // OTP is correct
    // Perform further actions or grant access to the user
    res.status(200).json({ message: 'OTP verification successful' });
    console.log('Verified Account')
  } else {
    // OTP is incorrect
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

  //end
  

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
        // workingDates,
        // workingHours,
        // noOfAppoinments
      }=req.body;

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
        // workingDates,
        // workingHours,
        // noOfAppoinments,
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

router.route("/resetPw/:id").put (async (req,res)=>{
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
        // workingDates,
        // workingHours,
        // noOfAppoinments
      }=req.body;

    const resetPwServiceprovider={
        type,
        username,
        password,
        serviceProviderName,
        address,
        email,
        ceoName,
        regNo,
        logo,
        // workingDates,
        // workingHours,
        // noOfAppoinments
    }

    const resetPw =await ServiceProvider.findOneAndUpdate(
            {
                "$or":[
                    {
                       "email":{$regex:serviceProviderId}
                    }
                ]
              
        }
        , resetPwServiceprovider)
    .then(()=>{
    res.status(200).send({status:"Password is updated"})
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Unsuccessfull"});
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
                   "address":{$regex:req.params.id},
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

router.route("/getp/:id").get(async(req,res)=>{
    console.log(req.params.id);   

    let SP=await ServiceProvider.find(
        {
            "$or":[
                {
                    "providerType":{$regex:'Service Center'},
                   "ReparingProducts":{$regex:req.params.id}
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

router.route("/getC/:id").get(async(req,res)=>{
    console.log(req.params.id);   

    let SP=await ServiceProvider.find(
        {
            "$or":[
                {
                    "providerType":{$regex:'Company'},
                   "address":{$regex:req.params.id},
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
    // console.log(req.params.id);  
    
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

router.route("/getCom").get(async(req,res)=>{
    console.log(req.params.id);   

    let Com=await ServiceProvider.aggregate([
        {
            $match: {
                providerType:'Company'
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
    .then((Com)=>{
    res.send(Com)
   
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