import React , { useState } from 'react';
import { Provider, Appbar, Searchbar} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View,Button,TouchableOpacity,SafeAreaView,
  TouchableWithoutFeedback,
  Animated, AppRegistry} from 'react-native';
  // import { NavigationContainer } from '@react-navigation/native';
  // import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdvPayment from './Pages/AdvancePayment';
import CompanyOrServiceCenter from './Pages/CompanyOrServiceCenter';
import IssueSubmission from './Pages/IssueSubmission';
import CompanyDetails from './Pages/CompanyDetails';
import ComBranchDetails from './Pages/ComBranchDetails';
// import Login from './Pages/Login';
import ForgotPW from './Pages/ForgotPw';
//import CompanyReg from './Pages/CompanyReg';
import ServiceCenter from './Pages/ServiceCenter';
import UserRegistr from './Pages/UserReg';
import SelectServiceCenter from './Pages/SelectServiceCenter'

// const Stack = createNativeStackNavigator();

export default function App() {
  return (
   
    <View style={styles.container}>
       <Provider>
       <IssueSubmission />
   
     
      

       {/* <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="serviceCenter" component={ServiceCenter} />
        <Stack.Screen name="SelectserviceCenter" component={SelectServiceCenter} />
      </Stack.Navigator>

    </NavigationContainer> */}
    
      {/* <Provider>
   
     {/* <AdvPayment/>  */}
     
        {/* <IssueSubmission /> */}
      {/* <IssueSubmission /> */}
    
       
        {/* <CompanyDetails/> */}
      <ComBranchDetails/> 
      {/* <CompanyOrServiceCenter/>  */}
      
      
     
      {/* <ServiceCenter/> */}
    
      {/* { <AdvPayment/>  } */}
      {/* { <UserRegistr/>} */}
      
{/* <AdvPayment/> */}
{/* <SelectServiceCenter/> */}
      </Provider> 
    
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

//AppRegistry.registerComponent('App', () => App);


