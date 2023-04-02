import React, { useState } from "react";
import styles from './FPw.module.css';
import {Paper, TextField, Button, Link} from "@mui/material";
 
export default function Fpw() {

    return (
        <div className={styles.FPwContainer}>
            <Paper elevation={6} className={styles.pDiv}>
                <div className={styles.FPwTitle}>
                    <h1>Forgot your password?</h1>
                </div>
                <div>
                    <div>
                        <p>Enter your email and we'll send you a link to reset your password</p>
                    </div>
                    <div className={styles.FTextbox}>
                        <TextField required id="outlined-required" label="Email"  type="email" variant="outlined" sx={{ width: '100vw' }} />
                    </div>
                    <div className={styles.resetPwB}>
                        <Button variant="contained" sx={{mr:'10px'}}>Reset Password</Button>
                    </div>
                    <div className={styles.goBack}>
                        
                        <Link href="#"> GO BACK</Link>
                    </div>
                </div>
            </Paper>
        </div>




    )


}