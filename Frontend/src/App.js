import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import NavBar from "./NavBar";
import {Signin} from "./component/SigninPage/Signin";
import {Reg} from "./component/RegistrationPage/Reg";
import FPw from "./component/FPwPage/FPw";


function App() {
 
  return (
    <div>
      <Reg/>
    </div>
  );
}

export default App;
