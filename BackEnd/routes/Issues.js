const router = require('express').Router();
let Issue = require('../models/Issues');
const sendSms = require('../APIs/SmsAPI.js');


router.route("/add").post((req, res) => {
  const { Name, ContactNo, InvoiceNo, Product, IssueInBrief, AudioUri } = req.body;

  

  const newIssue = new Issue({
    Name,
    ContactNo,
    InvoiceNo,
    Product,
    IssueInBrief,
    AudioUri //voice message URI
  });

  // Save the new issue to the database
  newIssue.save().then(() => {
    res.json("Issue Added");
  }).catch((err) => {
    console.log(err);
  });
});


router.route("/").get((req, res) => {
    Issue.find().then((Issue) => {
        res.json(Issue)

    }).catch((err) => {
        console.log(err);
    })

})


router.route('/delete/:id').delete(async (req, res) => {
  const appointmentId = req.params.id;

  try {
    await Issue.findByIdAndDelete(appointmentId);
    res.status(200).send({ status: 'Appointment deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'Error deleting appointment' });
  }
});

router.route('/deleteAllRejected').delete(async (req, res) => {
  try {
    await Issue.deleteMany({ status: 'rejected' });
    res.status(200).send({ status: 'All rejected appointments deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'Error deleting rejected appointments' });
  }
});


 // Update an issue by ID(SEnding sms)
router.patch('/update/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    const { status, comment } = req.body;

    if (status === 'accepted') {
      issue.status = status;
      issue.comment = comment;
      await issue.save();

      // Send SMS notification to the user
      const phoneNumber = issue.ContactNo; 
      const message = 'Your issue has been accepted.';
      const issueid=issue.issueNumber;
      sendSms(phoneNumber, message, issueid, comment);
      return res.json({ message: 'Issue accepted, SMS sent, and status/comment updated' });
    }

    if (status === 'rejected') {
      issue.status = status;
      issue.comment = comment;
      await issue.save();
      
      const phoneNumber = issue.ContactNo; 
      const message = 'Your issue has been rejected.';
      const issueid=issue.issueNumber;
      sendSms(phoneNumber, message, issueid, comment);

      return res.json({ message: 'Issue rejected, SMS sent, and status/comment updated' });
    }

    issue.status = status;
    issue.comment = comment;
    await issue.save();
    res.json({ message: 'Issue updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


  router.route('/get/:id').get(async (req, res) => {
    const id = req.params.id;
    try {
      const appointment = await Issue.findById(id);
      if (appointment) {
        res.status(200).send({ status: 'Appointment fetched successfully', voiceRecording: appointment.AudioUri });
      } else {
        res.status(404).send({ status: 'Appointment not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: 'Error fetching appointment' });
    }
  });
  
  

module.exports = router;

