import React, {  useState } from "react";
import styleset from './brUpdate.module.css';
import { Button, IconButton, Paper, TextField, Tooltip } from "@mui/material";
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
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import data from './mock-data.json';



export default function BranchForm() {


  const validateBrName = (brName) => {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(brName);
  }

  
  const validateManName = (manName) => {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(manName);
  }
  
  const validateAddress = (address) => {
    // Address should not be empty and should contain only letters, digits, spaces, and commas
    const regex = /^[a-zA-Z0-9\s,]+$/;
    return address.trim() !== '' && regex.test(address);
  };

  const validateContactNumber = (contactNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(contactNumber);
  }
  const validateAptmntHrs = (hrs) => {
    const regex = /^\d{2}$/;
    return regex.test(hrs);
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  



  const [tableData, setTableData] = useState(data);
  const [addFormData, setAddFormData] = useState({});


  const [brName, setBrName] = useState('');
  const [manName, setManName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [hrs, setHrs] = useState('');
  const [email, setEmail] = useState('');
  const [brNameError, setBrNameError] = useState('');
  const [manNameError, setManNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [hrsError, setHrsError] = useState('');
 


  const handleBrNameChange = (event) => {
    setBrName(event.target.value);
    if (!validateBrName(event.target.value)) {
      setBrNameError('*Name should contain only alphabets and spaces');
    } else {
      setBrNameError('');
    }
  };

  
  const handleManNameChange = (event) => {
    setManName(event.target.value);
    if (!validateBrName(event.target.value)) {
      setManNameError('*Name should contain only alphabets and spaces');
    } else {
      setManNameError('');
    }
  };
  
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    if (!validateManName(event.target.value)) {
      setAddressError('*Name should contain only alphabets and spaces');
    } else {
      setAddressError('');
    }
  };

  const handleContactNumberChange = (event) => {
    
    setContactNumber(event.target.value);
   
    if (!validateContactNumber(event.target.value)) {
      setContactNumberError('*Contact number should contain only  digits');
    } else {
      setContactNumberError('');
    }
  
  };
  
  const handleAptmntHrsChange = (event) => {
    setHrs(event.target.value);
    if (!validateAptmntHrs(event.target.value)) {
      setHrsError('*Enter hours in two digits');
    } else {
      setHrsError('');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!validateEmail(event.target.value)) {
      setEmailError('*Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };
  const handleCreateNewRow = (values) => {
    tableData.params(values);
    setTableData([...tableData]);

  };


  //open and close modal
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  //delete row
  const handleOnDelete =
    (index) => {
      if (
        !window.confirm(`Are you sure you want to delete this row?`)
      ) {
        //eslint-disable-line
        this.props.handleOnDelete(tableData);
      }

      tableData.splice(index, 1);
      setTableData([...tableData]);
    }

//edit row
   const handleOnEdit = (i) => {
   //setTableData(addFormData[i])
   };

  // const handleUpdate =()=>{
  //  addFormData.splice(editIndex,1,tableData)
  // setAddFormData([...addFormData])
  // }

  const columns = [
    { id: 'BrName', label: 'Branch Name', Width: 300, align: 'center' },
    { id: 'ManName', label: 'Name of Manager', Width: 300, align: 'center' },
    { id: 'Cntct', label: 'Contact Number', Width: 300, align: 'center' },
    { id: 'Addrs', label: 'Address', Width: 300, align: 'center' },
    { id: 'Email', label: 'Email', Width: 300, align: 'center' },
    { id: 'ApptmntsPerHr', label: 'No. of Appointments Per Hour', Width: 300, align: 'center' },
  

  ];

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
    if (validateBrName(brName) && validateManName(manName) && validateAddress(address) && validateContactNumber(contactNumber) && validateEmail(email)) {
    const newBranch = {
    
      BrName: addFormData.BrName,
      ManName: addFormData.ManName,
      Cntct: addFormData.Cntct,
      Addrs: addFormData.Addrs,
      Email: addFormData.Email,
      ApptmntsPerHr: addFormData.ApptmntsPerHr
    };
    const newBranches = [...tableData, newBranch];
    setTableData(newBranches);
    handleOnClose();

    const fieldName = event.target.getAttribute("id");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

     setAddFormData(newFormData);
  }
  else {
    alert('Please fill in all fields correctly');
  }
};

  return (
    <div className={styleset.mainContainer}>
      <div >
        <Paper elevation={6}
          className={styleset.brDetails}
          sx={{
            mr: { xs: "60px", sm: "65px", md: "65px", lg: "68px", xl: "70px" },
            alignItems: "center",
            borderRadius: "31px",
            overflow: "auto"
          }} >

          <div className={styleset.headTitleContainer}>
            <h1>Branch Details</h1></div>

          {/* to add new  branch */}
          <div className={styleset.buttonadd}>
            <Button variant="contained" sx={{ mr: '10px' }} onClick={handleClickOpen}>Add Branch</Button>

            <Dialog open={open} onClose={handleOnClose}>
              <DialogTitle className={styleset.DialogTitle} textAlign="center">
                <h4 >  Enter Branch details</h4>
              </DialogTitle>

              <DialogContent>
                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="outlined-basic"
                    label="Branch Name "
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    onChange={handleBrNameChange} />
                     {brNameError && <span style={{ color: 'red' }}>{brNameError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="outlined-basic"
                    label="Name of Manager"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    onChange={handleManNameChange} />
                     {manNameError && <span style={{ color: 'red' }}>{manNameError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="outlined-basic"
                    label="Contact No"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    onChange={handleContactNumberChange} />
                   {contactNumberError && <span style={{ color: 'red' }}>{contactNumberError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    onChange={handleAddressChange} />
                     {addressError && <span style={{ color: 'red' }}>{addressError}</span>}
                   
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    onChange={handleEmailChange} />
                      {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="outlined-basic"
                    label="No. of Appointments Per Hour"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    onChange={handleAptmntHrsChange} />
                </div>
                {hrsError && <span style={{ color: 'red' }}>{hrsError}</span>}

              

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

                {tableData.map((tableData, i) => {
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
                          <IconButton aria-label="" onClick={() => handleOnEdit(i)}>
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip arrow placement="left" title="Delete">
                          <IconButton aria-label="" onClick={() => handleOnDelete(i)}>
                            <DeleteRoundedIcon color="primary" />
                          </IconButton>
                        </Tooltip>

                      </div>

                    </TableRow>
                  )
                })
                }

              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div >
    </div >
  )
}

