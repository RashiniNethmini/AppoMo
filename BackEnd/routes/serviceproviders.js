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

module.exports = router;