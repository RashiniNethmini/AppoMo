import React, { useState } from "react";
import styles from './Reg.module.css';
import { Paper, TextField, RadioGroup, Radio, FormControlLabel, Button,Avatar, IconButton, InputAdornment, Typography, FormHelperText} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import axios  from "axios";
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function validateUsername(username){
    
    const lengthURegex = /^.{3,16}$/; // ensure that the username is between 3 and 16 characters long.
    const contentRegex = /^[a-zA-Z0-9._-]*$/; // ensure that the username contains only letters, numbers, underscores, or hyphens.
    
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
    const lettersSPNRegex = /^[a-zA-Z. ,/'-]*$/; // ensure that the Service Provider Name contains only letters and numbers.
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
    const lettersCEORegex = /^[a-zA-Z. ]*$/; // ensure that the CEO Name contains only letters.
    if(!lettersCEORegex.test(ceoName)){
        return "CEO Name is invalid."; 
    }
};
// function validateRegNo(regNo){  // checks if the Reg No field is not empty after removing any leading or trailing whitespace.
//     const lettersRNRegex = /^[a-zA-Z0-9]*$/; // ensure that the Reg No contains only letters and numbers.
//     if(regNo.trim()===""){
//         return "Reg No is required.";
//     }else if(!lettersRNRegex.test(regNo)){
//         return "Reg No is invalid."; 
//     }
// };



export const Reg = (props) => {

    const {serviceProviderName} = useParams();
    const {email} = useParams();
    const {regNo} = useParams();

    
    const [providerType, setProviderType] = useState('');
    const handleRadioChange = (event) => {
        setProviderType(event.target.value);
      };


    
    const [logo, setLogo] = useState("");
    const handleLogoUpload = (event) => {
        const logoFile = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];
          setLogo(base64String);
        };
        reader.readAsDataURL(logoFile);
    };

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

    // const [serviceProviderName, setServiceProviderName] =useState("");
    // const [serviceProviderNameError, setServiceProviderNameError] = useState(null);
    // const handleServiceProviderNameChange = (event) => {
    //     const value = event.target.value;
    //     setServiceProviderName(value);
    //     setServiceProviderNameError(validateServiceProviderName(value));
    //   };

    const [address, setAddress] =useState("");
    const [addressError, setAddressError] = useState(null);
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
        setAddressError(validateAddress(value));
      };

    // const [email, setEmail] =useState("");
    // const [emailError, setEmailError] = useState(null);
    // const handleEmailChange = (event) => {
    //     const value = event.target.value;
    //     setEmail(value);
    //     setEmailError(validateEmail(value));
    //   };

    const [ceoName, setCEOName] =useState("");
    const [ceoNameError, setCEONameError] = useState(null);
    const handleCEONameChange = (event) => {
        const value = event.target.value;
        setCEOName(value);
        setCEONameError(validateCEOName(value));
      };

    // const [regNo, setRegNo] =useState("");
    // const [regNoError, setRegNoError] = useState(null);
    // const handleRegNoChange = (event) => {
    //     const value = event.target.value;
    //     setRegNo(value);
    //     setRegNoError(validateRegNo(value));
    //   };

    

    // const [open, setOpen] = React.useState(false);
    // const handleClickOpen = () => {setOpen(true);}; //Opening popup messages.
    // const handleClose = () => {setOpen(false);}; //Closing the popup messages.
    const navigate = useNavigate();
  
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
            // regNo,
           
            

        }
        
        
        
        axios.post("http://localhost:8070/serviceprovider/add",newServiceProvider).then((response)=>{
            console.log(response.data);    
            alert("Service provider Added");
            fetch(`http://localhost:8070/serviceprovider/getid/${username}`, {

            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              const objectId = data[0]._id; // Assuming the response from the backend contains the object ID as "_id"
              console.log(objectId);
              navigate(`/NavBar/${objectId}`,{objectId});
      
            })
            .catch(error => {
              console.log(error);
            });
            
            // handleClickOpen();
        }).catch((err)=>{
            console.log(err);
            alert(err)  
        });
        
        
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
                
                    <Avatar src={`data:image/jpeg;base64,${logo}`} type="file" variant="contained" onClick={handleClickLogo} component="label" display="flex" justify-content="center" align="center"sx={{ width: 100, height: 100 }} id="logo" >
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
                    {/* <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-required" label="Company / Service Center Name" sx={{ width: '100vw' }} id="serviceProviderName"
                            onChange={handleServiceProviderNameChange} error={Boolean(serviceProviderNameError)} 
                            helperText={serviceProviderNameError}/>

                    </div> */}
                    <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-required" label="Address" variant="outlined" sx={{ width: '100vw' }} id="address"
                            onChange={handleAddressChange} error={Boolean(addressError)}
                            helperText={addressError}/>

                    </div>
                    {/* <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-required" label="Email" variant="outlined" type="email" sx={{ width: '100vw' }} id="email"
                            onChange={handleEmailChange} error={Boolean(emailError)}
                            helperText={emailError}/>

                    </div> */}
                    <div className={styles.regBodyTextbox}>
                        <TextField label="CEO Name" variant="outlined" sx={{ width: '100vw' }} id="ceoName"
                        onChange={handleCEONameChange} error={Boolean(ceoNameError)} 
                        helperText={ceoNameError}/>

                    </div>
                    {/* <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-required" label="Business Registration No" variant="outlined" sx={{ width: '100vw' }} id="regNo"
                        onChange={handleRegNoChange} error={Boolean(regNoError)}
                        helperText={regNoError}/>

                    </div> */}
                    

                    <div className={styles.regButton}>
                        <Button variant="contained" sx={{mr:'10px'}}  >Cancel</Button>
                        <div>
                            <Button variant="contained" type="submit"  sx={{mr:'10px'}} 
        
                            onClick={sendRegDetails}>Next</Button> 
                            {/* <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Please wait until we verify your details.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose} >OK</Button>  
                                </DialogActions>
                            </Dialog> */}
                        </div>
                        
                            
                    
                    </div>        
                    
                    

                </div>


            </div>
        </Paper>
    </div>

)
}


