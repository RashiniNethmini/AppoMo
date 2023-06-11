const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model('Counter', CounterSchema);

const issueSchema = new Schema({
  issueNumber: {
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
  comment: {
    type: String,
  },
  status: {
    type: String,
    default: null,
  },
  AudioUri: {
    type: String,
    default: null,
  },
});

issueSchema.pre('save', function (next) {
  const doc = this;
  Counter.findByIdAndUpdate(
    { _id: 'issueNumber' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
    .then((counter) => {
      doc.issueNumber = counter.seq;
      next();
    })
    .catch((error) => {
      next(error);
    });
});

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;
