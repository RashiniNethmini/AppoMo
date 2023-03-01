import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from "@mui/material";
import styles from './Popup.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';



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

export default function Popup({ Appointment }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant='contained' >Appointment {Appointment.id}</Button>
      <Modal
        open={open}
        // onClose={handleClose}
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
                <div>Invoice No<br></br></div>
                Product<br></br>
                Issue<br></br>
                Voice Message<br></br>
              </Typography>
            
            </div>
            <div className={styles.rightContainer}>
              <Typography sx={{ p: 2 }}>
                : {Appointment.name}<br></br>
                : {Appointment.contactNumber}<br></br>
                :<FormControlLabel
          value="start"
          control={<Checkbox />}
          label={Appointment.invoice}
          labelPlacement="start"
        /><br></br>
                
                : {Appointment.product}<br></br>
                : {Appointment.issue}<br></br>
                <div className={styles.audioOuter}>:<audio src={Appointment.voiceSrc} className={styles.audio} controls></audio></div><br></br>
              </Typography>
              
            </div>

          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent:'center' }}>
            <TextField className={styles.commentbox}id="outlined-basic" label="comment" variant="outlined" />
          </div>

       


          <div className={styles.buttonOuter}>
          
            <Button className={style.button1} variant="contained" >Accept</Button>
            <Button variant="contained">Reject</Button>
          </div>

          
        </Box>
      </Modal>
    </div>
  );
}