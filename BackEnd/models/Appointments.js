const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CounterSchemaa = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
  });
  const Counterr = mongoose.model('Counterr', CounterSchemaa);
const appntmntSchema = new Schema({
    AptNumber: {
        type: Number,
      },
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
    Model: {
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
    Checked:{
        type: Boolean,
        // required: true,
      },
    Completed:{
      type: Boolean,
      required: true,
    },
    finalAmount: {
      type: Number,
      default: 0,
    }, 
    BranchDetails: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BranchDetails' 
    }, 
    UserDetails: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserDetails' 
    }
});

appntmntSchema.pre('save', function (next) {
    const doc = this;
    Counterr.findByIdAndUpdate(
      { _id: 'AptNumber' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    )
      .then((counter) => {
        doc.AptNumber = counter.seq;
        next();
      })
      .catch((error) => {
        next(error);
      });
  });



const Appointment = mongoose.model('Appointment', appntmntSchema);
module.exports = Appointment;