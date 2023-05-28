import React,{useState} from 'react';
import './editprofile.css';
import {Avatar,Stack,TextField,Paper,Button} from '@mui/material';
import validator from 'validator';


export default function EditProfile() {
  const [Error0, setErr0] = useState("");
  const [Error1, setErr1] = useState("");
  const [Error2, setErr2] = useState("");
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setemail] = useState('');
  const [valid, validity] = useState('');



  const NAme=(evnt)=>{
    const nameInputValue = evnt.target.value.trim();
    if(nameInputValue===''){
      setErr0("**required");
     
    }else{
      setErr0("");
  
    }
  } 

  const Addr=(evnt)=>{
    const addressInputValue = evnt.target.value.trim();
    if(addressInputValue===''){
      setErr1("**required");
     
    }else{
      setErr1("");
  
    }
  } 

  

const validateEmail = (e) => {
    validity(false);
    var Email = e.target.value;
    if (validator.isEmail(Email)) {
      setErr2('Valid Email');
      validity(true);
      
    } else {
      setErr2('Enter valid Email..!');
      validity(false);
    }

    if(Email===''){
      setErr2("**required");
      
     
    }
  
  }


  return (
    <div className='edit'>
      <Paper elevation={6} className="editPaper">
        <div classname="editform" style={{padding:"10px"}}>
            <div className='editdetailslogo' >
                <div>Change Logo</div>&nbsp;&nbsp;
                <div>
                <Avatar src="./avatar.jpg" variant="contained" component="label" display="flex" justify-content="center" align="center" sx={{ width: 100, height: 100 }}>
                    <input hidden accept="image/*" multiple type="file" />  
                    </Avatar>
                </div>
            </div> 
            
           
              <div  className='editdetails'>
                <label>Company Name&nbsp;</label><TextField size='small' value={address}
              onChange={event => setAddress(event.target.value)} onKeyUp={NAme} />&nbsp;&nbsp;&nbsp;&nbsp;
              <p className="text-danger">{Error0}</p>
              </div><br/>
              <div className='editdetails'>
              <label>Address&nbsp;</label><TextField size='small' value={name}
              onChange={event => setName(event.target.value)} onKeyUp={Addr}/>&nbsp;&nbsp;&nbsp;&nbsp;
               <p className="text-danger">{Error1}</p>
              </div> <br/>
              <div  className='editdetails'>
                <label>Email&nbsp;</label><TextField size='small' value={email}
                onChange={event => setemail(event.target.value)}
                // onKeyUp={(e) => validateEmail(e)} 
                onKeyUp={validateEmail}

                />&nbsp;&nbsp;&nbsp;&nbsp;
                <p className="text-danger">{Error2}</p>
              </div><br/>
              <div  className='editdetails'>
                <label>CEO Name&nbsp;</label><TextField size='small' />
              </div>
                
              <br/>
              <div  className='editdetails'>
                <label>Weekdays-Open&nbsp;</label><TextField size='small' />&nbsp;<TextField size='small' /> &nbsp;&nbsp;&nbsp;&nbsp;
                <label>Working Hours Per Day&nbsp;</label><TextField size='small' />
              </div><br/>
              
              <div  className='editdetails'>
                <label>No of Appointments per hour&nbsp;</label><TextField size='small' />
              </div><br/>
             
              <div  className='editdetailsButton'>
                <Stack spacing={2} direction="row">
                      <Button variant="contained" disabled={!(name && address && email && valid)}>SAVE CHANGES</Button>
                      <Button variant="contained">CANCEL</Button>

                </Stack>
       
              </div>

            </div>
      </Paper>
  </div>
  

  );
}
