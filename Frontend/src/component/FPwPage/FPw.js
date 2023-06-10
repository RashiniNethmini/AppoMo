import React, { useState } from "react";
import styles from './FPw.module.css';
import {Paper, TextField, Button, Link, OutlinedInput} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function validateEmail(email){  //ensure that the email address is in a valid format.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.trim()===""){
        return "Email is required.";
    }else if (!emailRegex.test(email)){
        return "Invalid email.";
    }
};
function validateOtp(otp){  // checks if the otp per day field is not empty after removing any leading or trailing whitespace.
    const numbersRegex = /^[0-9]*$/; //ensure that the otp contain only numbers.
    if(otp.trim()===""){
        return "Otp is required.";
    }else if(!numbersRegex.test(otp)){
        return "Otp per day is invalid.";
    }
};

export default function Fpw() {

    const [open, setOpen] = React.useState(false); //Opening and closing popup messaages.
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    
    const [open1, setOpen1] = React.useState(false); //Opening and closing popup messaages.
    const handleClickOpen1 = () => {setOpen1(true);};
    const handleClose1 = () => {setOpen1(false);};

    const [email, setEmail] =useState("");
    const [emailError, setEmailError] = useState(null);
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setEmailError(validateEmail(value));
      };

    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState(null);
    const handleOtpChange = (event) => {
        const value = event.target.value;
        setOtp(value);
        setOtpError(validateOtp(value));
    };

    return (
        <div className={styles.FPwContainer}>
            <Paper elevation={6} className={styles.pDiv}>
                <div className={styles.FPwTitle}>
                    <h1>Forgot your password?</h1>
                </div>
                <div>
                    
                    <div className={styles.Femail}>
                        <label>Email &nbsp;</label>
                        <TextField required ="outlined-required" label=" Your email"  type="email" variant="outlined" sx={{ width: '45vw' }}  id="email"
                            onChange={handleEmailChange} error={Boolean(emailError)}
                            helperText={emailError} />
                       
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
                    <div className={styles.Fcode} >
                    <label>OTP Code &nbsp;</label>
                        <TextField className={styles.codeB} id="otp" onChange={handleOtpChange} error={Boolean(otpError)}
                        // helperText={otpError}
                        />
                        <TextField  className={styles.codeB} id="otp" onChange={handleOtpChange} error={Boolean(otpError)}
                        // helperText={otpError}
                        />
                        <TextField className={styles.codeB} id="otp" onChange={handleOtpChange} error={Boolean(otpError)}
                        // helperText={otpError}
                        />
                        <TextField className={styles.codeB} id="otp" onChange={handleOtpChange} error={Boolean(otpError)}
                        // helperText={otpError}
                        />
                        
                        
                        
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