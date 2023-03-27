import React, { useState } from "react";
import styles from './Termination.module.css';
import { Paper, TextField, RadioGroup, Radio, FormControlLabel,Button } from "@mui/material";

function Termination(){
    return(
        <div className={styles.mainContainer}>
            <Paper elevation={6} className={styles.paperDiv}>
            <div className={styles.bodyMain}>
                        <div className={styles.radioBoxContainer}>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" >
                                <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
                                <FormControlLabel value="NotCompleted" control={<Radio />} label="Not Completed" />
                            </RadioGroup>
                        </div>
                        <div className={styles.buttonMain}>
                            <Button variant="contained" sx={{mr:'10px'}}>Send message to the customer</Button>
                        </div>
                        <div className={styles.bodyTextbox}>
                            <TextField id="outlined-basic" label="Total Amount : LKR " variant="outlined" sx={{ width: '100vw' }} />

                        </div>                       
                        <div className={styles.buttonMain}>
                            <Button variant="contained" sx={{mr:'10px'}}>Generate Invoice</Button>
                        </div>
                    </div>
            </Paper>
      </div>      

    )
}
export default Termination;