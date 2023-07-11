import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { BackHandler } from 'react-native';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import { useParams } from 'react-router-native';
import axios from 'axios';

const DateTimePicker = () => {
  const [showContainer, setShowContainer] = useState(true);
  const navigate = useNavigate();
  const {objectId} = useParams();
  const {BranchDetails} = useParams();
  const {_id} = useParams();
  const issueId=_id;
  const branchid = '649ff4ae0a1daddc6153e8f2';

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
  const [noOfAppointmentsPerHour, setNoOfAppointmentsPerHour] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  const WeekFromToday = new Date();
  WeekFromToday.setDate(WeekFromToday.getDate() + 7);
  const maxDate = WeekFromToday.toISOString().split('T')[0];

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8070/BranchDetails/getbranch/${branchid}`);
      const data = await response.json();
  
      if (response.ok) {
        const branchDetails = data.BranchDetails;
        setNoOfAppointmentsPerHour(branchDetails.nofappnmntsPerHr);

      } else {
        console.error('Error fetching data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDateSelect = async (date) => {
    setSelectedDate(date.dateString);
    setShowTimeSlots(true);
    setShowCalendar(false);
    setShowContainer(false);

    try {
      const response = await axios.get(`http://10.0.2.2:8070/BranchAvailability/getTimeSlots`, {
        params: {
          branchId: branchid,
          selectedDate: date.dateString,
        },
      });

      if (response.status === 200) {
        const fetchedTimeSlots = response.data.timeSlots;
        const updatedTimeSlots = fetchedTimeSlots.map((slot) => {
          const currNoOfAppointment = slot.currNoOfAppointment;
          const available = currNoOfAppointment < noOfAppointmentsPerHour;
          return { ...slot, currNoOfAppointment, available };
        });
        setTimeSlots(updatedTimeSlots);
        // setTimeSlots(fetchedTimeSlots);
      } else {
        console.error('Error fetching time slots');
        setTimeSlots([]);
      }
    } catch (error) {
      //console.error('Error fetching time slots:', error);
      setTimeSlots([]);
      setShowTimeSlots(false);
      setShowCalendar(true);
      Alert.alert('Invalid Date', 'Please select a date with available time slots.');
    }
  };
  

  const handleGoBack = () => {
    setSelectedTimeSlot(null);
    setShowTimeSlots(false);
    setShowCalendar(true);
  };

  const handleAppointmentConfirmation = async () => {
    if (selectedTimeSlot) {
      const timeSlotIndex = timeSlots.findIndex(
        (slot) =>
          slot.startTime === selectedTimeSlot.startTime &&
          slot.endTime === selectedTimeSlot.endTime
      );
      if (timeSlotIndex !== -1) {
        const updatedTimeSlots = [...timeSlots];
        const currNoOfAppointment = updatedTimeSlots[timeSlotIndex].currNoOfAppointment;
        const maxNoOfAppointmentsPerHour = parseInt(noOfAppointmentsPerHour, 10);
        
        if (currNoOfAppointment < maxNoOfAppointmentsPerHour) {
          updatedTimeSlots[timeSlotIndex].booked = true;
          updatedTimeSlots[timeSlotIndex].currNoOfAppointment = currNoOfAppointment + 1;
          setSelectedTimeSlot(updatedTimeSlots[timeSlotIndex]);
  
          // Update the currNoOfAppointment in the backend database
          try {
            await axios.put(`http://10.0.2.2:8070/BranchAvailability/updateCurrNoOfAppointment`, {
              branchId: branchid,
              selectedDate: selectedDate,
              startTime: selectedTimeSlot.startTime,
              endTime: selectedTimeSlot.endTime,
              currNoOfAppointment: currNoOfAppointment + 1,
            });
            Alert.alert('Success', 'Appointment scheduled successfully!');
          } catch (error) {
            console.error('Error updating currNoOfAppointment:', error);
          }
        } else {
          console.error('Cannot schedule appointment. Maximum appointments reached.');
        }
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} >
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Schedule Your Appointment</Text>
        <Text style={styles.subtitleText}>Select a Date and Time Slot</Text>
      </View>
      {/* Calendar */}
      {showCalendar && (
        <View style={styles.calendarContainer}>
          <Calendar onDayPress={handleDateSelect} minDate={today} maxDate={maxDate} />
          {/* <Calendar onDayPress={handleDateSelect} minDate={today} maxDate={WeekFromToday} /> */}
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
                  <Text style={styles.dateText}>Selected Time Slot: {selectedTimeSlot && selectedTimeSlot.startTime} - {selectedTimeSlot && selectedTimeSlot.endTime}</Text>

                  <Text style={styles.timeSlotText}>Do you want to schedule an appointment?</Text>
                  <Link
                    to={`/AdvPayment/${objectId}/${BranchDetails}/${issueId}/${selectedDate}/${selectedTimeSlot.startTime}/${selectedTimeSlot.endTime}`}
                    // to={`/AdvPayment/${objectId}/${BranchDetails}/${issueId}/${selectedDate}/${selectedTimeSlot.startTime}-${endTime}`}
                    component={TouchableOpacity}
                    onPress={() => handleAppointmentConfirmation()}
                    style={styles.timeSlotButton}
                  >
                    <Text style={styles.timeSlotButtonText}>Yes</Text>
                  </Link>
                  <TouchableOpacity
                    onPress={() => setSelectedTimeSlot(null)}
                    style={styles.timeSlotButton}
                  >
                    <Text style={styles.timeSlotButtonText}>Cancel</Text>
                  </TouchableOpacity>

{/* <Text style={styles.timeSlotText}>Do you want to schedule an appointment?</Text>
<TouchableOpacity
  onPress={() => {
    handleAppointmentConfirmation();
    navigate(
      `/AdvPayment/${objectId}/${BranchDetails}/${issueId}/${selectedDate}/${selectedTimeSlot.startTime}-${selectedTimeSlot.endTime}`,
      { objectId }
    );
  }}
  style={styles.timeSlotButton}
>
  <Text style={styles.timeSlotButtonText}>Yes</Text>
</TouchableOpacity>
    <TouchableOpacity
      onPress={handleAppointmentConfirmation}
      style={styles.timeSlotButton}
    >
      <Text style={styles.timeSlotButtonText}>Cancel</Text>
    </TouchableOpacity> */}
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
                        {slot.startTime} - {slot.endTime} {slot.available ? 'Available' : 'Booked'}
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


const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },

  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 70,
  },

  subtitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  
  calendarContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: 400,
    height: 500,
    marginTop: 70,
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