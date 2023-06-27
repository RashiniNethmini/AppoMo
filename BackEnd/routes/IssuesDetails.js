const router = require('express').Router();
let Appointment = require('../models/Appointments');

// Fetch values from the Issue collection based on the given issueID
router.route('/get/:appointmentID').get(async (req, res) => {
  const appointmentID = req.params.appointmentID;
  try {
    const issue = await Appointment.findOne({ _id: appointmentID });
    if (issue) {
      res.status(200).json({ data: [issue] });
    } else {
      res.status(404).json({ message: 'Issue not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching issue' });
  }
});


module.exports = router;

