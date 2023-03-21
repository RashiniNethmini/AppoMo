import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppointmentPopup from '../../Popups/AppointmentPopup';
import { AppointmentList } from '../../AppointmentList';
import styles from './AppointmentConfirm.module.css';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';



export default function AppointmentConfirm() {

  const [appointments, setAppointments] = React.useState(AppointmentList);







  const handleAccept = (appointment) => {
    const filteredAppointments = appointments.filter(a => a.id !== appointment.id);
    setAppointments(filteredAppointments);
  }


  return (
    <div className={styles.mainContainer}>
      <Paper elevation={6} className={styles.paper}>
        <div className={styles.heading}>
          <h3>Confirm/Reject Appointments</h3>
        </div>

        <Container className={styles.appointmentTabs} sx={{ maxWidth: { xs: '250px', sm: '400px', md: '700px' } }}>
          {appointments.map((Appointment) => (


            <div key={Appointment.id} className={styles.buttonOuter} >
             <AppointmentPopup className={styles.popup} appointment={Appointment} onAccept={() => handleAccept(Appointment)} />

            </div>


          ))}
        </Container>
      </Paper>

    </div>

  );
}

