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
    

    const newBranch = new Branch({
        branchName,
        managerName,
        contactNo,
        address,
        email,
        nofappnmntsPerHr,
        nofworkinghrsPerDay,
        daysopen
       
    })

    newBranch.save().then(() => {
        res.json("Branch Added")
    }).catch((err) => {
        console.log(err);
    })
}) 

//retrieve entered branches
router.route("/").get((req, res) => {
    Branch.find().then((branches) => {
        res.json(branches)
    }).catch((err) => {
        console.log(err)
    })
})

//retrieve a selected branch
router.route("/get/:id").get(async(req,res)=>{
    let branchDetailsId=req.params.id;   
   
    const select=await BranchDetails.findById(branchDetailsId)
    .then((branchdetail)=>{
    res.status(200).send({status:"Branch Detail fetched",branchdetail})
   
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with get branch detail"});
    })
})

//update existing Branch
router.route("/update/:id").put(async (req, res) => {
    let branchid = req.params.id;
    const { branchName, managerName, contactNo, address, email,nofappnmntsPerHr} = req.body;

    const updateBranch = {
        branchName,
        managerName,
        contactNo,
        address,
        email,
        nofappnmntsPerHr,
        nofworkinghrsPerDay,
        daysopen

 
    }

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

module.exports = router;
