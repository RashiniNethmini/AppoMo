import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popup from '../../Popups/Popup'; 
import { AppointmentList } from '../../AppointmentList';
import styles from './AppointmentConfirm.module.css';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';



export default function AppointmentConfirm() {



  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <div className={styles.mainContainer}>
      <Paper elevation={6} className={styles.paper}>
        <div className={styles.heading}>
          <h3>Confirm/Reject Appointments</h3>
        </div>

      <Container className={styles.appointmentTabs}  sx={{ maxWidth:{xs:'250px',sm:'400px',md:'700px'}}}>
        {AppointmentList.map((Appointment) => (

          
            <div key={Appointment.id} className={styles.buttonOuter} >
            <Popup className={styles.popup}Appointment={Appointment}/>
            </div>
          

        ))}
      </Container>
      </Paper>

    </div>

  );
}

