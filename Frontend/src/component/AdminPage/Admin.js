import React, {useState, useEffect} from "react";
import styles from './Admin.module.css';
import { Paper, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";


export default function Admin(){
   
    const[signUpDetails, setSignUpDetails] =useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [serviceProviderName, setServiceProviderName] =useState("");
    const [email, setEmail] =useState("");
    const [regNo, setRegNo] =useState("");
    const [status, setStatus] =useState("");
    const handleStatusChange = (event) => {
        const value = event.target.value;
        setStatus(value);
    };

    const [openAcceptedDialog, setOpenAcceptedDialog] = useState(false);
    const [openRejectedDialog, setOpenRejectedDialog] = useState(false);
    const [acceptedRecords, setAcceptedRecords] = useState([]);
    const [rejectedRecords, setRejectedRecords] = useState([]);

    const handleAcceptedDialogOpen = () => {
        setOpenAcceptedDialog(true);
    };
    const handleAcceptedDialogClose = () => {
        setOpenAcceptedDialog(false);
    };
    const handleRejectedDialogOpen = () => {
        setOpenRejectedDialog(true);
    };
    const handleRejectedDialogClose = () => {
        setOpenRejectedDialog(false);
    };

    useEffect(() => {
        getSignUpDetails();
        getAccepted();
        getRejected();
    }, []);

    const getSignUpDetails = () => {
        axios.get("http://localhost:8070/SignUpDetails/")
            .then((res) => {
                setSignUpDetails(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const  getAccepted = () => {
        axios.get("http://localhost:8070/SignUpDetails/accepted")
            .then((res) => {
                setAcceptedRecords(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getRejected = () => {
        axios.get("http://localhost:8070/SignUpDetails/rejected")
            .then((res) => {
                setRejectedRecords(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };




    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    
      const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    
     
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    
    const currentPageRecords = signUpDetails.slice(startIndex, endIndex);
    
    const updateStatus = (regNo, newStatus) => {
        axios.put(`http://localhost:8070/SignUpDetails/AorR/${regNo}`, { status: newStatus })
            .then((response) => {
                console.log(response.data);
                alert(`Acception OR Rejection Updated`);
                getSignUpDetails(); // Refresh the records after updating the status
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            });
    };

    const handleSendCode = (email, regNo) => {
       
          axios.post("http://localhost:8070/SignUpDetails/send-otp", { email  })
            .then((response) => {
                console.log(response);
                alert("Accepted Email sent");
                updateStatus(regNo, "accepted");
            })
            .catch((error) => {
             
              console.log(error);
            });
        
    };

    const handleSendRejected = (email, regNo) => {
       
        axios.post("http://localhost:8070/SignUpDetails/send-rejected", { email  })
          .then((response) => {
              console.log(response);
              alert("Rejected Email sent");
              updateStatus(regNo, "rejected");
              
          })
          .catch((error) => {
           
            console.log(error);
          });
      
    };

    return(
        <div className={styles.AdContainer}>
            <Paper elevation={6} className={styles.pDiv}>
                <div className={styles.AdTitle}>
                    <h1>Registration Number Verification</h1>
                </div>
                {currentPageRecords.map((provider) => (
                    <Box key={provider._id} className={styles.dContainer}>
                        <div>
                        <div className={styles.grid}>
                            <div className={styles.label}>Service Provider Name &nbsp; :</div>
                            <div id="serviceProviderName">{provider.serviceProviderName}</div>
                            
                            <div className={styles.label}>Email &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  :</div>
                            <div id="email">{provider.email}</div>
                            
                            <div className={styles.label}>Registration No &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :</div>
                            <div id="regNo">{provider.regNo}</div>
                        </div>
                            <div className={styles.SButton}>
                                <Button variant="contained" sx={{mr:'20px'}} id="status" onChange={handleStatusChange}
                                onClick={() => handleSendCode(provider.email, provider.regNo)}>Accept</Button>
                                <Button variant="contained" sx={{mr:'20px'}} id="status" onChange={handleStatusChange}
                                 onClick={() => handleSendRejected(provider.email, provider.regNo)}>Reject</Button>
                            </div>
                            
                        
                        </div>
                    </Box>
                ))}

               <div>
               <div className={styles.pageNumber}>Page Number {currentPage}</div>
                <div className={styles.AorRB}>
                <Button variant="text" sx={{ mr: "20px" }}
                onClick={handleAcceptedDialogOpen}>
                Accepted Records</Button>
                <Button variant="text"
                onClick={handleRejectedDialogOpen}>
                Rejected Records</Button>
                </div>
               
                <Dialog open={openAcceptedDialog} onClose={handleAcceptedDialogClose} fullWidth>
                    <DialogTitle><div className={styles.AorRD}>Accepted Records</div></DialogTitle>
                    <DialogContent>
                    <List>
                    {acceptedRecords.map((provider) => (
                    <ListItem key={provider._id}>
                    <ListItemText primary={provider.serviceProviderName}
                    secondary={
                        <>
                        <div>{`Email: ${provider.email}`}</div>
                        <div>{`Registration No: ${provider.regNo}`}</div>
                        </>
                    }/>
                    </ListItem>
                    ))}
                    </List>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleAcceptedDialogClose}>Close</Button>
                    </DialogActions>
                </Dialog>

                
                <Dialog open={openRejectedDialog} onClose={handleRejectedDialogClose} fullWidth>
                    <DialogTitle><div className={styles.AorRD}>Rejected Records</div></DialogTitle>
                    <DialogContent>
                    <List>
                    {rejectedRecords.map((provider) => (
                    <ListItem key={provider._id}>
                    <ListItemText primary={provider.serviceProviderName}
                    secondary={
                        <>
                        <div>{`Email: ${provider.email}`}</div>
                        <div>{`Registration No: ${provider.regNo}`}</div>
                        </>
                    }/>
                    </ListItem>
                    ))}
                    </List>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleRejectedDialogClose}>Close</Button>
                    </DialogActions>
                </Dialog>

               <div className={styles.pagination}>
               
                    {currentPage > 1 && (
                        <Button variant="contained" sx={{mr:'20px'}} onClick={handlePreviousPage}>
                        Back
                        </Button>
                    )}
                    {endIndex < signUpDetails.length && (
                        <Button variant="contained" sx={{mr:'20px'}} onClick={handleNextPage}>
                        Next
                        </Button>
                    )}
                </div>
                </div>

            </Paper>
        </div>
    )
} 