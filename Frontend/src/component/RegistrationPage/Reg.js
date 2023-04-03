import React, { useState } from "react";
import styles from './Reg.module.css';
import { Paper, TextField, RadioGroup, Radio, FormControlLabel, Button, Stack, Avatar, IconButton, InputAdornment} from "@mui/material";
import { maxWidth } from "@mui/system";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {Visibility, VisibilityOff} from '@mui/icons-material';
// import axios from "axios";



function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&+*^()_])[A-Za-z\d!@#$%&+*^()_]{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters contain at least one uppercase letter, at least one lowercase letter, at least one number & at least one following symbols: !@#$%&+*^()_';
    }
    return null;
}



export const Reg = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};

    const [password, setPassword] =useState("");
    const [error, setError] = useState(null);
    const handlePasswordChange = (event) => {
      const value = event.target.value;
      setPassword(value);
      setError(validatePassword(value));
    };

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // const [providerType, setProviderType] =useState("");
    const [username, setUsername] =useState("");
    const [logo, setLogo] =useState("");
    const [serviceProviderName, setServiceProviderName] =useState("");
    const [address, setAddress] =useState("");
    const [email, setEmail] =useState("");
    const [ceoName, setCEOName] =useState("");
    const [regNo, setRegNo] =useState("");

    function sendRegDetails(e){
        e.preventDefault();
        
        const newServiceProvider={
            // providerType,
            logo,
            username,
            password,
            serviceProviderName,
            address,
            email,
            ceoName,
            regNo,
            

        }
        console.log(newServiceProvider);
        // axios.post("http://localhost:8070/serviceprovider/add", newServiceProvider).then(()=>{
        //     alert("Service Provider Added")
        // }).catch((err)=>{
        //     alert(err)
        // })
    }

    
    return (
        <div className={styles.regContainer}>

            

        <Paper elevation={6} className={styles.regpaperDiv}>
            <div className={styles.regTitle}>
                <h1>Registration Form</h1>
            </div>
            
            <div className={styles.combined}>
                <div className={styles.regBodyRadioBox}>
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" >
                        <FormControlLabel value="Company" control={<Radio />} label="Company" id="providerType"
                        // onChange={(e)=>{
                        //     setProviderType(e.target.value);
    
                        // }}
                        />
                        <FormControlLabel value="Service Center" control={<Radio />} label="Service Center" id="providerType"
                        // onChange={(e)=>{
                        //     setProviderType(e.target.value);
    
                        // }}
                        />
                    </RadioGroup>
                </div>


                <div className={styles.reglogoB}>
                
                    <Avatar src="./avatar.jpg" variant="contained" component="label" display="flex" justify-content="center" align="center"sx={{ width: 100, height: 100 }}
                        id="logo" 
                    //     onChange={(e)=>{
                    //     setLogo(e.target.value);

                    // }}
                    >
                    <p className={styles.regUlogo}>Upload Logo</p>
                    <input hidden accept="image/*" type="file" 
                    //     onChange={(e)=>{
                    //         setLogo(e.target.files[0]);

                    // }}
                    />
                    
                    </Avatar>
                
                </div>
            </div>
            

            <div>
                <div className={styles.regBody}>

                
                    
                    <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-required" label="Username" sx={{ width: '100vw' }} id="username"
                            onChange={(e)=>{
                                setUsername(e.target.value);
        
                            }}
                        />

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-adornment-password" label="Password" type={showPassword ? 'text' : 'password'} id="password"
                            onChange={handlePasswordChange} error={Boolean(error)}
                      
                            helperText="Password must be at least 8 characters contain at least one uppercase letter, at least one lowercase letter, at least one number & at least one following symbols: !@#$%&+*^()_." sx={{ width: '100vw' }}
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
                        onChange={(e)=>{
                            setServiceProviderName(e.target.value);
    
                        }} />

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-required" label="Address" variant="outlined" sx={{ width: '100vw' }} id="address"
                        onChange={(e)=>{
                            setAddress(e.target.value);
    
                        }}/>

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-required" label="Email" variant="outlined" type="email" sx={{ width: '100vw' }} id="email"
                        onChange={(e)=>{
                            setEmail(e.target.value);
    
                        }}/>

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField label="CEO Name" variant="outlined" sx={{ width: '100vw' }} id="ceoName"
                        onChange={(e)=>{
                            setCEOName(e.target.value);
    
                        }} />

                    </div>
                    <div className={styles.regBodyTextbox}>
                        <TextField required="outlined-required" label="Registration No" variant="outlined" sx={{ width: '100vw' }} id="regNo"
                        onChange={(e)=>{
                            setRegNo(e.target.value);
    
                        }} />

                    </div>

                    <div className={styles.regButton}>
                        <Button variant="contained" sx={{mr:'10px'}} type="submit" onClick={sendRegDetails}>Cancel</Button>
                        <div>
                            <Button variant="contained" type="submit" onClick={handleClickOpen}  sx={{mr:'10px'}}>Next</Button>
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