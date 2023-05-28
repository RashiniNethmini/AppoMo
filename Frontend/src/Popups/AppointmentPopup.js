import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from "@mui/material";
import styles from './Popup.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";
//import FormControlLabel from '@mui/material/FormControlLabel';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  align: 'center',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
  p: 3,
};

export default function AppointmentPopup({ appointment, onAccept }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAcceptClick = () => {
    onAccept(appointment);
    handleClose();
  }

  return (
    <div>
      <Button onClick={handleOpen} variant='contained' >Appointment {appointment.id}</Button>
      <Modal
        open={open}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
            <IconButton onClick={handleClose}><CloseIcon sx={{ color: '#000', fontSize: 25 }} />
            </IconButton>
          </div>
          <div className={styles.OuterContainer}>
            <div className={styles.leftContainer}>
              <Typography sx={{ p: 2 }}>
                Name <br></br>
                Contact No<br></br>
                Invoice No<br></br>
                Product<br></br>
                Issue<br></br>
                Voice Message<br></br>
              </Typography>

            </div>
            <div className={styles.rightContainer}>
              <Typography sx={{ p: 2 }}>
                : {appointment.name}<br></br>
                : {appointment.contactNumber}<br></br>
                :{appointment.invoice}<br></br>

                : {appointment.product}<br></br>
                : {appointment.issue}<br></br>
                <div className={styles.audioOuter}>:<audio src={appointment.voiceSrc} className={styles.audio} controls></audio></div><br></br>
              </Typography>

            </div>

          </div>



          <div className={styles.buttonOuter}>

            <Button className={style.button1} variant="contained" onClick={handleAcceptClick}>Accept</Button>
            <Button variant="contained" onClick={handleClose}>Reject</Button>
          </div>


        </Box>
      </Modal>
    </div>
  );
}
