import React, { useState ,useEffect} from "react";
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    StatusBar,
    TouchableOpacity,
} from "react-native";

//import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
//import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { BackHandler } from 'react-native';

function Login() {
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate('/');
        return true;
      };
      
      
    
      useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
      }, [handleBackButton]);
    
    const handlePress = () => {
        navigate('/UserRegistr');
    };

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


    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    // const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.trim().length >= 5) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const handleLogin = (username, password) => {


        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [{ text: 'Okay' }]);
            console.log('Submit button pressed');
            return;
        }

        console.log('Submit button pressed');

        // Make an API request to send the data to the backend
        fetch("http://10.0.2.2:8070/Login/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "username": username,
            "password": password,
            
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
          fetch(`http://10.0.2.2:8070/UserDetails/getu/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const objectId = data[0]._id; // Assuming the response from the backend contains the object ID as "_id"
        console.log(objectId);
        navigate(`/CompanyOrServiceCenter/${objectId}`,{objectId});

      })
      .catch(error => {
        console.log(error);
      });
    };
    // React.useEffect(() => {
    //     GoogleSignin.configure({
    //         webClientId: '<YOUR_WEB_CLIENT_ID>',
    //         offlineAccess: true,
    //         forceCodeForRefreshToken: true,
    //     });
    // }, []);

    

    // useEffect(() => {
    //     GoogleSignin.configure({
    //       AndroidClientId: '850685778557-fkjnbh77b0uqi8s1b2s21p92b6t0dkj3.apps.googleusercontent.com',
    //       offlineAccess: false,
    //     });
    //   }, []);
    
    // //   Implement the sign-in function
    //   const signInWithGoogle = async () => {
    //     try {
    //       await GoogleSignin.hasPlayServices();
    //       const userInfo = await GoogleSignin.signIn();
    //       console.log('User Info:', userInfo);
    //       // You can now send the user information to your backend for further processing
    //     } catch (error) {
    //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         console.log('User cancelled the sign-in flow');
    //       } else if (error.code === statusCodes.IN_PROGRESS) {
    //         console.log('Sign-in is already in progress');
    //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         console.log('Play services are not available');
    //       } else {
    //         console.log('Something went wrong:', error.message);
    //       }
    //     }
    // }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View
                // animation="slideInLeft"
                style={styles.header}>
                <Text style={styles.text_header}>Login</Text>

            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}

                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <View>
                            <Text style={styles.errorMsg}>Username must be at least 5 characters long.</Text>

                        </View>

                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                    <View>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </View>
                     </Animatable.View>
                }
{/* onPress={  navigate('/ForgotPW')}  */}

                <TouchableOpacity>

                    <Text style={{ color: '#009387', marginTop: 15 }}   >Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>

                    <TouchableOpacity

                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 125,

                        }]}

                    >
                        <Text style={[styles.textSign, { color: '#009387' }]}
                            onPress={() => { handleLogin(data.username, data.password) }}

                        >Sign In</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        // onPress={() => navigation.navigate('')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15,
                            marginVertical: 0
                        }]}
                        // onPress={signInWithGoogle}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", marginTop: 10 }}>
                    <Text style={{ fontSize: 16, }}>Don't have an account ? </Text>
                    <Link to={`/UserRegistr`} component={TouchableOpacity}
                    // onPress={() => props.navigation.navigate("UserRegistr")}
                    >
                        <Text style={{ color: "#084C4F", fontWeight: 'bold', fontSize: 16, textDecorationLine: 'underline' }}>Signup</Text>
                    </Link>
                </View>
            </Animatable.View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#108F94'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 4,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: ScreenWidth
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 40
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,

    },

    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },


    textSign: {
        fontSize: 15,
        color: "white"
    }
});