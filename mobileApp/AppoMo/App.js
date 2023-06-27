import React, { useState } from 'react';
import { NativeRouter, Link, Route, Routes, useNavigate } from 'react-router-native';
import { Provider, Appbar, Searchbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  StyleSheet, View, Button, TouchableOpacity, SafeAreaView,
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
import ProductDetails from './Pages/ProductDEtails';
import SCIssueSubmission from './Pages/SCIssueSubmission';
import VerifyOTP from './Pages/VerifyOTP';

import DateTimePicker from './Pages/DateTimePicker';
import NotificationInterface from './Pages/NotificationInterface';
import ProductDetailsCompany from './Pages/ProductDetailsCompany';







const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeRouter>
    <View style={styles.container}>
    <Provider>
     <Routes>
     
      <Route path="/" element={<SplashScreen/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/ForgotPW" element={<ForgotPW/>} />
      <Route path="/VerifyOTP" element={<VerifyOTP/>} />
      <Route path="/UserRegistr" element={<UserRegistr/>} />
      <Route path="/CompanyOrServiceCenter/:objectId" element={<CompanyOrServiceCenter/>} />
      <Route path="/CompanyDetails/:objectId" element={<CompanyDetails/>} />
      <Route path="/ComBranchDetails/:objectId/:_id/:serviceProviderName" element={<ComBranchDetails/>} />
      <Route path="/SelectServiceCenter/:objectId" element={<SelectServiceCenter/>} />
      <Route path="/ServiceCenter/:objectId/:_id/:serviceProviderName" element={<ServiceCenter/>} />
      <Route path="/ProductDetails/:objectId/:companyID/:serviceProviderName/:_id" element={<ProductDetails/>} /> 
      <Route path="/ProductDetailsCompany/:objectId/:companyID/:serviceProviderName/:_id" element={<ProductDetailsCompany/>} /> 
      <Route path="/IssueSubmission/:objectId/:companyID/:serviceProviderName/:branchID/:selectedCategory/:selectedModel" element={<IssueSubmission/>} /> 
      <Route path="/SCIssueSubmission/:objectId/:companyID/:serviceProviderName/:branchID/:selectedCategory/:selectedModel" element={<SCIssueSubmission/>} />
      <Route path="/IssueSubmitMsg/:objectId" element={<IssueSubmitMsg/>} />
      <Route path="/NotificationInterface/:objectId" element={<NotificationInterface/>} />  
      <Route path="/CustomerProfile/:objectId" element={<CustomerProfile/>} /> 
      <Route path="/EditProfile/:objectId" element={<EditProfile/>} /> 
      <Route path="/ResetPwd/:objectId" element={<ResetPwd/>} /> 
      <Route path="/EditProfile" element={<EditProfile/>} /> 
      <Route path="/ResetPwd" element={<ResetPwd/>} /> 
      <Route path="/DateTimePicker/:objectId/:BranchDetails/:_id" element={<DateTimePicker/>} /> 
      <Route path="/AdvPayment/:objectId/:BranchDetails/:issueId/:selectedDate/:selectedtime" element={<AdvPayment/>} /> 
    </Routes>  
    {/* <ForgotPW/>
    {/* <AdvPayment/> */}
    {/* <ResetPwd/> */}
    {/* <EditProfile/> */}
    {/* <NotificationInterface/> */}
    {/* <CustomerProfile/> */}

    {/* <ProductDetailsCompany/> */}


    {/* <ProductDetails/> */}
    {/* <NotificationInterface/> */}
   
    </Provider>
      {/* <Provider>

    <ProductDetailsCompany/>

    {/*</Provider> */}
    

        {/* 
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name=" userRegistr" component={UserRegistr} />
          </Stack.Navigator>

        </NavigationContainer> */} 
        {/* <SplashScreen/> */}
        {/*<IssueSubmitMsg/>*/}

       
        {/* <Login/> */}
        {/* <UserRegistr/> */}

        {/* <CompanyDetails/> */}
        {/*<ComBranchDetails/>*/}
        {/* <SelectServiceCenter/> */}
         {/* <SCIssueSubmission/>  */}
        {/* <AdvPayment/>
                 {/* <ForgotPW/>  */}
        {/* <VerifyOTP/> */}
        {/* <ProductDetails/> */}
        {/* <EditProfile/> */}
        {/* <EditProfile/>  */}
        {/* <DateTimePicker/> */}
        
        {/* <ResetPassword/> */}
        {/* <CustomerProfile/> */}
 
   

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


