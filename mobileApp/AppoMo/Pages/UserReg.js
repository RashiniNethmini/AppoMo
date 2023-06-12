import React, { useState } from 'react';
import { View, StyleSheet, Platform, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, Text, TextInput, IconButton, Dialog, Paragraph, Portal, colors } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const MAX_HEIGHT = 500;

export default function UserRegistr() {
  const navigate = useNavigate();
  const [username, setTextusername] = useState("");
  const [password, setTextpassword] = useState("");
  const [confirmPassword, setTextconfirmpassword] = useState("");
  const [email, setTextemail] = useState("");
  const [contactNo, setTextcontactNo] = useState("");
  const [address, setTextaddress] = useState("");
  const [nic, setTextnic] = useState("");


  
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [nicError, setNicError] = useState("");

  // const handleUsernameChange = (text) => {
  //   if (text.length < 1) {
  //     setUsernameError("");
  //     setTextusername(text);
  //   } else if (text.length < 5) {
  //     setUsernameError("Username must be at least 5 characters long.");
  //     setTextusername(text);
  //   } else {
  //     setTextusername(text);
  //     setUsernameError("");
  // const validateUsername = (username) => {     // Validate username
  //   if (!username) {
  //     return "*Username is required";
  //   }
  // }};
  const handleUsernameChange = (text) => {
    if (text.length < 1) {
      setUsernameError("");
      setTextusername(text);
    } else if (text.length < 5) {
      setUsernameError("Username must be at least 5 characters long.");
      setTextusername(text);
    } else {
      setTextusername(text);
      setUsernameError("");
    }
  };

  const handlePasswordChange = (text) => {
    if (text.length < 1) {
      setPasswordError("");
      setTextpassword(text);
    } else if (text.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      setTextpassword(text);
    } else {
      setTextpassword(text);
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (text) => {
    if (text.length < 1) {
      setConfirmPasswordError("");
      setTextconfirmpassword(text);
    } else if (text !== password) {
       setTextconfirmpassword(text);
      setConfirmPasswordError("Passwords do not match.");
    
    } else {
      setTextconfirmpassword(text);
      setConfirmPasswordError("");
    }
  };

  const handleEmailChange = (text) => {
    if (text.length < 1) {
      setEmailError("");
      setTextemail(text);
    } else if (!isValidEmail(text)) {
      setEmailError("Invalid email address.");
      setTextemail(text);
    } else {
      setTextemail(text);
      setEmailError("");
    }
  };

  const handleNicChange = (text) => {
    if (text.length < 1) {
      setNicError("");
      setTextnic(text);
    } else if (!isValidNic(text)) {
      setNicError("Invalid NIC number.");
      setTextnic(text);
    } else {
      setTextnic(text);
      setNicError("");
    }
  };

 // set restriction to add only 10 numbers to contact number.
  const handleContactNoChange = (text) => {
    if (text.length < 1) {  // If the input is empty, clear the error message and set the input value
      setContactNoError('');
      setTextcontactNo(text);

    } else if (text.length < 10) {  // If the input is less than 10 characters, display an error message and set the input value
      setContactNoError('Contact number must be at least 10 characters long.');
      setTextcontactNo(text);

    } else if (text.length > 10) {  // If the input is more than 10 characters, display an error message and set the input value
      setContactNoError('Contact number must not exceed 10 characters.');
      setTextcontactNo(text);
    } else if (/^\d{10}$/.test(text)) {  // If the input is exactly 10 digits, set the input value and clear the error message
      setTextcontactNo(text);
      setContactNoError('');
    } else {  // If the input contains non-digit characters, display an error message and clear the input value
      setContactNoError('Contact number can only contain digits.');
      setTextcontactNo('');
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidNic = (nic) => {
    // Basic NIC validation assuming a valid format of 12 digits
    const nicRegex1 = /^[0-9]{9}[vVxX]$/;
    const nicRegex2 = /^[0-9]{11}$/;

    return(nicRegex1.test(nic) || nicRegex2.test(nic));
  };



  const [disableSubmit, setDisableSubmit] = useState(true); // disable the submit button at begining.
  const checkInputs = () => {
    if (username && password && confirmPassword && email && contactNo && address && nic) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  };


  const handleSubmit = () => {
    console.log('Submit button pressed');
    console.log(username, contactNo);


    // Make an API request to send the data to the backend
    fetch("http://10.0.2.2:8070/UserDetails/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
        "email": email,
        "contactNo": contactNo,
        "address": address,
        "nic": nic,

      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });


    // Clear the input fields
    setTextusername('');
    setTextpassword('');
    setTextconfirmpassword('');
    setTextemail('');
    setTextcontactNo('');
    setTextaddress('');
    setTextnic('');
   

    // Set the visibility state
    setVisible(true);

    // Disable the submit button
    setDisableSubmit(true);

    // Check the input fields
    checkInputs();
    navigate('/CompanyOrServiceCenter');
  };

  React.useEffect(() => {
    checkInputs();
  }, [username, password,confirmPassword, email,contactNo, address,nic]);


  const [visible, setVisible] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  React.useEffect(() => {
    if (contentHeight >= MAX_HEIGHT) {
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    }
  }, [contentHeight]);


  return (
    <>
      <StatusBar backgroundColor="#108F94" translucent={true} />
      <Animatable.View>
        <Text variant="headlineLarge" style={styles.title} animation="slideInLeft" >Let's get Registered!</Text>
      </Animatable.View>
      <KeyboardAwareScrollView
        style={styles.view}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={scrollEnabled}
        keyboardShouldPersistTaps="always"
      >
        <View onLayout={e => setContentHeight(e.nativeEvent.layout.height)}>

          <View >
            <Card style={styles.card} >
              <Card.Content style={styles.cardContent}>
                <Card.Actions>
                  <ScrollView>


                    <View>
                      <Text variant="bodyLarge">UserName</Text>
                      <TextInput type="outlined" value={username} onChangeText={text =>handleUsernameChange(text)} style={styles.input} activeUnderlineColor='#388F82' />
                      {usernameError ? <Text style={{ color: 'red' }}>{usernameError }</Text> : null}
                    </View>
                    <View>
                      <Text variant="bodyLarge">Password</Text>
                      <TextInput type="outlined" value={password} onChangeText={text => handlePasswordChange(text)} style={styles.input} activeUnderlineColor='#388F82' />
                      {passwordError ? <Text style={{ color: 'red' }}>{passwordError  }</Text> : null}
                    </View>

                    <View>
                      <Text variant="bodyLarge">Confirm Password</Text>
                      <TextInput type="outlined" value={confirmPassword} onChangeText={text => handleConfirmPasswordChange(text)} style={styles.input} activeUnderlineColor='#388F82' />
                      {confirmPasswordError ? <Text style={{ color: 'red' }}>{confirmPasswordError }</Text> : null}
                    </View>

                    <View>
                      <Text variant="bodyLarge">Email address</Text>
                      <TextInput type="outlined" value={email} onChangeText={text =>handleEmailChange(text)} style={styles.input} activeUnderlineColor='#388F82' />
                      {emailError ? <Text style={{ color: 'red' }}>{emailError }</Text> : null}
                    </View>


                    <View>
                      <Text variant="bodyLarge">Contact No</Text>
                      <TextInput type="outlined" value={contactNo} onChangeText={text => handleContactNoChange (text)} keyboardType="numeric" style={styles.input} activeUnderlineColor='#388F82' />
                      {contactNoError ? <Text style={{ color: 'red' }}>{contactNoError }</Text> : null}
                    </View>


                    <View>
                      <Text variant="bodyLarge">Address</Text>
                      <TextInput type="outlined" value={address} onChangeText={text => setTextaddress(text)} style={styles.input} activeUnderlineColor='#388F82' />
            
                    </View>

                    <View>
                      <Text variant="bodyLarge">NIC</Text>
                      <TextInput type="outlined" value={nic} onChangeText={text => handleNicChange(text)} style={styles.input} activeUnderlineColor='#388F82' />
                      {nicError ? <Text style={{ color: 'red' }}>{nicError }</Text> : null}
                    </View>



                    <View>
                      <Button mode="contained" onPress={() => handleSubmit()} style={{ backgroundColor: disableSubmit ? "#ccc" : '#388F82', marginTop:10 }} disabled={disableSubmit}>
                        Submit
                      </Button>
                    
                    </View>


                  </ScrollView>

                </Card.Actions>
              </Card.Content>
            </Card>


          </View>


        </View>
      </KeyboardAwareScrollView>

    </>


  );
}
const styles = StyleSheet.create({
  container: {
    flex: 200,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    padding: 10,
    marginTop: 45,
    marginBottom: 4,
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    //border: '1px solid red',
    color: '#FFFFFF',
    fontWeight: 'bold',



  },
  card: {
    paddingVertical: 0,
    marginHorizontal: 5,
    width: 340,

  },
  view: {
    flex: 1,
    marginTop: 0,
  },



  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 4,
    fontSize: 15,
    borderBottomWidth: 1,
    activeUnderlineColor: '#388F82',
  }





});