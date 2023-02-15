import React, { useState } from "react";
import styles from './Reg.module.css';
import { Paper, TextField, RadioGroup, Radio, FormControlLabel,Button } from "@mui/material";
import { maxWidth } from "@mui/system";


export const Reg = (props) => {
    
    return (
        <div className={styles.mainContainer}>
            <Paper elevation={6} className={styles.paperDiv}>
                <div className={styles.headTitleContainer}>
                    <h1>Registration Form</h1>
                </div>


                <div>
                    <div className={styles.bodyMain}>
                        <div className={styles.radioBoxContainer}>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" >
                                <FormControlLabel value="Company" control={<Radio />} label="Company" />
                                <FormControlLabel value="Service Center" control={<Radio />} label="Service Center" />
                            </RadioGroup>
                        </div>

                        <div className={styles.bodyTextbox}>
                            <TextField id="outlined-basic" label="Username" variant="outlined" sx={{ width: '100vw' }} />

                        </div>
                        <div className={styles.bodyTextbox}>
                            <TextField id="outlined-basic" label="Password" variant="outlined" sx={{ width: '100vw' }} />

                        </div>
                        <div className={styles.bodyTextbox}>
                            <TextField id="outlined-basic" label="Company / Service Center Name" variant="outlined" sx={{ width: '100vw' }} />

                        </div>
                        <div className={styles.bodyTextbox}>
                            <TextField id="outlined-basic" label="Address" variant="outlined" sx={{ width: '100vw' }} />

                        </div>
                        <div className={styles.bodyTextbox}>
                            <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ width: '100vw' }} />

                        </div>
                        <div className={styles.bodyTextbox}>
                            <TextField id="outlined-basic" label="CEO Name" variant="outlined" sx={{ width: '100vw' }} />

                        </div>
                        <div className={styles.bodyTextbox}>
                            <TextField id="outlined-basic" label="Registration No" variant="outlined" sx={{ width: '100vw' }} />

                        </div>

                        <div className={styles.buttonMain}>
                            <Button variant="contained" sx={{mr:'10px'}}>Cancel</Button>
                            <Button variant="contained" sx={{mr:'10px'}}>Next</Button>
                        </div>
                        

                    </div>


                </div>
            </Paper>
        </div>

    )
}