import React, { useState } from 'react';
import { View, TextInput, Text,  Alert, StyleSheet, TouchableOpacity, } from 'react-native';
import axios from 'axios';

const VerifyOTP = () => {
    const [enteredOTP, setenteredOTP] = useState('');

    const handleVerifyOTP = () => {
  axios.post('http://10.0.2.2:8070/ForgotPW/validateOTP', { enteredOTP: enteredOTP })
    .then((response) => {
      const data = response.data; // Get the response data
      if (data.success) {
        // OTP verification success
        Alert.alert('Success', 'OTP verified successfully!');
      } else {
        // OTP verification failed
        Alert.alert('Error', 'Invalid OTP!');
      }
    })
    .catch((error) => {
      console.error(error);
      Alert.alert('Error', 'Something went wrong!');
    });

  setenteredOTP('');
};


    return (
        <View style={styles.container}>

            <Text style ={{marginBottom:50,fontSize:18}}>Enter the OTP code sent to your email. </Text>
            <View style={styles.otpContainer}>
                <TextInput
                    style={styles.otpInput}
                    maxLength={1}
                    value={enteredOTP[0]}
                    // onChangeText={(text) => setenteredOTP((prevOtp) => [text, prevOtp[1], prevOtp[2], prevOtp[3]])}
                    onChangeText={(text) => setenteredOTP(text + enteredOTP.substring(1))}
                   />  
                <TextInput
                    style={styles.otpInput}
                    maxLength={1}
                    value={enteredOTP[1]}
                    // onChangeText={(text) => setenteredOTP((prevOtp) => [prevOtp[0], text, prevOtp[2], prevOtp[3]])}
                    onChangeText={(text) => setenteredOTP(enteredOTP.substring(0, 1) + text + enteredOTP.substring(2))}
               />
                <TextInput
                    style={styles.otpInput}
                    maxLength={1}
                    value={enteredOTP[2]}
                    // onChangeText={(text) => setenteredOTP((prevOtp) => [prevOtp[0], prevOtp[1], text, prevOtp[3]])}
                    onChangeText={(text) => setenteredOTP(enteredOTP.substring(0, 2) + text + enteredOTP.substring(3))}
                />
                <TextInput
                    style={styles.otpInput}
                    maxLength={1}
                    value={enteredOTP[3]}
                    // onChangeText={(text) => setenteredOTP((prevOtp) => [prevOtp[0], prevOtp[1], prevOtp[2], text])}
                    onChangeText={(text) => setenteredOTP(enteredOTP.substring(0, 3) + text)}
                />
            </View>
            {/* <Button title="Verify OTP" onPress={handleVerifyOTP} style={styles.verifyButton} /> */}
            <TouchableOpacity>
                <Text style={{ color: '#fff', marginTop: -25, fontSize: 15, marginBottom: 15 }}>Resend code</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleVerifyOTP} style={styles.verifyBtn}>
                <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    otpContainer: {
        flexDirection: 'row',
        marginBottom: 50,


    },
    otpInput: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 28,
        marginRight: 8,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 8,
        },
        shadowOpacity: 2.0,
        shadowRadius: 50,
        elevation: 20,

    },
    verifyBtn: {
        backgroundColor: "#084C4F",
        borderRadius: 10,
        borderBottomWidth: 0.5,

        width: "45%",
        height: 40,
        padding: 5,
        paddingTop: 5,
        marginBottom: 20,
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 20,
        // 
    },
    verifyText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default VerifyOTP;
