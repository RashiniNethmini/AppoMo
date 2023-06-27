import React from 'react';
import Button from '@mui/material/Button';
import {Link } from 'react-router-dom'

export default function FirstPage() {
  return (
    <div style={{display:'flex', flexDirection: 'row-reverse',marginTop:20}}>

        <div style={{marginRight:50}}>
        {/* <Link to='/TwoSignIn'> */}
        <Button variant="contained" size="large">
         Admin SignIn
        </Button>
        {/* </Link> */}
        </div>
        <div style={{marginRight:50}}>
        <Link to='/Reg'><Button variant="contained" size="large">
         Sign Up
        </Button></Link>
        </div>
        <div style={{marginRight:50}}>
        <Link to='/TwoSignIn'><Button variant="contained" size="large">
         Sign In
        </Button></Link>
        </div>
        
        
        
      </div>
  )
}
