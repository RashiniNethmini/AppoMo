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


module.exports = router;