const router = require('express').Router();
let BranchAvailability = require('../models/BranchAvailability');

router.route('/add').post((req, res) => {
    const { branchId, dates } = req.body;

    dates.forEach(async (dateObj) => {
        const { date, timeSlots } = dateObj;
  
        await BranchAvailability.findOneAndUpdate(
          { branchId },
          {
            $push: {
              dates: {
                date,
                timeSlots,
              },
            },
          },
          { upsert: true }
        )
          .then(() => {
            console.log('Data saved successfully');
          })
          .catch((error) => {
            console.error('Error saving data:', error);
          });
      });

    // Send a response back to the frontend
    res.status(200).json({ message: 'Data saved successfully' });
});

// GET request to retrieve branch availability by branchId
router.get("/get/:branchId", (req, res) => {
  const branchId = req.params.branchId;

  BranchAvailability.findOne({ branchId: branchId })
    .then((branchAvailability) => {
      if (branchAvailability) {
        res.json(branchAvailability);
      } else {
        res.status(404).json({ message: "Branch availability not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get('/getTimeSlots', async (req, res) => {
    try {
      const { branchId, selectedDate } = req.query;
  
      const branchAvailability = await BranchAvailability.findOne({ branchId });
  
      if (!branchAvailability) {
        return res.status(404).json({ error: 'Branch availability not found' });
      }
  
      const selectedDateSlot = branchAvailability.dates.find(
        (dateSlot) => dateSlot.date.toISOString().split('T')[0] === selectedDate
      );
  
      if (!selectedDateSlot) {
        return res.status(404).json({ error: 'Time slots not found for selected date' });
      }
  
      const timeSlots = selectedDateSlot.timeSlots.map((slot) => ({
        startTime: slot.startTime,
        endTime: slot.endTime,
        currNoOfAppointment: slot.currNoOfAppointment,
      }));
  
      res.status(200).json({ timeSlots });
    } catch (error) {
      console.error('Error fetching time slots:', error);
      res.status(500).json({ error: 'Error fetching time slots' });
    }
});

router.put('/updateCurrNoOfAppointment', async (req, res) => {
    try {
      const { branchId, selectedDate, startTime, endTime, currNoOfAppointment } = req.body;
  
      const branchAvailability = await BranchAvailability.findOne({ branchId });
  
      if (!branchAvailability) {
        return res.status(404).json({ error: 'Branch availability not found' });
      }
  
      const selectedDateSlot = branchAvailability.dates.find(
        (dateSlot) => dateSlot.date.toISOString().split('T')[0] === selectedDate
      );
  
      if (!selectedDateSlot) {
        return res.status(404).json({ error: 'Time slots not found for selected date' });
      }
  
      const selectedTimeSlot = selectedDateSlot.timeSlots.find(
        (slot) => slot.startTime === startTime && slot.endTime === endTime
      );
  
      if (!selectedTimeSlot) {
        return res.status(404).json({ error: 'Selected time slot not found' });
      }
  
      selectedTimeSlot.currNoOfAppointment = currNoOfAppointment;
  
      await branchAvailability.save();
  
      res.status(200).json({ message: 'currNoOfAppointment updated successfully' });
    } catch (error) {
      console.error('Error updating currNoOfAppointment:', error);
      res.status(500).json({ error: 'Error updating currNoOfAppointment' });
    }
});

// router.route('/getAvailableDates').get(async (req, res) => {
//   try {
//     const { branchId } = req.query;
    
//     // Fetch the available dates from your database based on the branchId
//     const availableDates = await BranchAvailability.find({ branchId }, 'date');
    
//     // Extract the dates from the fetched data
//     const dates = availableDates.map((item) => item.date.toISOString().split('T')[0]);

//     res.status(200).json({ availableDates: dates });
//   } catch (error) {
//     console.error('Error fetching available dates:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
  
module.exports = router;