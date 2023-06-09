import React, { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    ScrollView } from 'react-native';
import {Table,Row,Rows} from 'react-native-table-component';
import { MaterialIcons } from '@expo/vector-icons';
    

const HeadTable= ['Name', 'Address', 'Contact No '];
const DataTable= [
        ['Colombo', '87/5,Main Roard,Colombo.', '011-2456825'],
        ['Panadura', 'No.507,Galle Road,Panadura.', '038-2247896'],

        ['Colombo', '87/5,Main Roard,Colombo.', '011-2456825'],
        ['Panadura', 'No.507,Galle Road,Panadura.', '038-2247896'],
      ];


function ServiceCenter() {

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
    
    
  return (
    <View>
    <View style={{marginTop:200}}>
      <View>
        <Text style={styles.serviceCenterText}>Service Center A</Text>
      </View>
      
        <View>
              <Table borderStyle={{borderWidth:1}} style={styles.a}>
                <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
                <ScrollView>
                <Table borderStyle={{borderWidth:1}}>
                <Rows data={DataTable}  style={{backgroundColor:'white'}} textStyle={styles.TableRowText}/>
              </Table>
              </ScrollView>
              </Table> 
        </View>
       

        <View>
           
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
        <View style={{flex:1,justifyContent: 'flex-end'}}>
            <TouchableOpacity 
              // onPress={onPress} 
            style={styles. serviceIssueButton}>
              <Text style={styles.serviceIssueButtonText}>Submit your issue</Text>
            </TouchableOpacity>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  serviceCenterText: { 
    margin: 10,
    color: "#084C4F",
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 35,
  },
  HeadStyle: { 
    height: 50,
    alignContent: "center",
    backgroundColor: "#084C4F",
    width:375
  },
  TableText: { 
    margin: 10,
    color: "#fff",
    textAlign:'center',
    fontSize: 18
  },
  TableRowText: { 
    margin: 10,
    fontSize: 15
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

