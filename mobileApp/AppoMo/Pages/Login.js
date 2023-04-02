import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
  
    TouchableOpacity,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SocialIcon, Button } from '@rneui/themed';
import GoogleSVG from '../assets/googlelogo.svg'
//import { useNavigation } from '@react-navigation/native';




function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    // const handlePressReg = () => {
    //     navigation.navigate('UserReg');
    //   };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title} >Appomo</Text>
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    alignItems='center'
                    onChangeText={(username) => setUsername(username)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
                <Text onPress={() => { }} style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
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
        padding: 5,
        marginBottom: 20,
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
 googleButton:{
   paddingTop: 70,
   marginTop:40,
   color:'#042A2C'

 }


});
export default Login;