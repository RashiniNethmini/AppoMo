import React from 'react';
import { View,StyleSheet } from 'react-native';
import { Provider,} from 'react-native-paper';
import IssueSubmission from './Pages/IssueSubmission';


export default function App() {
  return (
    <View style={styles.container}>
      <Provider>
     
      <IssueSubmission />
    
    
      </Provider>
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


