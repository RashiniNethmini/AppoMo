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

//update existing User
router.route("/update/:id").put(async (req, res) => {
    let userid = req.params.id;
    const { username, password, email, contactNo, address,nic} = req.body;

    const updateUser = {
        username,
        password,
        contactNo,
        email,
        contactNo,
        address,
        nic
    }

    const update = await User.findByIdAndUpdate(userid, updateUser)
        .then(() => {
            res.status(200).send({ status: "user updated" })
        }).catch((err) => {
            console.log(err);
            res.statusMessage(500).send({ status: "Error with updating data" });
        })
}) 

module.exports = router;
