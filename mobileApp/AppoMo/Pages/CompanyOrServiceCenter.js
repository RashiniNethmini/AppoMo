import React, { useState } from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity,SafeAreaView,
    TouchableWithoutFeedback,
    Animated } from 'react-native';
import {Table,Row,Rows} from 'react-native-table-component';
import { MaterialIcons } from '@expo/vector-icons';

function CompanyOrServiceCenter() {
  return (

    <View style={{flexDirection:'column'}}>
      <View>
      <TouchableOpacity 
      // onPress={onPress} 
      style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>Company</Text>
  </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity 
      // onPress={onPress} 
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
    // textTransform: "uppercase"
  }
});

 

export default CompanyOrServiceCenter;