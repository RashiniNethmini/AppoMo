const router = require('express').Router();
const User = require('../models/UserDetails');



 //add new user

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const contactNo = Number(req.body.contactNo);
    const address = req.body.address;
    const nic = req.body.nic;

    const newUser = new User({
        username,
        password,
        email,
        contactNo,
        address,
        nic
      
    })

    newUser.save().then(() => {
        res.json("User Added")
    }).catch((err) => {
        res.status(500).send({ status: "Error with adding data" });

    })
}) 

module.exports = router;
