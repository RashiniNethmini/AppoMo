import React, { useState } from "react";
import styles from './Reg.module.css';
import { Paper, TextField, RadioGroup, Radio, FormControlLabel, Button, Stack, Avatar } from "@mui/material";
import { maxWidth } from "@mui/system";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';





export const Reg = (props) => {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    
    return (
        <div className={styles.regContainer}>

            

        <Paper elevation={6} className={styles.regpaperDiv}>
            <div className={styles.regTitle}>
                <h1>Registration Form</h1>
            </div>
            <div className={styles.combined}>
                <div className={styles.regBodyRadioBox}>
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" >
                        <FormControlLabel value="Company" control={<Radio />} label="Company" />
                        <FormControlLabel value="Service Center" control={<Radio />} label="Service Center" />
                    </RadioGroup>
                </div>


                <div className={styles.reglogoB}>
                
                    <Avatar src="./avatar.jpg" variant="contained" component="label" display="flex" justify-content="center" align="center"sx={{ width: 100, height: 100 }}>
                    <p className={styles.regUlogo}>Upload Logo</p>
                    <input hidden accept="image/*" multiple type="file" />
                    
                    </Avatar>
                
                </div>
            </div>


            <div>
                <div className={styles.regBody}>

                
                    
                    <div className={styles.regBodyTextbox}>
                        <TextField required id="outlined-required" label="Username" variant="outlined" sx={{ width: '100vw' }} />

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required id="outlined-password-input" label="Password" type="password" autoComplete="current-password" variant="outlined" helperText="Password must be at least 8 characters contain at least one uppercase letter, at least one number & at least one following symbols: !@#$%&+*^()_." sx={{ width: '100vw' }} />

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required id="outlined-required" label="Company / Service Center Name" variant="outlined" sx={{ width: '100vw' }} />

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required id="outlined-required" label="Address" variant="outlined" sx={{ width: '100vw' }} />

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required id="outlined-required" label="Email" variant="outlined" type="email" sx={{ width: '100vw' }} />

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField id="outlined-basic" label="CEO Name" variant="outlined" sx={{ width: '100vw' }} />

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required id="outlined-required" label="Registration No" variant="outlined" sx={{ width: '100vw' }} />

                    </div>

                    <div className={styles.regButton}>
                        <Button variant="contained" sx={{mr:'10px'}}>Cancel</Button>
                        <div>
                            <Button variant="contained" type="submit" onClick={handleClickOpen} sx={{mr:'10px'}}>Next</Button>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Please wait until we verify your details.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose}>OK</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        
                            
                    
                    </div>        
                    
                    

                </div>


            </div>
        </Paper>
    </div>

)
}