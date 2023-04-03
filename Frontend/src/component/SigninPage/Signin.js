import React, {useState, useEffect} from "react";
import styles from './Signin.module.css';
import { Paper, TextField, Button, Link,InputAdornment, IconButton} from "@mui/material";
import { maxWidth } from "@mui/system";
import {Visibility, VisibilityOff} from '@mui/icons-material';


export const Signin = (props) => {
   
    const [isSignedIn, setIsSignedIn] = useState(false);

    function handleCallbackResponse(response){
        console.log("Encoded JWT ID token: " + response.credential);
   } 
   useEffect(() => {
    if(window.google){
        window.google.accounts.id.initialize({
            client_id: "305172675804-madk45o2f4tr9937pbs05pvpvg8rpii5.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
    
        window.google.accounts.id.renderButton(document.getElementById("signInDiv"), 
            {theme:"outline", size: "large"}); 
    }
   }, []);
   
   
   const [showPassword, setShowPassword] = React.useState(false);
   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleMouseDownPassword = (event) => {
       event.preventDefault();
   };


    return(
        <div className={styles.signContainer}>
        <Paper elevation={6} className={styles.signpapDiv}>
            <div className={styles.signTitle}>
                <h1>Sign in to AppoMo</h1>
            </div>
            <div>
                <div className={styles.signDiv}>
                    <div className={styles.signBodyText}>
                        <TextField required id="outlined-required" label="Username" variant="outlined" sx={{ width: '100vw' }} />
                    </div>
                    <div className={styles.signBodyText}>
                        <TextField required id="outlined-required" label="Password" variant="outlined" type={showPassword ? 'text' : 'password'} sx={{ width: '100vw' }}
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
                          }} />
                    </div> 
                    <div className={styles.signButton}>
                        <Button variant="contained" sx={{mr:'10px'}}>Sign in</Button>
                    </div>
                    <div className={styles.signFPw}>
                        <Link href="#" color="inherit">Forgot Password?</Link>
                    </div> 

                    <div className={styles.signOR}>
                        <p>OR</p>
                    </div> 

                    <div className={styles.signNot}>
                        <p>Not Registered? &nbsp;</p>
                        <Link href="#">Register Now</Link>
                        
                     </div> 
                    <div className={styles.GButton} id="signInDiv"></div> 
                    
                </div>
            </div>
            
            
    
            
        </Paper>
    </div>
    
)
}