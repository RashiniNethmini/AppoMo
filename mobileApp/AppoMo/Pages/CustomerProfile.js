import React, { useState, useEffect } from 'react';
import {View, SafeAreaView, StyleSheet, ToastAndroid, TouchableWithoutFeedback} from 'react-native';
import {Avatar, Title, Caption, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {

  const [galleryPermission, setGalleryPermission] = useState(null);
    const [imageUri, setImageUri] = useState(null);

    const setToastMsg = msg => {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }

    const permisionFunction = async () => {

        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        console.log(imagePermission.status);

        setGalleryPermission(imagePermission.status === 'granted');

        if (imagePermission.status !== 'granted') {
            setToastMsg('Permission for media access needed.');
        }
    }

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


  return (
    <SafeAreaView style={styles.container}>     
      <View style={styles.userInfoSection}>  
        <TouchableWithoutFeedback>
          <View style={styles.topContainer}>
            <Icon name="arrow-left" color="#084C4F" size={25}/>
            <Text style={styles.btnText}>Back</Text>
          </View>
        </TouchableWithoutFeedback> 

        <View style={styles.imageContainer}>     
          <Avatar.Image
            size={100}
            source={{ uri: imageUri }}
          />
        </View>
        <View style={{alignItems: 'center'}}>
            <Title style={styles.title}>John Doe</Title>
            <Caption style={styles.caption}>@j_doe</Caption>
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

        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('/EditProfile')}>
          <View style={styles.menuItem}>
            <Icon name='pencil' color="#FFFFFF" size={25}/>
            <Text style={styles.menuItemText}>Edit Profile</Text>
            <Icon name="arrow-right-circle" color="#FFFFFF" size={25}/>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('/ResetPwd')}>
          <View style={styles.menuItem}>
            <Icon name="key" color="#FFFFFF" size={25}/>
            <Text style={styles.menuItemText}>Reset Password</Text>
            <Icon name="arrow-right-circle" color="#FFFFFF" size={25}/>
          </View>
        </TouchableWithoutFeedback>

        //delete account
        <TouchableWithoutFeedback>
          <View style={styles.menuItem}>
            <Icon name="key" color="#FFFFFF" size={25}/>
            <Text style={styles.menuItemText}>Delete Account</Text>
            <Icon name="arrow-right-circle" color="#FFFFFF" size={25}/>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FFFFFF" size={25}/>
            <Text style={styles.menuItemText}>Log Out</Text>
            <Icon name="arrow-right-circle" color="#FFFFFF" size={25}/>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'rgba(8,76,79,0.8)',
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

  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },

  menuWrapper: {
    marginTop: 10,
    paddingVertical: 35,
    paddingBottom: 40,
    //backgroundColor: '#084C4F' 
  },

  menuItem: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft:10,
    marginRight: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    //backgroundColor: '#FFFFFF',
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
