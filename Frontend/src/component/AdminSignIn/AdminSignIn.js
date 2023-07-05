import React, { useState } from "react";
import styles from './adminSignIn.module.css';
import { Paper, TextField, Button } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'

function validateUsername(username) {
    if (username.trim() === "") {
        return "Username is required.";
    }
}

function validatePassword(password) {
    if (password.trim() === "") {
        return "Password is required.";
    }
}

const AdminSignIn = (props) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(null);
    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        setUsernameError(validateUsername(value));
        setIsValidCredentials(value === "AppoMoAdmin" && password === "AppoMoAdmin20");
    };

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        setPasswordError(validatePassword(value));
        setIsValidCredentials(username === "AppoMoAdmin" && value === "AppoMoAdmin20");
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [isValidCredentials, setIsValidCredentials] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValidCredentials) {
            alert('Login Successful..!');
            navigate(`/Admin`);
        } else {
            alert('Wrong username or password');
        }
    };

    return (
        <div className={styles.signContainer}>
            <Paper elevation={6} className={styles.signpapDiv}>
                <div className={styles.signTitle}>
                    <h1>Admin Sign In </h1>
                </div>
                <div>
                    <div className={styles.signDiv}>
                        <div className={styles.signBodyText}>
                            <TextField required="outlined-required" label="Username" variant="outlined" sx={{ width: '100vw' }} id="username"
                                onChange={handleUsernameChange} error={Boolean(usernameError)}
                                helperText={usernameError} />
                        </div>
                        <div className={styles.signBodyText}>
                            <TextField required="outlined-required" label="Password" variant="outlined" type={showPassword ? 'text' : 'password'} sx={{ width: '100vw' }} id="password"
                                onChange={handlePasswordChange} error={Boolean(passwordError)}
                                helperText={passwordError}
                                InputProps={{
                                    endAdornment: (
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
                            <Button variant="contained" sx={{ mr: '10px' }} disabled={!isValidCredentials} onClick={handleSubmit}>Sign in</Button>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default AdminSignIn
