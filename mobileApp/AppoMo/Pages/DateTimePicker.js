import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { BackHandler } from 'react-native';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import { useParams } from 'react-router-native';

const DateTimePicker = () => {
  const [showContainer, setShowContainer] = useState(true);
  const navigate = useNavigate();
  const {objectId} = useParams();
  const {BranchDetails} = useParams();
  const {_id} = useParams();
  const issueId=_id;

  const handleBackButton = () => {
    navigate(`/NotificationInterface/${objectId}`,{objectId});
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  }, [handleBackButton]);
 
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const today = new Date();

  const branchID = '';
  // const AptNumber = 1;
  // const Name = 'Gimhani';
  // const ContactNo = 774423315;
  // const InvoiceNo= '2065';
  // const Product= 'Phone';
  // const IssueInBrief= 'Broken';
  // const AptmntStatus = true;
  // const Completed = false;
  const startTime = '08:00';
  const endTime = '19:00';
  const noOfAppointmentsPerHour = 4;

  const timeSlots = generateTimeSlots(startTime, endTime, noOfAppointmentsPerHour);

  const twoWeeksFromToday = new Date();
  twoWeeksFromToday.setDate(twoWeeksFromToday.getDate() + 14);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setShowTimeSlots(true);
    setShowCalendar(false);
    setShowContainer(false);
  };

  const handleGoBack = () => {
    setSelectedTimeSlot(null);
    setShowTimeSlots(false);
    setShowCalendar(true);
  };

  const handleAppointmentConfirmation = async() => {
    if (selectedTimeSlot) {
      const timeSlotIndex = timeSlots.findIndex((slot) => slot.time === selectedTimeSlot.time);
      if (timeSlotIndex !== -1) {
        const updatedTimeSlots = [...timeSlots];
        updatedTimeSlots[timeSlotIndex].booked = true;
        setSelectedTimeSlot(updatedTimeSlots[timeSlotIndex]);
      }
    }

    // Make an API request to send the data to the backend
    fetch('http://192.168.1.226:8070/Appointments/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name,
        ContactNo,
        InvoiceNo,
        Product,
        IssueInBrief,
        ApntmntDate,
        Time,
        AptmntStatus,
        Completed,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
      .catch((error) => {
        console.log(error);
    });
    /*try {
      const updateFields = {
        ApntmntDate,
        Time
      };
      await axios.put(`http://localhost:8070/serviceprovider/update/${_id}`,updateFields);
      alert('Appointment scheduled successfully.');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    }

    const requestBody = {
      Name: name,
      ContactNo: contactNo,
      InvoiceNo: invoice,
      Product: product,
      IssueInBrief: issueInBrief,
      //ApntmntDate: ,
      //Time:
      AptmntStatus: aptmntStatus,
      Completed: completed,

    };
  
  // Make an API request to send the data to the backend
  fetch("http://10.0.2.2:8070/Appointments/add", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "Name": name,
      "ContactNo": contactNo,
      "InvoiceNo": invoice,
      "Product": product,
      "IssueInBrief": issueInBrief,
      //"ApntmntDate":,
      //"Time":,
      //"AptmntStatus":,
      //"Completed":,
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });*/

    };


  return (
    <ScrollView>
      {/* <Text style={styles.title}>Select a Date</Text> */}
      {/* Calendar */}
      {showCalendar && (
        <View style={styles.calendarContainer}>
          <Calendar onDayPress={handleDateSelect} minDate={today} maxDate={twoWeeksFromToday} />
        </View>
      )}

      {/* Time Slots */}
      {showTimeSlots && (
        <View style={[styles.timeSlotsContainer, !showContainer]}>
          <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
          {selectedDate ? (
            <View>
              <Text style={styles.dateText}>Selected Date: {selectedDate}</Text>
              {selectedTimeSlot ? (
                <View>
                  <Text style={styles.dateText}>Selected Time Slot: {selectedTimeSlot.time}</Text>
                  <Text style={styles.timeSlotText}>Do you want to schedule an appointment?</Text>
                  <Link to={`/AdvPayment/${objectId}/${BranchDetails}/${issueId}/${selectedDate}/${selectedTimeSlot.time}`} component={TouchableOpacity} style={styles.timeSlotButton} >
                    <Text style={styles.timeSlotButtonText}>Yes</Text>
                  </Link>
                  <TouchableOpacity
                    onPress={() => setSelectedTimeSlot(null)}
                    style={styles.timeSlotButton}
                  >
                    <Text style={styles.timeSlotButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text style={styles.timeSlotText}>Reserve your preferred time.</Text>
                  {timeSlots.map((slot, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.timeSlotButton,
                        { backgroundColor: slot.available ? '#00FF00' : '#FF0000' },
                      ]}
                      onPress={() => {
                        if (slot.available) {
                          setSelectedTimeSlot(slot);
                        }
                      }}
                      disabled={!slot.available}
                    >
                      <Text style={styles.timeSlotButtonText}>
                        {slot.time} {slot.available ? 'Available' : 'Booked'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <Text style={styles.dateText}>Reserve your preferred date from the calendar.</Text>
          )}
        </View>
      )}
    
    </ScrollView>
  );
};

const generateTimeSlots = (startTime, endTime, noOfAppointmentsPerHour) => {
  const timeSlots = [];
  const startHour = parseInt(startTime.split(':')[0]);
  const endHour = parseInt(endTime.split(':')[0]);

  for (let hour = startHour; hour < endHour; hour++) {
    const startMinute = hour === startHour ? 0 : 0; // Set the start minute to 0 for the first hour
    const endMinute = hour === endHour - 1 ? 60 : 0; // Set the end minute to 60 for the last hour

    const timeSlot = {
      time: `${hour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}-${(hour + 1).toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`,
      available: true,
      booked: false,
    };
    timeSlots.push(timeSlot);
  }

  return timeSlots;
};

const styles = StyleSheet.create({

  // title: {

  //   fontSize: 30,
  //   fontWeight: 'bold',
  //   marginTop: 100,
  //   marginBottom: 15,
  //   color: '#FFFFFF',
  // },

  calendarContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: 400,
    height: 500,
    marginTop: 70,
    // borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'center',
    flexGrow: 1,
  },

  timeSlotsContainer: {
    marginTop: 0,
    width: 400,
    height: 850,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },

  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  timeSlotText: {
    fontSize: 16,
    marginBottom: 10,
  },

  timeSlotButton: {
    backgroundColor: '#e6e6e6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },

  timeSlotButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  goBackButton: {
    backgroundColor: '#cccccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 40,
  },

  goBackButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DateTimePicker;
