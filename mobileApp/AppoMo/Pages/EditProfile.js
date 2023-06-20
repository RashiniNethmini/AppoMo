import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import axios from 'axios';

const EditProfile = props => {

  const validateUsername = (username) => {    
    if (!username) {
      return "*Username is required.";
    }
    if (username.length < 5){
      return "*Username must have at least 5 characters.";
    }
    return null; 
  };

  const validateAddress = (address) => {
    if (!address) {
      return "*Address is required.";
    }
    return null; 
  };

  const validateEmail = (email) => {
    if (!email) {
      return "*Email is required.";
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return "*Invalid email address.";
    }

    return null; 
  };

  const validateContactNo = (contactNo) => {
    if (!contactNo) {
      return "*Contact number is required.";
    }

    const contactNoRegex = /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/;
    if (!contactNoRegex.test(contactNo)) {
      return "*Invalid contact number.";
    }
    return null; 
  };

  const validateNIC = (nic) => {
    if (!nic) {
      return "*NIC is required.";
    }

    const nicRegex1 = /^\d{9}[V|v|x|X]$/;
    const nicRegex2 = /^[0-9]{12}$/;

    if (!(nicRegex1.test(nic) || nicRegex2.test(nic))) {
      return "*Invalid NIC number.";
    }
    return null; 
  };

  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [contactNo, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [nic, setNIC] = useState('');
  const [errors, setErrors] = useState({});
  const [data,setData]=useState("");
  const Cname = 'username';

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata= async ()=>{
    try{
    const data=await fetch(`http://10.0.2.2:8070/UserDetails/get/${Cname}`);
    const jsonData = await data.json();
    setData(jsonData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  };


  const handleSubmit = async () => {
    const usernameError = validateUsername(username);
    const addressError = validateAddress(address);
    const contactNoError =validateContactNo(contactNo);
    const emailError = validateEmail(email);
    const nicError = validateNIC(nic);

    if (usernameError || addressError || contactNoError ||emailError || nicError) {
      setErrors({
        username: usernameError,
        address: addressError,
        contactNo:contactNoError,
        email: emailError,
        nic: nicError,
      });
    }
    else {
      Alert.alert('Information', 'Your profile has been updated.',
      [
        {text: 'OK', 
        onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false },);

      try {
        const updater = await fetch(`http://10.0.2.2:8070/UserDetails/update/${Cname}`,
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
  
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }   
  };

  const handleCancel = () => {
    setUsername('');
    setAddress('');
    setContact('');
    setEmail('');
    setNIC('');
    setErrors({});
  };

  
  return (
    <View style={styles.container}>
      
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.inputContainer}>
        
        <TextInput style={styles.inputField}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}/>
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

        <TextInput style={styles.inputField}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}/>
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

        <TextInput style={styles.inputField}
          placeholder="Contact Number"
          keyboardType={'number'}
          value={contactNo}
          onChangeText={setContact}/>
         {errors.contactNo && <Text style={styles.errorText}>{errors.contactNo}</Text>}

        <TextInput style={styles.inputField}
          placeholder="Email"
          keyboardType={'email-address'}
          value={email}
          onChangeText={setEmail}/>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput style={styles.inputField}
          placeholder="NIC"
          value={nic}
          onChangeText={setNIC}/>
          {errors.nic && <Text style={styles.errorText}>{errors.nic}</Text>}
    
        <TouchableOpacity  style={styles.btnContainer}
          onPress={handleSubmit}>
          <Text style={styles.btnText}>Save Changes</Text>       
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
    height: 750,
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

export default EditProfile;