import React, { useState, useEffect } from "react";
import styles from './Termination.module.css';
import { Paper, TextField,  Button } from "@mui/material";
import { Email } from "@mui/icons-material";
import axios from 'axios';

function Termination() {

  const CusName ='Yuyuii';
  const AptNumber = 1;

  const [emailAddress, setEmailAddress] = useState("uththaragvg.20@uom.lk");
  const [Name, setName] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [InvoiceNo, setInvoiceNo] = useState('');
  const [Product, setProduct] = useState('');
  const [IssueInBrief, setIssueInBrief] = useState('');
  const [finalAmount, setFinalAmount] = useState('');
  const [isInvoiceButtonDisabled, setIsInvoiceButtonDisabled] = useState(true);
  const [isSendMessageButtonDisabled, setIsSendMessageButtonDisabled] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false); // New state for showing/hiding the invoice
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Issues/get/${CusName}`);
        const data = response.data;
        setName(data.Name);
        setContactNo(data.ContactNo);
        setInvoiceNo(data.InvoiceNo);
        setProduct(data.Product);
        setIssueInBrief(data.IssueInBrief);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleFinalAmountChange = (e) => {
    const input = e.target.value;
    if (/^[0-9.]*$/.test(input)) {
      setFinalAmount(input);
    }
  };

  const handlePaidChange = (event) => {
    setIsPaid(event.target.checked);
  };
  
  const handleSendMessage = async () => {
    try {
      // Perform the necessary actions to send the message to the customer
  
      // Update the finalAmount in the Appointment table
      await axios.put(`http://localhost:8070/Appointments/updateFinalAmount/${AptNumber}`, { finalAmount });
      alert('Final amount updated successfully');
    } catch (error) {
      console.error('Error sending message to the customer:', error);
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


  const handleSendEmail = () => {
    const invoiceHTML = generateInvoiceHTML(); // Generate the HTML content for the invoice
  
    // Make a POST request to the backend endpoint
    axios
      .post(`http://localhost:8070/Invoice/send-invoice`, {
        email: emailAddress, // Updated the variable name
        invoiceHTML: invoiceHTML, // HTML content of the invoice
      })
      .then((response) => {
        console.log(response);
        alert('Email sent');
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to send email');
      });
  };
  
  useEffect(() => {
    const isAmountValid = /^[0-9.]*$/.test(finalAmount);
    setIsInvoiceButtonDisabled(!isAmountValid || finalAmount === '');
    setIsSendMessageButtonDisabled(!isAmountValid || finalAmount === '');
  }, [finalAmount]);
  
  const generateInvoiceHTML = (AptNumber, Name, ContactNo, InvoiceNo, Product, IssueInBrief, finalAmount) => {
    const invoiceDetails = `
      <html>
        <head>
          <style>
            /* Add the CSS styles for the invoice here */           
            .invoiceDetails {
              margin-top: 20px;
            }
  
            .label {
              font-weight: bold;
            }
  
            .buttonMain {
              display: flex;
              justify-content: center;
              margin-top: 20px;
            }
  
            .invoiceTable {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
  
            .invoiceTable td {
              padding: 8px;
            }
  
            .invoiceTable .label {
              font-weight: bold;
              width: 200px;
            }
          </style>
        </head>
        <body>
          <table class="invoiceTable">
            <tr>
              <td class="label">Appointment No:</td>
              <td>${AptNumber}</td>
            </tr>
            <tr>
              <td class="label">Name:</td>
              <td>${Name}</td>
            </tr>
            <tr>
              <td class="label">Contact No:</td>
              <td>${ContactNo}</td>
            </tr>
            <tr>
              <td class="label">Invoice No:</td>
              <td>${InvoiceNo}</td>
            </tr>
            <tr>
              <td class="label">Product:</td>
              <td>${Product}</td>
            </tr>
            <tr>
              <td class="label">Issue in Brief:</td>
              <td>${IssueInBrief}</td>
            </tr>
            <tr>
              <td class="label">Final Amount: LKR</td>
              <td>${finalAmount}</td>
            </tr>
          </table>
        </body>
      </html>
    `;
    return invoiceDetails;
  };
  
  const InvoiceSection = () => {
    if (showInvoice) {
      const invoiceHTML = generateInvoiceHTML(AptNumber, Name, ContactNo, InvoiceNo, Product, IssueInBrief, finalAmount);
    
      return (
        <div className={styles.invoiceContainer}>
          <h2 className={styles.invoiceTitle}>Invoice Details</h2>
          <div dangerouslySetInnerHTML={{ __html: invoiceHTML }}></div>
          <div className={styles.buttonMain}>
            <Button
              variant="contained"
              sx={{ mr: '10px' }}
              onClick={handleSendEmail}>
              <Email />
              Send Email
            </Button>
          </div>
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
          <div className={styles.bodyTextbox}>
            <TextField
              id="outlined-basic"
              label="Appointment Number"
              value={AptNumber}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </div>   
          <div className={styles.bodyTextbox}>
            <TextField
              id="outlined-basic"
              label="Name"
              value={Name}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div className={styles.bodyTextbox}>
            <TextField
              id="outlined-basic"
              label="Contact No"
              value={ContactNo}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />        
          </div>
          <div className={styles.bodyTextbox}>
            <TextField
              id="outlined-basic"
              label="Invoice No"
              value={InvoiceNo}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />          
          </div>
          <div className={styles.bodyTextbox}>
            <TextField
              id="outlined-basic"
              label="Product"
              value={Product}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />  
          </div>
          <div className={styles.bodyTextbox}>
            <TextField
              id="outlined-basic"
              label="Issue in Brief"
              value={IssueInBrief}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />         
          </div>
          <div className={styles.bodyTextbox}>
            <TextField
              id="outlined-basic"
              label="Total Amount : LKR"
              value={finalAmount}
              variant="outlined"
              fullWidth
              onChange={handleFinalAmountChange}
              error={!/^[0-9.]*$/.test(finalAmount)}
              helperText={!/^[0-9.]*$/.test(finalAmount) && 'Only numbers and "." are allowed'}
            />
          </div>
          <div className={styles.buttonMain}>
            <Button
              variant="contained"
              sx={{ mr: '10px' }}
              onClick={handleSendMessage}
              disabled={isSendMessageButtonDisabled}
            >Send message to the customer</Button>
          </div>
          <div className={styles.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                checked={isPaid}
                onChange={handlePaidChange}
                color="primary"
                inputProps={{ "aria-label": "Paid checkbox" }}
              />
              Paid
            </label>
          </div>         
          <div className={styles.buttonMain}>
            <Button
              variant="contained"
              sx={{ mr: '10px' }}
              onClick={handleInvoice}
              disabled={!isPaid || isInvoiceButtonDisabled}
            >Generate Invoice</Button>
          </div>
          <InvoiceSection /> {/* Display the invoice section */}
        </div>
      </Paper>
    </div>
  )
}

export default Termination;
