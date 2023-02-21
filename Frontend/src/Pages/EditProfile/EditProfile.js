import React from 'react';
import './editprofile.css';
import {Avatar,Stack,TextField,Paper,Button} from '@mui/material';


export default function EditProfile() {
  return (
    <div className='edit'>
      <Paper elevation={6} className="editPaper">
        <div classname="editform" style={{padding:"10px"}}>
            <div className='editdetailslogo' >
                <Stack direction="row" spacing={2}>
                  Change Logo&nbsp;
                  <Avatar alt="Remy Sharp" src="" />
              
                </Stack>
            </div> 
            
           
              <div  className='editdetails'>
                <label>Company Name&nbsp;</label><TextField size='small'   />
              </div><br/>
              <div className='editdetails'>
              <label>Address&nbsp;</label><TextField size='small' />
              </div> <br/>
              <div  className='editdetails'>
                <label>Email&nbsp;</label><TextField size='small'  />
              </div><br/>
              <div  className='editdetails'>
                <label>CEO Name&nbsp;</label><TextField size='small' />
              </div><br/>
              <div  className='editdetails'>
                <label>Weekdays-Open&nbsp;</label><TextField size='small' />&nbsp;<TextField size='small' /> &nbsp;&nbsp;&nbsp;&nbsp;
                <label>Weekends-Open&nbsp;</label><TextField size='small' />&nbsp;<TextField size='small' />
              </div><br/>
              
              <div  className='editdetails'>
                <label>No of Appointments per hour&nbsp;</label><TextField size='small' />
              </div><br/>
             
              <div  className='editdetailsButton'>
                <Stack spacing={2} direction="row">
                      <Button variant="contained" className='editbutton'>SAVE CHANGES</Button>
                      <Button variant="contained">CANCEL</Button>

                </Stack>
       
              </div>

            </div>
      </Paper>
  </div>
  

  );
}
