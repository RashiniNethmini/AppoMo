import  React, { useState }  from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, TouchableOpacity,ScrollView } from 'react-native';
import { Searchbar, Avatar } from 'react-native-paper';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';






function CompanyDetails() {

  // React.useEffect(() => {
  //   if (contentHeight >= MAX_HEIGHT) {
  //     setScrollEnabled(false);
  //   } else {
  //     setScrollEnabled(true);
  //   }
  // }, [contentHeight]);
  
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  
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
            </TouchableOpacity>
              
            <View >
              <Text>ABANS</Text>
            </View>
          </View>
          
          <View style={styles.cardContainer}>
            <TouchableOpacity>
            <View  style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/sinhagiri.png')}/>
            </View >
            </TouchableOpacity>
            <View >
              <Text>SINHAGIRI</Text>
            </View>
          </View> 
        
        
        
          <View style={styles.cardContainer}>
            <TouchableOpacity>
            <View  style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/Singer-logo.jpg')}/>
            </View >
            </TouchableOpacity>
            <View >
              <Text>SINGER</Text>
            </View>
          </View>
          
          
          <View style={styles.cardContainer}>
            <TouchableOpacity>
            <View  style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/damro.png')}/>
            </View >
            </TouchableOpacity>
            <View >
              <Text variant="headlineLarge">DAMRO</Text>
            </View>
          </View>
        
      </View>
      </ScrollView>    

            
            
            
    </View>
    
  );
}


const styles =StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#ffffff',
    alignItems: 'center', 
    justifyContent: 'center',
    width: 350,
    maxheight: 1500,
    marginTop: 50,
    // marginBottom: 50,
    marginLeft: 5,
    marginRight: 5,
    
      
  },
  
  avatar: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
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
    // backgroundColor: '#ffff00',
    alignItems: 'center', 
    justifyContent: 'center',
    width: 320,
    height: 900,
    
    
  },

  cardContainer: {
    flex: 1,
    backgroundColor: '#ffff00',
    alignItems: 'center', 
    justifyContent: 'center',
    width: 140,
    height: 140, 
    margin: 60,
    marginTop: 10,
    paddingBottom: 20,
    
    // paddingTop: 6,
    
      

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
    // marginBottom: 7,
    
      
      


  },
    

  coverImage: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    width: 140,
    height: 140,
      
  },

});

export default CompanyDetails;
  