import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {nanoid} from "nanoid";
import { Signin } from "./component/SigninPage/Signin";
import { Reg } from "./component/RegistrationPage/Reg";
import FPw from "./component/FPwPage/FPw";
import BrUpdate from "./component/BranchUpdate/BrUpdate";
import FormBr from "./component/BranchUpdate/FormBr";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Dashboard from "./Pages/Dashboard/Dashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./component/NavBar/NavBar";

import AppointmentConfirm from "./Pages/AppoinmentConfirm/AppointmentConfirm";
import { deepmerge } from "@mui/utils";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#084C4F",
    },
    secondary: {
      main: "#0C6D71",
    },
    info: {
      main: "#042A2C",
    },
    success: {
      main: "#108F94",
    },
  },
});

function App() {
  return (
      <div className="App">
        <ThemeProvider theme={theme}>
         <AppointmentConfirm />
         
        <FormBr />
        
        
          <FPw/>
          <Signin/>
          <Reg/>
          <BrUpdate/>
        
     
      <ResetPassword/>
      <EditProfile/> 
      
      <Dashboard/>
      </ThemeProvider>
      
   
  </div>  
    
  );
}

export default App;
//<AppointmentConfirm />
//<Reg/>
//   