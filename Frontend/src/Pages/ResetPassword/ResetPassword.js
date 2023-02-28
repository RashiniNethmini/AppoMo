import React from 'react';
import './resetPassword.css';
import {Box,IconButton,OutlinedInput,InputAdornment,Stack, Button,Paper} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NavBar from '../../component/NavBar/NavBar';



export default function ResetPassword() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      {/* <div>
    <NavBar/>
    </div> */}
    <div className='resetPassword'>
   
      <Paper elevation={6} classname="resetPaper" >
          
        <div className='resetForm'>


          <div className='resetElement'>
            <label>Enter Current Password &nbsp;</label>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
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
                }
            />
                      
          </div>
          <br/>


          <div>
            <label>Enter New Password &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
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
              }
            />
            
          </div>
          <br/>



          <div>
            <label>Re-enter New Password &nbsp;</label>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
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
              }
            />
            
          </div>
          <br/>



            <div>
              
              <Stack spacing={2} direction="row">
                  <Button variant="contained" className='resetbutton' style={{backgroundColor:"#084C4F"}}>CHANGE PASSWORD</Button>
                  <Button variant="contained" className='resetbutton'>CANCEL</Button>
              </Stack>
            </div>
          
        </div> 
        
      
{/*      
    </Box> */}
    </Paper>
    </div>
    </div>
  );
}

