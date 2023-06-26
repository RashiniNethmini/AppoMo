import React, { useState,useEffect } from "react";
import styles from './FPw.module.css';
import {Paper, TextField, Button, Link, OutlinedInput} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import axios from 'axios';

function validateEmail(email){  //ensure that the email address is in a valid format.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.trim()===""){
        return "Email is required.";
    }else if (!emailRegex.test(email)){
        return "Invalid email.";
    }
};
function validateOtp(otp){  // checks if the otp per day field is not empty after removing any leading or trailing whitespace.
    const numbersRegex = /^[0-9]{1}$/; //ensure that the otp contain only numbers.
    if(otp.trim()===""){
        return "Otp is required.";
    }else if(!numbersRegex.test(otp)){
        return "OTP should be a single digit.";
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
    
    
    // const [data, setData]=useState("");
    // const Semail = 'abc@gmail.com';

    const [data,setData]=useState("");
    const Sname = 'ABC';

    useEffect(() => {
        fetchdata();
      }, []);
    
    const fetchdata= async ()=>{
        const updatable = {
          email
        };
        const data=await axios.get(`http://localhost:8070/serviceprovider/searchEmail/${Sname}`,updatable);
        setData(data);
        const response = data.data[0].email;
        setEmail(response);
        // setCP(response);
    };

    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState(null);
    const handleOtpChange = (event) => {
        const value = event.target.value;
        const otp1=document.getElementById("otp1").value;
        const otp2=document.getElementById("otp2").value;
        const otp3=document.getElementById("otp3").value;
        const otp4=document.getElementById("otp4").value;
        setOtp(otp1+otp2+otp3+otp4);
        setOtpError(validateOtp(value));
    };

    const handleSendCode = () => {
        // Function to handle sending the OTP code to the user's email
        if (!emailError) {
           
          // Make an API call to send the OTP code to the user's email
          axios.post("http://localhost:8070/serviceprovider/send-otp", { email: email  })
            .then((response) => {
                console.log(response);
                alert("Otp send")
                handleClickOpen();
                fetchdata();

            })
            .catch((error) => {
              // Show an error message to the user
              console.log(error);
            });
        }
      };
       

      const handleVerifyAccount = () => {
        if (!otpError) {
          // Make an API call to verify the account with the entered OTP code
          axios
            .post("http://localhost:8070/serviceprovider/verify-account", {
              enteredOTP: otp, // Use the correct key name (enteredOTP) in the request body
            })
            .then((response) => {
              console.log(response);
              alert("Verified Account");
              // Show a success message to the user
              handleClickOpen1();
            })
            .catch((error) => {
              // Show an error message to the user
              console.log(error);
            });
        }
      };
    

    return (
        <div className={styles.FPwContainer}>
            <Paper elevation={6} className={styles.pDiv}>
                <div className={styles.FPwTitle}>
                    <h1>Forgot your password?</h1>
                </div>
                <div>
                    <div>
                    <div className={styles.Femail}>
                        <label>Email &nbsp; &nbsp; &nbsp;</label>
                        <TextField required ="outlined-required" label=" Enter email"  type="email" variant="outlined" sx={{ width: '45vw' }}  id="email"
                            onChange={handleEmailChange} 
                            error={Boolean(emailError)}
                            helperText={emailError} />
                       
                    </div>
                    </div>
                    
                    <div className={styles.sendB}>
                    <Button variant="contained" onClick={handleSendCode} sx={{mr:'20px'}} >Send code </Button>
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
                    <label>OTP Code &nbsp; </label>
                        <TextField className={styles.codeB} id="otp1" onChange={handleOtpChange} error={Boolean(otpError)}
                        // helperText={otpError}
                        />
                        <TextField  className={styles.codeB} id="otp2" onChange={handleOtpChange} error={Boolean(otpError)}
                        // helperText={otpError}
                        />
                        <TextField className={styles.codeB} id="otp3" onChange={handleOtpChange} error={Boolean(otpError)}
                        // helperText={otpError}
                        />
                        <TextField className={styles.codeB} id="otp4" onChange={handleOtpChange} error={Boolean(otpError)}
                        // helperText={otpError}
                        />
                    </div>
                    <div className={styles.otpE}>
                        <p className={styles.textStyle}>{otpError}</p>
                    </div>
                    

                    <div className={styles.verifyB}>
                        <Button variant="contained" onClick={handleVerifyAccount} sx={{mr:'10px'}}>Verify Account</Button>
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
                        <Link href="#" onClick={handleSendCode}> Resend OTP</Link>
                        
                    </div>
                </div>
            </Paper>
        </div>




    )


}