import React, { useState,useEffect } from 'react';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import { StyleSheet, Text, View,TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    ScrollView } from 'react-native';
import {Table,Row,Rows} from 'react-native-table-component';
import { MaterialIcons } from '@expo/vector-icons';




  function ServiceCenter() {

    const navigate = useNavigate();

  const handlePress = () => {
    navigate('/IssueSubmission');
  };

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

    const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8070/BranchDetails/");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
    
  return (
    <View>
    <View style={{marginTop:200}}>
      <View>
        <Text style={styles.serviceCenterText}>Service Center A</Text>
      </View>
      

          <ScrollView style={{ flexGrow: 0.75,height:400 }}>
          <View style={{width:380 }}>
              {data.map(item => (
                
                <TouchableOpacity onPressOut={handlePress} style={styles.appButtonContainer}>
                        <Text style={styles.appButtonText1}>{item.branchName}</Text>
                        <Text style={styles.appButtonText}>{item.contactNo}</Text>
                        <Text style={styles.appButtonText}>{item.address}</Text>
                </TouchableOpacity>
             
               ))}
               </View>
          </ScrollView>
    

        <View style={{marginTop:30}}>
       
        <Text style={styles.heading}>Tap to rate</Text>
       
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
                        size={32}
                        style={starRating >= option ? styles.starSelected : styles.starUnselected}
                      />
                  </Animated.View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </View>
         </View> 
        {/* <View 
        // style={{flex:1,justifyContent: 'flex-end'}}
        >
            <TouchableOpacity 
              // onPress={onPress} 
            style={styles. serviceIssueButton}>
              <Text style={styles.serviceIssueButtonText}>Submit your issue</Text>
            </TouchableOpacity>
        </View> */}
    </View>

  );
}


const styles = StyleSheet.create({

  appButtonContainer: {
    elevation: 6,
    backgroundColor: "#fff",
    borderRadius: 15,
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
  serviceCenterText: { 
    margin: 10,
    color: "#084C4F",
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 35,
    marginVertical:25
  },
  // HeadStyle: { 
  //   height: 50,
  //   alignContent: "center",
  //   backgroundColor: "#084C4F",
  //   width:375
  // },
  // TableText: { 
  //   margin: 10,
  //   color: "#fff",
  //   textAlign:'center',
  //   fontSize: 18
  // },
  // TableRowText: { 
  //   margin: 0,
  //   fontSize: 15
  // },
  heading: {
    fontSize: 24,
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



export default ServiceCenter;

