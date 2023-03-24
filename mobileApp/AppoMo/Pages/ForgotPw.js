import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,

    TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";


function ForgotPW() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password?</Text>
            <View style={styles.innerText}>
                <Text style={{ paddingLeft:85,fontSize:15}}> Enter your email.</Text>
        <Text style={{ paddingLeft:1,paddingTop:5,paddingBottom:70,fontSize:15}}>We will send  a code to reset your password</Text>
            </View>
         
           <View style= {styles.inputBox}>
           <TextInput
                    style={styles.emailInput}
                    placeholder="Email"
                    placeholderTextColor="black"
                    //alignItems='center'
                    
                />

           </View>
           
       
           <TouchableOpacity onPress={() => { }} style={styles.resetCancelBtn}>
                <Text style={styles. resetCancelText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={styles.resetCancelBtn}>
                <Text style={styles. resetCancelText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )};

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

    innerText:{
        paddingTop:40,
        fontSize:30,
        justifyContent:'center',
    
    },
    emailInput:{
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 5,
        paddingBottom:10,
        fontSize:16


    },
    inputBox:{
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "90%",
        height: 48,
        padding: 5,
        marginBottom: 20,
        alignItems: "center",
        marginBottom:30
    },
  
   
    resetCancelBtn:{
        backgroundColor: "#084C4F",
        borderRadius: 10,
        width: "70%",
        height: 40,
        padding: 5,
        paddingTop:5,
        marginBottom: 20,
        alignItems: "center",
    },
    resetCancelText: {
        color: '#fff',
        fontSize: 18,
    },
    



});

export default ForgotPW;