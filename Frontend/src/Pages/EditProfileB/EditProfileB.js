import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editprofileB.css';
import { Avatar, Stack, TextField, Paper, Button } from '@mui/material';
import validator from 'validator';
// import NavBar from '../../component/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavBar1 from '../.././component/NavBar'



export default function EditProfile() {
  const [Error0, setErr0] = useState("");
  const [Error1, setErr1] = useState("");
  const [Error2, setErr2] = useState("");
  //const [serviceProviderName, setName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [nofappnmntsPerHr, setNofappnmntsPerHr] = useState('');
  const [ nofworkinghrsPerDay, setNofworkinghrsPerDay] = useState('');
  const [daysopen, setDaysopen] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [valid, validity] = useState('');
  const { objectId } = useParams();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  const handleClick = () => {
    // Trigger file input click
    document.getElementById('fileInput').click();
  };


  const [data, setData] = useState("");
  const Sname = 'ABC';

  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get(`http://localhost:8070/BranchDetails/get/${objectId}`);
      setData(data);
      setBranchName(data.branchName);
      setManagerName(data.managerName);
      setContactNo(data.contactNo);
      setAddress(data.address);
      setEmail(data.email);
      setNofappnmntsPerHr(data.nofappnmntsPerHr);
      setNofworkinghrsPerDay(data. nofworkinghrsPerDay);
      setDaysopen(data.daysopen);
      setUsername(data.username);
      setPassword(data.password);
      // setceo(data.ceoName);
      validity(true);
    };
    fetchdata();
  }, []);


  const handleUpdate = async () => {
    try {
      const updateFields = {
       
        branchName,
        managerName,
        contactNo,
        address,
        email,
        nofappnmntsPerHr,
        nofworkinghrsPerDay,
        daysopen,
        username,
        password

      };
      await axios.put(`http://localhost:8070/BranchDetails/update/${objectId}`, updateFields);
      alert('Details updated successfully');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const reset = () => {
    setData(data);
    setBranchName(data.branchName);
    setManagerName(data.managerName);
    setContactNo(data.contactNo);
    setAddress(data.address);
    setEmail(data.email);
    setNofappnmntsPerHr(data.nofappnmntsPerHr);
    setNofworkinghrsPerDay(data. nofworkinghrsPerDay);
    setDaysopen(data.daysopen);
    setUsername(data.username);
    setPassword(data.password);
    validity(true);
  }

  const NAme = (evnt) => {
    const nameInputValue = evnt.target.value.trim();
    if (nameInputValue === '') {
      setErr0("**required");

    } else {
      setErr0("");

    }
  }

  const Addr = (evnt) => {
    const addressInputValue = evnt.target.value.trim();
    if (addressInputValue === '') {
      setErr1("**required");

    } else {
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

    if (Email === '') {
      setErr2("**required");


    }

  }


  return (


    <div className='edit' style={{ width: 1000, margin: 130 }}>

      <NavBar1 />
      <Paper elevation={6} className="editPaper">
        <div classname="editform" style={{ padding: "10px" }}>
          <div className='editdetailslogo' >
            <div>Change Logo</div>&nbsp;&nbsp;
            <div>
              <Avatar src={profilePicture}
                alt="Profile Picture" onClick={handleClick} variant="contained" component="label" display="flex" justify-content="center" align="center" sx={{ width: 100, height: 100 }}>
                <input hidden accept="image/*" multiple type="file" onChange={handleFileUpload} />
              </Avatar>
            </div>
          </div>
          {
            data && data?.data.map((a) => (
              <div>
                <div className='editdetails'>
                  <label>Branch Name&nbsp;</label>
                  <TextField size='small' defaultValue={a.branchName}
                    onChange={event => setBranchName(event.target.value)} onKeyUp={NAme} />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <p className="text-danger">{Error0}</p>
                </div><br />

                <div className='editdetails'>
                  <label>Manager Name&nbsp;</label>
                  <TextField size='small' defaultValue={a.managerName}
                    onChange={event => setManagerName(event.target.value)} onKeyUp={NAme} />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <p className="text-danger">{Error0}</p>
                </div><br />

                <div className='editdetails'>
                  <label>Contact Number&nbsp;</label>
                  <TextField size='small' defaultValue={a.contactNo}
                    onChange={event => setContactNo(event.target.value)} onKeyUp={NAme} />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <p className="text-danger">{Error0}</p>
                </div><br />

                <div className='editdetails'>
                  <label>Address&nbsp;</label><TextField size='small' defaultValue={a.address}
                    onChange={event => setAddress(event.target.value)} onKeyUp={Addr} />&nbsp;&nbsp;&nbsp;&nbsp;
                  <p className="text-danger">{Error1}</p>
                </div> <br />


                <div className='editdetails'>
                  <label>Email&nbsp;</label><TextField size='small' defaultValue={a.email}
                    onChange={event => setEmail(event.target.value)}
                    // onKeyUp={(e) => validateEmail(e)} 
                    onKeyUp={validateEmail}

                  />&nbsp;&nbsp;&nbsp;&nbsp;
                  <p className="text-danger">{Error2}</p>
                </div><br />


                <div className='editdetails'>
                  <label>Number of appointments per hour&nbsp;</label><TextField size='small' defaultValue={a.nofappnmntsPerHr}
                    onChange={event => setNofappnmntsPerHr(event.target.value)} />
                </div>

                <br />

                <div className='editdetails'>
                  <label>Number of working hours&nbsp;</label><TextField size='small' defaultValue={a.nofworkinghrsPerDay}
                    onChange={event => setNofworkinghrsPerDay(event.target.value)} />
                </div>

                <br />

                <div className='editdetails'>
                  <label>Days open&nbsp;</label><TextField size='small' defaultValue={a.daysopen}
                    onChange={event => setDaysopen(event.target.value)} onKeyUp={NAme} />&nbsp;&nbsp;&nbsp;&nbsp;
                  <p className="text-danger">{Error1}</p>
                </div> <br />

                <div className='editdetails'>
                  <label>Username&nbsp;</label><TextField size='small' defaultValue={a.username}
                    onChange={event => setUsername(event.target.value)} onKeyUp={NAme} />&nbsp;&nbsp;&nbsp;&nbsp;
                  <p className="text-danger">{Error1}</p>
                </div> <br />

                <div className='editdetails'>
                  <label>Password&nbsp;</label><TextField size='small' defaultValue={a.password}
                    onChange={event => setPassword(event.target.value)} onKeyUp={NAme} />&nbsp;&nbsp;&nbsp;&nbsp;
                  <p className="text-danger">{Error1}</p>
                </div> <br />





                {/* <div  className='editdetails'>
                
                <label>Working Hours Per Day&nbsp;</label><TextField size='small' />
              </div><br/> */}

              </div>
            ))
            
          }

          <br />

          <div className='editdetailsButton'>
            <Stack spacing={2} direction="row">
              <Button variant="contained"
                disabled={!((branchName || managerName||contactNo||address || email || nofappnmntsPerHr||nofworkinghrsPerDay|| daysopen||username||password) && valid)}
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