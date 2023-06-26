import React, { useState } from "react";
import styles from './SignUp.module.css';
import { Paper, TextField, Button,} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import axios  from "axios";


function validateServiceProviderName(serviceProviderName){  // checks if the Service Provider Name field is not empty after removing any leading or trailing whitespace.
    const lettersSPNRegex = /^[a-zA-Z ,/'-]*$/; // ensure that the Service Provider Name contains only letters and numbers.
    if(serviceProviderName.trim()===""){
        return "Company / Service Center Name is required.";
    }else if(!lettersSPNRegex.test(serviceProviderName)){
        return "Company / Service Center Name is invalid."; 
    }
};


function validateEmail(email){  //ensure that the email address is in a valid format.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.trim()===""){
        return "Email is required.";
    }else if (!emailRegex.test(email)){
        return "Email is invalid.";
    }
};

function validateRegNo(regNo){  // checks if the Reg No field is not empty after removing any leading or trailing whitespace.
    const lettersRNRegex = /^[a-zA-Z0-9]*$/; // ensure that the Reg No contains only letters and numbers.
    if(regNo.trim()===""){
        return "Reg No is required.";
    }else if(!lettersRNRegex.test(regNo)){
        return "Reg No is invalid."; 
    }
};

function validateVerificationCode(verificationCode){
    const numbersRegex = /^[0-9]{6}$/;
    if(verificationCode.trim()===""){
        return "Verification Code is required.";
    }else if(!numbersRegex.test(verificationCode)){
        return "Verification Code should be a single digit.";
    }
}

const SignUp = () => {

    const [serviceProviderName, setServiceProviderName] =useState("");
    const [serviceProviderNameError, setServiceProviderNameError] = useState(null);
    const handleServiceProviderNameChange = (event) => {
        const value = event.target.value;
        setServiceProviderName(value);
        setServiceProviderNameError(validateServiceProviderName(value));
      };

    const [email, setEmail] =useState("");
    const [emailError, setEmailError] = useState(null);
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setEmailError(validateEmail(value));
      };

    const [regNo, setRegNo] =useState("");
    const [regNoError, setRegNoError] = useState(null);
    const handleRegNoChange = (event) => {
        const value = event.target.value;
        setRegNo(value);
        setRegNoError(validateRegNo(value));
      };

    const [verificationCode, setVerificationCode] = useState("");
    const [verificationCodeError, setVerificationCodeError] = useState(null);
    const handleVerificationCodeChange = (event) => {
        const value = event.target.value;
        setVerificationCode(verificationCode);
        setVerificationCodeError(validateVerificationCode(value));
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {setOpen(true);}; //Opening popup messages.
    const handleClose = () => {setOpen(false);}; //Closing the popup messages.
 
    
    function sendSignUpDetails(e){
        e.preventDefault();
        
        const newSignUpDetails={  //To parsing data to backend.
            
            serviceProviderName,
            email,
            regNo,
            verificationCode
        }
         
        axios.post("http://localhost:8070/SignUpDetails/add",newSignUpDetails).then((response)=>{
            console.log(response.data);    
            alert("Sign Up Details Added")
            handleClickOpen();
        }).catch((err)=>{
            console.log(err);
            alert(err)  
        })

        
    }

    const handleVerifyAccount = () => {
        if (!verificationCodeError) {
          // Make an API call to verify the account with the entered OTP code
          axios
            .post("http://localhost:8070/SignUpDetails/verify-account", {
              enteredOTP: verificationCode, // Use the correct key name (enteredOTP) in the request body
            })
            .then((response) => {
              console.log(response);
              alert("Verified Registration Number");
              // Show a success message to the user
             
            })
            .catch((error) => {
              // Show an error message to the user
              console.log(error);
            });
        }
      };
   
    
    return (
        <div className={styles.signUpContainer}>

            

        <Paper elevation={6} className={styles.signUppaperDiv}>
            <div className={styles.signUpTitle}>
                <h1>Sign Up Details</h1>
            </div>
            
            <div>
                <div className={styles.signUpBody}>

                
                    <div className={styles.signUpBodyTextbox}>
                        <TextField required="outlined-required" label="Company / Service Center Name" sx={{ width: '100vw' }} id="serviceProviderName"
                            onChange={handleServiceProviderNameChange} error={Boolean(serviceProviderNameError)} 
                            helperText={serviceProviderNameError}/>

                    </div>
                    
                    <div className={styles.signUpBodyTextbox}>
                        <TextField required="outlined-required" label="Email" variant="outlined" type="email" sx={{ width: '100vw' }} id="email"
                            onChange={handleEmailChange} error={Boolean(emailError)}
                            helperText={emailError}/>

                    </div>
                    
                    <div className={styles.signUpBodyTextbox}>
                        <TextField required="outlined-required" label="Business Registration No" variant="outlined" sx={{ width: '100vw' }} id="regNo"
                        onChange={handleRegNoChange} error={Boolean(regNoError)}
                        helperText={regNoError}/>

                    </div>

                    <div className={styles.signUpButton}>
                            <Button variant="contained" type="submit"  sx={{mr:'10px'}} onClick={sendSignUpDetails} 
                            // disabled={(serviceProviderName && email && regNo && verificationCode )}
                            >Send</Button> 
                            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Please wait until we verify your details.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose} >OK</Button>  
                                </DialogActions>
                            </Dialog>
                    </div>.
                        
                    <div className={styles.signUpBodyTextbox}>
                        <TextField label="Verification Code" variant="outlined" sx={{ width: '100vw' }} id="verificationCode" onChange={handleVerificationCodeChange} error={Boolean(verificationCodeError)}
                        helperText={verificationCodeError}/>
                    </div>
                    
                    <div className={styles.signUpButton}>
                        
                        
                        <Button variant="contained" sx={{mr:'10px'}} 
                        // disabled={!(serviceProviderName && email && regNo && verificationCode )}
                        onClick={handleVerifyAccount} >Next</Button>
                        
                            
                    
                    </div>        
                    
                    

                </div>


            </div>
        </Paper>
    </div>

)
}
export default SignUp;

