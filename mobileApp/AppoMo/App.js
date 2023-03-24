import React from 'react';
import { Provider, Appbar, Searchbar} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View,Button,TouchableOpacity,SafeAreaView,
  TouchableWithoutFeedback,
  Animated } from 'react-native';
import CompanyOrServiceCenter from './CompanyOrServiceCenter';
import IssueSubmission from './Pages/IssueSubmission';
import CompanyDetails from './Pages/CompanyDetails';
import ComBranchDetails from './Pages/ComBranchDetails';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider>
     
      {/* <IssueSubmission /> */}
    
       
      {/* <CompanyDetails/>  */}
      </Provider>
      {/* <CompanyOrServiceCenter/>  */}
      
      {/* <ComBranchDetails/>  */}
      <StatusBar style="auto" />
    </View>






  );
}
 const styles=StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:'#108F94',
  } 
});



