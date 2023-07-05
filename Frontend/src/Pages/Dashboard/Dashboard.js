import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from './dashboard.css';
import { Button, IconButton, Paper, TextField, Tooltip } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppointmentList } from '../../AppointmentList';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useNavigate } from 'react-router-dom'
import NavBar1 from '../.././component/NavBar1';
import {useParams} from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CollapsibleTable() {
  const {objectId} = useParams();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState("");
  const [openRow, setOpenRow] = useState(null);

  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    fetchGroupedData();
  }, []);

  const fetchGroupedData = async () => {
    try {
      const response = await axios.get('http://localhost:8070/Appointments/groupedData'); // Replace with your backend route

      const fetchedData = response.data;

      const initialCheckboxValues = fetchedData.map(group => group.details.map(a => a.Checked));

      setCheckboxValues(initialCheckboxValues);
      setSubmitButtonsDisabled(initialCheckboxValues);
      setSendButtonClickedOut(initialCheckboxValues);
      setGroupedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [groupedData1, setGroupedData1] = useState([]);

  useEffect(() => {
    fetchGroupedData1();
  }, []);

  const fetchGroupedData1 = async () => {
    try {
      const response1 = await axios.get('http://localhost:8070/Appointments/groupedData1'); // Replace with your backend route


      const fetchedData = response1.data;

      const initialCheckboxValues = fetchedData.map(group => group.details.map(a => a.Checked));

      setCheckboxValuesIn(initialCheckboxValues);
      setSubmitButtonsDisabledIn(initialCheckboxValues);
      setSendButtonClicked(initialCheckboxValues);
      setGroupedData1(response1.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenRow = (index) => {
    if (openRow === index) {
      setOpenRow(null);
    } else {
      setOpenRow(index);
    }
  };

  const [openn, setOpenn] = React.useState(false);

  const handleClickOpen = () => {
    setOpenn(true);
  };

  const handleOnClose = () => {
    setOpenn(false);
  };



  const [checkboxValues, setCheckboxValues] = useState([]);
  const [submitButtonsDisabled, setSubmitButtonsDisabled] = useState([]);
  const [sendButtonClickedOut, setSendButtonClickedOut] = useState([]);
  const [checkboxValuesIn, setCheckboxValuesIn] = useState([]);
  const [submitButtonsDisabledIn, setSubmitButtonsDisabledIn] = useState([]);
  const [sendButtonClicked, setSendButtonClicked] = useState([]);


  const handleCheckboxChange = async (_id, group, row) => {
    const updatedCheckboxValues = [...checkboxValues];
    updatedCheckboxValues[group][row] = !updatedCheckboxValues[group][row];
    setCheckboxValues(updatedCheckboxValues);
    setSubmitButtonsDisabled(updatedCheckboxValues);
    setSendButtonClickedOut(updatedCheckboxValues);

    try {
      const response = await axios.put(`http://localhost:8070/Appointments/update/${_id}`, {
        Checked: updatedCheckboxValues[group][row]
      });
      console.log(response.data);
      // alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating status', error);
      alert('Failed to update status');
    }
  };


  const handleCheckboxChangeIn = async (_id, group, row) => {
    const updatedCheckboxValues = [...checkboxValuesIn];
    updatedCheckboxValues[group][row] = !updatedCheckboxValues[group][row];
    setCheckboxValuesIn(updatedCheckboxValues);
    setSubmitButtonsDisabledIn(updatedCheckboxValues);
    setSendButtonClicked(updatedCheckboxValues);

    try {
      const response = await axios.put(`http://localhost:8070/Appointments/update/${_id}`, {
        Checked: updatedCheckboxValues[group][row]
      });
      console.log(response.data);
      // alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating status', error);
      alert('Failed to update status');
    }
  };


  const navigate = useNavigate();


  const buttonpressedin = (_id,UserDetails) => {
    navigate(`/Termination/${_id}/${UserDetails}`, { _id,UserDetails });
  };




  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = React.useState('');

  const handleOpenDeleteDialog = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setOpenDeleteDialog(true);
  };


  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteAppointment = async () => {
    try {
      const response = await axios.put(`http://localhost:8070/Appointments/update/${selectedAppointmentId}`, {
        Completed: true
      });
      console.log(response.data);
      setOpenDeleteDialog(false);
      alert('Appointment deleted successfully');
    } catch (error) {
      console.error('Error deleting appointment', error);
      alert('Failed to delete appointment');
    }
  };


  return (
      <div>
<NavBar1/>
      
<Paper style={{width:1000,margin:130}}>
      <div style={{marginTop:150,width:1000}}>
          <div className={s.buttonadd} >
            &nbsp; &nbsp;<Button variant="contained" sx={{ mr: '10px' }} style={{marginTop:10}} onClick={handleClickOpen}>Ongoing Appointments</Button>

            <Dialog open={openn} onClose={handleOnClose} >
              {/* <DialogTitle className={s.DialogTitle} textAlign="center">
                <h4 >  Enter Branch details</h4>
              </DialogTitle> */}

              <DialogContent style={{width:600}}>
              <TableContainer component={Paper} style={{marginTop:'20px'}}>
       
 
     
        
        
       {groupedData1.map((group, groupIndex) => (
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
             {group.details.map((a, rowIndex) => (
           <React.Fragment key={a.id}>
           <TableRow >
             
             <TableCell component="th" scope="row">
             {a.Time} &nbsp;&nbsp;&nbsp;: No {a.AptNumber}
             </TableCell>
             
             <TableCell align="right">{a.Name}
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{a.ContactNo}
             <IconButton
                 aria-label="expand row"
                 size="small"
                //  onClick={() => setOpen(!open)}
                onClick={() => handleOpenRow(groupIndex * group.details.length + rowIndex)}
               >
                  {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
                {openRow === groupIndex * group.details.length + rowIndex ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
               </IconButton></TableCell>
               <TableCell>
               <Checkbox
          checked={checkboxValuesIn[groupIndex][rowIndex]}
            // checkboxValuesIn[groupIndex * group.details.length + rowIndex]}
            onChange={() => handleCheckboxChangeIn(a._id,groupIndex,rowIndex)}

        />
               </TableCell>
              <TableCell> 
              <Button endIcon={<SendIcon />} disabled={!submitButtonsDisabledIn[groupIndex][rowIndex]}
              // submitButtonsDisabledIn[groupIndex * group.details.length + rowIndex]} 
              onClick={() => buttonpressedin(a._id,a.UserDetails)}/>
              </TableCell>
              <TableCell> 
              <Button
  endIcon={<DeleteIcon />}
  disabled={!sendButtonClicked[groupIndex][rowIndex]}
  onClick={() => handleOpenDeleteDialog(a._id)}
/>

<Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete Appointment</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this appointment?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleDeleteAppointment}>Delete</Button>
        </DialogActions>
      </Dialog>
              </TableCell>
           </TableRow>
           <TableRow>
             <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={openRow === groupIndex * group.details.length + rowIndex} timeout="auto" unmountOnExit>
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


              </DialogContent> 

              <DialogActions>
                <Button onClick={handleOnClose}>Cancel</Button>
                {/* <Button 
                // onClick={handleAddFormSubmit}
                >Done</Button> */}
              </DialogActions>
            </Dialog>


          </div>


      <div>
     
      <TableContainer component={Paper} style={{marginTop:'20px'}}>
       
 
     
        
        
        {groupedData.map((group,groupIndex) => (
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
              {group.details.map((a, rowIndex) => (
            <React.Fragment>
            <TableRow >
              
              <TableCell component="th" scope="row">
              {a.Time} &nbsp;&nbsp;&nbsp;: No {a.AptNumber}
              </TableCell>
              
              <TableCell align="right">{a.Name}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{a.ContactNo}
              <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => handleOpenRow(groupIndex * group.details.length + rowIndex)}
               >
                  {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
                {openRow === groupIndex * group.details.length + rowIndex ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                </IconButton></TableCell>
              <TableCell>
              <Checkbox
          checked={checkboxValues[groupIndex][rowIndex]}
            // checkboxValuesIn[groupIndex * group.details.length + rowIndex]}
            onChange={() => handleCheckboxChange(a._id,groupIndex,rowIndex)}

        /></TableCell>
              <TableCell> <Button endIcon={<SendIcon />} disabled={!submitButtonsDisabled[groupIndex][rowIndex]}
              // submitButtonsDisabledIn[groupIndex * group.details.length + rowIndex]} 
              onClick={() => buttonpressedin(a._id,a.UserDetails)}/></TableCell>

<TableCell> 
              <Button
  endIcon={<DeleteIcon />}
  disabled={!sendButtonClickedOut[groupIndex][rowIndex]}
  onClick={() => handleOpenDeleteDialog(a._id)}
/>

<Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete Appointment</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this appointment?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleDeleteAppointment}>Delete</Button>
        </DialogActions>
      </Dialog>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={openRow === groupIndex * group.details.length + rowIndex} timeout="auto" unmountOnExit>
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
</div>
</div>
</Paper>
</div>

  );
}


