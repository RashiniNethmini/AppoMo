const router = require('express').Router();
let Appointment = require('../models/Appointments');

router.route("/add").post((req, res) => {
    const Name = req.body.Name;
    const ContactNo = Number(req.body.ContactNo);
    const InvoiceNo = req.body.InvoiceNo;
    const Product = req.body.Product;
    const IssueInBrief = req.body.IssueInBrief;
    const ApntmntDate=  req.body.ApntmntDate;
    const Time =  req.body.Time;
    const AptmntStatus = Boolean(req.body.AptmntStatus);



    const newAppointment = new Appointment({
        Name,
        ContactNo,
        InvoiceNo,
        Product,
        IssueInBrief,
        ApntmntDate,
        Time,
        AptmntStatus
        
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
        
        const groupedData = await Appointment.aggregate([
            {
                $match: {
                    AptmntStatus: true
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
              _id: `$ApntmntDate`,
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


module.exports = router;