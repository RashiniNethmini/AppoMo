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
    IssueInBrief: {
        type: String,
        required: true,
    },
    ApntmntDate: {
        type: Date,
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