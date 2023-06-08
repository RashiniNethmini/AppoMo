import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, TextField } from "@mui/material";
import styles from './Popup.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";


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

export default function AppointmentPopup({ appointment, onAccept, onReject }) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAcceptClick = () => {
    onAccept(appointment._id);
    handleClose();
  };

  const handleRejectClick = () => {
    onReject(appointment._id, comment);
    handleClose();
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  

  return (
    <div>
      <Button onClick={handleOpen} variant='contained'><span>Appointment {appointment.issueNumber}</span></Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
            <IconButton onClick={handleClose}><CloseIcon sx={{ color: '#000', fontSize: 25 }} /></IconButton>
          </div>
          <div className={styles.OuterContainer}>
            <div className={styles.leftContainer}>
              <Typography sx={{ p: 2 }}>
                Name <br />
                Contact No<br />
                Invoice No<br />
                Product<br />
                Issue<br />
                Voice Message<br /><br />
              </Typography>
            </div>
            <div className={styles.rightContainer}>
              <Typography sx={{ p: 2 }}>
                : {appointment.Name}<br />
                : {appointment.ContactNo}<br />
                : {appointment.InvoiceNo}<br />
                : {appointment.Product}<br />
                : {appointment.IssueInBrief}<br />
                <div className={styles.audioOuter}><audio src={appointment.voiceSrc} className={styles.audio} controls /></div>
              </Typography>
            </div>
          </div>
          <div>
            <TextField
              label="Comment"
              value={comment}
              onChange={handleCommentChange}
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              margin="dense"
            />
          </div>
          <div className={styles.buttonOuter}>
            <Button className={style.button1} variant="contained" onClick={handleAcceptClick}>Accept</Button>
            <Button variant="contained" onClick={handleRejectClick}>Reject</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
