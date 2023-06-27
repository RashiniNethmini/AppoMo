import React, { useState, useEffect } from 'react';
import {View, SafeAreaView, StyleSheet, ToastAndroid, TouchableWithoutFeedback, Alert} from 'react-native';
import {Avatar, Title, Caption, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { BackHandler } from 'react-native';
import { useParams } from 'react-router-native';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';

const ProfileScreen = () => {

  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [username, setUsername] = useState('');

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const permisionFunction = async () => {

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === 'granted');

    if (imagePermission.status !== 'granted') {
        setToastMsg('Permission for media access needed.');
    }
  };

  useEffect(() => {
      permisionFunction();
  }, );

  const pick = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
      });

      if (!result.cancelled) {
          setImageUri(result.uri);
      }
  }

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(`/CompanyOrServiceCenter/${objectId}`,{objectId});
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  }, [handleBackButton]);

  const EditProfile = () => {
    navigate(`/EditProfile/${objectId}`,{objectId});

  };
  const Resetpwd = () => {
    navigate(`/ResetPwd/${objectId}`,{objectId});

  };
  const deleteAccount = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: confirmDeleteAccount,
        },
      ],
      { cancelable: false },
    );
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8070/UserDetails/getusername/${objectId}`);
      const data = await response.json();
  
      if (response.ok) {
        const userDetails = data.UserDetails;
        setUsername(userDetails.username);
        
      } else {
        console.error('Error fetching data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const confirmDeleteAccount = () => {

    fetch(`http://10.0.2.2:8070/UserDetails/delete/${objectId}`, {
      method: 'DELETE',
    })
      .then(response => {

        if (response.ok) {
          Alert.alert('Information', 'Your account has been deleted.',
          [
            {text: 'OK',
            onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false },);
        } else {
          Alert.alert('Information', 'Account deletion failed.',
          [
            {text: 'OK',
            onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false },);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const {objectId} = useParams();

  return (
    <SafeAreaView style={styles.container}>     
      <View style={styles.userInfoSection}>  

        <View style={styles.imageContainer}>     
          <Avatar.Image
            size={100}
            source={{ uri: imageUri }}
          />
        </View>
        <View style={{alignItems: 'center'}}>
            <Title style={styles.title}>@{username}</Title>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableWithoutFeedback onPress={pick}>
          <View style={styles.menuItem}>
            <Icon name="camera" color="#FFFFFF" size={25}/>
            <Text style={styles.menuItemText}>Change Photo</Text>
            <Icon name="arrow-right-circle" color="#FFFFFF" size={25}/>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={EditProfile}>
          <View style={styles.menuItem}>
            <Icon name='pencil' color="#FFFFFF" size={25}/>
            <Text style={styles.menuItemText}>Edit Profile</Text>
            <Icon name="arrow-right-circle" color="#FFFFFF" size={25}/>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={Resetpwd}>
          <View style={styles.menuItem}>
            <Icon name="key" color="#FFFFFF" size={25}/>
            <Text style={styles.menuItemText}>Reset Password</Text>
            <Icon name="arrow-right-circle" color="#FFFFFF" size={25}/>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={deleteAccount}>
          <View style={styles.menuItem}>
            <Icon name="account" color="#FFFFFF" size={25}/>
            <Text style={styles.menuItemText}>Delete Account</Text>
            <Icon name="arrow-right-circle" color="#FFFFFF" size={25}/>
          </View>
        </TouchableWithoutFeedback>

        <Link to='/'  component={TouchableWithoutFeedback}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FFFFFF" size={25}/>
            <Text style={styles.menuItemText}>Sign Out</Text>
            <Icon name="arrow-right-circle" color="#FFFFFF" size={25}/>
          </View>
       </Link>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 50,
  },

  topContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent'
  },

  btnText: {
    width: 200,
    color: '#084C4F',
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 26,
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:15,
    marginBottom: 5,
  },

  menuWrapper: {
    marginTop: 10,
    paddingVertical: 35,
    paddingBottom: 40,
  },

  menuItem: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft:10,
    marginRight: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#084C4F',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#084C4F',
  },

  menuItemText: {
    width: 200,
    color: '#FFFFFF',
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 26,
  },
});
