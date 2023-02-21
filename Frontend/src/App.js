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



function App() {
 
  return (
    <div className="App">
      
    
    <BrUpdate/>
    <FormBr/>

    </div>
  );
}

export default App;
