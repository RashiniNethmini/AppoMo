const router = require('express').Router();
let Issue = require('../models/Issues');

router.route("/add").post((req, res) => {
    const Name = req.body.Name;
    const ContactNo = Number(req.body.ContactNo);
    const InvoiceNo = req.body.InvoiceNo;
    const Product = req.body.Product;
    const IssueInBrief = req.body.IssueInBrief;

    const newIssue = new Issue({
        Name,
        ContactNo,
        InvoiceNo,
        Product,
        IssueInBrief
    })
    //pass the object to the database.
    newIssue.save().then(() => {
        res.json("Issue Added")
    }).catch((err) => {
        console.log(err);
    })

})

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


  router.route("/update/:id").patch(async (req, res) => {
    try {
      const issueId = req.params.id;
      const { comment, status } = req.body;
  
      const updatedIssue = await Issue.findByIdAndUpdate(
        issueId,
        { $set: { comment, status } },
        { new: true }
      );
  
      if (updatedIssue) {
        res.status(200).send({ status: "Comment updated successfully", updatedIssue });
      } else {
        res.status(404).send({ status: "Issue not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Error with updating comment" });
    }
  });
  

router.route("/get/:id").get(async (req, res) => {
    let issueId = req.params.id;
    console.log('issueId:', issueId);
    try {
        const issue = await Issue.findById(issueId);
        console.log('issue:', issue);
        if (issue) {
            res.status(200).send({ status: "Issue fetched successfully", issue });
        } else {
            res.status(404).send({ status: "Issue not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Error with getting issue" });
    }
})

module.exports = router;

