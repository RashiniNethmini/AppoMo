import React, { useState } from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity,SafeAreaView,
    TouchableWithoutFeedback,
    Animated } from 'react-native';
import {Table,Row,Rows} from 'react-native-table-component';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';


  function CompanyOrServiceCenter() {

    const navigate = useNavigate();

  const handlePress = () => {
    navigate('/CompanyDetails');

  };
  const handlePress1 = () => {
    navigate('/SelectServiceCenter');

  };
  return (

    <View 
    style={{flex:2,flexDirection:'column',marginTop:200}}
    >
      <View>
      <TouchableOpacity onPressOut={handlePress}
      style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>Company</Text>
  </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity onPressOut={handlePress1}
      style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>Service Center</Text>
  </TouchableOpacity>
      </View>  
      </View>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 6,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 24,
    marginVertical:40
  },
  appButtonText: {
    fontSize: 35,
    color: "#084C4F",
    fontWeight: "bold",
    alignSelf: "center",

  }
});

 

export default CompanyOrServiceCenter;