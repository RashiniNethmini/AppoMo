import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Alert, ScrollView} from 'react-native';
import { BackHandler } from 'react-native';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import { useParams } from 'react-router-native';

const EditProfile = props => {
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [nic, setNIC] = useState('');
  const [errors, setErrors] = useState({});
  const [data,setData]=useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const validateUsername = (username) => {
    if (!username) {
      return 'Username is required.';
    } else if (username.length < 5) {
      return 'Username must be at least 5 characters long.';
    } else {
      return '';
    }
  };

  const validateAddress = (address) => {
    if (!address) {
      return 'Address is required.';
    } else {
      return '';
    }
  };

  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required.';
    } else {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        return 'Invalid email address.';
      } else {
        return '';
      }
    }
  };

  const validateContactNo = (contactNo) => {
    if (!contactNo) {
      return 'Contact number is required.';
    } else {
      const contactNoRegex = /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/;
      if (!contactNoRegex.test(contactNo)) {
        return 'Invalid contact number.';
      } else {
        return '';
      }
    }
  };

  const validateNIC = (nic) => {
    if (!nic) {
      return 'NIC is required.';
    } else {
      const nicRegex1 = /^\d{9}[V|v|x|X]$/;
      const nicRegex2 = /^[0-9]{12}$/;
      if (!(nicRegex1.test(nic) || nicRegex2.test(nic))) {
        return 'Invalid NIC.';
      } else {
        return '';
      }
    }
  };

  const handleUsernameChange = (username) => {
    setUsername(username);
    const errorMessage = validateUsername(username);
    setErrors((prevState) => ({ ...prevState, username: errorMessage }));
    setIsFormValid(!errorMessage && !errors.address && !errors.contactNo && !errors.email && !errors.nic);
  };
  
  const handleAddressChange = (address) => {
    setAddress(address);
    const errorMessage = validateAddress(address);
    setErrors((prevState) => ({ ...prevState, address: errorMessage }));
    setIsFormValid(!errors.username && !errorMessage && !errors.contactNo && !errors.email && !errors.nic);
  };

  const handleContactNoChange = (contactNo) => {
    setContactNo(contactNo.toString());
    const errorMessage = validateContactNo(contactNo);
    setErrors(prevState => ({ ...prevState, contactNo: errorMessage }));
    setIsFormValid(!errors.username && !errors.address && !errorMessage && !errors.email && !errors.nic);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    const errorMessage = validateEmail(email);
    setErrors(prevState => ({ ...prevState, email: errorMessage }));
    setIsFormValid(!errors.username && !errors.address && !errors.contactNo && !errorMessage && !errors.nic);
  };

  const handleNICChange = (nic) => {
    setNIC(nic);
    const errorMessage = validateNIC(nic);
    setErrors(prevState => ({ ...prevState, nic: errorMessage }));
    setIsFormValid(!errors.username && !errors.address && !errors.contactNo && !errors.email && !errorMessage);
  };


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
      const response = await fetch(`http://192.168.1.226:8070/UserDetails/getuser/${objectId}`);
      const data = await response.json();
  
      if (response.ok) {
        const userDetails = data.UserDetails;
        setUsername(userDetails.username);
        setEmail(userDetails.email);
        setContactNo(userDetails.contactNo);
        setAddress(userDetails.address);
        setNIC(userDetails.nic);
      } else {
        console.error('Error fetching data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async () => {

    if (!isFormValid) {
      console.log('Form validation failed. Please fix the errors.');
    } 
    else {
      Alert.alert('Information', 'Your profile has been updated.',
      [
        {text: 'OK',
        onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false },);

      try {
        // const updater = 
        await fetch(`http://192.168.1.226:8070/UserDetails/update/${objectId}`,
        {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json',
          },

          body: JSON.stringify({username,
            email,
            contactNo,
            address,
            nic}),
          });

          setUsername('');
          setAddress('');
          setContactNo('');
          setEmail('');
          setNIC('');

          navigate(`/CustomerProfile/${objectId}`,{objectId});

        } catch (error) {
            console.error('Error updating user:', error);
        } 
    }
  };

  const resetFields = () => {
    fetchdata(); // Fetch the data again to get the original values
  };
  
  const handleCancel = () => {
    resetFields(); // Reset the fields to their fetched values
    setErrors({});
  };

  return (

    <View style={styles.container}>

        <Text style={styles.title}>EDIT PROFILE</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}> 
        <View style={styles.inputContainer}>

          <TextInput style={styles.inputField}
            placeholder="Username"
            value={username}
            onChangeText={handleUsernameChange}/>
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

          <TextInput style={styles.inputField}
            placeholder="Address"
            value={address}
            onChangeText={handleAddressChange}/>
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

          <TextInput style={styles.inputField}
            placeholder="Contact Number"
            value={contactNo.toString()} 
            onChangeText={handleContactNoChange}/>
           {errors.contactNo && <Text style={styles.errorText}>{errors.contactNo}</Text>}

          <TextInput style={styles.inputField}
            placeholder="Email"
            keyboardType={'email-address'}
            value={email}
            onChangeText={handleEmailChange}/>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput style={styles.inputField}
            placeholder="NIC"
            value={nic}
            onChangeText={handleNICChange}/>
            {errors.nic && <Text style={styles.errorText}>{errors.nic}</Text>}

          <TouchableOpacity  style={[styles.btnContainer, isFormValid ? {} : styles.disabledButton]}
            disabled={!isFormValid}
            onPress={handleSubmit}>
            <Text style={styles.btnText}>SAVE CHANGES</Text>      
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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 20,
    alignItems: 'center',
    width: 400,
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

export default EditProfile;