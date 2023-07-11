// import  React, { useState }  from 'react';
// import {View, Text, StyleSheet, Image, TouchableOpacity,ScrollView, TouchableWithoutFeedback,
//     Animated,} from 'react-native';
// import {Searchbar, Avatar } from 'react-native-paper';
// import {Table,Row,Rows} from 'react-native-table-component';
// import { MaterialIcons } from '@expo/vector-icons';

// const HeadTable= ['Name', 'Address', 'Contact No '];
// const DataTable= [
//         ['Kalutara', 'No.28,Galle Road,Kalutara.', '034-2456825'],
//         ['Panadura', 'No.507,Galle Road,Panadura.', '038-2247896'],
        

        
//       ];

// function ComBranchDetails() {
    
//     const starRatingOptions = [1, 2, 3, 4, 5];

//     const [starRating, setStarRating] = useState(null); 
    
    
//     const animatedButtonScale = new Animated.Value(1);
  
//     const handlePressIn = () => {
//       Animated.spring(animatedButtonScale, {
//         toValue: 1.5,
//         useNativeDriver: true,
//         speed: 50,
//         bounciness: 4,
//       }).start();
//     };
  
//     const handlePressOut = () => {
//       Animated.spring(animatedButtonScale, {
//         toValue: 1,
//         useNativeDriver: true,
//         speed: 50,
//         bounciness: 4,
//       }).start();
//     };
  
//     const animatedScaleStyle = {
//       transform: [{ scale: animatedButtonScale }],
//     };
    

//     return (
//         <View style={styles.mainContainer1}>
//             <View>
//                 <Avatar.Image size={70} source={require('../assets/avatar.jpg')} style={styles.avatar1}/>
//             </View>
//             <View style={styles. cardContainer1}>
//             <View style={styles.card1} >
//                 <Image style={styles.coverImage1} resizeMode="contain" source={require('../assets/abans.jpg')}/> 
//             </View>
//             </View >   
            
               
//             <View>
//                 <Searchbar style={styles.searchBar1} placeholder='Search Company Branch'></Searchbar>
//             </View>
            
//             <View>
//                 <Table borderStyle={{borderWidth:1}} style={styles.table}>
//                     <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.headTextStyle}
//                     // textStyle={styles.TableText}
//                     />
//                     <ScrollView>
//                     <Table borderStyle={{borderWidth:1}}>
//                         <Rows data={DataTable}  style={{backgroundColor:'white'}} textStyle={styles.rowTextStyle}
//                         // textStyle={styles.TableRowText}
//                         />
//                     </Table>
//                     </ScrollView>
//                 </Table> 

//             </View>

//             <View>
            
//           <Text style={styles.heading}>Tap to rate</Text>
//           <View style={styles.stars}>
//               {starRatingOptions.map((option) => (
//                 <TouchableWithoutFeedback
//                   onPressIn={() => handlePressIn(option)}
//                   onPressOut={() => handlePressOut(option)}
//                   onPress={() => setStarRating(option)}
//                   key={option}
//                 >
//                   <Animated.View style={animatedScaleStyle}>
//                     <MaterialIcons
//                         name={starRating >= option ? 'star' : 'star-border'}
//                         size={32}
//                         style={starRating >= option ? styles.starSelected : styles.starUnselected}
//                       />
//                   </Animated.View>
//                 </TouchableWithoutFeedback>
//               ))}
//             </View>
//           </View>
        
//           <View style={{flex:1,justifyContent: 'center'}}>
//             <TouchableOpacity 
              
