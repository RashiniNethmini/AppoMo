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
  Alert,
} from "react-native";
import { color } from 'react-native-elements/dist/helpers';
import { Dialog } from 'react-native-paper';

//import { useNavigation } from '@react-navigation/native';


function UserRegistr() {

  const validateUsername = (username) => {     // Validate username
    if (!username) {
      return "*Username is required";
    }
    const usernameRegex = /^[a-zA-Z0-9_-]{5,16}$/;

    if (!usernameRegex.test(username)) {
      return "*Username should be at least 5 charachters and may contain '-' and '_'marks only ";
    }

    return null; // Validation passed
  };

  // Validate password
  const validatePassword = (password) => {
    if (!password) {
      return "*Password is required";
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (password.length < 8) {
      return "*Password should be at least 8 characters";
    }
    else if (!passwordRegex.test(password)) {
      return "*Password should contain at least one uppercase letter, one lowercase letter, and one number"

    }


    return null; // Validation passed
  };

  // Validate confirm password
  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return "*Confirm Password is required";
    }

    if (password !== confirmPassword) {
      return "*Passwords do not match";
    }

    return null; // Validation passed
  };

  // Validate email
  const validateEmail = (email) => {
    if (!email) {
      return "*Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "*Invalid email format";
    }

    return null; // Validation passed
  };

  // Validate contact number
  const validateContactNumber = (contactNumber) => {
    if (!contactNumber) {
      return "*Contact number is required";
    }

    const contactNumberRegex = /^\d{10}$/;
    if (!contactNumberRegex.test(contactNumber)) {
      return "*Invalid contact number";
    }

    return null; // Validation passed
  };

  // Validate username
  const validateAddress = (address) => {
    if (!address) {
      return "*Address is required";
    }
    return null; // Validation passed
  };
  const validateNIC = (nic) => {
    if (!nic) {
      return "*NIC is required";
    }

    const nicRegex1 = /^[0-9]{9}[vVxX]$/;
    const nicRegex2 = /^[0-9]{11}$/;

    if (!(nicRegex1.test(nic) || nicRegex2.test(nic))) {
      return "*Invalid NIC number";
    }

    return null; // Validation passed
  };


  // If any errors, set them to state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState('');
  const [nic, setNIC] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
    const emailError = validateEmail(email);
    const contactNumberError = validateContactNumber(contactNumber);
    const addressError = validateAddress(address);
    const nicError = validateNIC(nic);

    if (usernameError || passwordError || confirmPasswordError || emailError || contactNumberError || addressError || nicError) {
      setErrors({ username: usernameError, password: passwordError, confirmPassword: confirmPasswordError, email: emailError, contactNumber: contactNumberError, nic: nicError, address: addressError });
    } else {
      console.log('Form submitted succesfully!')
      Alert.alert(
        'Form submitted successfully!'
      )
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>

          <View><Text style={styles.title}>Enter Details to Register</Text></View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          {errors.username && <Text style={{ color: 'red' }}>{errors.username}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
          {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={contactNumber}
            nChangeText={setContactNumber}
          />
          {errors.contactNumber && <Text style={{ color: 'red' }}>{errors.contactNumber}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          {errors.address && <Text style={{ color: 'red' }}>{errors.address}</Text>}

          <TextInput
            style={styles.input}
            placeholder="NIC"
            value={nic}
            onChangeText={setNIC}
          />
          {errors.nic && <Text style={{ color: 'red' }}>{errors.nic}</Text>}

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
  error: {
    color: '	#FF0000'

  }

});


export default UserRegistr;