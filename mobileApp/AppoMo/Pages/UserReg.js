import React, { useState, useEffect } from "react";
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  StatusBar,
  TouchableOpacity,
} from "react-native";

//import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
//import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { BackHandler } from 'react-native';
import * as Expo from "expo";
import * as GoogleAuthSession from 'expo-auth-session/providers/google';

import { useAuthRequest } from 'expo-auth-session';
import CompanyOrServiceCenter from "./CompanyOrServiceCenter";
import AdvPayment from "./AdvancePayment";
import * as WebBrowser from 'expo-web-browser';


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const MAX_HEIGHT = 500;
function UserRegistr() {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate('/Login');
    return true;
  };




  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  }, [handleBackButton]);





  const [data, setData] = React.useState({
    // username: '',
    // password: '',
    // confirmPassword:'',
    // email:'',
    // contactNo:'',
    // address:'',
    // nic:'',

    // check_usernameChange: false,
    // check_passwordChange: false,
    // check_confirmPasswordChange: false,
    // check_emailChange: false,
    // check_contactNoChange: false,
    // check_addressChange: false,
    // check_nicChange: false,
    secureTextEntry1: true,
    secureTextEntry2: true,
 


  });

  const { colors } = useTheme();

  
  const updateSecureTextEntry1 = () => {
    setData({
      ...data,
      secureTextEntry1: !data.secureTextEntry1
    });
  }
  const updateSecureTextEntry2 = () => {
    setData({
      ...data,
      secureTextEntry2: !data.secureTextEntry2
    });
  }

  const handleValidUser = (val) => {
    if (val.trim().length >= 5) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  }

 



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

//old code


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
  const nicRegex2 = /^[0-9]{12}$/;

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
      // console.log(data);
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
  fetch(`http://10.0.2.2:8070/UserDetails/getu/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const objectId = data[0]._id; // Assuming the response from the backend contains the object ID as "_id"
      console.log(objectId);
      navigate(`/CompanyOrServiceCenter/${objectId}`,{objectId});

    })
    .catch(error => {
      console.log(error);
    });

  
};

React.useEffect(() => {
  checkInputs();
}, [username, password,confirmPassword, email,contactNo, address,nic]);



  return (


    <View style={styles.container}>

      <StatusBar backgroundColor='#009387' barStyle="light-content" />
 <KeyboardAwareScrollView
        style={styles.view}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={scrollEnabled}
        keyboardShouldPersistTaps="always"
      >
      <View
        // animation="slideInLeft"
        style={styles.header}>
        <Text style={styles.text_header}>Let's get Registered</Text>

      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: colors.background
        }]}
      >
        <Text style={[styles.text_footer, {
          color: colors.text
        }]}>Username</Text>
        <View style={styles.action}>

          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={text =>handleUsernameChange(text)}
          />
           

        </View> 
        {usernameError ? <Text style={{ color: 'red' }}>{usernameError }</Text> : null}
       


        <Text style={[styles.text_footer, {
          color: colors.text,
          marginTop: 15
        }]}>Password</Text>
        <View style={styles.action}>

          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry1 ? true : false}
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={text => handlePasswordChange(text)}
          />
          <TouchableOpacity
            onPress={updateSecureTextEntry1}
          >
            {data.secureTextEntry1 ?
              <Feather
                name="eye-off"
                color="grey"
                size={20}
              />
              :
              <Feather
                name="eye"
                color="green"
                size={20}
              />
            }
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={{ color: 'red' }}>{passwordError  }</Text> : null}

        <Text style={[styles.text_footer, {
          color: colors.text,
          marginTop: 15
        }]}>Confirm Password</Text>
        <View style={styles.action}>

          <TextInput
            placeholder="Re-enter Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry2 ? true : false}
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={text => handleConfirmPasswordChange(text)}
          />
          <TouchableOpacity
            onPress={updateSecureTextEntry2}
          >
            {data.secureTextEntry2 ?
              <Feather
                name="eye-off"
                color="grey"
                size={20}
              />
              :
              <Feather
                name="eye"
                color="green"
                size={20}
              />
            }
          </TouchableOpacity>
        </View>
       {confirmPasswordError ? <Text style={{ color: 'red' }}>{confirmPasswordError }</Text> : null}


        <Text style={[styles.text_footer, {
          color: colors.text,
          marginTop: 15
        }]}>Email Address</Text>
        <View style={styles.action}>

          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={text =>handleEmailChange(text)}

      
          />
          
        </View>
        {emailError ? <Text style={{ color: 'red' }}>{emailError }</Text> : null}

        <Text style={[styles.text_footer, {
          color: colors.text,
          marginTop: 15
        }]}>Contact Number</Text>
        <View style={styles.action}>

          <TextInput
            placeholder="Your contact number"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={text => handleContactNoChange (text)}

          />
          
        </View>
        {contactNoError ? <Text style={{ color: 'red' }}>{contactNoError }</Text> : null}
       
         <Text style={[styles.text_footer, {
          color: colors.text,
          marginTop: 15
        }]}>Address</Text>
        <View style={styles.action}>

          <TextInput
            placeholder="Your Address"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={text => setTextaddress(text)} 

          />
          
        </View>
       

        <Text style={[styles.text_footer, {
          color: colors.text,
          marginTop: 15
        }]}>NIC</Text>
        <View style={styles.action}>

          <TextInput
            placeholder="Your NIC"
            placeholderTextColor="#666666"
            style={[styles.textInput, {
              color: colors.text
            }]}
            autoCapitalize="none"
            onChangeText={text => handleNicChange(text)}

            
          />
          
        </View>
        {nicError ? <Text style={{ color: 'red' }}>{nicError }</Text> : null}

        <TouchableOpacity

          style={[styles.signIn, {
            borderColor: '#009387',
            borderWidth: 1,
            marginTop: 20,
            marginBottom:20,
            backgroundColor: disableSubmit ? "white" : '#108F94', marginTop:10 , disabled:{disableSubmit}
          }]}
          onPress={() => handleSubmit()} 
        >
          <Text style={[styles.textSign, { color: disableSubmit ? "#108F94" : 'white'}]}

          >Submit</Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAwareScrollView>
    </View>


  );
};

export default UserRegistr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#108F94'
  },
  header: {
    flex: 0,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 12,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: ScreenWidth
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,

  },

  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },


  textSign: {
    fontSize: 15,
    color: "white"
  }
});