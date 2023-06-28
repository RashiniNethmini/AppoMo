import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import styles from './FirstPage.module.css';
import FirstPageImage from './FirstPageImage.png';

export default function FirstPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: 20 }}>
      <div style={{ marginRight: 5 }}>
        <Link to='/Reg'><Button variant="contained" size="large">Sign Up</Button></Link>
      </div>
      <div style={{ marginRight: 5 }}>
        <Link to='/TwoSignIn'><Button variant="contained" size="large">Sign In</Button></Link>
      </div>
     
      <div className={styles.mainContainer}>
        <Paper elevation={6} className={styles.paper}>
          <div className={styles.description}>
            <div className={styles.heading}>
              <h3>Welcome to,</h3>
              <div className={styles.titles1}>
                <br /><h1>AppoMo</h1>
              </div>
            </div>
            <p>
              The ultimate appointment management system designed exclusively for electronic device repairing companies. With our intuitive web application, you can effortlessly view customer issues and accept them with just a few clicks. Stay organized and never miss a beat as you keep track of scheduled appointments made by your valuable customers. Dive deeper into the details and effortlessly manage payments related to appointments. Experience the convenience and efficiency of AppoMo, your one-stop solution for streamlined appointment management.
            </p>
          </div>
          <div className={`${styles.imageContainer} image-container`}>
            <img src={FirstPageImage} width={500} alt="AppoMo" />
          </div>
        </Paper>
      </div>
    </div>
  );
}
