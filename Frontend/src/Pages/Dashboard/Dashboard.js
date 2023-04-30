import React from 'react';
import './dashboard.css';
import { AppointmentList } from '../../AppointmentList';
import {Paper} from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';




    const Appointment = ({id,name,contactNumber,invoice,product,issue,voiceSrc}) => {
      const [open, setOpen] = React.useState(false);
    return (
      
      <React.Fragment>
        <TableRow >
          
          <TableCell component="th" scope="row">
          Appointment {id}
           
          </TableCell>
          <TableCell align="right">{name}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{contactNumber}
          <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton></TableCell>
          
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6">
               Appointment {id}
                </Typography>
                <Table size="small" aria-label="purchases">
                  
                  <TableBody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell> {name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Contact No</TableCell>
                    <TableCell> {contactNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Invoice No</TableCell>
                    <TableCell>   {invoice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>{product}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Issue</TableCell>
                    <TableCell>{issue}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Voice Message</TableCell>
                    <TableCell><audio src={voiceSrc} controls></audio></TableCell>
                  </TableRow>
                    
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
          
        </TableRow>
      </React.Fragment>
    );
  }





  
  export default function CollapsibleTable() {
    return (
     
      <TableContainer component={Paper} style={{marginTop:'20px'}}>

     

        <Table aria-label="collapsible table">
          <TableHead >
            <TableRow >
            
              <TableCell colSpan="2" >
              <Typography variant="h6" >
              Today
              </Typography></TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
        
        
            {AppointmentList.map(Appointment)}
     
           
          </TableBody>
        </Table>
      </TableContainer>

      
    );
  }
  

