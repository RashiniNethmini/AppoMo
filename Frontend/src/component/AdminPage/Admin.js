import React, {useState, useEffect} from "react";
import styles from './Admin.module.css';
import { Paper, Button, Box} from "@mui/material";
import axios from "axios";


export default function Admin(){
   
    const[signUpDetails, setSignUpDetails] =useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [email, setEmail] = useState("");

    useEffect(() => {
        getSignUpDetails();
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

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    
      const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    
     
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    
    const currentPageRecords = signUpDetails.slice(startIndex, endIndex);
    
    const handleSendCode = (email) => {
       
          axios.post("http://localhost:8070/SignUpDetails/send-otp", { email  })
            .then((response) => {
                console.log(response);
                alert("Email send")
                
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
                            <div>{provider.serviceProviderName}</div>
                            
                            <div className={styles.label}>Email &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  :</div>
                            <div id="email">{provider.email}</div>
                            
                            <div className={styles.label}>Registration No &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :</div>
                            <div>{provider.regNo}</div>
                        </div>
                            <div className={styles.SButton}>
                                <Button variant="contained" sx={{mr:'20px'}} onClick={() => handleSendCode(provider.email)}>Accept</Button>
                                <Button variant="contained" sx={{mr:'20px'}}>Reject</Button>
                            </div>
                            
                        
                        </div>
                    </Box>
                ))}

               <div>
               <div className={styles.pageNumber}>Page Number {currentPage}</div>
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