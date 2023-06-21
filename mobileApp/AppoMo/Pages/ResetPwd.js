
import React, { useState, useEffect } from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import axios from 'axios';
import { BackHandler } from 'react-native';

import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';

const ResetPwd = props => {

  const validateCurrentPassword = (currentpassword) => {
    if (!currentpassword) {
      return "*Current Password is required.";
    }
    return null;
  };

  // const validateNewPassword = (newpassword) => {
  //   if (!newpassword) {
  //     return "*New Password is required.";
  //   }

  //   const passwordRegex = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/;

  //   if (!passwordRegex.test(newpassword)) {
  //     return "*Your password must contain minimum of 8 characters with a combination of at least one uppercase letter, one lowercase letter and one number."
  //   }
  //   return null;
  // };
  const validateNewPassword = (password) => {
    if (!password) {
      return "*New Password is required.";
    }
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
    if (!passwordRegex.test(password)) {
      return "*Your password must contain a minimum of 8 characters with a combination of at least one uppercase letter, one lowercase letter, and one number.";
    }
    return null;
  };
  

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return "*Please confirm password.";
    }

    if (password != confirmPassword) {
      return "*Passwords do not match.";
    }

    return null; 
  };

  const [fetchedPassword, setFetchedPassword] = useState('');
  const [currentpassword, setCurrentPassword] = useState('');
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const Cname = "username";

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const data = await axios.get(`http://10.0.2.2:8070/UserDetails/get/${Cname}`);
     
      
        setFetchedPassword(data.data[0].password);
    
    } catch (error) {
      console.error('Error fetching password:', error);
    }
  };



  const handleSubmit = async () => {
    const currentpasswordError = validateCurrentPassword(currentpassword);
    const newpasswordError = validateNewPassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
    
    if (currentpasswordError || newpasswordError || confirmPasswordError) {
      setErrors({
        currentpassword: currentpasswordError,
        password: newpasswordError, 
        confirmPassword: confirmPasswordError
      });
    }
    else if (currentpassword !== fetchedPassword) {
      setErrors({
      ...errors,
      currentpassword: "*Current Password is incorrect."
      });
      return;
    }
    else {
      Alert.alert('Information', 'Your password has been updated.',
      [
        {text: 'OK', 
        onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false },);
      
      try {
      //   const updateFields = {
      //     password
      //   };
      //   await axios.put(`http://localhost:8070/UserDetails/update/${Cname}`,updateFields);
      //   alert('Details updated successfully');
      const updater = await fetch(`http://10.0.2.2:8070/UserDetails/update/${Cname}`,
       {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({password}),
      });
      } catch (error) {
          console.error('Error updating user:', error);
      }
    }
  };

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
  };



  // const handleSubmit = async () => {
  //   const currentpasswordError = validateCurrentPassword(currentpassword);
  //   const newpasswordError = validateNewPassword(password);
  //   const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
    
  //   if (currentpasswordError || newpasswordError || confirmPasswordError) {
  //     setErrors({
  //       currentpassword: currentpasswordError,
  //       password: newpasswordError, 
  //       confirmPassword: confirmPasswordError
  //     });
  //   }
  //   else if (currentpassword !== fetchedPassword) {
  //     setErrors({
  //     ...errors,
  //     currentpassword: "*Current Password is incorrect."
  //     });
  //     return;
  //   }
  //   else {
  //     Alert.alert('Information', 'Your password has been updated.',
  //     [
  //       {text: 'OK', 
  //       onPress: () => console.log('OK Pressed')},
  //     ],
  //     { cancelable: false },);
      
  //     try {
  //     //   const updateFields = {
  //     //     password
  //     //   };
  //     //   await axios.put(`http://localhost:8070/UserDetails/update/${Cname}`,updateFields);
  //     //   alert('Details updated successfully');
  //     const updater = await fetch(`http://10.0.2.2:8070/UserDetails/update/${Cname}`,
  //      {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({password}),
  //     });
  //     } catch (error) {
  //         console.error('Error updating user:', error);
  //     }
  //   }
  // };

  // const handleCancel = () => {
  //   setCurrentPassword('');
  //   setNewPassword('');
  //   setConfirmPassword('');
  //   setErrors({});
  // };

  const navigate = useNavigate();
    const handleBackButton = () => {
      navigate('/CustomerProfile');
      return true;
    };
    useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  
      return () => backHandler.remove();
    }, [handleBackButton]);
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
      
      <View style={styles.inputContainer}>
    
        <TextInput style={styles.inputField}
          placeholder="Current Password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={currentpassword}
          onChangeText={setCurrentPassword}/>
          {errors.currentpassword && <Text style={styles.errorText}>{errors.currentpassword}</Text>}

          <TextInput style={styles.inputField}
            placeholder="New Password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setNewPassword}/>
            {errors.newpassword && <Text style={styles.errorText}>{errors.newpassword}</Text>}

        <TextInput style={styles.inputField}
          placeholder="Confirm Password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={confirmPassword}
          onChangeText={setConfirmPassword}/>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
    
        <TouchableOpacity  style={styles.btnContainer}
          onPress={handleSubmit}>
          <Text style={styles.btnText}>Change Password</Text>       
        </TouchableOpacity>

        <TouchableOpacity  style={styles.btnContainer}
          onPress={handleCancel}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
      </View>   
    </View> 
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#084C4F',
    alignItems: "center",
    justifyContent: 'center',
    width: 360,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 15,
    color: '#FFFFFF',
  },

  inputContainer: {
    backgroundColor: '#FFFFFF',
    height: 650,
    width: 360,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 50,
    alignItems: 'center'
  },

  inputField: {
    borderRadius: 10, 
    color: '#000000', 
    paddingHorizontal: 10, 
    width: '78%', 
    height: 35,
    backgroundColor: 'rgb(220,220, 220)', 
    marginVertical: 10,
    placeholderTextColor: '#084C4F',
  },

  btnContainer:{
    backgroundColor: '#084C4F',
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    height: 40,
    paddingVertical: 5,
    marginTop: 20,
  },

  btnText:{
    color: '#FFFFFF', 
    fontSize: 20,
    fontWeight: 'bold',
    bgColor: '#084C4F',
  },

  errorText:{
    textAlign: 'left',
    color: '#DC143C', 
    fontSize: 12,
  }
});

export default ResetPwd;