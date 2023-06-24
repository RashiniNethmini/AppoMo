import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    TouchableOpacity,
} from "react-native";
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import * as Animatable from 'react-native-animatable';
import { Button } from "react-native-paper";
import axios from 'axios';

export default function ForgotPW() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState({});


    
  // Validate email
  const validateEmail = (email) => {
    if (!email) {
      return "*Please enter your email";
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "*Invalid email format";
    }
  
    return null; // Validation passed
  };

    const handleResetPw = () => {

        const emailError = validateEmail(email);
        if (emailError){
         setError({email:emailError})
         console.log("error")
        }
        else {
        axios.post("http://10.0.2.2:8070/ForgotPw/forgotPw", { email: email  })
        .then((response) => {
          console.log(response);
          alert("Email sent to"+ (" " + email))
 
      })
    
          .catch(error => {
            console.error(error);
            Alert.alert('Error', 'An error occurred. Please try again later.');
          });

    
        setEmail('');
        navigate('/VerifyOTP');
      
    };
  }
  
    const handleCancel = () => {
        // Implement the logic to navigate back to the login screen
        Alert.alert('Cancel ?', 'Are you sure you want to cancel resetting your password?', [
            {
                text: 'Yes',
                onPress: () => console.log('Reset password cancelled.'),
            },
            {
                text: 'No',
                onPress: () => console.log('Proceed to Reset password.'),
            },
        ]);
    };
    return (
        <View style={styles.container}>
             <Animatable.View style={styles.card} animation = "fadeInUp">

            <Animatable.Text style={styles.title} animation ="bounceInLeft">Forgot Password?</Animatable.Text>
            <View style={styles.innerText}>
 
                <Text style={{ paddingLeft: 10, paddingTop: 5, paddingBottom: 30, fontSize: 16 }}>We will send a code to verify its you.</Text>
            </View>

            <View style={styles.inputBox}>
                <TextInput
                    style={styles.emailInput}
                    placeholder="Enter your email"
                    placeholderTextColor="black"
                    placeholderStyle={{ textAlign: "center" }}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />{error.email && <Text style={{color: 'red'}}>{error.email}</Text>}

            </View>


            <TouchableOpacity onPress={ handleResetPw } style={styles.resetCancelBtn}>
                <Text style={styles.resetCancelText}>Send link</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel } style={styles.resetCancelBtn}>
                <Text style={styles.resetCancelText}>Cancel</Text>
            </TouchableOpacity>

            </Animatable.View>
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        paddingTop:180
    },

    title: {
        paddingTop: 10,
        fontSize: 35,
        color: '#084C4F',


    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
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

    innerText: {
        paddingTop: 40,
        fontSize: 30,
        justifyContent: 'center',

    },
    emailInput: {
        alignItems: "center",
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        paddingLeft:16,
        marginVertical: 10,
        height: 48,
        width: '100%',
        fontSize: 18,
        shadowColor: '#000',
        shadowOffset: {
             width: 0,
            height: 4,
         },
         shadowOpacity: 0.3,
    shadowRadius: 4,
        elevation: 8,
    },
    inputBox: {
         width: "98%",
        padding: 5,
        paddingLeft:15,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: 'center',
         marginBottom: 30,
     
    },


    resetCancelBtn: {
        backgroundColor: "#084C4F",
        borderRadius: 10,
        borderBottomWidth: 0.5,
        width: "70%",
        height: 40,
        padding: 5,
        marginLeft: 40,
        paddingTop: 5,
        marginBottom: 20,
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    resetCancelText: {
        color: '#fff',
        fontSize: 18,
    }




  });