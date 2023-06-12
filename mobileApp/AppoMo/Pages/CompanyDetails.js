import  React, { useState, useEffect }  from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, TouchableOpacity,ScrollView } from 'react-native';
import { Searchbar, Avatar } from 'react-native-paper';



function CompanyDetails() {

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8070/serviceprovider/");
      const jsonCompanies = await response.json();
      setCompanies(jsonCompanies);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };



  return (
    
    
    <View style={styles.mainContainer}>
      <View><Avatar.Image size={70} source={require('../assets/avatar.jpg')} style={styles.avatar}/></View>
      <View><Searchbar style={styles.searchBar} placeholder='Search Company' onChangeText={onChangeSearch} value={searchQuery}></Searchbar></View>
      
      
      <ScrollView>
      <View style={styles.container}>

        {companies.map((company, index) =>(
          <View style={styles.cardContainer} key={index}>
            <TouchableOpacity>
            <View style={styles.card} >
            {company.logo ? (
                    <Image style={styles.coverImage} resizeMode="contain" source={{ uri: company.logo }} /> // Use valid image source
                  ) : (
                    <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/avatar.jpg')}
              // source={company.logo}
              />
                  )}
              {/* <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/avatar.jpg')}
              // source={company.logo}
              />  */}
            </View>    
            <Text style={styles.tStyle}>{company.serviceProviderName}</Text>
            </TouchableOpacity>
          </View> 
          ))}
          

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
    maxHeight: 1500,
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
  

