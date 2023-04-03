import React, { useState } from "react";
import styles from './FPw.module.css';
import {Paper, TextField, Button, Link, OutlinedInput} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function Fpw() {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    
    const [open1, setOpen1] = React.useState(false);
    const handleClickOpen1 = () => {setOpen1(true);};
    const handleClose1 = () => {setOpen1(false);};



    return (
        <div className={styles.FPwContainer}>
            <Paper elevation={6} className={styles.pDiv}>
                <div className={styles.FPwTitle}>
                    <h1>Forgot your password?</h1>
                </div>
                <div>
                    {/* <div>
                        <p>Enter your email and we'll send you a link to reset your password</p>
                    </div> */}
                    <div className={styles.Femail}>
                        <label>Email &nbsp;</label>
                        <TextField required id="outlined-required" label="Enter your email"  type="email" variant="outlined" sx={{ width: '45vw' }} />
                       
                    </div>
                    <div className={styles.sendB}>
                    <Button variant="contained" onClick={handleClickOpen} sx={{mr:'20px'}} >Send code </Button>
                         <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                        We have sent the OTP code to your email.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>OK</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <div className={styles.Fcode}>
                    <label>OTP Code &nbsp;</label>
                        <OutlinedInput  className={styles.codeB}></OutlinedInput>
                        <OutlinedInput  className={styles.codeB}></OutlinedInput>
                        <OutlinedInput className={styles.codeB}></OutlinedInput>
                        <OutlinedInput className={styles.codeB}></OutlinedInput>
                        
                        
                        
                    </div>
                    <div className={styles.verifyB}>
                        <Button variant="contained" onClick={handleClickOpen1} sx={{mr:'10px'}}>Verify Account</Button>
                        <Dialog open={open1} onClose={handleClose1} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    We have verified your account.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="outlined" onClick={handleClose1}>Skip for now</Button>
                                <Button variant="outlined" onClick={handleClose1}>Reset Password</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <div className={styles.resendB}>
                        <p>Didn't recieve code? &nbsp;</p> 
                        <Link href="#"> Resend OTP</Link>
                        
                    </div>
                </div>
            </Paper>
        </div>




    )


}