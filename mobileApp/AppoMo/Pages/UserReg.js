import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { validateEmail, validatePassword,validateConfirmPassword , validateUsername, validateFullName,validateAddress, validateContactNo,validateNIC } from './RegValidFunc';


function UserRegistr() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName ,setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [nic, setNic] = useState('');
  const [errors, setErrors] = useState({});


  const handleSubmit = () => {
    // Validate input fields
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword ( password,confirmPassword);
    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const addressError = validateAddress(address);
    const contactNoError =validateContactNo(contactNo);
    const nicError = validateNIC(nic);

    // If any errors, set them to state
    if (usernameError || passwordError || confirmPasswordError || fullNameError ||emailError || addressError ||contactNoError || nicError) {
      setErrors({
        username: usernameError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        fullName:fullNameError,
        email: emailError,
        address: addressError,
        contactNo:contactNoError,
        nic: nicError,
      });
    } else {
      // Submit form if no errors
      console.log('Form submitted successfully');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>

          <Text style={styles.title}>Enter Details to Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername} />
              {errors.username && <Text style={styles.error}>{errors.username}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true} />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
          {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

          <TextInput 
          style={styles.input}
           placeholder="Full Name"
           value={fullName}
           onChangeText={setFullName}
            />
            {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

          <TextInput 
          style={styles.input}
           placeholder="Email" 
           value={email}
           onChangeText={setEmail}
           keyboardType="email-address"
         />
         {errors.email && <Text style={styles.error}>{errors.email}</Text>}
  
          <TextInput 
          style={styles.input} 
          placeholder="Address" 
          value={address}
          onChangeText={setAddress}
        />
        {errors.address && <Text style={styles.error}>{errors.address}</Text>}

          <TextInput 
          style={styles.input}
           placeholder="Contact No" 
           value={contactNo}
           onChangeText={setContactNo}/>
           {errors.contactNo && <Text style= {styles.error}>{errors.contactNo}</Text>}


          <TextInput 
          style={styles.input} 
          placeholder="NIC" 
           value={nic}
           onChangeText={setNic}
         />
         {errors.nic && <Text style={styles.error}>{errors.nic}</Text>}
   
          <Button
            title="Submit"
            color="#084C4F"
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    fontSize: 18,
  },

});


export default UserRegistr;