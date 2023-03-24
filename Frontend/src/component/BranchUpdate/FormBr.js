import React, { useState } from "react";
import styles from './FormBr.module.css';
import { Paper, TextField, RadioGroup, Radio, FormControlLabel, Button } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';


function getStyles(days, workingDays, theme) {
    return {
        fontWeight:
            workingDays.indexOf(days) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export default function FormBr(props) {

    const theme = useTheme();
    const [workingDays, setWorkingDays] = React.useState([]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setWorkingDays(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className={styles.mainContainer}>
            <Paper elevation={6} className={styles.paperDiv}>
                <div className={styles.headTitleContainer}>
                    <h1>Enter Branch Details</h1>
                </div>
                <div>
                    <div className={styles.bodyMain}>

                        <div className={styles.bodyTextbox}>
                            <TextField required id="outlined-basic" label="Branch Name " variant="outlined" sx={{ width: '100vw' }} />
                        </div>
                        <div className={styles.bodyTextbox}>
                            <TextField required id="outlined-basic" label="Name of Manager" variant="outlined" sx={{ width: '100vw' }} />

                        </div>
                        <div className={styles.bodyTextbox}>
                            <TextField required id="outlined-basic" label="Contact No" variant="outlined" sx={{ width: '100vw' }} />

                        </div>

                        <div className={styles.bodyTextbox}>
                            <TextField required id="outlined-basic" label="Address" variant="outlined" sx={{ width: '100vw' }} />

                        </div>
                        <div className={styles.bodyTextbox}>
                            <TextField required id="outlined-basic" label="Email" variant="outlined" sx={{ width: '100vw' }} />

                        </div>
                        <div className={styles.bodyTextbox}>
                            <TextField required id="outlined-basic" label="No. of Appointments Per Hour" variant="outlined" sx={{ width: '100vw' }} />

                        </div>
                        <div className={styles.bodyTextbox}>
                            <TextField required id="outlined-basic" label="Working Hours" placeholder="e.g: 9 a.m. - 5 p.m." variant="outlined" sx={{ width: '100vw' }} />

                        </div>
                        <div className={styles.bodyTextbox} >
                            <FormControl sx={{ maxWidth:{xs:'300px',sm:'400px',md:'900px', lg:'1000px',  width: '69vw', margin: '5px' }  }} >
                                <InputLabel id="demo-multiple-chip-label">Working Days</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={workingDays}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="workingDays" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}

                                >
                                    {days.map((days) => (
                                        <MenuItem
                                            key={days}
                                            value={days}
                                            style={getStyles(days, workingDays, theme)}
                                        >
                                            {days}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </div>
                       
                            


                            <div className={styles.buttonLast}>
                                <Button variant="contained" sx={{ mr: '10px' }}>Skip for now</Button>
                                <Button variant="contained" sx={{ mr: '10px' }}>Done</Button>
                            </div>


                    </div>

                </div>

            </Paper>
        </div>

    )
}