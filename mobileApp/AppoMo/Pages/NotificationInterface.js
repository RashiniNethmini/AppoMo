import React,{useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { BackHandler } from 'react-native';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import { useParams } from 'react-router-native';


const Notification = ({ title, message, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </TouchableOpacity>
  );
};

const NotificationInterface = () => {
  const {objectId} = useParams();
  

  const handleNotificationPress = (notification) => {
    console.log('Notification pressed:', notification);
    // Handle the notification press event
  };
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(`/CompanyOrServiceCenter/${objectId}`,{objectId});
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  }, [handleBackButton]);
 
  

    const [data, setData] = useState([]);
    const [datar, setDatar] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);
  
   
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.1.226:8070/Issues/notIfication/${objectId}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchData1();
    }, []);
  
   
    const fetchData1 = async () => {
      try {
        const response = await fetch(`http://192.168.1.226:8070/Issues/notIficationr/${objectId}`);
        const jsonData = await response.json();
        setDatar(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }; 
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notification</Text>
      <ScrollView style={{ flexGrow: 0.75,height:400 }}>
      <View style={{width:380 }}>
              {data.map(item => (
               
                <Link to={`/DateTimePicker/${objectId}/${item.BranchDetails}/${item._id}`} component={TouchableOpacity} style={styles.appButtonContainer} key={item._id}>
                        <View><Text style={styles.appButtonText1}>{item.IssueInBrief}</Text>
                        <Text style={styles.appButtonText1}>{objectId}</Text>
                        <Text style={styles.appButtonText}>Pick a Date and Time </Text>
                        </View>
                </Link>
                
             
               ))}
               </View>
          <View style={{width:380 }}>
              {datar.map(item => (
               
                <Link to={`/CompanyOrServiceCenter/${objectId}`} component={TouchableOpacity} style={styles.appButtonContainer} key={item._id}>
                        <View><Text style={styles.appButtonText1}>{item.IssueInBrief}</Text>
                        </View>
                </Link>
                
             
               ))}
               </View>
          </ScrollView>
              


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    marginTop:100,
    // marginRight:70,
   
    
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical:30,
    textAlign:'center'
    // marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
   
    // marginBottom: 8,
  },
  message: {
    fontSize: 16,
    // color: '#555',
  },
  appButtonContainer: {
    elevation: 6,
    backgroundColor: "#fff",
    opacity:1000,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical:5,
    width:360,
    height:85
    
  },
  appButtonText1: {
    fontSize: 18,
    fontWeight:'bold'
  },
  appButtonText: {
    fontSize: 15,
  },
});

export default NotificationInterface;
