import React, { useState } from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import './BrUpdate.css'
import { Typography } from "@mui/material";
import { margin } from "@mui/system";
import { AlignHorizontalLeft } from "@mui/icons-material";


export default function BranchForm() {
    const [time, setTime] = useState("")


    const changeTime = (e) => {
      setTime(e.target.value || "08:00")
    }

return(

    <div className="BranchDetails">
    <h1>Branch Details</h1>

  <div className="outer">
<div className="firstLine">
    <Typography sx={{pr:{xs:3,sm:5,md:7,lg:6,xlg:9}}}>
     Weekdays Open

    </Typography>
  
   
    <Stack component="form" noValidate spacing={3}>
    
 
  <div>
 
  <Stack direction="row" spacing={2}>
    
  <TextField
          id="outlined-read-only-input"
          label=""
          variant="filled"
          type="text"
          defaultValue="Weekdays Open"
          InputProps={{
            readOnly: true,
          }}
        />
  <TextField
        id="weekdaysfrom"
        label="From"
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
       <TextField
        id="weekdaysto"
        label="To"
        type="time"
        defaultValue="05:00"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
      </Stack>

  </div>
  <div className="secondLine">
    <Typography sx={{pr:{xs:3,sm:5,md:7,lg:6,xlg:9}} }>

     Weekends Open

    </Typography></div>
  <div>
  
  <Stack direction="row" spacing={2}>
  <TextField
        id="weekdaysfrom"
        label="From"
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
       <TextField
        id="weekdaysto"
        label="To"
        type="time"
        defaultValue="05:00"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
      </Stack>

  </div>

  </Stack>


</div>
  </div>
  </div>

)

}