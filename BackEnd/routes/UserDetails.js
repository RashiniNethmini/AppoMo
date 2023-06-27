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



router.route("/getu/:id").get(async(req,res)=>{
  console.log(req.params.id);  
  
  let UPP=await User.find(
      {
          "$or":[
              {
                 "username":{$regex:req.params.id}
              }
          ]
      },
  )
  // res.send(data);
  .then((UPP)=>{
  res.send(UPP);
  }).catch((err)=>{
  console.log(err);
  res.status(500).send({status:"Error with get Appointment"});
  })
})

  
  

//   router.route("/update/:id").put (async (req,res)=>{
//     let uId=req.params.id;
//     const{ 
//       username,
//       password,
//       email,
//       contactNo,
//       address,
//       nic}=req.body;

//     const updateUser={
//       username,
//       password,
//       email,
//       contactNo,
//       address,
//       nic,
//     }

//     const update=await User.findOneAndUpdate(
//         {
//             "$or":[
//                 {
//                     "username":{$regex:uId}
//                 }
//             ]
              
//         }
//         , updateUser)
//     .then(()=>{
//     res.status(200).send({status:"updated"})
//     }).catch((err)=>{
//     console.log(err);
//     res.status(500).send({status:"Error with updating data"});
//     })

// })
router.route('/getuser/:id').get(async (req, res) => {
    try {
      const userId = req.params.id;
      const userDetails = await User.findById(userId);
  
      if (!userDetails) {
        return res.status(404).json({ status: 'User not found' });
      }
  
      res.status(200).json({ status: 'User fetched', UserDetails: userDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'Error' });
    }
});

router.route('/getusername/:id').get(async (req, res) => {
    try {
      const userId = req.params.id;
      const userDetails = await User.findById(userId);

      if (!userDetails) {
        return res.status(404).json({ status: 'User not found' });
      }

      res.status(200).json({ status: 'User fetched', UserDetails: userDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'Error' });
    }
  });

router.route("/get/:id").get(async(req,res)=>{
    let userId=req.params.id;   
   
    const select=await User.findById(userId)
    .then((UserDetails)=>{
    res.status(200).send({status:"User fetched",UserDetails})
   
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error"});
    })
});


  router.route("/update/:id").put (async (req,res)=>{
    let uId=req.params.id;
    const{ username,
              password,
              email,
              contactNo,
              address,
              nic}=req.body;

    const updateUser={
        username,
      password,
      email,
      contactNo,
      address,
      nic,
    }

    const update=await User.findByIdAndUpdate(uId, updateUser)
    .then(()=>{
    res.status(200).send({status:"User updated"})
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with updating data"});
    })
})
  
router.route('/delete/:id').delete(async (req, res) => {
    try {
      const userId = req.params.id;

      await User.findByIdAndDelete(userId);
      res.status(200).send({ status: 'Account deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'Error deleting account' });
    }
});

module.exports = router;
