import  React, { useState, useEffect }  from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, TouchableOpacity,ScrollView } from 'react-native';
import { Searchbar, Avatar } from 'react-native-paper';
import axios from 'axios';






function CompanyDetails() {

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  
  const [serviceProviders, setServiceProviders] = React.useState('');

  const fetchServiceProviders = async () => {
    try {
      const response = await axios.get("http://localhost:8070/serviceprovider/get/serviceProviders" );
      setServiceProviders(response.data);
    } catch (error) {
      console.error('Error fetching service providers:', error);
    }
  };

  useEffect(() => {
    
    fetchServiceProviders();
  }, []);


  return (
    
    
    <View style={styles.mainContainer}>
      <View><Avatar.Image size={70} source={require('../assets/avatar.jpg')} style={styles.avatar}/></View>
      <View><Searchbar style={styles.searchBar} placeholder='Search Company' onChangeText={onChangeSearch} value={searchQuery}></Searchbar></View>
      
      
      <ScrollView>
      <View style={styles.container}>
        
          <View style={styles.cardContainer}>
            <TouchableOpacity>
            <View style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/abans.jpg')}/> 
            </View>    
            
              
            
              <Text style={styles.tStyle}>ABANS</Text>
              </TouchableOpacity>
          </View>
          
          <View style={styles.cardContainer}>
            <TouchableOpacity>
            <View  style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/sinhagiri.png')}/>
            </View >
            
            
              <Text style={styles.tStyle}>SINHAGIRI</Text>
              </TouchableOpacity>
          </View> 
        
        
        
          <View style={styles.cardContainer}>
            <TouchableOpacity>
            <View  style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/Singer-logo.jpg')}/>
            </View >
            
            
              <Text style={styles.tStyle}>SINGER</Text>
            </TouchableOpacity>
          </View>
          
          
          <View style={styles.cardContainer}>
          <TouchableOpacity>
            <View  style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/damro.png')}/>
            </View >
            
            
              <Text style={styles.tStyle}>DAMRO</Text>
          </TouchableOpacity>
          </View>
          
        
      </View>
      </ScrollView>    

            
            
            
    </View>
    
  );
}


const styles =StyleSheet.create({
  mainContainer: {
    flex: 1,

    alignItems: 'center', 
    justifyContent: 'center',
    width: 350,
    maxheight: 1500,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    
      
  },
  
  avatar: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 70,
    marginLeft: 230,
    
    
  },
  searchBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginTop: 100,
    maxHeight: 50,
    width: 320,
    marginBottom:20,
    

  },

  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap:'wrap',
    alignItems: 'center', 
    justifyContent: 'center',
    width: 320,
    height: 900,
    
    
  },

  cardContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    width: 140,
    height: 140, 
    margin: 55,
    marginTop: 10,
    
      

  },

    
   
  card: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: 140,
    height: 140,
    overflow: 'hidden',
    
    

  },

  
    

  coverImage: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    width: 140,
    height: 140,
      
  },
  tStyle:{
    color:'white',
    fontWeight: "bold",
    fontSize: 18
  },

});

export default CompanyDetails;
  

// return (
//   <View style={styles.container}>
//     {companies.map((company) => (
//       <View key={company._id}>
//         <Text>{company.name}</Text>
//         {/* Display other company details */}
//       </View>
//     ))}
//   </View>
// );