import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './editprofile.css';
import {Avatar,Stack,TextField,Paper,Button} from '@mui/material';
import validator from 'validator';


export default function EditProfile() {
  const [Error0, setErr0] = useState("");
  const [Error1, setErr1] = useState("");
  const [Error2, setErr2] = useState("");
  const [serviceProviderName, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setemail] = useState('');
  const [valid, validity] = useState('');
  const [ceoName, setceo] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  const handleClick = () => {
    // Trigger file input click
    document.getElementById('fileInput').click();
  };


const [data,setData]=useState("");
const Sname = 'ABC';

  useEffect(()=>{
    const fetchdata= async ()=>{
      const data=await axios.get(`http://localhost:8070/serviceprovider/searchE/${Sname}`);
      setData(data);
      setName(data.serviceProviderName);
      setAddress(data.address);
      setemail(data.email);
      setceo(data.ceoName);
      validity(true);
    };
    fetchdata();
  },[]);


  const handleUpdate = async () => {
    try {
      const updateFields = {
        serviceProviderName,
        address,
        email,
        ceoName
      };
      await axios.put(`http://localhost:8070/serviceprovider/update/${Sname}`,updateFields);
      alert('Details updated successfully');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

 const reset=()=>{
  setData(data);
  setName(data.serviceProviderName);
  setAddress(data.address);
  setemail(data.email);
  setceo(data.ceoName);
  validity(true);
 }

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
                <Avatar src={profilePicture}
        alt="Profile Picture" onClick={handleClick} variant="contained" component="label" display="flex" justify-content="center" align="center" sx={{ width: 100, height: 100 }}>
                    <input hidden accept="image/*" multiple type="file" onChange={handleFileUpload}/>  
                    </Avatar>
                </div>
            </div> 
            {
      data && data?.data.map((a)=>(
        <div>
              <div  className='editdetails'>
                <label>Company Name&nbsp;</label>
                <TextField size='small' defaultValue={a.serviceProviderName}
              onChange={event => setName(event.target.value)} onKeyUp={NAme} />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="text-danger">{Error0}</p>
              </div><br/>


              <div className='editdetails'>
              <label>Address&nbsp;</label><TextField size='small' defaultValue={a.address} 
              onChange={event => setAddress(event.target.value)} onKeyUp={Addr}/>&nbsp;&nbsp;&nbsp;&nbsp;
               <p className="text-danger">{Error1}</p>
              </div> <br/>


              <div  className='editdetails'>
                <label>Email&nbsp;</label><TextField size='small' defaultValue={a.email} 
                onChange={event => setemail(event.target.value)}
                // onKeyUp={(e) => validateEmail(e)} 
                onKeyUp={validateEmail}

                />&nbsp;&nbsp;&nbsp;&nbsp;
                <p className="text-danger">{Error2}</p>
              </div><br/>


              <div  className='editdetails'>
                <label>CEO Name&nbsp;</label><TextField size='small' defaultValue={a.ceoName} 
                onChange={event => setceo(event.target.value)} />
              </div>
                
              <br/>
              {/* <div  className='editdetails'>
                
                <label>Working Hours Per Day&nbsp;</label><TextField size='small' />
              </div><br/> */}
              
              </div>
      ))
    }
              
              <br/>
          
              <div  className='editdetailsButton'>
                <Stack spacing={2} direction="row">
                      <Button variant="contained" 
                      disabled={!((serviceProviderName || address || email || ceoName) && valid)} 
                      onClick={handleUpdate}
                      >SAVE CHANGES</Button>
                      <Button variant="contained" onClick={reset}>CANCEL</Button>

                </Stack>
       
              </div>

            </div>
      </Paper>
      
  </div>
  

  );

}

