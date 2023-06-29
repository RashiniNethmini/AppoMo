import React from 'react';
import Button from '@mui/material/Button';
import {Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function FirstPage() {
  const [openn, setOpenn] = React.useState(false);

  const handleClickOpen = () => {
    setOpenn(true);
  };

    const handleOnClose = () => {
      setOpenn(false);
    };
  return (
    <div style={{display:'flex', flexDirection: 'row-reverse',marginTop:20}}>

        <div style={{marginRight:50}}>
        <Link to='/Admin'>
        <Button variant="contained" size="large">
         Admin SignIn
        </Button>
        </Link>
        </div>
        <div style={{marginRight:50}}>
        <Link to='/SignUp'><Button variant="contained" size="large">
         Sign Up
        </Button></Link>
        </div>
        <div style={{marginRight:50}}>
        <Button variant="contained" size="large" onClick={handleClickOpen}>
         Sign In
        </Button>
        <Dialog open={openn} onClose={handleOnClose}>
       

              <DialogActions>
                <div style={{marginRight:50}}>
         <Link to='/Signin'><Button variant="outlined" size="large">
          Company ?
        </Button></Link>
        </div>
        <div>
        <Link to='/BranchSignin'><Button variant="outlined" size="large">
          Branch ?
        </Button></Link>
        </div>
              </DialogActions>
         </Dialog>



        </div>
        
        
        
      </div>
  )
}
