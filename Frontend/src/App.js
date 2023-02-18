import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import NavBar from "./NavBar";
import {Signin} from "./component/SigninPage/Signin";
import {Reg} from "./component/RegistrationPage/Reg";
import FPw from "./component/FPwPage/FPw";
import BranchUpdate from "./BranchUpdate"
import Table from "./Table";
import BrUpdate from "./BrUpdate";
import FormBr from "./component/FormBr"
import AppointmentConfirm from "./Pages/AppoinmentConfirm/AppointmentConfirm";
import { deepmerge } from '@mui/utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main:'#084C4F'
    },
    secondary: {
      main:'#0C6D71'
  },
  info: {
    main:'#042A2C'
  },
  success: {
    main:'#108F94'
  }

}
})
function App() {
 
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <AppointmentConfirm/>
      <FormBr/>
      </ThemeProvider>
    </div>
  );
}

export default App;
