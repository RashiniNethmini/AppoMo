import React , { useState } from 'react';
import { Provider, Appbar, Searchbar} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View,Button,TouchableOpacity,SafeAreaView,
  TouchableWithoutFeedback,
  Animated, AppRegistry} from 'react-native';
  
import CompanyOrServiceCenter from './Pages/CompanyOrServiceCenter';
import IssueSubmission from './Pages/IssueSubmission';
import CompanyDetails from './Pages/CompanyDetails';
import ComBranchDetails from './Pages/ComBranchDetails';
// import Login from './Pages/Login';
import ForgotPW from './Pages/ForgotPw';
//import CompanyReg from './Pages/CompanyReg';
import ServiceCenter from './Pages/ServiceCenter';
import AdvPayment from './Pages/AdvancePayment';
import UserRegistr from './Pages/UserReg';
import SelectServiceCenter from './Pages/SelectServiceCenter'

// const AppNavigator= createStackNavigator(
//   {
//     Select:{
//       screen:CompanyOrServiceCenter
//     },
//     SelectServiceCenter:{
//       screen:SelectServiceCenter
//     },
//     serviceCenter:{
//       screen:ServiceCenter
//     }
//   }
// )

export default function App() {
  return (
    <View style={styles.container}>
      <Provider>
   
     {/* <AdvPayment/>  */}
     
        {/* <IssueSubmission /> */}
    
       
        <CompanyDetails/>
      
      {/* <CompanyOrServiceCenter/>  */}
      
      {/* <ComBranchDetails/>  */}
     
      {/* <ServiceCenter/> */}
    
      {/* { <AdvPayment/>  } */}
      {/* { <UserRegistr/>} */}
      
{/* <AdvPayment/> */}
      </Provider> 
      <StatusBar style="auto" />
   </View>
  );
}
 {/* <ServiceCenter/> */}
{/* <ComBranchDetails/>  */}
//<CompanyOrServiceCenter/>
//<IssueSubmission />
//<Login/>
//<ForgotPW/>
 const styles=StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:'#108F94',
  } 
});

//AppRegistry.registerComponent('App', () => App);


