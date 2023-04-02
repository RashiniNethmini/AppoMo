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

router.route("/delete/:id").delete(async (req, res) => {
    let issueId = req.params.id;

    await Issue.findByIdAndDelete(issueId)
        .then(() => {
            res.status(200).send({ status: "Issue deleted successfully" });
        }).catch((err) => { console.log(err.message); })
    //res.status(500).send({ status:"Error deleting issue"});

})

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

