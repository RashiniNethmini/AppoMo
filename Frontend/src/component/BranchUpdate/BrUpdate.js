import React, { useState, useEffect } from "react";
import styleset from './brUpdate.module.css';
import {
  Button,
  IconButton,
  Paper,
  TextField,
  MenuItem,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Alert,
  Tooltip
} from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
// import data from './mock-data.json';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import NavBar from '../NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



export default function BranchForm() {

  const {objectId} = useParams();

  const timeSlotOptions = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [error, setError] = useState("");
  const [openTimeSlotDialog, setOpenTimeSlotDialog] = useState(false);

  const handleAddDate = (date) => {
    setSelectedDates((prevSelectedDates) => [
      ...prevSelectedDates,
      { date: new Date(date), timeSlots: [] },
    ]);
  };
  
  const handleAddTimeSlot = (dateIndex) => {
    setSelectedDates((prevSelectedDates) => {
      const updatedDates = [...prevSelectedDates];
      const timeSlots = updatedDates[dateIndex].timeSlots;
      updatedDates[dateIndex].timeSlots.push({ start: "", end: "" });
      return updatedDates;
    });
  };

  const handleTimeSlotChange = (dateIndex, timeSlotIndex, field, value) => {
    setSelectedDates((prevSelectedDates) => {
      const updatedDates = [...prevSelectedDates];
      const timeSlots = updatedDates[dateIndex].timeSlots;
      const selectedTimeSlot = timeSlots[timeSlotIndex];
      const startTimeOptions = timeSlotOptions.filter((option) => {
        return (
          option !== selectedTimeSlot.end &&
          !timeSlots.some((timeSlot) => timeSlot.start === option)
        );
      });
      const endTimeOptions = timeSlotOptions.filter((option) => {
        return (
          option !== selectedTimeSlot.start &&
          !timeSlots.some((timeSlot) => timeSlot.end === option)
        );
      });
  
      // Update the respective time slot object
      selectedTimeSlot[field] = value;
  
      if (field === "start" && startTimeOptions.indexOf(value) === -1) {
        setError("Invalid start time");
      } else if (field === "end" && endTimeOptions.indexOf(value) === -1) {
        setError("Invalid end time");
      } else {
        setError("");
      }
  
      // Update the time slot in the state
      timeSlots[timeSlotIndex] = selectedTimeSlot;
  
      return updatedDates;
    });
  };

  const getBranchAvailability = (branchId) => {
    // Make an API request to retrieve the branch availability data for the given branchId
    axios
      .get(`http://localhost:8070/BranchAvailability/get/${branchId}`)
      .then((response) => {
        const branchAvailability = response.data;
        const selectedDates = branchAvailability.dates.map((dateObj) => {
          return {
            date: new Date(dateObj.date),
            timeSlots: dateObj.timeSlots.map((timeSlot) => {
              return {
                start: timeSlot.startTime,
                end: timeSlot.endTime,
              };
            }),
          };
        });
        setSelectedDates(selectedDates);
      })
      .catch((error) => {
        console.error("Error retrieving branch availability:", error);
      });
  };

    const handleDeleteTimeSlot = (dateIndex, timeSlotIndex) => {
    setSelectedDates((prevSelectedDates) => {
      const updatedDates = [...prevSelectedDates];
      const timeSlots = updatedDates[dateIndex].timeSlots;
      timeSlots.splice(timeSlotIndex, 1);
      return updatedDates;
    });
  };

  const handleDeleteDate = (dateIndex) => {
    setSelectedDates((prevSelectedDates) => {
      const updatedDates = [...prevSelectedDates];
      updatedDates.splice(dateIndex, 1);
      return updatedDates;
    });
  };

  const handleCloseError = () => {
    setError("");
  };

  const formatDate = (date) => {
    return date.toDateString();
  };

  const today = new Date();
  const availableDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    availableDates.push(date);
  }

  const handleOpenTimeSlotDialog = (branchId) => {
    setSelectedBranchId(branchId);
    setOpenTimeSlotDialog(true);
    getBranchAvailability(branchId); // Retrieve branch availability when the dialog is opened
  };

  const handleCloseTimeSlotDialog = () => {
    setSelectedDates([]);
    setOpenTimeSlotDialog(false);
  };

  // const saveBranchAvailability = () => {
  //   const data = {
  //     branchId: selectedBranchId, // Use the selected branch ID
  //     dates: selectedDates.map((dateObj) => {
  //       return {
  //         date: dateObj.date,
  //         timeSlots: dateObj.timeSlots.map((timeSlot) => {
  //           return {
  //             startTime: timeSlot.start,
  //             endTime: timeSlot.end,
  //             currNoOfAppointment: 0, // Set the initial value to 0
  //           };
  //         }),
  //       };
  //     }),
  //   };

  //   // Send a POST request to the backend API to save the data
  //   axios.post("http://localhost:8070/BranchAvailability/add", data)
  //     .then((response) => {
  //       console.log("Data saved successfully:", response.data);
  //       alert('Data saved successfully');
  //       setSelectedDates([]);
  //       setOpen(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error saving data:", error);
  //       alert('Failed to save data');
  //     });
  // };
  const saveBranchAvailability = () => {
    if (selectedDates.length === 0) {
      alert("Please select at least one date");
      return;
    }
  
    for (const dateObj of selectedDates) {
      if (dateObj.timeSlots.length === 0) {
        alert(`Please select at least one time slot for ${formatDate(dateObj.date)}`);
        return;
      }
  
      for (const timeSlot of dateObj.timeSlots) {
        if (timeSlot.start.trim() === "" || timeSlot.end.trim() === "") {
          alert("Please fill in all time slot fields");
          return;
        }
      }
    }
  
    const data = {
      branchId: selectedBranchId, // Use the selected branch ID
      dates: selectedDates.map((dateObj) => {
        return {
          date: dateObj.date,
          timeSlots: dateObj.timeSlots.map((timeSlot) => {
            return {
              startTime: timeSlot.start,
              endTime: timeSlot.end,
              currNoOfAppointment: 0, // Set the initial value to 0
            };
          }),
        };
      }),
    };
  
    // Send a POST request to the backend API to save the data
    axios
      .post("http://localhost:8070/BranchAvailability/add", data)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        alert("Data saved successfully");
        setSelectedDates([]);
        setOpenTimeSlotDialog(false);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("Failed to save data");
      });
  };

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

  const validateUsername= (username)=>{
    
    const lengthURegex = /^.{3,16}$/; // ensure that the username is between 3 and 16 characters long.
    const contentRegex = /^[a-zA-Z0-9_-]*$/; // ensure that the username contains only letters, numbers, underscores, or hyphens.
    return username.trim() !== '' && lengthURegex.test(username) &&contentRegex.test(username);
//     if(username.trim()===""){
//         return "Username is required.";
//     }else if (!lengthURegex.test(username)){
//         return "Username must be in between 3 and 16 characters long.";
//     } else if (!contentRegex.test(username)){
//         return "Username must contain only letters, numbers, underscores, or hyphens.";
//     }
};

