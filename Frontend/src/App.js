import React, { useState } from "react";
import './App.css';

import { Signin } from "./component/SigninPage/Signin";
import { Reg } from "./component/RegistrationPage/Reg";
import FPw from "./component/FPwPage/FPw";
import BrUpdate from "./component/BranchUpdate/BrUpdate";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Termination from "./Pages/Termination/Termination";
import FirstPage from "./Pages/FirstPage/FirstPage";
import TwoSignIn from "./Pages/TwoSignIn/TwoSignIn";
import BranchSignin from "./component/BranchSignin/BranchSignin";
import RPw from "./component/ResetPwPage/RPw";
import Admin from "./component/AdminPage/Admin";
import SignUp from "./component/SignUpPage/SignUp";

import ProviderType from "./component/ProviderTypePage/ProviderType";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard"
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './component/NavBar';
import AppointmentConfirm from "./Pages/AppoinmentConfirm/AppointmentConfirm";
import { deepmerge } from '@mui/utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const theme = createTheme({
  palette: {
    primary: {
      main: '#084C4F'
    },
    secondary: {
      main: '#0C6D71'
    },
    info: {
      main: '#042A2C'
    },
    success: {
      main: '#108F94'
    }

  }
})

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>

    {/* <Router> */}
    {/* <EditProfile/> */}
   
      {/* <NavBar/> */}
      {/* <Routes> */}
      
      {/* <Route path='/' exact element={<FirstPage/>} />
        <Route path='/Reg' exact element={<Reg/>} />
        <Route path='/TwoSignIn' exact element={<TwoSignIn/>} />
        <Route path='/BranchSignin' exact element={<BranchSignin/>} />
        <Route path='/Dashboard' element={<Dashboard/>} />
        <Route path='/AppointmentConfirm' element={<AppointmentConfirm/>} />
        <Route path='/BrUpdate/:objectId' element={<BrUpdate/>} />
        <Route path='/EditProfile' element={<EditProfile/>} />
        <Route path='/ResetPassword' element={<ResetPassword/>} />
        <Route path='/Signin' element={<Signin/>} /> 
         {/* <Route path='/events' component={Events} />
        <Route path='/annual' component={AnnualReport} /> */}
       {/* <Route path='/team' component={Teams} />
        <Route path='/blogs' component={Blogs} />
        <Route path='/sign-up' component={SignUp} /> */}
      {/* </Routes> */}
    {/* </Router> */}
    {/* <Signin/>
    <BrUpdate/>
    <AppointmentConfirm/> */}
      {/* </Routes>
    </Router> */}
    {/* <Signin/> */}
    {/* <Reg/> */}
    {/* <FPw/>
    <RPw/> */}
    {/* <Admin/>
    <SignUp/>
    <AppointmentConfirm/>
    <Termination/>
    <AppointmentConfirm/> */}
    </ThemeProvider>
    {/* <BrUpdate/> */}
    {/* <AppointmentConfirm/> */}
    {/* </ThemeProvider> */}

    </div>
  );


}

export default App;
