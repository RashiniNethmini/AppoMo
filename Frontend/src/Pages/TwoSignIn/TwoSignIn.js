import React from 'react';
import Button from '@mui/material/Button';
import {Link } from 'react-router-dom'

export default function TwoSignIn() {
  return (
    <div style={{display:'flex', flexDirection: 'row',marginTop:20,justifyContent:'center'}}>
         <div style={{marginRight:50}}>
         <Link to='/Signin'><Button variant="outlined" size="large">
          Company ?
        </Button></Link>
        </div>
        <div>
        <Button variant="outlined" size="large">
          Branch ?
        </Button>
        </div>
      </div>

  )
}
