const router = require('express').Router();
let Appointment = require('../models/Appointments');

router.route("/add").post((req, res) => {
    const Name = req.body.Name;
    const ContactNo = req.body.ContactNo;
    const InvoiceNo = req.body.InvoiceNo;
    const Product = req.body.Product;
    const IssueInBrief = req.body.IssueInBrief;
    const ApntmntDate=  req.body.ApntmntDate;
    const Time =  req.body.Time;
    const Completed = req.body.Completed;
    const finalAmount = req.body.finalAmount;
   const BranchDetails = req.body.BranchDetails;
    const UserDetails= req.body.UserDetails;

    const newAppointment = new Appointment({
        Name,
        ContactNo,
        InvoiceNo,
        Product,
        IssueInBrief,
        ApntmntDate,
        Time,
        Completed,
        finalAmount,
        BranchDetails,
        UserDetails
    })
    //pass the object to the database.
    newAppointment.save().then(() => {
        res.json("Confirmed Appointment Added")
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/").get((req,res)=>{
    Appointment.find().then((Appointments)=>{
        res.json(Appointments)
    }).catch((err)=>{
        cosole.log(err)
    })
})

router.route("/get/:id").get(async(req,res)=>{
    console.log(req.params.id);   

    
    let data=await Appointment.find(
        {
            "$or":[
                {
                   "AptmntStatus":{$eq:req.params.id}
                }
            ]
        }
    )
    // res.send(data);
    .then((data)=>{
    res.send(data)
   
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error with get Appointment"});
    })
})

router.route('/groupedData').get(async (req, res) => {
   
    try {
        const today = new Date().toISOString().split('T')[0];
        const groupedData = await Appointment.aggregate([
            {
                $match: {
                    AptmntStatus: true,
                    Completed:false,
                    ApntmntDate: { $gte: today }
                }
              },
              {
                $sort: {
                  ApntmntDate: 1,
                  Time:1 // Sort by ascending order of ApntmntDate field
                }
              },
          {
            $group: {
              _id: '$ApntmntDate',
              // {
              //   $dateToString: {
              //     format: '%Y-%m-%d',
              //     date: '$ApntmntDate'
              //   }
              // },
              details: { $push: { _id: '$_id', AptNumber: '$AptNumber', Name: '$Name', ContactNo: '$ContactNo', InvoiceNo: '$InvoiceNo', Product: '$Product', IssueInBrief: '$IssueInBrief', Time: '$Time', }},
            },
          },
        ]);
    
        res.json(groupedData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
  })

  router.route('/groupedData1').get(async (req, res) => {
   
    try {
        const today = new Date().toISOString().split('T')[0];
        const groupedData = await Appointment.aggregate([
            {
                $match: {
                    AptmntStatus: true,
                    Completed: false,
                    ApntmntDate: { $lt: today }
                }
              },
              {
                $sort: {
                  ApntmntDate: -1,
                  Time:-1 // Sort by ascending order of ApntmntDate field
                }
              },
          {
            $group: {
              _id: '$ApntmntDate',
          //     {
          //   $dateToString: {
          //     format: '%Y-%m-%d',
          //     date: '$ApntmntDate'
          //   }
          // },
              details: { $push: { _id: '$_id', AptNumber: '$AptNumber', Name: '$Name', ContactNo: '$ContactNo', InvoiceNo: '$InvoiceNo', Product: '$Product', IssueInBrief: '$IssueInBrief', Time: '$Time', }},
            },
          },
        ]);
    
        res.json(groupedData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
  })

  router.route("/update/:id").put (async (req,res)=>{
    let uId=req.params.id;
    const{ 
      username,
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
  /*router.route("/update/:id").put (async (req,res)=>{
    let AppointmentId=req.params.id;
    const{ ApntmntDate,
      Time}=req.body;

    const updateAppointment={
      ApntmntDate,
      Time
    }

    const update=await Appointments.findByIdAndUpdate(AppointmentId, updateAppointment)
    .then(()=>{
    res.status(200).send({status:"Appointment scheduled successfully."})
    }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"Error scheduling appointment."});
    })*/

})

// PUT /Appointments/updateFinalAmount/:aptNumber endpoint
router.put('/Appointments/updateFinalAmount/:aptNumber', async (req, res) => {
  try {
    const { aptNumber } = req.params;
    const { finalAmount } = req.body;

    // Update the finalAmount in the Appointment table based on the aptNumber
    await Appointment.findOneAndUpdate(
      { AptNumber: aptNumber },
      { $set: { finalAmount: finalAmount } }
    );

    res.status(200).json({ message: 'Final amount updated successfully' });
  } catch (error) {
    console.error('Error updating final amount:', error);
    res.status(500).json({ error: 'An error occurred while updating the final amount' });
  }
});


module.exports = router;