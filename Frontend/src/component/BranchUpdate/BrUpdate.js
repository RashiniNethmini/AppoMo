import React, { useState, useEffect } from "react";
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
// import data from './mock-data.json';
import axios from 'axios';




export default function BranchForm() {


  const validateBrName = (brName) => {
    const regex = /^[a-zA-Z\s]*$/;
    return brName.trim() !== '' && regex.test(brName);
  }


  const validateManName = (manName) => {
    const regex = /^[a-zA-Z\s.]+$/;
    return manName.trim() !== '' && regex.test(manName);
  }

  const validateAddress = (address) => {
    const regex = /^[a-zA-Z0-9\s./,]+$/;
    return address.trim() !== '' && regex.test(address);
  };

  const validateContactNumber = (contactNumber) => {
    const regex = /^[0-9]{10}$/;
    return contactNumber.trim() !== '' && regex.test(contactNumber);
  }
  const validateAptmntHrs = (hrs) => {
    const regex = /^\d{2}$/;
    return hrs.trim() !== '' && regex.test(hrs);
  }
  const validateWorkingHrs = (whrs) => {
    const regex = /^\d{2}$/;
    return whrs.trim() !== '' && regex.test(whrs);
  }

  const validateOpenDays = (opdays) => {
    // Address should not be empty and should contain only letters, digits, spaces, and commas
    const regex = /^[a-zA-Z0-9\s.,]+$/;
    return opdays.trim() !== '' && regex.test(opdays);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== '' && regex.test(email);
  }




  const [tableData, setTableData] = useState(() => {
    const storedData = localStorage.getItem('tableData');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [editIndex, setEditIndex] = useState(-1);
  const [formData, setFormData] = useState({
    BrName: "",
    ManName: "",
    Cntct: "",
    Addrs: "",
    Email: "",
    ApptmntsPerHr: "",
    WHrsPerDay: "",
    DaysOpen: ""
  });

  const [brName, setBrName] = useState('');
  const [manName, setManName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [hrs, setHrs] = useState('');
  const [whrs, setWHrs] = useState('');
  const [opdays, setOpdays] = useState('');




  const [brNameError, setBrNameError] = useState('');
  const [manNameError, setManNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [hrsError, setHrsError] = useState('');
  const [whrsError, setWHrsError] = useState('');
  const [opdaysError, setOpdaysError] = useState('');




  const handleBrNameChange = (event) => {
    setBrName(event.target.value);
    if (!validateBrName(event.target.value)) {
      setBrNameError('*Name should contain only alphabets and spaces');
    } else {
      setBrNameError('');
      
        // const updatedTableData = [...tableData];
        // updatedTableData[editIndex].BrName = event.target.value;
        // setTableData(updatedTableData);
      
      
    }
  };


  const handleManNameChange = (event) => {
    setManName(event.target.value);
    if (!validateBrName(event.target.value)) {
      setManNameError('*Name should contain alphabets ,spaces and fullstops only');
    } else {
      setManNameError('');
      // const updatedTableData = [...tableData];
      // updatedTableData[editIndex].BrName = event.target.value;
      // setTableData(updatedTableData);
    }
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    if (!validateAddress(event.target.value)) {
      setAddressError('*Address should contain  alphabets,digits,spaces, commas and fullstops only');
    } else {
      setAddressError('');
      const updatedTableData = [...tableData];
      updatedTableData[editIndex].BrName = event.target.value;
      setTableData(updatedTableData);
    }
  };

  const handleContactNumberChange = (event) => {

    setContactNumber(event.target.value);

    if (!validateContactNumber(event.target.value)) {
      setContactNumberError('*Contact number should contain only 10 digits');
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
  const handleWorkingHrsChange = (event) => {
    setWHrs(event.target.value);
    if (!validateWorkingHrs(event.target.value)) {
      setWHrsError('*Enter hours in two digits');
    } else {
      setWHrsError('');
    }
  };
  const handleOpenDaysChange = (event) => {
    setOpdays(event.target.value);
    if (!validateOpenDays(event.target.value)) {
      setOpdaysError('*Address should contain  alphabets,digits,spaces, commas and fullstops only');
    } else {
      setOpdaysError('');
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
    const newRow = { ...values };
    setTableData((prevData) => {
      const updatedData = [...prevData, newRow];
      localStorage.setItem('tableData', JSON.stringify(updatedData));
      return updatedData;
    });
  };


  //open and close modal
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    // setEditIndex(index);
    setOpen(true);
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  //delete a row
  const handleOnDelete = (index) => {
    if (!window.confirm(`Are you sure you want to delete this row?`)) {
      return;
    }
    const branchToDelete = tableData[index];
    const updatedTableData = tableData.filter((_, i) => i !== index);
    localStorage.setItem('tableData', JSON.stringify(updatedTableData));  // Update local storage with the updated table data
    setTableData(updatedTableData);


    // Make an API request to delete the document from the MongoDB database
    fetch(`http://localhost:8070/BranchDetails/delete/${branchToDelete}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Update the state to remove the deleted document from the tableData
        const updatedTableData = [...tableData];
        updatedTableData.splice(index, 1);
        setTableData(updatedTableData);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //edit row
 const handleOnEdit = (index) => {
  setEditIndex(index);
  const rowData = tableData[index];
  setFormData({
    BrName: rowData.BrName,
    ManName: rowData.ManName,
    Cntct: rowData.Cntct,
    Addrs: rowData.Addrs,
    Email: rowData.Email,
    ApptmntsPerHr: rowData.ApptmntsPerHr,
    WHrsPerDay: rowData.WHrsPerDay,
    DaysOpen: rowData.DaysOpen
  });
  handleClickOpen();
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
    { id: 'WHrsPerDay', label: 'No. of Working Hours Per Day', Width: 300, align: 'center' },
    { id: 'DaysOpen', label: 'Days Open ', Width: 300, align: 'center' },




  ];


  const handleAddFormSubmit = (event) => {
    event.preventDefault();

     if (editIndex === -1) {
    if (validateBrName(brName) && validateManName(manName) && validateAddress(address) && validateContactNumber(contactNumber) && validateAptmntHrs(hrs) && validateWorkingHrs(whrs) && validateOpenDays(opdays)) {
      const newBranch = {

        BrName: brName,
        ManName: manName,
        Cntct: contactNumber,
        Addrs: address,
        Email: email,
        ApptmntsPerHr: hrs,
        WHrsPerDay: whrs,
        DaysOpen: opdays

      };
      console.log('Submit button pressed');
      console.log(brName, contactNumber);

      // Make an API request to send the data to the backend
      fetch("http://localhost:8070/BranchDetails/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "branchName": brName,
          "managerName": manName,
          "contactNo": contactNumber,
          "address": address,
          "email": email,
          "nofappnmntsPerHr": hrs,
          "nofworkinghrsPerDay": whrs,
          "daysopen": opdays

        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          handleOnClose();
        })
        .catch(error => {
          console.log(error);
        });
        if (editIndex !== -1) {
          // If in edit mode, update the existing branch
          const updatedTableData = [...tableData];
          updatedTableData[editIndex] = newBranch;
          localStorage.setItem("tableData", JSON.stringify(updatedTableData));
          setTableData(updatedTableData);
        } else {
        
      //   const newBranches = [...tableData, newBranch];
      // setTableData(newBranches);
     handleCreateNewRow(newBranch);}
      // const updatedTableData = [...tableData, newBranch];
      // setTableData(updatedTableData);
      handleOnClose();
    }
   else {

      alert('Please fill in all fields correctly');
    }

  }
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    // Validate the form data

    if (validateBrName(brName) && validateManName(manName) && validateAddress(address) && validateContactNumber(contactNumber) && validateAptmntHrs(hrs) && validateWorkingHrs(whrs) && validateOpenDays(opdays)) {
      const updatedRow = {
        BrName: brName,
        ManName: manName,
        Cntct: contactNumber,
        Addrs: address,
        Email: email,
        ApptmntsPerHr: hrs,
        WHrsPerDay: whrs,
        DaysOpen: opdays
      };

     // Update the tableData state with the edited row
      const updatedTableData = [...tableData];
      updatedTableData[editIndex] = updatedRow;
      setTableData(updatedTableData);

      // Close the form
      handleOnClose();
    } else {
      alert('Please fill in all fields correctly');
    }
  };


  // Step 1: Retrieve table data from local storage on page load
  useEffect(() => {
    const storedData = localStorage.getItem('tableData');
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }
  }, []);

  // Step 2: Update local storage whenever tableData changes
  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

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
                    required
                    id="BrName"
                    label="Branch Name "
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    //  value={editIndex !== -1 ? tableData[editIndex].BrName : ''}
                    onChange={handleBrNameChange} />
                  {brNameError && <span style={{ color: 'red', fontSize: 12 }}>{brNameError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required
                    id="ManName"
                    label="Name of Manager"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    // value={editIndex !== -1 ? tableData[editIndex].ManName : ''}
                    onChange={handleManNameChange} />
                  {manNameError && <span style={{ color: 'red', fontSize: 12 }}>{manNameError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required
                    id="Cntct"
                    label="Contact No"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    //  value={editIndex !== -1 ? tableData[editIndex].Cntct : ''}
                    onChange={handleContactNumberChange} />
                  {contactNumberError && <span style={{ color: 'red', fontSize: 12 }}>{contactNumberError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="Addrs"
                    label="Address"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    //  value={editIndex !== -1 ? tableData[editIndex].Addrs : ''}
                    onChange={handleAddressChange} />
                  {addressError && <span style={{ color: 'red', fontSize: 12 }}>{addressError}</span>}

                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="Email"
                    label="Email"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    //  value={editIndex !== -1 ? tableData[editIndex].Email : ''}
                    onChange={handleEmailChange} />
                  {emailError && <span style={{ color: 'red', fontSize: 12 }}>{emailError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="ApptmntsPerHr
                  };"
                    label="No. of Appointments Per Hour"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    //  value={editIndex !== -1 ? tableData[editIndex].ApptmntsPerHr : ''}
                    onChange={handleAptmntHrsChange} />
                </div>
                {hrsError && <span style={{ color: 'red', fontSize: 12 }}>{hrsError}</span>}

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="WHrsPerDay
                  };"
                    label="No. of Working Hours Per Day"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    //  value={editIndex !== -1 ? tableData[editIndex].ApptmntsPerHr : ''}
                    onChange={handleWorkingHrsChange} />
                </div>
                {whrsError && <span style={{ color: 'red', fontSize: 12 }}>{whrsError}</span>}

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="Days Open"
                    label="Days Open "
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    //  value={editIndex !== -1 ? tableData[editIndex].Addrs : ''}
                    onChange={handleOpenDaysChange} />
                  {opdaysError && <span style={{ color: 'red', fontSize: 12 }}>{opdaysError}</span>}

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

                {tableData.map((row, i) => {
                  return (

                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>

                      {columns.map((column) => {
                        const value = row[column.id];
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

