import React, {useState} from "react";
import styles from './Signin.module.css';
import { Paper, TextField, Chip, Button } from "@mui/material";
import { maxWidth } from "@mui/system";
import GoogleButton from 'react-google-button';

export const Signin = (props) => {
    const handleClick = () => {
        console.info('You clicked the Chip.');
      };
    
       

    return(
        <div className={styles.regContainer}>
            <Paper elevation={6} className={styles.papDiv}>
                <div className={styles.regTitle}>
                    <h1>Sign in to AppoMo</h1>
                </div>
                
                <div className={styles.regDiv}>
                    <div className={styles.regBodyText}>
                        <TextField id="outlined-basic" label="Username" variant="outlined" />
                    </div>
                    <div className={styles.regBodyText}>
                        <TextField id="outlined-basic" label="Password" variant="outlined" />
                    </div> 
                    <div className={styles.signButton}>
                        <Chip label="Sign in" onClick={handleClick}/>
                    </div>
                    <div className={styles.regFPw}>
                        <p>Forgot Password?</p>
                    </div> 

                    <div className={styles.regOR}>
                        <p>OR</p>
                    </div> 

                    <div className={styles.regNot}>
                        <p>Not Registered? Register Now</p>
                    </div>  
                    
                    <GoogleButton onClick={() => { console.log('Google button clicked')}}/>  
                    
                </div>
                
                
                
        
                
            </Paper>
        </div>
        
    )
}