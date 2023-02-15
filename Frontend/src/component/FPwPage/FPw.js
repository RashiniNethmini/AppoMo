import React, { useState } from "react";
import styles from './FPw.module.css';
import {Paper, TextField} from "@mui/material";

export default function Fpw() {

    return (
        <div className={styles.FPwContainer}>
            <Paper elevation={6} className={styles.pDiv}>
                <div className={styles.FPwTitle}>
                    <h1>Forgot your password?</h1>
                </div>
                <div className={styles.FTextbox}>
                    <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ width: '100vw' }} />
                </div>
                <div>
                    
                </div>
                
            </Paper>
        </div>




    )


}