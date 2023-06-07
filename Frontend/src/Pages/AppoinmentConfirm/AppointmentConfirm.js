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
      
        setAppointments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }getAppointments();
  }, []);

  
  const handleAcceptAppointment = (appointmentId) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment._id !== appointmentId)
    );
  };

  const handleRejectAppointment = (appointmentId, comment) => {
    const rejectedAppointment = appointments.find((appointment) => appointment._id === appointmentId);
    rejectedAppointment.comment = comment; // Add the comment to the rejected appointment object
    setRejectedAppointments((prevRejectedAppointments) => [...prevRejectedAppointments, rejectedAppointment]);
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment._id !== appointmentId)
    );
  };

  const handleDeleteRejectedAppointment = (appointmentId) => {
    if (appointmentId === 'all') {
      setRejectedAppointments([]);
      setDeleteAllRejectedAppointments(true);
    } else {
      setRejectedAppointments((prevRejectedAppointments) =>
        prevRejectedAppointments.filter((appointment) => appointment._id !== appointmentId)
      );
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
      Name: {appointment.Name}
      <br />
      Issue: {appointment.IssueInBrief}
      <br />
      Comment: {appointment.comment}
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
