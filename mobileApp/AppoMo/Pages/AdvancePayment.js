import React,{useState, useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
  Alert,
    TouchableOpacity,
} from "react-native";
import axios from 'axios';
import { BackHandler } from 'react-native';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import { useParams } from 'react-router-native';
//import { useNavigation } from '@react-navigation/native';



function AdvPayment() {

  const navigate = useNavigate();
  const {objectId} = useParams();
  const {BranchDetails} = useParams();
  const {issueId} = useParams();
  const {selectedDate} = useParams();
  const {selectedtime} = useParams();
  const time=selectedtime;
  const handleBackButton = () => {
    navigate(`/DateTimePicker/${objectId}/${BranchDetails}/${issueId}`,{objectId,BranchDetails,issueId});
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  }, [handleBackButton]);
 
 // const navigation = useNavigation();
 const [mobileNumber, setMobileNumber] = useState("");
 const [isNumberValid, setIsNumberValid] = useState(true);

  const handleConfirmPress = () => {
    if (mobileNumber) {
    Alert.alert(
      "Payment Confirmation",
      "Are you sure you want to pay?",
      [
        {
          text: "No",
          onPress: () => console.log("Payment canceled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            
            // Perform payment deduction and send SMS using API
            // performPaymentAndSendSMS();

            
          

            fetch(`http://10.0.2.2:8070/Issues/getAdv/${issueId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            const Name = data.Issues.Name;
            const ContactNo = data.Issues.ContactNo;
            const InvoiceNo = data.Issues.InvoiceNo;
            const Product = data.Issues.Product;
            const Model = data.Issues.Model;
            const IssueInBrief = data.Issues.IssueInBrief; // Assuming the response from the backend contains the object ID as "_id"
            const fAmount='100';
            
            fetch("http://10.0.2.2:8070/Appointments/add", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "Name": Name,
                "ContactNo": ContactNo,
                "InvoiceNo": InvoiceNo,
                "Product":Product,
                "Model":Model,
                "Checked":false,
                "IssueInBrief": IssueInBrief,
                "ApntmntDate":selectedDate, // Add the audio URI field
                "Time":time,
                "finalAmount":fAmount,
                "Completed":false,
                // Model:selectedModel,
                "BranchDetails":BranchDetails,
                "UserDetails":objectId
        
              })
            })
              .then(res => res.json())
              .then(data => {
                console.log(data);
              })
              .catch(error => {
                console.log(error);
              });
            
          })
          .catch(error => {
            console.log(error);
          });
          console.log("Payment confirmed");
          navigate(`/CompanyOrServiceCenter/${objectId}`,{objectId});
          },
        },
      ],
      { cancelable: false }
    );
  } else {
    Alert.alert("Error", "Please enter mobile number and amount.");
  }

  

};


  // const performPaymentAndSendSMS = () => {
 
  //     // Use the mobileNumber state variable as the mobile number to send the SMS to
  //     console.log("Performing payment deduction and sending SMS...");
    
    
  //     // Make the fetch request to update appointment status and send SMS
  //   //   fetch('http://10.0.2.2:8070/Advpayment/update', {
  //   //     method: 'POST',
  //   //     headers: {
  //   //       'Content-Type': 'application/json'
  //   //     },
  //   //     body: JSON.stringify( { mobileNumber: mobileNumber})
  //   //   })
  //   //     .then(response => response.json())
  //   //     .then(data => {
  //   //       console.log('Appointment status updated  and message sent successfully');
         
  //   //     })
  //   //     .catch(error => {
  //   //       console.error('Error updating appointment status and message sending :', error);
  //   //       // Handle error case
  //   //     });
  //   // };
    
  //   axios.post("http://10.0.2.2:8070/Advpayment/payment", { mobileNumber: mobileNumber})
  //       .then((response) => {
  //         console.log(response);
  //         console.log('Appointment status updated  and message sent successfully');
 
  //     })
    
  //         .catch(error => {
  //           console.error(error);
  //           console.error('Error updating appointment status and message sending :', error);
           
  //         });

    
  //       setMobileNumber('');
  //       // navigate('/VerifyOTP');
      
  //   };


  
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
          onPress: () =>{
            console.log('Payment cancelled');
            navigate(`/DateTimePicker/${objectId}/${BranchDetails}/${issueId}`,{objectId,BranchDetails,issueId});
        },
      }
      ],
      
      { cancelable: false }
    );
    
  };

   function isNumeric(input) {
    const reg = /^[0-9]+$/;
    return reg.test(input);
   }
   const handleNumberChange = (input) => {
    setMobileNumber(input);
    setIsNumberValid(isNumeric(input));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment of Advance</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Advance "
          value="Advance  amount -   Rs.100"
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
          value={mobileNumber}
          keyboardType="numeric"
           onChangeText={handleNumberChange}
          
        />
        {!isNumberValid && <Text style={{color:'white'}}>* Enter your mobile number.</Text>}
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