const  validatePassword = (password)=> { 
    
  const uppercaseRegex = /^(?=.*[A-Z])/; // ensure that the password contains at least one uppercase letter.
  const lowercaseRegex = /^(?=.*[a-z])/; // ensure that the password contains at least one lowercase letter.
  const numberRegex = /^(?=.*\d)/; // ensure that the password contains at least one number.
  const specialCharRegex = /^(?=.*[!@#$%&+*^()_])/; // ensure that the password contains at least one of the following symbols: !@#$%&+*^()_.
  const lengthPRegex = /^.{8,}$/; // ensure that the password is at least 8 characters long.

  return password.trim()!=="" && uppercaseRegex.test(password) && lowercaseRegex.test(password) && numberRegex.test(password) && specialCharRegex.test(password) && lengthPRegex.test(password);
  
  // if(password.trim()===""){
  //     return "Password is required.";
  // } else if (!uppercaseRegex.test(password)){
  //     return "Password must contain at least one uppercase letter.";
  // } else if (!lowercaseRegex.test(password)){
  //     return "Password must contain at least one lowercase letter.";
  // } else if (!numberRegex.test(password)){
  //     return "Password must contain at least one number.";
  // } else if (!specialCharRegex.test(password)){
  //     return "Password must contain at least one of the following symbols: !@#$%&+*^()_.";
  // }else if (!lengthPRegex.test(password)){
  //     return "Password must be at least 8 characters long.";
  // }
  
};



  const [tableData, setTableData] = useState([]);
  // const [editIndex, setEditIndex] = useState(-1);
  // const [formData, setFormData] = useState({
  //   BrName: "",
  //   ManName: "",
  //   Cntct: "",
  //   Addrs: "",
  //   Email: "",
  //   ApptmntsPerHr: "",
  //   WHrsPerDay: "",
  //   DaysOpen: "",
  //   Username:"",
  //   Password:""
  // });

  const [brName, setBrName] = useState('');
  const [manName, setManName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [hrs, setHrs] = useState('');
  const [whrs, setWHrs] = useState('');
  const [opdays, setOpdays] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [brNameError, setBrNameError] = useState('');
  const [manNameError, setManNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [hrsError, setHrsError] = useState('');
  const [whrsError, setWHrsError] = useState('');
  const [opdaysError, setOpdaysError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');



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
    if (!validateManName(event.target.value)) {
      setManNameError('*Name should contain alphabets ,spaces and fullstops only');
    } else {
      setManNameError('');

    }
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    if (!validateAddress(event.target.value)) {
      setAddressError('*Address should contain  alphabets,digits,spaces, commas and fullstops only');
    } else {
      setAddressError('');
      
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
      setOpdaysError('*Open days should contain  alphabets and commas only');
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if (!validateUsername(event.target.value)) {
      setUsernameError('*Username must contain only 3-16 charachters with letters, numbers, underscores, or hyphens ');
    } else {
      setUsernameError('');
    }

  
};
const handlePasswordChange = (event) => {
  setPassword(event.target.value);
  if (!validatePassword(event.target.value)) {
    setPasswordError('*Password must contain minimum 8 charachters with at least one uppercase,one lowercase,one number and any of the symbols !@#$%&+*^()_.');
  } else {
    setPasswordError('');
  }
 
};


  // Fetch table data from the backend on page load
  useEffect(() => {
    getData();
  }, [objectId]);


  const getData = () => {
    fetch('http://localhost:8070/BranchDetails/')
      .then((res) => res.json())
      .then((brdata) => {
        console.log(brdata);
        const filteredData = brdata.filter((branch) => branch.ServiceProvider === objectId);
        setTableData(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });

  };


  const handleCreateNewRow = (values) => {
    const newRow = { ...values };
    setTableData((prevData) => {
      const updatedData = [...prevData, newRow];
      return updatedData;
    });
  };


  //open and close modal
  
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);

  const [addFormData, setAddFormData] = useState({
    branchName: "",
    managerName: "",
    contactNo: "",
    address: "",
    email: "",
    nofappnmntsPerHr: "",
    nofworkinghrsPerDay: "",
    daysopen: "",
    username:"",
    password:""
  });


  const [editFormData, setEditFormData] = useState({
    branchName: "",
    managerName: "",
    contactNo: "",
    address: "",
    email: "",
    nofappnmntsPerHr: "",
    nofworkinghrsPerDay: "",
    daysopen: "",
    username:"",
    password:""
  });

  const handleAddFormOpen = () => {
    setAddFormData({
      BrName: "",
      ManName: "",
      Cntct: "",
      Addrs: "",
      Email: "",
      ApptmntsPerHr: "",
      WHrsPerDay: "",
      DaysOpen: "",
      Username:"",
      Password:""

    });
    setAddFormOpen(true);
  };

  const handleEditFormOpen = (index) => {
    const rowData = tableData[index];
    setEditFormData({
      branchName: rowData.branchName,
      managerName: rowData.managerName,
      contactNo: rowData.contactNo,
      address: rowData.address,
      email: rowData.email,
      nofappnmntsPerHr: rowData.nofappnmntsPerHr,
      nofworkinghrsPerDay: rowData.nofworkinghrsPerDay,
      daysopen: rowData.daysopen,
      username: rowData.username,
      password: rowData.password
    });
    setEditFormOpen(true);
  };


  const handleAddFormClose = () => {
    setAddFormOpen(false);
  };

  const handleEditFormClose = () => {
    setEditFormOpen(false);
  };
  //delete a row
  const handleOnDelete = (index) => {
    if (!window.confirm(`Are you sure you want to delete this row?`)) {
      return;
    }
    const branchToDelete = tableData[index];

    // Make an API request to delete the document from the MongoDB database
    fetch(`http://localhost:8070/BranchDetails/delete/${branchToDelete._id}`, {
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
  // const handleOnEdit = (index) => {
  //   setEditIndex(index);
  //   const rowData = tableData[index];
  //   setFormData({
  //     BrName: rowData.BrName,
  //     ManName: rowData.ManName,
  //     Cntct: rowData.Cntct,
  //     Addrs: rowData.Addrs,
  //     Email: rowData.Email,
  //     ApptmntsPerHr: rowData.ApptmntsPerHr,
  //     WHrsPerDay: rowData.WHrsPerDay,
  //     DaysOpen: rowData.DaysOpen
  //   });
  //   handleClickOpen();
  // };


  // const handleUpdate =()=>{
  //  addFormData.splice(editIndex,1,tableData)
  // setAddFormData([...addFormData])
  // }

  const columns = [
    { id: 'branchName', label: 'Branch Name', Width: 300, align: 'center' },
    { id: 'managerName', label: 'Name of Manager', Width: 300, align: 'center' },
    { id: 'contactNo', label: 'Contact Number', Width: 300, align: 'center' },
    { id: 'address', label: 'Address', Width: 300, align: 'center' },
    { id: 'email', label: 'Email', Width: 300, align: 'center' },
    { id: 'nofappnmntsPerHr', label: 'No. of Appointments Per Hour', Width: 300, align: 'center' },
    { id: 'nofworkinghrsPerDay', label: 'No. of Working Hours Per Day', Width: 300, align: 'center' },
    { id: 'daysopen', label: 'Days Open', Width: 300, align: 'center' },
    { id: 'username', label: 'Branch Username', Width: 300, align: 'center' },
    { id: 'password', label: 'Branch Password', Width: 300, align: 'center' },
  ];

   //const ServiceProvider = "648661d73faee59051640f01";

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    if (validateBrName(brName) &&
      validateManName(manName) &&
      validateAddress(address) &&
      validateContactNumber(contactNumber) &&
      validateAptmntHrs(hrs) &&
      validateWorkingHrs(whrs) &&
      validateOpenDays(opdays)&&
      validateUsername(username)&&
       validatePassword(password)) {
      const newBranch = {

        BrName: brName,
        ManName: manName,
        Cntct: contactNumber,
        Addrs: address,
        Email: email,
        ApptmntsPerHr: hrs,
        WHrsPerDay: whrs,
        DaysOpen: opdays,
        Username: username,
        Password: password,
        ServiceProvider: objectId

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
          "daysopen": opdays,
          "username": username,
          "password":password,
          "ServiceProvider": objectId


        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          handleAddFormClose();
          getData();
        })
        .catch(error => {
          console.log(error);
        });


      handleCreateNewRow(newBranch);


      handleAddFormClose();
    }
    else {
      alert('Please fill in all fields correctly');
    }

  };

  const handleEditFormSubmit = (index) => {
    const branchToUpdate ={ ...tableData[index]};
    // Update the branchToUpdate object with new form values
  branchToUpdate.branchName = brName;
  branchToUpdate.managerName = manName;
  branchToUpdate.contactNo = contactNumber;
  branchToUpdate.address = address;
  branchToUpdate.email = email;
  branchToUpdate.nofappnmntsPerHr = hrs;
  branchToUpdate.nofworkinghrsPerDay = whrs;
  branchToUpdate.daysopen = opdays;
  branchToUpdate.username = username;
  branchToUpdate.password = password;
    
    // if (validateBrName(brName) &&
    //   validateManName(manName) &&
    //   validateAddress(address) &&
    //   validateContactNumber(contactNumber) &&
    //   validateAptmntHrs(hrs) &&
    //   validateWorkingHrs(whrs) &&
    //   validateOpenDays(opdays)&&
    //   validateUsername(username)&&
    //    validatePassword(password)
    //   ) {
    
      console.log('Submit button pressed');
      console.log(brName, contactNumber);

     
      // Make an API request to send the data to the backend
      fetch(`http://localhost:8070/BranchDetails/update/${branchToUpdate._id}`, {
        method: 'PUT',
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
          "daysopen": opdays,
          "username": username,
          "password":password,
          "ServiceProvider": objectId


        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          handleEditFormClose();
          getData();
        })
        .catch(error => {
          console.log(error);
        });
    // }
    // else {
    //   alert('Please fill in all fields correctly');
    // }
    // Update the tableData state with the edited row
    const updatedTableData = [...tableData];
    updatedTableData[index] = branchToUpdate ;
    setTableData(updatedTableData);
    // handleEditFormClose();
  }


  const handleEditFormChange = (event) => {
    const { id, value } = event.target;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };


  return (

    <div className={styleset.mainContainer}>
  
  <NavBar/>

       
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
            <Button variant="contained" sx={{ mr: '10px' }} onClick={handleAddFormOpen}>Add Branch</Button>

            <Dialog open={addFormOpen} onClose={handleAddFormClose}>
              <DialogTitle className={styleset.DialogTitle} textAlign="center">
                <h4 >  Enter Branch details</h4>
              </DialogTitle>

              <DialogContent>
                <div className={styleset.bodyTextbox}>
                  <TextField
                    required
                    id="branchName"
                    label="Branch Name "
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={addFormData.branchName}
                    onChange={handleBrNameChange} />
                  {brNameError && <span style={{ color: 'red', fontSize: 12 }}>{brNameError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required
                    id="managerName"
                    label="Name of Manager"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={addFormData.managerName}
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
                    value={addFormData.contactNo}
                    onChange={handleContactNumberChange} />
                  {contactNumberError && <span style={{ color: 'red', fontSize: 12 }}>{contactNumberError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="Addrs"
                    label="Address"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={addFormData.address}
                    onChange={handleAddressChange} />
                  {addressError && <span style={{ color: 'red', fontSize: 12 }}>{addressError}</span>}

                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="Email"
                    label="Email"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={addFormData.email}
                    onChange={handleEmailChange} />
                  {emailError && <span style={{ color: 'red', fontSize: 12 }}>{emailError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="nofappnmntsPerHr"
                    label="No. of Appointments Per Hour"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={addFormData.nofappnmntsPerHr}
                    onChange={handleAptmntHrsChange} />
                </div>
                {hrsError && <span style={{ color: 'red', fontSize: 12 }}>{hrsError}</span>}

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="nofworkinghrsPerDay"
                    label="No. of Working Hours Per Day"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={addFormData.nofworkinghrsPerDay}
                    onChange={handleWorkingHrsChange} />
                </div>
                {whrsError && <span style={{ color: 'red', fontSize: 12 }}>{whrsError}</span>}

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="daysopen"
                    label="Days Open "
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={addFormData.daysopen}
                    onChange={handleOpenDaysChange} />
                  {opdaysError && <span style={{ color: 'red', fontSize: 12 }}>{opdaysError}</span>}

                </div>
                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="Username"
                    label="Branch Username"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={addFormData.username}
                    onChange={handleUsernameChange}
                    />
                  {usernameError && <span style={{ color: 'red', fontSize: 12 }}>{usernameError}</span>}

                </div>
                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="Password"
                    label="Branch Password"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={addFormData.password}
                    onChange={handlePasswordChange} 
                   />
                  {passwordError && <span style={{ color: 'red', fontSize: 12 }}>{passwordError}</span>}

                </div>

              </DialogContent>

              <DialogActions>
                <Button onClick={handleAddFormClose}>Cancel</Button>

                <Button onClick={handleAddFormSubmit}>Done</Button>
              </DialogActions>
            </Dialog>                       
          </div>
          <div>
          <Dialog open={openTimeSlotDialog}
              onClose={handleCloseTimeSlotDialog}
               maxWidth="sm" fullWidth>
              <DialogTitle>
                <Typography style={{ fontWeight: "bold", textAlign: "center" }}>Enter Dates and Time Slots</Typography>
              </DialogTitle>
              <DialogContent>
                <div>
                  <div>
                    <TextField
                      select
                      label="Select Dates"
                      value=""
                      onChange={(e) => handleAddDate(e.target.value)}
                      style={{ marginRight: "10px", width: "150px" }}
                    >
                      {availableDates
                        .filter(
                          (date) =>
                            !selectedDates.some(
                              (selectedDate) =>
                                formatDate(selectedDate.date) ===
                                formatDate(date)
                            )
                        )
                        .map((date) => (
                          <MenuItem key={date} value={date}>
                            {formatDate(date)}
                          </MenuItem>
                        ))}
                    </TextField>
                  </div>

                  {selectedDates.map((dateObj, dateIndex) => (
                    <div key={dateIndex}>
                      <Typography variant="subtitle1">
                        Date: {formatDate(dateObj.date)}
                        <IconButton
                          onClick={() => handleDeleteDate(dateIndex)}
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                      </Typography>
                      {dateObj.timeSlots.map((timeSlot, timeSlotIndex) => (
                        <Box
                          key={timeSlotIndex}
                          sx={{ display: "flex", alignItems: "center", mt: 1 }}
                        >
                          <TextField
                            label="Start Time"
                            value={timeSlot.start}
                            onChange={(e) =>
                              handleTimeSlotChange(
                                dateIndex,
                                timeSlotIndex,
                                "start",
                                e.target.value
                              )
                            }
                            style={{ marginRight: "10px", width: "150px" }}
                            select
                            SelectProps={{
                              displayEmpty: true,
                              renderValue: (value) => (value === "" ? "" : value),
                            }}
                            variant="outlined"
                          >
                            {timeSlotOptions
                              .filter(
                                (option) =>
                                  option !== timeSlot.end &&
                                  !dateObj.timeSlots.some((ts) => ts.start === option)
                              )
                              .map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                          </TextField>
                          <TextField
                            label="End Time"
                            value={timeSlot.end}
                            onChange={(e) =>
                              handleTimeSlotChange(
                                dateIndex,
                                timeSlotIndex,
                                "end",
                                e.target.value
                              )
                            }
                            style={{ marginRight: "10px", width: "150px" }}
                            select
                            SelectProps={{
                              displayEmpty: true,
                              renderValue: (value) => (value === "" ? "" : value),
                            }}
                            variant="outlined"
                          >
                            {timeSlotOptions
                              .filter(
                                (option) =>
                                  option !== timeSlot.start &&
                                  timeSlotOptions.indexOf(option) >
                                    timeSlotOptions.indexOf(timeSlot.start) &&
                                  !dateObj.timeSlots.some((ts) => ts.end === option)
                              )
                              .map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                          </TextField>
                          <IconButton
                            onClick={() =>
                              handleDeleteTimeSlot(dateIndex, timeSlotIndex)
                            }
                          >
                            <DeleteRoundedIcon />
                          </IconButton>
                        </Box>
                      ))}
                      <IconButton
                        onClick={() => handleAddTimeSlot(dateIndex)}
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={saveBranchAvailability}>Save</Button>
                <Button onClick={handleCloseTimeSlotDialog}>Close</Button>
              </DialogActions>
            </Dialog>
          </div>

          {/* editForm Dialog*/}

<div>

<Dialog open={editFormOpen} onClose={handleEditFormClose}>
              <DialogTitle className={styleset.DialogTitle} textAlign="center">
                <h4 >  Edit Branch details</h4>
              </DialogTitle>

              <DialogContent>
                <div className={styleset.bodyTextbox}>
                  <TextField
                    required
                    id="branchName"
                    label="Branch Name "
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={editFormData.branchName}
                    onChange={handleEditFormChange} />
                  {brNameError && <span style={{ color: 'red', fontSize: 12 }}>{brNameError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required
                    id="managerName"
                    label="Name of Manager"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={editFormData.managerName}
                    onChange={handleEditFormChange} />
                  {manNameError && <span style={{ color: 'red', fontSize: 12 }}>{manNameError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required
                    id="Cntct"
                    label="Contact No"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={editFormData.contactNo}
                    onChange={handleEditFormChange} />
                  {contactNumberError && <span style={{ color: 'red', fontSize: 12 }}>{contactNumberError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="Addrs"
                    label="Address"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={editFormData.address}
                    onChange={handleEditFormChange} />
                  {addressError && <span style={{ color: 'red', fontSize: 12 }}>{addressError}</span>}

                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="Email"
                    label="Email"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={editFormData.email}
                    onChange={handleEditFormChange} />
                  {emailError && <span style={{ color: 'red', fontSize: 12 }}>{emailError}</span>}
                </div>

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="nofappnmntsPerHr"
                    label="No. of Appointments Per Hour"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={editFormData.nofappnmntsPerHr}
                    onChange={handleEditFormChange} />
                </div>
                {hrsError && <span style={{ color: 'red', fontSize: 12 }}>{hrsError}</span>}

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="nofworkinghrsPerDay"
                    label="No. of Working Hours Per Day"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={editFormData.nofworkinghrsPerDay}
                    onChange={handleEditFormChange} />
                </div>
                {whrsError && <span style={{ color: 'red', fontSize: 12 }}>{whrsError}</span>}

                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="daysopen"
                    label="Days Open "
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={editFormData.daysopen}
                    onChange={handleEditFormChange} />
                  {opdaysError && <span style={{ color: 'red', fontSize: 12 }}>{opdaysError}</span>}

                </div>
                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="username"
                    label="Branch Username"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={editFormData.username}
                    onChange={handleUsernameChange}
                    />
                  {usernameError && <span style={{ color: 'red', fontSize: 12 }}>{usernameError}</span>}

                </div>
                <div className={styleset.bodyTextbox}>
                  <TextField
                    required id="password"
                    label="Branch Password"
                    variant="outlined"
                    sx={{ width: '100vw' }}
                    value={editFormData.password}
                    onChange={handlePasswordChange} 
                   />
                  {passwordError && <span style={{ color: 'red', fontSize: 12 }}>{passwordError}</span>}

                </div>

              </DialogContent>

              <DialogActions>
                <Button onClick={handleEditFormClose}>Cancel</Button>

                <Button onClick={handleEditFormSubmit}>Done</Button>
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
                          <IconButton aria-label="" onClick={() => handleEditFormOpen(i)}>
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip arrow placement="left" title="Delete">
                          <IconButton aria-label="" onClick={() => handleOnDelete(i)}>
                            <DeleteRoundedIcon color="primary" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip arrow placement="left" title="Add Time Slot">
                          <IconButton aria-label="" onClick={() => handleOpenTimeSlotDialog(row._id)}>
                            <ScheduleRoundedIcon color="primary" />
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
      {error && (
        <Alert severity="error" onClose={handleCloseError}>
          {error}
        </Alert>
      )}
    </div >
  );
}
