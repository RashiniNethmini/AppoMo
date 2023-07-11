import React, { useState,useEffect } from 'react';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import { StyleSheet, Text, View,TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    ScrollView } from 'react-native';
import {Table,Row,Rows} from 'react-native-table-component';
import { MaterialIcons } from '@expo/vector-icons';
import { useParams } from 'react-router-native';
import { BackHandler } from 'react-native';

export default function Rating() {

    const {BranchDetails} = useParams();
    // const BranchDetails='649fcfd20a1daddc6153e8ca';
   
    const [s, setS] = useState(null);
   
    const navigate = useNavigate();
    const handleBackButton = () => {
      navigate(`/SelectServiceCenter/${objectId}`,{objectId});
      return true;
    };
  
    useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  
      return () => backHandler.remove();
    }, [handleBackButton]);
  
  
  

  
    const starRatingOptions = [1, 2, 3, 4, 5];

    const [starRating, setStarRating] = useState(null);
  
    const animatedButtonScale = new Animated.Value(1);
  
    const handlePressIn = () => {
      Animated.spring(animatedButtonScale, {
        toValue: 1.5,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }).start();
    };
  
    const handlePressOut = () => {
      Animated.spring(animatedButtonScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }).start();
    };
  
    const animatedScaleStyle = {
      transform: [{ scale: animatedButtonScale }],
    };

    const [_id, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      const response =  await fetch(`http://10.0.2.2:8070/BranchDetails/get/${BranchDetails}`);
      const jsonData = await response.json();
      setData(jsonData.branchdetail.ServiceProvider);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (starRating !== null) {
      updateStarRating();
    }
  }, [starRating]);
  
  const updateStarRating = async () => {
    try {
      const responsed = await fetch(`http://10.0.2.2:8070/serviceprovider/getr/${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
   
    const resultt = await responsed.json();
    // console.log(resultt);
    const currentRating = resultt.serviceprovider.starRating || 0; // Default to 0 if no rating exists
    const updatedRating = currentRating + starRating;


      const updateresponse = await fetch(`http://10.0.2.2:8070/serviceprovider/updater/${_id}`,
       {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ starRating: updatedRating }),
      });
  
      const result = await updateresponse.json();
      console.log(result); // Optional: Handle the response from the server
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };
  return (
    <View style={{marginTop:250}}>
       
    <Text style={styles.heading}>       Tap to rate</Text>
  
      <View style={styles.stars}>
          {starRatingOptions.map((option) => (
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn(option)}
              onPressOut={() => handlePressOut(option)}
              onPress={() => setStarRating(option)}
              key={option}
            >
              <Animated.View style={animatedScaleStyle}>
                <MaterialIcons
                    name={starRating >= option ? 'star' : 'star-border'}
                    size={60}
                    style={starRating >= option ? styles.starSelected : styles.starUnselected}
                  />
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </View>
</View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    // marginBottom: 20,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
  a:{
    marginVertical:40,
    maxHeight:200
  },
  serviceIssueButton: {
    elevation: 6,
    backgroundColor: "#084C4F",
    paddingVertical: 20,
    marginVertical:30,
    position: 'absolute',
    bottom:0,
    right:0,
    left:0,
  
  },
  serviceIssueButtonText: {
    fontSize: 22,
    color: "#fff",
    // fontWeight: "bold",
    alignSelf: "center",
    // textTransform: "uppercase"
  }
});

