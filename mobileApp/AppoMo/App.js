import React, { useState } from 'react';
import { NativeRouter, Link, Route, Routes, useNavigate } from 'react-router-native';
import { Provider, Appbar, Searchbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView,
  TouchableWithoutFeedback,
  Animated, AppRegistry,ScrollView
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
import EditProfile from './Pages/EditProfile';
import ResetPwd from './Pages/ResetPwd';
import CustomerProfile from './Pages/CustomerProfile';
import SplashScreen from './Pages/Splashscreen';
import IssueSubmitMsg from './Pages/IssueSubmitMsg';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeRouter>
    <View style={styles.container}>
    {/* <Provider>
     <Routes>
      {/* <Route path="/" element={<CompanyOrServiceCenter/>} /> */}
      {/* <Route path="/CompanyDetails" element={<CompanyDetails/>} /> */}
      {/* <Route path="/" element={<SelectServiceCenter/>} />
      <Route path="/ServiceCenter/:serviceProviderName" element={<ServiceCenter/>} />
      <Route path="/IssueSubmission/:_id" element={<IssueSubmission/>} /> 
      <Route path="/IssueSubmitMsg" element={<IssueSubmitMsg/>} /> 
    </Routes>  */} 
    {/* <SelectServiceCenter/> */}
    {/* </Provider> */}
      <Provider>
      

        {/* 
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name=" userRegistr" component={UserRegistr} />
          </Stack.Navigator>

        </NavigationContainer> */}
        {/*<SplashScreen/>*/}
        {/*<IssueSubmitMsg/>*/}

         {/* <IssueSubmission/> */}
        {/* <Login/> */}
        {/* <UserRegistr/> */}
         <ForgotPW/> 
        {/* <CompanyDetails/> */}
        {/*<ComBranchDetails/>*/}
        {/* <SelectServiceCenter/> */}
        {/* <IssueSubmission/> */}
        {/* <AdvPayment/> */}
        {/* <EditProfile/> */}
        {/* <ResetPassword/> */}
        {/* <CustomerProfile/> */}

      </Provider>
 {/* <CompanyOrServiceCenter/> */}
  {/* <ServiceCenter/> */}
      <StatusBar style="auto" />
     
     
    </View>
  </NativeRouter>

    
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#108F94',
  }
});


{/* <UserRegistr/>
<ForgotPW/>
<CompanyDetails/>
<ComBranchDetails/>
<ServiceCenter/> 
*/}
