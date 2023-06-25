import React, {useState, useEffect} from "react";
import styles from './Signin.module.css';
import { Paper, TextField, Button, Link,InputAdornment, IconButton} from "@mui/material";
import { maxWidth } from "@mui/system";
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'


function validateUsername(username){
    
    const lengthURegex = /^.{3,16}$/; // ensure that the username is between 3 and 16 characters long.
    const contentRegex = /^[a-zA-Z0-9_-]*$/; // ensure that the username contains only letters, numbers, underscores, or hyphens.
    
    if(username.trim()===""){
        return "Username is required.";
    }else if (!lengthURegex.test(username)){
        return "Username must be in between 3 and 16 characters long.";
    } else if (!contentRegex.test(username)){
        return "Username must contain only letters, numbers, underscores, or hyphens.";
    }
};
function validatePassword(password) { 
    
    const uppercaseRegex = /^(?=.*[A-Z])/; // ensure that the password contains at least one uppercase letter.
    const lowercaseRegex = /^(?=.*[a-z])/; // ensure that the password contains at least one lowercase letter.
    const numberRegex = /^(?=.*\d)/; // ensure that the password contains at least one number.
    const specialCharRegex = /^(?=.*[!@#$%&+*^()_])/; // ensure that the password contains at least one of the following symbols: !@#$%&+*^()_.
    const lengthPRegex = /^.{8,}$/; // ensure that the password is at least 8 characters long.
    
    if(password.trim()===""){
        return "Password is required.";
    } else if (!uppercaseRegex.test(password)){
        return "Password must contain at least one uppercase letter.";
    } else if (!lowercaseRegex.test(password)){
        return "Password must contain at least one lowercase letter.";
    } else if (!numberRegex.test(password)){
        return "Password must contain at least one number.";
    } else if (!specialCharRegex.test(password)){
        return "Password must contain at least one of the following symbols: !@#$%&+*^()_.";
    }else if (!lengthPRegex.test(password)){
        return "Password must be at least 8 characters long.";
    }
    
};

export const Signin = (props) => {
    const navigate = useNavigate();


    const [isSignedIn, setIsSignedIn] = useState(false);

    function handleCallbackResponse(response){
        console.log("Encoded JWT ID token: " + response.credential);
   } 
   useEffect(() => {            //Google button.
    if(window.google){
        window.google.accounts.id.initialize({
            client_id: "305172675804-madk45o2f4tr9937pbs05pvpvg8rpii5.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
    
        window.google.accounts.id.renderButton(document.getElementById("signInDiv"), 
            {theme:"outline", size: "large"}); 
    }
   }, []);
   
    const [username, setUsername] =useState("");
    const [usernameError, setUsernameError] = useState(null);
    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        setUsernameError(validateUsername(value));
    };
    const [password, setPassword] =useState("");
    const [passwordError, setPasswordError] = useState(null);
    const handlePasswordChange = (event) => {
      const value = event.target.value;
      setPassword(value);
      setPasswordError(validatePassword(value));
    };

   const [showPassword, setShowPassword] = React.useState(false);
   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleMouseDownPassword = (event) => {
       event.preventDefault();
   };

   const handleSubmit = async (e) => {
    e.preventDefault();
    

    fetch("http://localhost:8070/serviceprovider/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Invalid login");
        }
      })
      .then(data => {
        console.log(data);
        alert("Login Successful");
      })
      .catch(error => {
        console.log(error);
        alert(error.message)
        
      });
      fetch(`http://localhost:8070/serviceprovider/getid/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const objectId = data[0]._id; // Assuming the response from the backend contains the object ID as "_id"
          console.log(objectId);
          navigate(`/BrUpdate/${objectId}`,{objectId});
  
        })
        .catch(error => {
          console.log(error);
        });

  };

  const handleGoogleLoginSuccess = (response) => {
    const { tokenId } = response;
    console.log("Encoded JWT ID token: " + tokenId);
    alert("Google Login Successful")
    // Send the tokenId to the server for verification and further processing
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Google login failed:", error);
  };

    return(
        <div className={styles.signContainer}>
        <Paper elevation={6} className={styles.signpapDiv}>
            <div className={styles.signTitle}>
                <h1>Sign in to AppoMo</h1>
            </div>
            <div>
                <div className={styles.signDiv}>
                    <div className={styles.signBodyText}>
                        <TextField required ="outlined-required" label="Username" variant="outlined" sx={{ width: '100vw' }} id="username"
                            onChange={handleUsernameChange} error={Boolean(usernameError)}
                            helperText={usernameError} />
                    </div>
                    <div className={styles.signBodyText}>
                        <TextField required ="outlined-required" label="Password" variant="outlined" type={showPassword ? 'text' : 'password'} sx={{ width: '100vw' }} id="password"
                            onChange={handlePasswordChange} error={Boolean(passwordError)}
                            helperText={passwordError}
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end">
                                        <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                    </InputAdornment>
                                ),
                          }} />
                    </div> 
                    <div className={styles.signButton}>
                        <Button variant="contained" sx={{mr:'10px'}}  onClick={handleSubmit}>Sign in</Button>
                    </div>
                    <div className={styles.signFPw}>
                        <Link href="#" color="inherit">Forgot Password?</Link>
                    </div> 

                    <div className={styles.signOR}>
                        <p>OR</p>
                    </div> 

                    <div className={styles.signNot}>
                        <p>Not Registered? &nbsp;</p>
                        <Link href="#">Register Now</Link>
                        
                     </div> 
                    <div className={styles.GButton} onClick={handleGoogleLoginSuccess} id="signInDiv"></div> 
                    
                </div>
            </div>
            
            
    
            
        </Paper>
    </div>
    
)
}