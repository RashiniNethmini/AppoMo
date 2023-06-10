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
    const workingDates = req.body.workingDates;
    const workingHours = req.body.workingHours;
    const noOfAppoinments = req.body.noOfAppoinments;
    

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
        noOfAppoinments
    }

    const update=await ServiceProvider.findByIdAndUpdate(serviceProviderId, updateServiceprovider)
    .then(()=>{
    res.status(200).send({status:"Service Provider updated"})
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with updating data"});
    })

})

router.route("/get/:id").get(async(req,res)=>{
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