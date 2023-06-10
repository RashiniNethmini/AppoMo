import React,{useState,useEffect} from 'react';
import axios from 'axios';
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


  export default function CollapsibleTable() {
    const [open, setOpen] = React.useState(false);
    const [data,setData]=useState("");
  

    const [groupedData, setGroupedData] = useState([]);

    useEffect(() => {
      fetchGroupedData();
    }, []);
  
    const fetchGroupedData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/Appointments/groupedData'); // Replace with your backend route
        setGroupedData(response.data);
      } catch (error) {
        console.error(error);
      }
    };





    return (
     
      <TableContainer component={Paper} style={{marginTop:'20px'}}>
       
 
     
        
        
        {groupedData.map((group) => (
          <Table aria-label="collapsible table">
          
              <TableHead>
                <TableRow >
                
                  <TableCell colSpan="2" >
                  <Typography variant="h6" >
                  {group._id}
                  </Typography>
                  </TableCell>
                  
                </TableRow>
              </TableHead>
            
              <TableBody>
              {group.details.map((a) => (
            <React.Fragment>
            <TableRow >
              
              <TableCell component="th" scope="row">
              {a.Time} &nbsp;&nbsp;&nbsp;No {a.AptNumber}
              </TableCell>
              
              <TableCell align="right">{a.Name}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{a.ContactNo}
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
                  {/* Appointment {id} */}
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      
                      <TableBody>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell> {a.Name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Contact No</TableCell>
                        <TableCell> {a.ContactNo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Invoice No</TableCell>
                        <TableCell>   {a.InvoiceNo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>{a.Product}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Issue</TableCell>
                        <TableCell>{a.IssueInBrief}</TableCell>
                      </TableRow>
                      {/* <TableRow>
                        <TableCell>Voice Message</TableCell>
                        <TableCell><audio src={voiceSrc} controls></audio></TableCell>
                      </TableRow> */}
                        
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
              
            </TableRow>
          </React.Fragment>
          ))}
              </TableBody>
              
              </Table>
        ))}
      
    
      </TableContainer>

      
    );
  }
  

