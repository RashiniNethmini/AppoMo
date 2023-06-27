const router = require('express').Router();
let Appointment = require('../models/Appointments');
const sendSMS = require('../APIs/TerminationSMS');

// Define the route to update the finalAmount in the Appointment table
router.route('/update/:id').put(async (req, res) => {
    try {
      const { id } = req.params;
      const { finalAmount, ContactNo, AptNumber } = req.body;
  
      // Update the finalAmount field for the specified document
      const updatedFinalAmount = await Appointment.findByIdAndUpdate(id, { finalAmount }, { new: true });
  
      if (!updatedFinalAmount) {
        return res.status(404).json({ error: 'Issue not found' });
      }
      
      // Call the sendSMS function and pass the required values
      sendSMS(finalAmount, ContactNo, AptNumber);

      res.json(updatedFinalAmount);
    } catch (error) {
      console.error('Error updating final amount:', error);
      res.status(500).json({ error: 'Failed to update final amount' });
    }
});


module.exports = router;