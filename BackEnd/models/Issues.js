const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const issueSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    ContactNo: {
        type: Number,
        required: true,
    },
    InvoiceNo: {
        type: String,
        required: true,
    },
    Product: {
        type: String,
        required: true,
    },
    IssueInBrief: {
        type: String,
        required: true,
    }

})

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;