//             style={styles. serviceIssueButton}>
//               <Text style={styles.serviceIssueButtonText}>Submit your issue</Text>
//             </TouchableOpacity>
//         </View>
            
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     mainContainer1: {
//         flex: 1,
//     // backgroundColor: '#ffffff',
//     alignItems: 'center', 
//     justifyContent: 'center',
//     width: 350,
//     maxheight: 1500,
//     marginTop: 50,
//     // marginBottom: 50,
//     marginLeft: 5,
//     marginRight: 5,
    

        
          
//       },

//     avatar1: {
//         flex:1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         // backgroundColor: '#ffffff',
//         maxHeight: 70,
//         marginLeft: 230,
        
        
        
//     },

//     cardContainer1: {
//         flex: 1,
//         // backgroundColor: '#ffff00',
//         alignItems: 'center', 
//         justifyContent: 'center',
//         width: 70,
//         maxHeight: 70, 
//         margin: 10,
//         marginTop: 30,
          
    
//     },
    
        
       
//     card1: {
//         flex: 1,
//         alignItems: 'center', 
//         justifyContent: 'center',
//         backgroundColor: '#ffffff',
//         borderRadius: 10,
//         width: 70,
//         height: 70,
//         overflow: 'hidden',
//         // marginBottom: 7,
        
    
//     },
        
    
//     coverImage1: {
//         flex: 1,
//         alignItems: 'center', 
//         justifyContent: 'center',
//         width: 70,
//         height: 70,
          
//     },

//     searchBar1: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#ffffff',
//         marginTop: 20,
//         maxHeight: 50,
//         width: 320,
//     },

//     container1: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//         alignItems: 'center', 
//         justifyContent: 'center',
//         width: 320,
//         height: 300,
//         marginTop: 20,
//         // marginBottom: 50,
        
//     },

//     // subContainer1: {
//     //     flex: 1,
//     //     flexDirection: 'row',
//     //     // backgroundColor: '#ffff00',
//     //     alignItems: 'center', 
//     //     justifyContent: 'center',
//     //     width: 300,
//     //     height: 200,
//     //     marginTop: 30,
//     //     marginBottom: 50,
//     // },

//     HeadStyle: { 
//         height: 50,
//         alignContent: "center",
//         backgroundColor: "#084C4F",
//         width:350
//       },
    
//       // TableText: { 
//       //   margin: 10,
//       //   color: "#fff",
//       //   textAlign:'center',
//       //   fontSize: 18
//       // },

//       headTextStyle: {
//         margin: 10,
//         color: '#fff',
//         textAlign: 'center',
//         fontSize: 18,
//       },

//       rowTextStyle: {
//         margin: 10,
//         fontSize: 15,
//       },

//       // TableRowText: { 
//       //   margin: 10,
//       //   fontSize: 15,
//       // },
//       table:{
//         marginVertical:40,
//         maxHeight:180
//       },

//       heading: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//       },
//       stars: {
//         display: 'flex',
//         flexDirection: 'row',
//       },
//       starUnselected: {
//         color: '#aaa',
//       },
//       starSelected: {
//         color: '#ffb300', 
//         },

//         serviceIssueButton: {
//             elevation: 6,
//             alignContent: 'center',
//             backgroundColor: "#084C4F",
//             borderRadius:20,
//             padding: 20,
//             margin:30,

            
//             // bottom:0,
//             // right:0,
//             // left:0,
          
//           },
//           serviceIssueButtonText: {
//             fontSize: 22,
//             color: "#fff",
//             // fontWeight: "bold",
//             alignSelf: "center",
//             // textTransform: "uppercase"
//           }

// });

// export default ComBranchDetails;

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



  function ComBranchDetails() {

    const {objectId} = useParams();
    // const route = useRoute();
    // const { serviceProviderName } = route.params;
    const { serviceProviderName, _id } = useParams();
    const companyID=_id;
    // const route =Route();
    // const { componentId } = route.params;
    const [s, setS] = useState(null);
   
    const navigate = useNavigate();
    const handleBackButton = () => {
      navigate(`/CompanyDetails/${objectId}`,{objectId});
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

    const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8070/BranchDetails/");
      const jsonData = await response.json();
      const filteredData = jsonData.filter(item => item.ServiceProvider === companyID);
      setData(filteredData);
      // setData(jsonData);
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
  <View>
    <View style={{marginTop:200}}>
      <View>
        <Text style={styles.serviceCenterText}>
        {serviceProviderName}
        </Text>
      </View>
      

          <ScrollView style={{ flexGrow: 0.75,height:400 }}>
          <View style={{width:380 }}>
              {data.map(item => (
               
                <Link to={`/ProductDetailsCompany/${objectId}/${companyID}/${serviceProviderName}/${item._id}`} component={TouchableOpacity} style={styles.appButtonContainer} key={item._id}>
                        <View><Text style={styles.appButtonText1}>{item.branchName}</Text>
                        <Text style={styles.appButtonText}>{item.contactNo}</Text>
                        <Text style={styles.appButtonText}>{item.address}</Text></View>
                </Link>
                
             
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



export default ComBranchDetails;

