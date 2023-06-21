import React, { useState } from "react";
import styles from './Reg.module.css';
import { Paper, TextField, RadioGroup, Radio, FormControlLabel, Button, Stack, Avatar, IconButton, InputAdornment, Typography, FormHelperText} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import axios  from "axios";




function validateUsername(username){
    
    const lengthURegex = /^.{3,16}$/; // ensure that the username is between 3 and 16 characters long.
    const contentRegex = /^[a-zA-Z0-9_-]*$/; // ensure that the username contains only letters, numbers, underscores, or hyphens.
    
    if(username.trim()===""){
        return "Username is required.";
    }else if (!lengthURegex.test(username)){
        return "Username must be in between 3 and 16 characters long.";
    } else if (!contentRegex.test(username)){
        return "Username must contain only letters, numbers, underscores, or hyphens.";
    }
};
function validatePassword(password) { 
    
    const uppercaseRegex = /^(?=.*[A-Z])/; // ensure that the password contains at least one uppercase letter.
    const lowercaseRegex = /^(?=.*[a-z])/; // ensure that the password contains at least one lowercase letter.
    const numberRegex = /^(?=.*\d)/; // ensure that the password contains at least one number.
    const specialCharRegex = /^(?=.*[!@#$%&+*^()_])/; // ensure that the password contains at least one of the following symbols: !@#$%&+*^()_.
    const lengthPRegex = /^.{8,}$/; // ensure that the password is at least 8 characters long.
    
    if(password.trim()===""){
        return "Password is required.";
    } else if (!uppercaseRegex.test(password)){
        return "Password must contain at least one uppercase letter.";
    } else if (!lowercaseRegex.test(password)){
        return "Password must contain at least one lowercase letter.";
    } else if (!numberRegex.test(password)){
        return "Password must contain at least one number.";
    } else if (!specialCharRegex.test(password)){
        return "Password must contain at least one of the following symbols: !@#$%&+*^()_.";
    }else if (!lengthPRegex.test(password)){
        return "Password must be at least 8 characters long.";
    }
    
};
function validateServiceProviderName(serviceProviderName){  // checks if the Service Provider Name field is not empty after removing any leading or trailing whitespace.
    const lettersSPNRegex = /^[a-zA-Z ,/'-]*$/; // ensure that the Service Provider Name contains only letters and numbers.
    if(serviceProviderName.trim()===""){
        return "Company / Service Center Name is required.";
    }else if(!lettersSPNRegex.test(serviceProviderName)){
        return "Company / Service Center Name is invalid."; 
    }
};

function validateAddress(address){  // checks if the address field is not empty after removing any leading or trailing whitespace.
    const lettersARegex = /^[a-zA-Z0-9. ,/-]*$/; // ensure that the address contains only letters and numbers.
    if(address.trim()===""){
        return "Address is required.";
    }else if(!lettersARegex.test(address)){
        return "Address is invalid."; 
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
function validateCEOName(ceoName){  // checks if the CEOName field is not empty after removing any leading or trailing whitespace.
    const lettersCEORegex = /^[a-zA-Z ]*$/; // ensure that the CEO Name contains only letters.
    if(!lettersCEORegex.test(ceoName)){
        return "CEO Name is invalid."; 
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
// function validateWorkingDates(workingDates){  // checks if the Working Dates field is not empty after removing any leading or trailing whitespace.
//     const lettersWDRegex = /^[a-zA-Z, ]*$/; // ensure that the working dates contain only letters with commas.
//     if(workingDates.trim()===""){
//         return "Reg No is required.";
//     }else if(!lettersWDRegex.test(workingDates)){
//         return "Working Dates are invalid.";
//     }
// }; 
// function validateWorkingHours(workingHours){  // checks if the Working Hours field is not empty after removing any leading or trailing whitespace.
//     const lettersWHRegex = /^[0-9]*$/; //ensure that the no of appoinments contain only numbers.
//     if(workingHours.trim()===""){
//         return "Reg No is required.";
//     } else if(!lettersWHRegex.test(workingHours)){
//         return "Working Hours are invalid.";
//     }
// };
// function validateNoOfAppoinments(noOfAppoinments){  // checks if the No of appoinments per day field is not empty after removing any leading or trailing whitespace.
//     const numbersRegex = /^[0-9]*$/; //ensure that the no of appoinments contain only numbers.
//     if(noOfAppoinments.trim()===""){
//         return "Reg No is required.";
//     }else if(!numbersRegex.test(noOfAppoinments)){
//         return "No of appoinments per day is invalid.";
//     }
// };



export const Reg = (props) => {

    
    const [providerType, setProviderType] = useState('');
    const handleRadioChange = (event) => {
        setProviderType(event.target.value);
      };


    
    const [logo, setLogo] =useState("");
    const handleLogoUpload = (event) => {
        const logo = event.target.files[0];
        setLogo (URL.createObjectURL(logo));
    }
    const handleClickLogo =() => {
        document.getElementById('fileInput').click();
    };

    const [username, setUsername] =useState("");
    const [usernameError, setUsernameError] = useState(null);
    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        setUsernameError(validateUsername(value));
      };
    
    const [password, setPassword] =useState("");
    const [passwordError, setPasswordError] = useState(null);
    const handlePasswordChange = (event) => {
      const value = event.target.value;
      setPassword(value);
      setPasswordError(validatePassword(value));
    };
    const [showPassword, setShowPassword] = React.useState(false); // Password visibility icon.
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [serviceProviderName, setServiceProviderName] =useState("");
    const [serviceProviderNameError, setServiceProviderNameError] = useState(null);
    const handleServiceProviderNameChange = (event) => {
        const value = event.target.value;
        setServiceProviderName(value);
        setServiceProviderNameError(validateServiceProviderName(value));
      };

    const [address, setAddress] =useState("");
    const [addressError, setAddressError] = useState(null);
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
        setAddressError(validateAddress(value));
      };

    const [email, setEmail] =useState("");
    const [emailError, setEmailError] = useState(null);
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setEmailError(validateEmail(value));
      };

    const [ceoName, setCEOName] =useState("");
    const [ceoNameError, setCEONameError] = useState(null);
    const handleCEONameChange = (event) => {
        const value = event.target.value;
        setCEOName(value);
        setCEONameError(validateCEOName(value));
      };

    const [regNo, setRegNo] =useState("");
    const [regNoError, setRegNoError] = useState(null);
    const handleRegNoChange = (event) => {
        const value = event.target.value;
        setRegNo(value);
        setRegNoError(validateRegNo(value));
      };

    // const [workingDates, setWorkingDates] =useState("");
    // const [workingDatesError, setWorkingDatesError] = useState(null);
    // const handleWorkingDatesChange = (event) => {
    //     const value = event.target.value;
    //     setWorkingDates(value);
    //     setWorkingDatesError(validateWorkingDates(value));
    //   };

    // const [workingHours, setWorkingHours] = useState("");
    // const [workingHoursError, setWorkingHoursError] = useState(null);
    // const handleWorkingHoursChange = (event) => {
    //     const value = event.target.value;
    //     setWorkingHours(value);
    //     setWorkingHoursError(validateWorkingHours(value));
    //   };

    // const [noOfAppoinments, setNoOfAppoinments] = useState("");
    // const [noOfAppoinmentsError, setNoOfAppoinmentsError] = useState(null);
    // const handleNoOfAppoinmentsChange = (event) => {
    //     const value = event.target.value;
    //     setNoOfAppoinments(value);
    //     setNoOfAppoinmentsError(validateNoOfAppoinments(value));
    // };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {setOpen(true);}; //Opening popup messages.
    const handleClose = () => {setOpen(false);}; //Closing the popup messages.
    // const CombinedOnClick = ()=> {
    //     handleClickOpen();
        
    //     sendRegDetails();
    // };
    
    
    function sendRegDetails(e){
        e.preventDefault();
        
        
        const newServiceProvider={  //To parsing data to backend.
            providerType,
            logo,
            username,
            password,
            serviceProviderName,
            address,
            email,
            ceoName,
            regNo,
            // workingDates,
            // workingHours,
            // noOfAppoinments,
            

        }
        
        
        // console.log(newServiceProvider);
        axios.post("http://localhost:8070/serviceprovider/add",newServiceProvider).then(()=>{
            alert("Service provider Added")
            handleClickOpen();
        }).catch((err)=>{
            alert(err)  
        })
    }

    
   
    
    return (
        <div className={styles.regContainer}>

            

        <Paper elevation={6} className={styles.regpaperDiv}>
            <div className={styles.regTitle}>
                <h1>Registration Form</h1>
            </div>
            
            <div className={styles.combined}>
                <div className={styles.regBodyRadioBox} 
                // required error={radioError}
                >
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" onChange={handleRadioChange} value={providerType} name="row-radio-buttons-group" required id="providerType" 
                    
                    >
                        <FormControlLabel value="Company" 
                        //  onClick={setProviderType(true)} 
                         control={<Radio required />} label="Company" 
                        
                        />
                        <FormControlLabel value="Service Center" 
                        //  onClick={setProviderType(false)}
                          control={<Radio required />} label="Service Center" 
                        
                        />
                    </RadioGroup>
                    {/* {radioError && <FormHelperText>Please select an option</FormHelperText>} */}
                </div>


                <div className={styles.reglogoB}>
                
                    <Avatar src={logo} type="file" variant="contained" onClick={handleClickLogo} component="label" display="flex" justify-content="center" align="center"sx={{ width: 100, height: 100 }} id="logo" >
                    <p className={styles.regUlogo}>Upload Logo</p>
                    <input hidden accept="image/*" type="file" onChange={handleLogoUpload}/>
                    </Avatar>
                
                </div>
            </div>
            

            <div>
                <div className={styles.regBody}>

                
                    
                    <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-required" label="Username" sx={{ width: '100vw' }} id="username"
                            onChange={handleUsernameChange} error={Boolean(usernameError)}
                            helperText={usernameError}/>

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-adornment-password" label="Password" type={showPassword ? 'text' : 'password'} sx={{ width: '100vw' }} id="password"
                            onChange={handlePasswordChange} error={Boolean(passwordError)}
                            helperText={passwordError}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                         
                        />

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-required" label="Company / Service Center Name" sx={{ width: '100vw' }} id="serviceProviderName"
                            onChange={handleServiceProviderNameChange} error={Boolean(serviceProviderNameError)} 
                            helperText={serviceProviderNameError}/>

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-required" label="Address" variant="outlined" sx={{ width: '100vw' }} id="address"
                            onChange={handleAddressChange} error={Boolean(addressError)}
                            helperText={addressError}/>

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-required" label="Email" variant="outlined" type="email" sx={{ width: '100vw' }} id="email"
                            onChange={handleEmailChange} error={Boolean(emailError)}
                            helperText={emailError}/>

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField label="CEO Name" variant="outlined" sx={{ width: '100vw' }} id="ceoName"
                        onChange={handleCEONameChange} error={Boolean(ceoNameError)} 
                        helperText={ceoNameError}/>

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-required" label="Business Registration No" variant="outlined" sx={{ width: '100vw' }} id="regNo"
                        onChange={handleRegNoChange} error={Boolean(regNoError)}
                        helperText={regNoError}/>

                    </div>
                    {/* <div className={styles.regBodyTextbox}>
                        <TextField label="Working dates" required="outlined" sx={{ width: '100vw' }} id="workingDates"
                        onChange={handleWorkingDatesChange} error={Boolean(workingDatesError)}
                        helperText={workingDatesError}/>

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField label="Working hours per day" required="outlined" sx={{ width: '100vw' }} id="workingHours"
                        onChange={handleWorkingHoursChange} error={Boolean(workingHoursError)}
                        helperText={workingHoursError}/>

                    </div> */}
                    {/* <div className={styles.regBodyTextbox}>
                        <TextField label="Reparing products" sx={{ width: '100vw' }} id="ReparingProducts"
                        onChange={handleProduct} 
                        />

                    </div> */} 

                    <div className={styles.regButton}>
                        <Button variant="contained" sx={{mr:'10px'}} type="submit" >Cancel</Button>
                        <div>
                            <Button variant="contained" type="submit"  sx={{mr:'10px'}} 
                            // onClick={CombinedOnClick} 
                            onClick={sendRegDetails}>Next</Button> 
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
                        </div>
                        
                            
                    
                    </div>        
                    
                    

                </div>


            </div>
        </Paper>
    </div>

)
}


