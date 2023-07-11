import React, { useState, useEffect } from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import axios from 'axios';
import { BackHandler } from 'react-native';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import { useParams } from 'react-router-native';

const ResetPwd = () => {
  const validateCurrentPassword = currentpassword => {
    if (!currentpassword) {
      return "*Current Password is required.";
    }
    return null;
  };

  const validateNewPassword = password => {
    if (!password) {
      return "*New Password is required.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      return "*Password should have a minimum of 8 characters, including at least one uppercase letter, one lowercase letter, and one number.";
    }
    return null;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return "*Please confirm password.";
    }

    if (password !== confirmPassword) {
      return "*Passwords do not match.";
    }

    return null;
  };

  const handleCurrentPasswordChange = currentpassword => {
    setCurrentPassword(currentpassword);
    const currentpasswordError = validateCurrentPassword(currentpassword);
    setErrors(prevErrors => ({
      ...prevErrors,
      currentpassword: currentpasswordError,
    }));
  };


  const handlePasswordChange = password => {
    setNewPassword(password);
    const newpasswordError = validateNewPassword(password);
    setErrors(prevErrors => ({
      ...prevErrors,
      password: newpasswordError,
    }));
  };

  const handleConfirmPasswordChange = confirmPassword => {
    setConfirmPassword(confirmPassword);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
    setErrors(prevErrors => ({
      ...prevErrors,
      confirmPassword: confirmPasswordError,
    }));
  };

  const [fetchedPassword, setFetchedPassword] = useState('');
  const [currentpassword, setCurrentPassword] = useState('');
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const {objectId} = useParams();
  const navigate = useNavigate();

  const handleBackButton = () => {

    navigate(`/CustomerProfile/${objectId}`,{objectId});

    return true;

  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => backHandler.remove();

  }, [handleBackButton]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {

      const data = await axios.get(`http://10.0.2.2:8070/UserDetails/get/${objectId}`);
      setFetchedPassword(data.data.UserDetails.password);

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

      const updater = await fetch(`http://10.0.2.2:8070/UserDetails/update/${objectId}`,
       {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({password}),
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      navigate(`/CustomerProfile/${objectId}`,{objectId});

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

    //navigate(`/CustomerProfile/${objectId}`,{objectId});

  };

  return (

    <View style={styles.container}>      
      <Text style={styles.title}>RESET PASSWORD</Text>     
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.inputContainer}>

        <TextInput style={styles.inputField}
          placeholder="Current Password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={currentpassword}
          onChangeText={handleCurrentPasswordChange}/>
          {errors.currentpassword && <Text style={styles.errorText}>{errors.currentpassword}</Text>}

        <TextInput style={styles.inputField}
          placeholder="New Password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={handlePasswordChange}/>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}           

        <TextInput style={styles.inputField}
          placeholder="Confirm Password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}/>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        <TouchableOpacity  style={styles.btnContainer}
          onPress={handleSubmit}>
          <Text style={styles.btnText}>RESET</Text>      
        </TouchableOpacity>

        <TouchableOpacity  style={styles.btnContainer}
          onPress={handleCancel}>
          <Text style={styles.btnText}>CANCEL</Text>
        </TouchableOpacity>

      </View>  
      </ScrollView>
    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#084C4F',
    alignItems: "center",
    justifyContent: 'center',
    width: 400,
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
    height: 700,
    width: 400,
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
    backgroundColor: '#084C4F',
  },

  errorText:{
    textAlign: 'left',
    color: '#DC143C',
    fontSize: 12,
  }

});

export default ResetPwd;