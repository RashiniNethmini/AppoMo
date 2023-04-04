import React,{useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
  Alert,
    TouchableOpacity,
} from "react-native";
//import { useNavigation } from '@react-navigation/native';



function AdvPayment() {
 // const navigation = useNavigation();
   const [contactNumber, setContactNumber] = useState('');
   const [isNumberValid, setIsNumberValid] = useState(true);


  const handleConfirmPress = () => {   // Code to handle payment confirmation
    Alert.alert(
      'Payment Confirmation',
      'Are you sure you want to pay?',
      [
        {
          text: 'No',
          onPress: () => console.log('Payment canceled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => console.log('Payment confirmed'),
        },
      ],
      { cancelable: false }, //set to false to prevent the user from dismissing the alert by tapping outside of it or pressing the back button on Android devices.
    );
  };
  
  const handleCancel = () => {
    
    Alert.alert(
      'Payment of advance is required to continue',
      'Are you sure you want to cancel?',
      [
        {
          text: 'No',
          onPress: () => console.log('Proceed to pay'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>console.log('Return'),
        },
      ],
      { cancelable: false }
    );
  };

   function isNumeric(input) {
    const reg = /^[0-9]+$/;
    return reg.test(input);
   }
   const handleNumberChange = (input) => {
     setContactNumber(input);
    setIsNumberValid(isNumeric(input));
   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment of Advance</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Advance "
          value="Advance  amount -   Rs.300"
          underlineColorAndroid="transparent"
          editable={false}
          selectTextOnFocus={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Mobile No."
          underlineColorAndroid="transparent"
          value={contactNumber}
          onChangeText={handleNumberChange}
          keyboardType="numeric"
        />
        {!isNumberValid && <Text style={{color:'white'}}>*Please enter a valid number.</Text>}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={handleConfirmPress} style={styles.confirmBtn}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ handleCancel} style={styles.confirmBtn}>
          <Text style={styles.confirmText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",


    },

    title: {
        paddingTop: 180,
        fontSize: 30,
        color: '#fff',
        marginBottom:50,
    },
    inputs:{
        padding:10,
        marginBottom:4,
        fontSize:18
    },
      inputContainer: {
        borderColor:'#000000',
        borderWidth:0.5, 
        borderRadius:20,  
        backgroundColor:'#FFFFFF',
        height:50,
        width:'80%',
        marginVertical:30,
        shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    },
    confirmBtn:{
        backgroundColor: "#084C4F",
        borderRadius: 10,
        borderBottomWidth:0.5,
        width: "40%",
        height: 40,
        padding: 5,
        paddingTop:5,
        marginBottom: 20,
        alignItems: "center",
        marginTop:20,
        marginHorizontal:3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 20,
       // 
    },
    confirmText: {
        color: '#fff',
        fontSize: 18,
    },
});
export default AdvPayment;


