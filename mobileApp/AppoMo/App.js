import React, { useState } from 'react';
import { Provider, Appbar, Searchbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView,
  TouchableWithoutFeedback,
  Animated, AppRegistry
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdvPayment from './Pages/AdvancePayment';
import CompanyOrServiceCenter from './Pages/CompanyOrServiceCenter';
import IssueSubmission from './Pages/IssueSubmission';
import CompanyDetails from './Pages/CompanyDetails';
import ComBranchDetails from './Pages/ComBranchDetails';
import Login from './Pages/Login';
import ForgotPW from './Pages/ForgotPw';
import ServiceCenter from './Pages/ServiceCenter';
import UserRegistr from './Pages/UserReg';
import SelectServiceCenter from './Pages/SelectServiceCenter';


const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <View style={styles.container}>
       <Provider>
       {/* <IssueSubmission /> */}
   
     
      

            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name=" userRegistr" component={UserRegistr} />
          
        <CompanyDetails/>
        {/* <ComBranchDetails/> */}
        {/* <AdvPayment/> */}

      </Provider>

      <StatusBar style="auto" />
    </View>

  );
}

//<ForgotPW/>



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#108F94',
  }
});



