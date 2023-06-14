import React, { useState } from "react";
import styles from './Termination.module.css';
import { Paper, TextField, RadioGroup, Radio, FormControlLabel, Button } from "@mui/material";
import axios from 'axios';

function Termination() {
  const AptNumber = 1; // Assuming AptNumber is defined elsewhere
  const Name = 'Gimhani';
  const ContactNo = 774423315;
  const InvoiceNo = '2065';
  const Product = 'Phone';
  const IssueInBrief = 'Broken';
  const ApntmntDate = '2023-06-10';
  const Time = '08:00-09:00';
  const [completed, setCompleted] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  const [showInvoice, setShowInvoice] = useState(false); // New state for showing/hiding the invoice

  const handleUpdate = async () => {
    try {
      const updateFields = {
        Name,
        ContactNo,
        InvoiceNo,
        Product,
        IssueInBrief,
        ApntmntDate,
        Time,
        //FinalAmount: finalAmount,
        Completed: true
      };

      await axios.put(`http://localhost:8070/Appointments/update/${AptNumber}`, updateFields);
      alert('Details updated successfully');
      setCompleted(true); // Update the local state
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleInvoice = async () => {
    try {
      const invoiceDetails = {
        Name,
        ContactNo,
        InvoiceNo,
        Product,
        IssueInBrief,
        ApntmntDate,
        Time,
        FinalAmount: finalAmount
      };
      // Here, you can send the invoiceDetails to your backend or perform any other necessary actions
      console.log(invoiceDetails);
      alert('Invoice generated successfully');
      setShowInvoice(true); // Show the invoice section
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

  const InvoiceSection = () => {
    if (showInvoice) {
      return (
        <div>
          <h2>Invoice Details</h2>
          <p>Name: {Name}</p>
          <p>Contact No: {ContactNo}</p>
          <p>Invoice No: {InvoiceNo}</p>
          <p>Product: {Product}</p>
          <p>Issue in Brief: {IssueInBrief}</p>
          <p>Appointment Date: {ApntmntDate}</p>
          <p>Time: {Time}</p>
          <p>Final Amount: {finalAmount}</p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Paper elevation={6} className={styles.paperDiv}>
        <div className={styles.bodyMain}>
          <div className={styles.radioBoxContainer}>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" >
              <FormControlLabel value="Completed" control={<Radio />} label="Repairment is completed" />
              <FormControlLabel value="NotCompleted" control={<Radio />} label="Repairment is not completed" />
            </RadioGroup>
          </div>
          <div className={styles.buttonMain}>
            <Button variant="contained" sx={{ mr: '10px' }} onClick={handleUpdate}>Send message to the customer</Button>
          </div>
          <div className={styles.bodyTextbox}>
            <TextField id="outlined-basic" label="Total Amount : LKR " value={finalAmount} variant="outlined" sx={{ width: '100vw' }} />
          </div>
          <div className={styles.buttonMain}>
            <Button variant="contained" sx={{ mr: '10px' }} onClick={handleInvoice}>Generate Invoice</Button>
          </div>
          <InvoiceSection /> {/* Display the invoice section */}
        </div>
      </Paper>
    </div>
  )
}

export default Termination;
