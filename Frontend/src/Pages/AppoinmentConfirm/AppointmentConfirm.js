import React, { useState,useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import AppointmentPopup from '../../Popups/AppointmentPopup';
//import { AppointmentList } from '../../AppointmentList';
import styles from './AppointmentConfirm.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

export default function AppointmentConfirm() {
  //const [appointments, setAppointments] = useState(AppointmentList);
  const [rejectedAppointments, setRejectedAppointments] = useState([]);
  const [showRejectedAppointmentDetails, setShowRejectedAppointmentDetails] = useState(false);
  const [deleteAllRejectedAppointments, setDeleteAllRejectedAppointments] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    function getAppointments(){
      axios
      .get('http://localhost:8070/Issues/')
      .then((res) => {
        const allAppointments = res.data;
        const pendingAppointments = allAppointments.filter(appointment => appointment.status === null);
        setAppointments(pendingAppointments);
        setRejectedAppointments(allAppointments.filter(appointment => appointment.status === 'rejected'));
      })
      .catch((error) => {
        console.log(error);
      });
    
    }getAppointments();
  }, []);

  
  const handleAcceptAppointment = (appointmentId) => {
    // Update the status of the appointment in the database
    axios
      .patch(`http://localhost:8070/Issues/update/${appointmentId}`, { status: 'accepted' })
      .then((response) => {
        // Handle successful response if needed
        console.log(response.data);
        // Remove the accepted appointment from the appointments list
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== appointmentId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleRejectAppointment = (appointmentId, comment) => {
    const rejectedAppointment = appointments.find((appointment) => appointment._id === appointmentId);
    rejectedAppointment.status = "rejected"; // Change the status to "rejected"
    rejectedAppointment.comment = comment; // Add the comment to the rejected appointment object
  
    // Send the updated appointment to the backend
    axios
      .patch(`http://localhost:8070/Issues/update/${appointmentId}`, { status: "rejected", comment })
      .then((response) => {
        // Handle successful response if needed
        console.log(response.data);
        setRejectedAppointments((prevRejectedAppointments) => [...prevRejectedAppointments, rejectedAppointment]);
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== appointmentId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  


  const handleDeleteRejectedAppointment = (appointmentId) => {
    if (appointmentId === 'all') {
      // Delete all rejected appointments
      axios
        .delete(`http://localhost:8070/Issues/deleteAllRejected`)
        .then((response) => {
          // Handle successful response if needed
          console.log(response.data);
          setRejectedAppointments([]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Send a request to delete the appointment from the database
      axios
        .delete(`http://localhost:8070/Issues/delete/${appointmentId}`)
        .then((response) => {
          // Handle successful response if needed
          console.log(response.data);
          setRejectedAppointments((prevRejectedAppointments) =>
            prevRejectedAppointments.filter((appointment) => appointment._id !== appointmentId)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  
  
  

  const handleToggleRejectedAppointmentDetails = () => {
    setShowRejectedAppointmentDetails((prevShowRejectedAppointmentDetails) => !prevShowRejectedAppointmentDetails);
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };
  
  const filteredRejectedAppointments = searchQuery
  ? rejectedAppointments.filter(
      (appointment) =>
        appointment.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.issueNumber.toString().includes(searchQuery)
    )
  : rejectedAppointments;


  return (
    <div className={styles.mainContainer}>
      <Paper elevation={6} className={styles.paper}>
        <div className={styles.heading}>
          <h3>Confirm/Reject Appointments</h3>
        </div>

        <Container className={styles.issueTabs} sx={{ maxWidth: { xs: '250px', sm: '400px', md: '700px' } }}>
        {appointments.map((appointment) => (
  <div key={appointment._id} className={styles.buttonOuter}>
    <AppointmentPopup
      className={styles.popup}
      appointment={appointment}
      onAccept={handleAcceptAppointment}
      onReject={handleRejectAppointment}
    />
  </div>
))}

        </Container>
        <br /><br />

        <Container>
          <Button size="medium" onClick={handleToggleRejectedAppointmentDetails}>
            {showRejectedAppointmentDetails ? 'Hide Rejected Appointment List' : 'Show Rejected Appointment List'}
          </Button>
        </Container>
        
        

        {showRejectedAppointmentDetails && (
          <Container className={`${styles.rejectAppointmentList} ${styles.border}`}>
          <div className={styles.searchContainer}>
    <TextField
      size="small"
      label="Search"
      value={searchQuery}
      onChange={handleSearch}
      sx={{ mr:0 }} // Add margin to create space between the search field and icon
    />
    <SearchIcon sx={{ fontSize:30 }} /> {/* Adjust the fontSize to match the size of the search field */}
  </div>


          


  {filteredRejectedAppointments.map((appointment) => (
  <div key={appointment._id}>
    <p>
      <u>Appointment: {appointment.issueNumber}</u>
      <br />
      <b>Name:</b> {appointment.Name}
      <br />
      <b>Issue:</b> {appointment.IssueInBrief}
      <br />
      <b>Comment:</b> {appointment.comment}
      <br/>
      <b>Product:</b> {appointment.Product}
      <br/>
      {deleteAllRejectedAppointments ? null : (
        <IconButton aria-label="delete" onClick={() => handleDeleteRejectedAppointment(appointment._id)}>
          <DeleteIcon />
        </IconButton>
      )}
    </p>
  </div>
))}


            <Container>
              <br></br>
              <Tooltip title="Delete all rejected appointments">
                <Button className="deleteallButton"variant="outlined" startIcon={<DeleteIcon />}onClick={() => handleDeleteRejectedAppointment('all')}disabled={rejectedAppointments.length === 0}>
                  Delete All
                </Button>
              </Tooltip>
            </Container>

          </Container>
          
        )}
     


      </Paper>
    </div>
  );
}
