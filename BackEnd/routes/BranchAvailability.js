const router = require('express').Router();
let BranchAvailability = require('../models/BranchAvailability');

router.route('/add').post(async (req, res) => {
  const { branchId, dates } = req.body;

  try {
    for (const dateObj of dates) {
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
      );
    }

    console.log('Data saved successfully');
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Failed to save data' });
  }
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

router.delete('/deleteTimeSlot/:dateIndex/:timeSlotIndex', async (req, res) => {
  const { dateIndex, timeSlotIndex } = req.params;
  const { branchId } = req.body;

  BranchAvailability.findOneAndUpdate(
    { branchId },
    { $unset: { [`dates.${dateIndex}.timeSlots.${timeSlotIndex}`]: 1 } },
    { new: true }
  )
    .then(result => {
      // Remove the null elements from the timeSlots array
      result.dates[dateIndex].timeSlots = result.dates[dateIndex].timeSlots.filter(Boolean);
      if (result.dates[dateIndex].timeSlots.length === 0) {
        // If there are no more time slots for this date, delete the date as well
        result.dates.splice(dateIndex, 1);
      }
      return result.save();
    })
    .then(result => {
      console.log('Time slot deleted successfully.');
      res.json({ message: 'Time slot deleted successfully.', result });
    })
    .catch(error => {
      console.error('Error deleting the time slot.', error);
      res.status(500).json({ error: 'An error occurred while deleting the time slot.' });
    });
});

router.delete('/deleteDate/:dateIndex', async (req, res) => {
  const { dateIndex } = req.params;
  const { branchId } = req.body;

  BranchAvailability.findOneAndUpdate(
    { branchId },
    { $unset: { [`dates.${dateIndex}`]: 1 } },
    { new: true }
  )
    .then(result => {
      // Remove the null elements from the dates array
      result.dates = result.dates.filter(Boolean);
      if (result.dates.length === 0) {
        // If there are no more dates for this branch, delete all data associated with the branch ID
        return BranchAvailability.findOneAndDelete({ branchId });
      }
      return result.save();
    })
    .then(result => {
      if (!result) {
        console.log('All data deleted successfully for the branch.');
        res.json({ message: 'All data deleted successfully for the branch.' });
      } else {
        console.log('Date and time slots deleted successfully.');
        res.json({ message: 'Date and time slots deleted successfully.', result });
      }
    })
    .catch(error => {
      console.error('An error occurred while deleting the date and time slots.', error);
      res.status(500).json({ error: 'An error occurred while deleting the date and time slots.' });
    });
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

router.route('/save').post(async (req, res) => {
  const { branchId, dates } = req.body;

  try {
    const branchAvailability = await BranchAvailability.findOne({ branchId });

    if (branchAvailability) {
      // Branch ID exists, update the existing records
      branchAvailability.dates = dates;
      await branchAvailability.save();
      console.log('Data updated successfully');
      res.status(200).json({ message: 'Data updated successfully' });
    } else {
      // Branch ID does not exist, create new data
      const newBranchAvailability = new BranchAvailability({
        branchId,
        dates,
      });
      await newBranchAvailability.save();
      console.log('Data saved successfully');
      res.status(200).json({ message: 'Data saved successfully' });
    }
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Failed to save data' });
  }
});

  
module.exports = router;