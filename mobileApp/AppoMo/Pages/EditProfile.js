import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Button, TextInput} from 'react-native';


const EditProfile = props => {
  return (
  <View style={styles.container}>
    <Text style={styles.title}>Edit Profile</Text>
      
    <View style={styles.inputContainer}>
      <TextInput style={styles.inputField} placeholder="First Name"/>
      <TextInput style={styles.inputField} placeholder="Last Name"/>
      <TextInput style={styles.inputField} placeholder="Address"/>
      <TextInput style={styles.inputField} placeholder="Contact Number" keyboardType={'number'}/>
      <TextInput style={styles.inputField} placeholder="Email" keyboardType={'email-address'}/>
      <TextInput style={styles.inputField} placeholder="NIC"/>

      <TouchableOpacity  style={styles.btnContainer}
        onPress={()=> {alert('Your profile has been updated.');}}>
        <Text style={styles.btnText}>Save Changes</Text>       
      </TouchableOpacity>

      <TouchableOpacity  style={styles.btnContainer} >
        <Text style={styles.btnText}>Cancel</Text>
      </TouchableOpacity>
      
    </View>
  </View> 
  );
}

const styles = StyleSheet.create({

  container: {
    bgColor: '#084C4F',
    alignItems: "center",
    width: 460
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#084C4F',
  },

  inputContainer: {
    backgroundColor: '#FFFFFF',
    height: 700,
    width: 460,
    borderTopLeftRadius: 130,
    paddingTop: 50,
    alignItems: 'center',
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
    placeholderFontWeight: 'bold'
  },

  btnContainer:{
    backgroundColor: '#084C4F',
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
    height: 40,
    paddingVertical: 5,
    marginTop: 30,
  },

  btnText:{
    color: '#FFFFFF', 
    fontSize: 20,
    fontWeight: 'bold',
    bgColor: '#084C4F'
  },

});

export default EditProfile;