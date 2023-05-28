import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";

import { Button } from '@rneui/themed';
import GoogleSVG from '../assets/googlelogo.svg';
//import { useNavigation } from '@react-navigation/native';




function Login() {

    // const navigation = useNavigation();

    const handlePressReg = () => {
        // navigation.navigate('UserReg');
    };

    // backend
    // const handleLogin = async () => {
    //     const response = await fetch('https://loccalhost:8070/api/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             username: enteredUsername,
    //             password: enteredPassword
    //         })
    //     });
    //     const data = await response.json();

    //     if (data.success) {
    //         // Login successful, navigate to the home screen
    //     } else {
    //         // Login failed, show error message to the user
    //     }
    // };
    const [enteredUsername, setUsername] = useState("");
    const [enteredPassword, setPassword] = useState("");
    const [errors, setErrors] = useState({});


    const validateUsername = (enteredUsername) => {
        if (!enteredUsername) {
            return "*Username is required";
        }
        return null;
    }

    const validatePassword = (enteredPassword) => {
        if (!enteredPassword) {
            return "*Password is required";
        }

    }

    const handleLogin = () => {
        const usernameError = validateUsername(enteredUsername);
        const passwordError = validatePassword(enteredPassword);


        if (usernameError || passwordError) {
            setErrors({ enteredUsername: usernameError, enteredPassword: passwordError });
        }
        else {
            // navigation.navigate('CompanyOrServiceCenter');
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title} >AppoMo</Text>
            </View>


            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    alignItems='center'
                    onChangeText={(enteredUsername) => setUsername(enteredUsername)}
                />
            </View>
            {errors.enteredUsername && <Text style={{ color: 'white',paddingBottom:20 }}>{errors.enteredUsername}</Text>}
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(enteredPassword) => setPassword(enteredPassword)}
                />
               
            </View>
            {errors.enteredPassword && <Text style={{ color: 'white' }}>{errors.enteredPassword}</Text>}
            <TouchableOpacity>
                <Text
                    //onPress={navigation.navigate('CompanyOrServiceCenter')}
                    style={styles.forgot_button}>
                    Forgot Password?
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleLogin}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingBottom: 30 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white', }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center' }}>Or</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
            </View>


            <TouchableOpacity >
                <Button style={styles.googleButton}> Sign in with Google</Button>
            </TouchableOpacity>
            {/* <SocialIcon
      button
      fontStyle={{}}
      iconSize={50}
      iconStyle={{}}
      iconWidth={100}
      iconType="font-awesome"
      iconColor=""
      onPress={() => console.log("onPress()")}
      style={{ paddingHorizontal: 10 }}
      title="Sign in with Google"
      type='google'
    /> */}


            <View style={styles.regText}>

                <Text>Not Registered?</Text>
                <TouchableOpacity onPress={handlePressReg}><Text style={styles.innerRegText}>  Register Now</Text></TouchableOpacity>
            </View>




        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: 400,
    },
    title: {
        fontSize: 50,
        paddingBottom: 80,
        color: "#fff",

    },
    inputView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        padding: 4,
        marginBottom: 8,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 5,

    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
        paddingTop:10
    },
    loginBtn: {
        width: "80%",
        borderRadius: 35,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#084C4F",
    },
    loginText: {
        color: '#fff',
        fontSize: 20,
    },

    regText: {
        paddingTop: 40,
        flexDirection: 'row',
        fontSize: 20,
    },
    innerRegText: {
        fontWeight: 'bold',
        borderBottomColor: 'black',
        textDecorationLine: 'underline',

    },
    googleButton: {
        paddingTop: 70,
        marginTop: 40,
        color: '#084C4F'

    }


});
export default Login;