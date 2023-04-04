import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
  Alert,
    TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";


function ForgotPW() {
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
        }
        else {
        // Implement the logic to reset the password using the entered email address
        Alert.alert('Reset Password', `An email has been sent to ${email} with instructions to reset your password.`);
        setEmail('');
        setError('');
         }
    };

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
            <Text style={styles.title}>Forgot Password?</Text>
            <View style={styles.innerText}>
 
                <Text style={{ paddingLeft: 1, paddingTop: 5, paddingBottom: 30, fontSize: 16 }}>We will send a code to reset your password.</Text>
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
                />{error.email && <Text style={{color: 'white'}}>{error.email}</Text>}

            </View>


            <TouchableOpacity onPress={ handleResetPw } style={styles.resetCancelBtn}>
                <Text style={styles.resetCancelText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel } style={styles.resetCancelBtn}>
                <Text style={styles.resetCancelText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
    },

    title: {
        paddingTop: 180,
        fontSize: 30,
        color: '#fff',


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
        borderRadius: 30,
        padding: 10,
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
         width: "90%",
        padding: 5,
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
    },




});

export default ForgotPW;