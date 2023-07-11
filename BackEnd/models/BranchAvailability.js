const mongoose = require("mongoose");

// Define the TimeSlot schema
const TimeSlotSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  currNoOfAppointment: {
    type: Number,
    default: 0,
  },
});

// Define the BranchAvailability schema
const BranchAvailabilitySchema = new mongoose.Schema({
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BranchDetails", // Reference to the BranchDetails model
    required: true,
  },
  dates: [
    {
      date: {
        type: Date,
        required: true,
      },
      timeSlots: [TimeSlotSchema],
    },
  ],
});


const BranchAvailability = mongoose.model(
  "BranchAvailability",
  BranchAvailabilitySchema
);

module.exports = BranchAvailability;

