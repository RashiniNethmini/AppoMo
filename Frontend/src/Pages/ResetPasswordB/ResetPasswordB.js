import React,{useState,useRef,useEffect} from 'react';
import axios from 'axios';
import './resetPasswordB.css';
import {IconButton,OutlinedInput,InputAdornment,Stack, Button,Paper} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NavBar1 from '../../component/NavBar1';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useParams} from 'react-router-dom';




export default function ResetPassword() {
  const {objectId} = useParams();
  
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordError0, setPasswordErr0] = useState("");
  const [passwordError1, setPasswordErr1] = useState("");
  const [passwordError2, setPasswordErr2] = useState("");
  const [currentPass, setCurrent] = useState('');
  const [cPass, setCP] = useState('');
  const [iPass, setIP] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [match, setmatch] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [data,setData]=useState("");
 
  
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata= async ()=>{
    const data=await axios.get(`http://localhost:8070/BranchDetails/get/${objectId}`);
    setData(data);
    const response = data.data.branchdetail.password;
    setCP(response);
  };


  const handleUpdate = async () => {
    try {
      const updateFields = {
        password
      };
      await axios.put(`http://localhost:8070/BranchDetails/update/${objectId}`,updateFields);
      
      setIP(false);
      setCurrent("");
      setPassword("");
      setConfirm("");
      setPasswordErr0("");
      setPasswordErr0("");
      setPasswordErr0("");
      alert('Password updated successfully');

    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

const CurrentPass=(evnt)=>{
  const currentPasswordInputValue = evnt.target.value.trim();
  setIP(false);
  if(currentPasswordInputValue===cPass){
    setIP(true);
    if(currentPasswordInputValue===''){
      setPasswordErr0("**required");
     
    }
    setPasswordErr0("");

  }
 else {
    // alert(currentPasswordInputValue);
    setPasswordErr0("Incorrect");
    setIP(false);
    if(currentPasswordInputValue===''){
      setPasswordErr0("**required");
     
    }
  }
  
}  


const handleValidation= (evnt)=>{
  const passwordInputValue = evnt.target.value.trim();
  const passwordInputFieldName = evnt.target.name;
      //for password 
if(passwordInputFieldName==='password'){
  const uppercaseRegExp   = /(?=.*?[A-Z])/;
  const lowercaseRegExp   = /(?=.*?[a-z])/;
  const digitsRegExp      = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  const minLengthRegExp   = /.{8,}/;
  const passwordLength =      passwordInputValue.length;
  const uppercasePassword =   uppercaseRegExp.test(passwordInputValue);
  const lowercasePassword =   lowercaseRegExp.test(passwordInputValue);
  const digitsPassword =      digitsRegExp.test(passwordInputValue);
  const specialCharPassword = specialCharRegExp.test(passwordInputValue);
  const minLengthPassword =   minLengthRegExp.test(passwordInputValue);
  let errMsg ="";
  if(passwordLength===0){
          errMsg="**required";
  }else if(!uppercasePassword){
          errMsg="**Please enter at least one Uppercase";
  }else if(!lowercasePassword){
          errMsg="**Please enter at least one Lowercase";
  }else if(!digitsPassword){
          errMsg="**Please enter at least one digit";
  }else if(!specialCharPassword){
          errMsg="**Please enter at least one Special Characters";
  }else if(!minLengthPassword){
          errMsg="**Please enter at least minumum 8 characters";
  }else{
      errMsg="";
  }
  setPasswordErr1(errMsg);
  }
};

const RePass=(evnt)=>{
  const RePasswordInputValue = evnt.target.value.trim();
  if(password!==confirmPassword){
    setPasswordErr2("Not match");
    if(RePasswordInputValue===''){
      setPasswordErr2("**required");
     
    }
    setmatch(false);
  }else{
    if(RePasswordInputValue===''){
      setPasswordErr2("**required");
     
    }
    setPasswordErr2("");
    setmatch(true);
  }
}


// const ref = useRef(null);
const Cancel = () => {
  setIP(false);
  setCurrent("");
  setPassword("");
  setConfirm("");
  setPasswordErr0("");
  setPasswordErr0("");
  setPasswordErr0("");

};



  return (
    <div>
    <NavBar1/>
    <div className='resetPassword'>
   
      <Paper elevation={6} classname="resetPaper" >
          
        <div className='resetForm'>

        {/* {
      data && data?.data.map((a)=>( 
        <text onMouseDown={event=>setCP(a.password)}></text>
       ))} */}
          <div className='resetElement'>
            <label>Enter Current Password &nbsp;</label>
            <OutlinedInput 
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name='currentPass'
                value={currentPass}
              onChange={event => setCurrent(event.target.value)}
                onKeyUp={CurrentPass}
               
                endAdornment={
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
                }
            />
              <p className="text-danger">{passwordError0}</p>        
          </div>
    
          <br/>


          <div>
            <label>Enter New Password &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
               onKeyUp={handleValidation}
                name="password"
                value={password}
              onChange={event => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
             <p className="text-danger">{passwordError1}</p>
            
          </div>
          <br/>



          <div>
            <label>Re-enter New Password &nbsp;</label>
            <OutlinedInput disabled={passwordError1===""?false:true}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              onKeyUp={RePass}
              name="confirmPassword" 
              value={confirmPassword}
              onChange={event => setConfirm(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <p className="text-danger">{passwordError2}</p>
            
          </div>
          <br/>



            <div>
              
              <Stack spacing={2} direction="row">
                  <Button variant="contained" disabled={!(iPass && currentPass && confirmPassword && password && match)}  onClick={handleUpdate}>CHANGE PASSWORD</Button>
                  <Button  onClick={Cancel} variant="contained">CANCEL</Button>
              </Stack>
            </div>
          
        </div> 
        
      
{/*      
    </Box> */}
    </Paper>
    </div>
    </div>
  );
}

