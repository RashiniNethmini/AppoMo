const router = require("express").Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
let ServiceProvider = require("../models/ServiceProvider");



router.route("/add").post ((req,res) => {

    const providerType = req.body.providerType;
    const logo = req.body.logo;
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
    //   return res.status(400).json({ message: 'User already exists' });
    // }

    // const hashedPassword = bcrypt.hash(password, 10);

    const newServiceProvider = new ServiceProvider({
        providerType,
        logo,
        username,
        password,
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

router.route("/updater/:id").put (async (req,res)=>{
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
        noOfAppoinments
    ,starRating}=req.body;

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
        starRating
    }

    const update=await ServiceProvider.findByIdAndUpdate(serviceProviderId, updateServiceprovider)
    .then(()=>{
    res.status(200).send({status:" updated"})
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