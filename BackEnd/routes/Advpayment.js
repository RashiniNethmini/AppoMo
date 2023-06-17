const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointments');
const SMS = require('../APIs/PaymentSMS');



// POST /advpayment/update
router.post('/update', async (req, res) => {
  try {
    const mobileNumber = req.body.mobileNumber;
    const paymentStatus = 'success'; // Assuming you have a proper way of determining payment status

    if (paymentStatus === 'success') {
       updateAppointmentStatus(mobileNumber);
      res.send('Appointment status updated successfully.');
    } else {
      console.log('Payment unsuccessful');
      res.send('Payment unsuccessful.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});

function updateAppointmentStatus(mobileNumber) {
  var paymentStatus = true; // Assuming you have a proper way of determining payment status

  if (paymentStatus === true) {
    var appointmentDetails = getAppointmentDetailsByMobileNumber(mobileNumber);

    if (appointmentDetails) {
      appointmentDetails.status = true; // Update the appointment status to true

      // Save the updated appointment details back to the document
      updateAppointmentDetails(appointmentDetails, function (err) {
        if (err) {
          console.error('Error updating appointment details:', err);
        } else {
          // Send SMS to the mobile number
          SMS(appointmentDetails.mobileNumber, 'Payment successful');
        }
      });
    } else {
      console.log('Appointment not found');
    }
  } else {
    console.log('Payment unsuccessful');
  }
}

// Function to retrieve appointment details by mobile number
function getAppointmentDetailsByMobileNumber(mobileNumber) {
  var appointmentDetails = getAppointmentDetails(mobileNumber);
  return appointmentDetails;
}

function getAppointmentDetails(mobileNumber, callback) {
  // Assuming you have a Mongoose Appointment model defined
  Appointment.findOne({ contactNo: mobileNumber }, function (err, appointmentDetails) {
    if (err) {
      callback(err, null);
      console.log("Can't find user")
    } else {
      callback(null, appointmentDetails);
    }
  });
}

function updateAppointmentDetails(appointmentDetails, callback) {
  appointmentDetails.save(function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}


module.exports = router;
