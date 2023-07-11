// import  React, { useState, useEffect }  from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View,Image, TouchableOpacity,ScrollView } from 'react-native';
// import { Searchbar, Avatar } from 'react-native-paper';



// function CompanyDetails() {

//   const [searchQuery, setSearchQuery] = React.useState('');
//   const onChangeSearch = (query) => setSearchQuery(query);
  
//   const [companies, setCompanies] = useState([]);

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     try {
//       const response = await fetch("http://10.0.2.2:8070/serviceprovider/");
//       const jsonCompanies = await response.json();
//       setCompanies(jsonCompanies);
//     } catch (error) {
//       console.error('Error fetching companies:', error);
//     }
//   };



//   return (
    
    
//     <View style={styles.mainContainer}>
//       <View><Avatar.Image size={70} source={require('../assets/avatar.jpg')} style={styles.avatar}/></View>
//       <View><Searchbar style={styles.searchBar} placeholder='Search Company' onChangeText={onChangeSearch} value={searchQuery}></Searchbar></View>
      
      
//       <ScrollView>
//       <View style={styles.container}>

//         {companies.map((company, index) =>(
//           <View style={styles.cardContainer} key={index}>
//             <TouchableOpacity>
//             <View style={styles.card} >
//             {company.logo ? (
//                     <Image style={styles.coverImage} resizeMode="contain" source={{ uri: company.logo }} /> // Use valid image source
//                   ) : (
//                     <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/avatar.jpg')}
//               // source={company.logo}
//               />
//                   )}
//               {/* <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/avatar.jpg')}
//               // source={company.logo}
//               />  */}
//             </View>    
//             <Text style={styles.tStyle}>{company.serviceProviderName}</Text>
//             </TouchableOpacity>
//           </View> 
//           ))}
          

//       </View>
//       </ScrollView>    

            
            
            
//     </View>
    
//   );
// }


// const styles =StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     alignItems: 'center', 
//     justifyContent: 'center',
//     width: 350,
//     maxHeight: 1500,
//     marginTop: 50,
//     marginLeft: 5,
//     marginRight: 5,
    
      
//   },
  
//   avatar: {
//     flex:1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     maxHeight: 70,
//     marginLeft: 230,
    
    
//   },
//   searchBar: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ffffff',
//     marginTop: 100,
//     maxHeight: 50,
//     width: 320,
//     marginBottom:20,
    

//   },

//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap:'wrap',
//     alignItems: 'center', 
//     justifyContent: 'center',
//     width: 320,
//     height: 900,
    
    
//   },

//   cardContainer: {
//     flex: 1,
//     alignItems: 'center', 
//     justifyContent: 'center',
//     width: 140,
//     height: 140, 
//     margin: 55,
//     marginTop: 10,
    
      

//   },

    
   
//   card: {
//     flex: 1,
//     alignItems: 'center', 
//     justifyContent: 'center',
//     backgroundColor: '#ffffff',
//     borderRadius: 20,
//     width: 140,
//     height: 140,
//     overflow: 'hidden',
    
    

//   },

  
    

//   coverImage: {
//     flex: 1,
//     alignItems: 'center', 
//     justifyContent: 'center',
//     width: 140,
//     height: 140,
      
//   },
//   tStyle:{
//     color:'white',
//     fontWeight: "bold",
//     fontSize: 18
//   },

// });

// export default CompanyDetails;
  

import React,{useEffect,useState} from 'react';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import {StyleSheet, Pressable, Image, View, Alert,Text,TouchableOpacity,ScrollView} from 'react-native';
// import { SearchBar } from "react-native-elements";
import { SearchBar } from "@rneui/base";
// import { useNavigation } from '@react-navigation/native';
// import ServiceCenter from './ServiceCenter';
// export { handlePress };
import { BackHandler } from 'react-native';
import { useParams } from 'react-router-native';

function CompanyDetails() {

  const navigate = useNavigate();
  const {objectId} = useParams();
  const handleBackButton = () => {
    navigate(`/CompanyOrServiceCenter/${objectId}`,{objectId});
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  }, [handleBackButton]);




  const handlePress = (serviceProviderName) => {
    navigate('/ComBranchDetails', { objectId,serviceProviderName, _id});
  };

  // const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.1.226:8070/serviceprovider/getCom");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [sdata, setsData] = useState([]);

  useEffect(() => {
    fetchSearchData();
  }, [searchTerm]);

 

  const fetchSearchData = async () => {
     {
      const responsee = await fetch(`http://192.168.1.226:8070/serviceprovider/getC/${searchTerm}`);
      const jsonData = await responsee.json();
      setsData(jsonData);
    }
    //  catch (error) {
    //   console.error('Error fetching data:', error);
    // }
    
  };

  const renderList = () => {
    const items = searchTerm ? sdata : data;

    return items.map(item => (
      <View style={styles.item} key={item.serviceProviderName}>
        <Link to={`/ComBranchDetails/${objectId}/${item._id}/${item.serviceProviderName}`} component={TouchableOpacity} style={styles.imagesStyle}>
          <Image source={require('../assets/avatar.jpg')} style={styles.imageStyle} />
        </Link>
        <Text style={styles.tStyle}>{item.serviceProviderName}</Text>
      </View>
    ));
  };

  return (
    
    <View>
    <View>
          <View style={styles.searchStyles}>
              <SearchBar
      platform="default"
      containerStyle={{}}
      inputContainerStyle={{}}
      inputStyle={{}}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      loadingProps={{}}
      onChangeText={newVal => setSearchTerm(newVal)}
      onClearText={() => console.log(onClearText())}
      placeholder="Search location wise..."
      placeholderTextColor="#888"
      cancelButtonTitle="Cancel"
      cancelButtonProps={{}}
      onCancel={() => console.log(onCancel())}
      value={searchTerm}
    />
          </View>
      </View>  
          <ScrollView style={{ flexGrow: 0.75 ,height:500}}>     
    
            <View style={styles.list}>
            {/* {data.map(item => (
                <View style={styles.item}>
                
                  <TouchableOpacity style={styles.imagesStyle} onPress={() => handlePress(item.serviceProviderName)}
                  //  onPress={()=>navigation.navigate("serviceCenter")}
                  // onPress={() => navigation.navigate('serviceCenter')}
                  >
                    <Image
                        source={require('../assets/a.jpg')}
                        style={styles.imageStyle}
                        />
                  </TouchableOpacity>
                  
                  <Text style={styles.tStyle}>{item.serviceProviderName}
                  </Text>
               
                </View>
                ))} */}
                {/* {data.map(item => (
  <View style={styles.item} key={item.serviceProviderName}>
    <Link to={`/ServiceCenter/${item._id}/${item.serviceProviderName}`} component={TouchableOpacity} style={styles.imagesStyle}>
      <Image source={require('../assets/a.jpg')} style={styles.imageStyle} />
    </Link>
    <Text style={styles.tStyle}>{item.serviceProviderName}</Text>
  </View>
))} */}
{renderList()}
            </View>
        
        </ScrollView> 
      
    </View>

  )
}

const styles = StyleSheet.create({
  searchStyles:{
    // marginVertical:50,
    // marginTop:200,
    // width:350
    margin:20,
    marginVertical:50,
    marginTop:150,
    width:350
  },
  list:{
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap:'wrap',
    margin:20,
    gap:80 ,

  },
  tStyle:{
    color:'white',
    fontWeight: "bold",
    fontSize: 18
  },
  item:{
    alignItems:'center'
  },
  imagesStyle:{
    elevation: 10
  },
  imageStyle:{
    height:100,
    width:100,
    borderRadius:10,
    marginVertical:10
  },

});

export default CompanyDetails;
