import React, { useCallback, useMemo, useState } from "react";
import styleset from './brUpdate.module.css';
import { nanoid } from "nanoid";
import AddHomeWorkRoundedIcon from '@mui/icons-material/AddHomeWorkRounded';
import Chip from '@mui/material/Chip';
import {  Button, FormControl, Box,  IconButton, Paper,  TextField, Select, MenuItem, InputLabel, Tooltip } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import data from './mock-data.json';
import FormBr from "./FormBr";
//import { data, states } from './makeData';

function getStyles(days, workingDays, theme) {
  return {
    fontWeight:
      workingDays.indexOf(days) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function BranchForm() {
  const [tableData, setTableData] = useState(data);
  const [addFormData, setAddFormData] = useState({
    BrId: '',
    BrName: '',
    ManName: '',
    Cntct: '',
    Addrs: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };


  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleOnClose = () => {
    setOpen(false);
  };

  const handleOnDelete = useCallback(
    (tableDataId) => {
      if (
        !window.confirm(`Are you sure you want to delete this row?`)
      ) {
        //eslint-disable-line
        this.props.handleOnDelete(tableData);
      } 
      const newtableData = [...tableData];

     const index= tableData.findIndex((tableData)=>tableData.BrId === tableDataId)
      newtableData.splice(index, 1);
      setTableData([...tableData]);  
    },
    [tableData],
  );
  const handleOnEdit = () => {

  };
  const columns = [
    { id: 'BrId', label: 'Branch Id', Width: 300, align: 'center' },
    { id: 'BrName', label: 'Branch Name', Width: 300, align: 'center' },
    { id: 'ManName', label: 'Name of Manager', Width: 300, align: 'center' },
    { id: 'Cntct', label: 'Contact Number', Width: 300, align: 'center' },
    { id: 'Addrs', label: 'Address', Width: 300, align: 'center' },
    { id: 'Email', label: 'Email', Width: 300, align: 'center' },
    { id: 'ApptmntsPerHr', label: 'No. of Appointments Per Hour', Width: 300, align: 'center' },
    { id: 'WrkngDays', label: 'Working days', Width: 300, align: 'center' },

  ];
  //function createData(BrId, BrName, ManName, Cntct, Addrs, Email, ApptmntsperHr, WrkngDays) {
  //return { BrId, BrName, ManName, Cntct, Addrs, Email, ApptmntsperHr, WrkngDays };

  // }

  //const rows = [
  //createData('C01', 'Colombo', 'L.Malith Perera', '0114512892', 'No.12,Duplication Road,Colombo 6'),
  //createData('A01', "Aluthgama", "A. Senith Cooray", "0344589632", "No.108,Galle Road,Aluthgama"),
  //createData('M01', "Matara", "S.Malan Peiris", "0485789632", "No.85,Galle Road Matara"),

  // ];

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("id");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);

  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newBranch = {
      id: nanoid(),
      BrId: addFormData.BrId,
      BrName: addFormData.BrName,
      ManName: addFormData.ManName,
      Cntct: addFormData.Cntct,
      Addrs: addFormData.Addrs
    };
    const newBranches = [...tableData, newBranch];
    setTableData(newBranches);
    handleOnClose();

  };


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

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; //chip data


  return (


    <div className={styleset.mainContainer}>
      <div >
        <Paper elevation={6} className={styleset.brDetails} sx={{ mr: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" }, alignItems: "center", borderRadius: "31px", overflow: "auto" }} >
          <div className={styleset.headTitleContainer}>
            <h1>Branch Details</h1></div>
          <div className={styleset.buttonadd}>
            <Button variant="contained" sx={{ mr: '10px' }} onClick={handleClickOpen}>Add Branch</Button>

            <Dialog open={open} onClose={handleOnClose}>
              <DialogTitle className={styleset.DialogTitle} textAlign="center">
                <h4 >  Enter Branch details</h4>
              </DialogTitle>

              <DialogContent>
                
                <div className={styleset.bodyTextbox}>
                  <TextField required id="outlined-basic" label="Branch Name " variant="outlined" sx={{ width: '100vw' }} onChange={handleAddFormChange} />
                </div>
                <div className={styleset.bodyTextbox}>
                  <TextField required id="outlined-basic" label="Name of Manager" variant="outlined" sx={{ width: '100vw' }} onChange={handleAddFormChange} />

                </div>
                <div className={styleset.bodyTextbox}>
                  <TextField required id="outlined-basic" label="Contact No" variant="outlined" sx={{ width: '100vw' }} onChange={handleAddFormChange} />

                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField required id="outlined-basic" label="Address" variant="outlined" sx={{ width: '100vw' }} onChange={handleAddFormChange} />

                </div>
                <div className={styleset.bodyTextbox}>
                  <TextField required id="outlined-basic" label="Email" variant="outlined" sx={{ width: '100vw' }} onChange={handleAddFormChange} />

                </div>
                <div className={styleset.bodyTextbox}>
                  <TextField required id="outlined-basic" label="No. of Appointments Per Hour" variant="outlined" sx={{ width: '100vw' }} onChange={handleAddFormChange} />

                </div>
                <div className={styleset.bodyTextbox}>
                  <TextField required id="outlined-basic" label="Working Hours" placeholder="e.g: 9 a.m. - 5 p.m." variant="outlined" sx={{ width: '100vw' }} onChange={handleAddFormChange} />

                </div>
                <div className={styleset.bodyTextbox} >
                  <FormControl sx={{ maxWidth: { xs: '300px', sm: '400px', md: '900px', lg: '1000px', width: '69vw', margin: '5px' } }} onChange={handleAddFormChange}>
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

              </DialogContent>

              <DialogActions>
                <Button onClick={handleOnClose}>Cancel</Button>
                <Button onClick={handleAddFormSubmit}>Done</Button>
              </DialogActions>
            </Dialog>


          </div>

          <TableContainer  >
            <Table stickyHeader aria-label="sticky table">
              <TableHead >
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ maxWidth: column.Width }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>

                {tableData.map((tableData) => {
                  return (
                   
                    <TableRow hover role="checkbox" tabIndex={-1} key={tableData.code}>
                      
                      {columns.map((column) => {
                        const value = tableData[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}

                          </TableCell>

                        );

                      })}

                      <div className={styleset.iconsUpDel}>
                        
                        <Tooltip arrow placement="left" title="Edit">

                          <IconButton aria-label="" onClick={handleOnEdit}>
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      
                        <Tooltip arrow placement="left" title="Delete">
                        
                          <IconButton aria-label="" onClick={() => handleOnDelete(tableData)}>
                            <DeleteRoundedIcon color="primary" />
                          </IconButton>
                       
                        </Tooltip>
                        
                      </div>

                    </TableRow>
                    )})
                  };
                

                
              </TableBody>
            </Table>
          </TableContainer>


        </Paper>

      </div >
    </div >

  )


}

