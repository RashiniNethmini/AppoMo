import React, { useState } from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, TextInput, Alert} from 'react-native';

const ResetPwd = props => {

  const validateCurrentPassword = (currentpassword) => {
    if (!currentpassword) {
      return "*Current Password is required.";
    }
    return null;
  };

  const validateNewPassword = (newpassword) => {
    if (!newpassword) {
      return "*New Password is required.";
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordRegex.test(newpassword)) {
      return "*Your password must contain minimum of 8 characters with a combination of at least one uppercase letter, one lowercase letter and one number."
    }
    return null;
  };

  const validateConfirmPassword = (newpassword, confirmPassword) => {
    if (!confirmPassword) {
      return "*Please confirm password.";
    }

    if (newpassword != confirmPassword) {
      return "*Passwords do not match.";
    }

    return null; 
  };

  const [currentpassword, setCurrentPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const currentpasswordError = validateCurrentPassword(currentpassword);
    const newpasswordError = validateNewPassword(newpassword);
    const confirmPasswordError = validateConfirmPassword(newpassword, confirmPassword);
    

    if (currentpasswordError || newpasswordError || confirmPasswordError) {
      setErrors({
        currentpassword: currentpasswordError,
        newpassword: newpasswordError, 
        confirmPassword: confirmPasswordError
      });
    }
    else {
      Alert.alert('Confirmation','Are you sure you want to change the password?',
      [
        {
          text: 'No',
          onPress: () => console.log('canceled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => console.log('confirmed'),
        },
      ],
      { cancelable: false }, //set to false to prevent the user from dismissing the alert by tapping outside of it or pressing the back button on Android devices.
    );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            value={newpassword}
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

          <TouchableOpacity  style={styles.btnContainer} >
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>   
      </ScrollView>
    </View> 
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#084C4F',
    alignItems: "center",
    justifyContent: 'center'
    //width: 360
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