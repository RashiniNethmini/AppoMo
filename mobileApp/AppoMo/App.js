import React from 'react';
import { Provider, Appbar, Searchbar} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View,Button,TouchableOpacity,SafeAreaView,
  TouchableWithoutFeedback,
  Animated } from 'react-native';
  import AdvPayment from './Pages/AdvancePayment';
import CompanyOrServiceCenter from './Pages/CompanyOrServiceCenter';
import IssueSubmission from './Pages/IssueSubmission';
import CompanyDetails from './Pages/CompanyDetails';
import ComBranchDetails from './Pages/ComBranchDetails';
import Login from './Pages/Login';
import ForgotPW from './Pages/ForgotPw';
import CompanyReg from './Pages/CompanyReg';
import ServiceCenter from './Pages/ServiceCenter';


export default function App() {
  return (
    <View style={styles.container}>
      {/* <Provider>
   
     <AdvPayment/> */}
     
      <IssueSubmission />
    
       
      {/* <CompanyDetails/>  */}
      {/* </Provider> */}
      {/* <CompanyOrServiceCenter/>  */}
      
      {/* <ComBranchDetails/>  */}
     
    <ServiceCenter/>
    
      <StatusBar style="auto" />
    </View>
  );
}
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



