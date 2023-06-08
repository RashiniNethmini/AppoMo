const router = require("express").Router();
let ServiceProvider = require("../models/ServiceProvider");

router.route("/add").post ((req,res) => {

    const providerType = req.body.type;
    const logo = req.body.logo;
    const username = req.body.username;
    const  password = req.body.password;
    const serviceProviderName = req.body.serviceProviderName;
    const address = req.body.address;
    const email = req.body.email;
    const ceoName = req.body.ceoName;
    const regNo = req.body.regNo;
    

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
        

    })
    newServiceProvider.save().then(()=>{
        res.json("Service Provider Added")
    }).catch((err)=>{
        console.log(err);
    })


})

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
        logo}=req.body;

    const updateServiceprovider={
        type,
        username,
        password,
        serviceProviderName,
        address,
        email,
        ceoName,
        regNo,
        logo
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
                   "serviceProviderName":{$regex:req.params.id}
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





module.exports = router;