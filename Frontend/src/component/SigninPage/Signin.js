import React, {useState} from "react";
import styles from './Signin.module.css';
import { Paper, TextField, Button, Link} from "@mui/material";
import { maxWidth } from "@mui/system";
import GoogleButton from 'react-google-button';

export const Signin = (props) => {
   
       

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
                        <TextField required id="outlined-required" label="Password" variant="outlined" sx={{ width: '100vw' }} />
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
                        <div>
                            <p>Not Registered?</p>
                        </div>
                        <div>
                            <Link href="#">Register Now</Link>
                        </div>
                        
                        
                    </div>  
                    <div className={styles.GButton}>
                        <GoogleButton onClick={() => { console.log('Google button clicked')}}/>  
                    </div>
                </div>
            </div>
            
            
    
            
        </Paper>
    </div>
    
)
}