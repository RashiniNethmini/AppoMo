const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const appntmntSchema = new Schema({
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
    },
    ApntmntDate: {
        type: String,
        required: true,
    },
    Time: {
        type: String,
        required: true,
    },
    AptmntStatus:{
        type: Boolean,
        required: true,
    }


})

const Appointment = mongoose.model('Appointment', appntmntSchema);
module.exports = Appointment;