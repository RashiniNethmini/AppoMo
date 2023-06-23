import React,{useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
  const notifications = [
    { id: 1, title: 'Notification 1', message: 'This is the first notification' },
    { id: 2, title: 'Notification 2', message: 'This is the second notification' },
    { id: 3, title: 'Notification 3', message: 'This is the third notification' },
  ];

  const handleNotificationPress = (notification) => {
    console.log('Notification pressed:', notification);
    // Handle the notification press event
  };
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate('/CompanyOrServiceCenter/:objectId');
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  }, [handleBackButton]);
 
    const {objectId} = useParams();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notification</Text>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          title={notification.title}
          message={notification.message}
          onPress={() => handleNotificationPress(notification)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    marginTop:-200,
    marginRight:70,
   
    
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical:300
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
});

export default NotificationInterface;
