const router = require('express').Router();
const BranchDetails = require('../models/BranchDetails');
const Branch = require('../models/BranchDetails');
const { findByIdAndUpdate, findByIdAndDelete } = require('../models/BranchDetails');


//add new branch

router.route("/add").post((req, res) => {
    const branchName = req.body.branchName;
    const managerName = req.body.managerName;
    const contactNo = Number(req.body.contactNo);
    const address = req.body.address;
    const email = req.body.email;
    const nofappnmntsPerHr = Number(req.body.nofappnmntsPerHr);
    const nofworkinghrsPerDay = Number(req.body.nofworkinghrsPerDay);
    const daysopen = req.body.daysopen;
    const username = req.body.username;
    const password = req.body.password;
    const ServiceProvider = req.body.ServiceProvider;


    const newBranch = new Branch({
        branchName,
        managerName,
        contactNo,
        address,
        email,
        nofappnmntsPerHr,
        nofworkinghrsPerDay,
        daysopen,
        username,
        password,
        ServiceProvider

    })

    newBranch
        .save()
        .then(() => {
            res.json({ status: "Branch Added" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ status: "Error with adding branch" });
        });
});

//with date-time modifications

// const branch = new BranchDetails({
//     branchName: 'Branch 1',
//     managerName: 'John Doe',
//     contactNo: 1234567890,
//     address: '123 Main St',
//     email: 'branch1@example.com',
//     nofappnmntsPerHr: 4,
//     nofworkinghrsPerDay: 8,
//     daysopen: 'Monday to Friday',
//     serviceProvider: serviceProviderId,
//     appointments: generateAppointments(),
//   });
  
//   function generateAppointments() {
//     const appointments = [];
  
//     const today = new Date();
//     const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//     const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000); // Add 6 days
  
//     let currentDate = startDate;
//     while (currentDate <= endDate) {
//       const date = currentDate.toISOString().split('T')[0];
  
//       const timeSlots = [
//         {
//           startTime: '08:00',
//           endTime: '10:00',
//           currNumOfAppointments: 0,
//         },
//         {
//           startTime: '10:00',
//           endTime: '12:00',
//           currNumOfAppointments: 0,
//         },
//         {
//           startTime: '12:00',
//           endTime: '14:00',
//           currNumOfAppointments: 0,
//         },
//         {
//           startTime: '14:16:00',
//           endTime: '16:00',
//           currNumOfAppointments: 0,
//         },
//         {
//           startTime: '16:00',
//           endTime: '18:00',
//           currNumOfAppointments: 0,
//         },
//       ];
  
//       appointments.push({
//         date,
//         timeSlots,
//       });
  
//       currentDate.setDate(currentDate.getDate() + 1);
//     }
  
//     return appointments;
//   }
  
//   branch.save((err) => {
//     if (err) {
//       // Handle the error
//     } else {
//       // Branch saved successfully
//     }
//   });

  


//retrieve entered branches
router.route("/").get((req, res) => {
    Branch.find().then((branches) => {
        res.json(branches)
    }).catch((err) => {
        console.log(err)
    })
})

//retrieve a selected branch
router.route("/get/:id").get(async (req, res) => {
    let branchDetailsId = req.params.id;

    const select = await Branch.findById(branchDetailsId)
        .then((branchdetail) => {
            res.status(200).send({ status: "Branch Detail fetched", branchdetail })

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with get branch detail" });
        })
})

router.route('/getbranch/:id').get(async (req, res) => {
    try {
      const branchId = req.params.id;
      const branchDetails = await Branch.findById(branchId);
  
      if (!branchDetails) {
        return res.status(404).json({ status: 'Branch not found' });
      }
  
      res.status(200).json({ status: 'Branch fetched', BranchDetails: branchDetails });

    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'Error' });
    }
});

//update existing Branch
router.route("/update/:id").put(async (req, res) => {
    let branchid = req.params.id;
    const { 
        branchName,
        managerName,
        contactNo,
        address,
        email,
        nofappnmntsPerHr,
        nofworkinghrsPerDay,
        daysopen,
        username,
        password } = req.body;

    const updateBranch = {
        branchName,
        managerName,
        contactNo,
        address,
        email,
        nofappnmntsPerHr,
        nofworkinghrsPerDay,
        daysopen,
        username,
        password,
    }
    // const branchObjectId = mongoose.Types.ObjectId(branchid);

    const update = await Branch.findByIdAndUpdate(branchid, updateBranch)
        .then(() => {
            res.status(200).send({ status: "user updated" })
        }).catch((err) => {
            console.log(err);
            res.statusMessage(500).send({ status: "Error with updating data" });
        })
})

//delete existing Branch
router.route("/delete/:id").delete(async (req, res) => {
    let branchId = req.params.id;
    await Branch.findByIdAndDelete(branchId)
        .then(() => {
            res.status(200).send({ status: "Branch deleted" });

        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete user" })
        })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await Branch.findOne({ username, password });
  
      if (user) {
        res.status(200).json({ success: true, message: 'Login successful' });
        console.log("success")
      } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
        console.log("invalid")
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'An error occurred during login' });
      console.log("error logging in")
    }
});

router.route("/getid/:id").get(async(req,res)=>{
    console.log(req.params.id);  
    
    let Pro=await Branch.find(
        {
            "$or":[
                {
                   "username":{$regex:req.params.id}
                }
            ]
        },
    )
    // res.send(data);
    .then((Pro)=>{
    res.send(Pro);
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with get userid"});
    })
  })

  router.route("/get/:id").get(async(req,res)=>{
    let branchId=req.params.id;   
   
    const select=await Branch.findById(branchId)
    .then((branch)=>{
    res.status(200).send({status:"branch fetched",branch})
}).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with get Branch"});
        })
    })

module.exports = router;
