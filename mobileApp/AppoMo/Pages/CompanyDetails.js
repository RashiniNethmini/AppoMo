import  React, { useState }  from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import { Card, Searchbar, Avatar } from 'react-native-paper';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';






export default function CompanyDetails() {

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
      <Avatar.Image size={70} source={require('../assets/avatar.jpg')} style={styles.avatar}/>
      <Searchbar style={styles.searchBar} placeholder='Search Company' onChangeText={onChangeSearch} value={searchQuery}></Searchbar>
      
      
      <View style={styles.container}>
        <View>
          <View style={styles.cardContainer}>
            <TouchableOpacity>
            <Card style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/abans.jpg')}/> 
            </Card>    
            </TouchableOpacity>
              
            <View >
              <Text>ABANS</Text>
            </View>
          </View>
          
          <View style={styles.cardContainer}>
            <TouchableOpacity>
            <Card style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/sinhagiri.png')}/>
            </Card>
            </TouchableOpacity>
            <View >
              <Text>SINHAGIRI</Text>
            </View>
          </View> 
        </View>
        
        <View>
          <View style={styles.cardContainer}>
            <TouchableOpacity>
            <Card style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/Singer-logo.jpg')}/>
            </Card>
            </TouchableOpacity>
            <View >
              <Text>SINGER</Text>
            </View>
          </View>
          
          
          <View style={styles.cardContainer}>
            <TouchableOpacity>
            <Card style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/damro.png')}/>
            </Card>
            </TouchableOpacity>
            <View >
              <Text variant="headlineLarge">DAMRO</Text>
            </View>
          </View>
        </View>
      </View>
          

            
            
            
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
    maxheight: 1000,
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
    marginLeft: 210,
    
    
  },
  searchBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginTop: 100,
    maxHeight: 50,
    width: 320,
    

  },

  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffff00',
    alignItems: 'center', 
    justifyContent: 'center',
    width: 320,
    height: 700,
    marginTop: 20,
    // marginBottom: 50,
    
  },

  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffff00',
    alignItems: 'center', 
    justifyContent: 'center',
    width: 140,
    maxHeight: 160, 
    margin: 20,
    marginTop: 10,
    paddingBottom: 10,
    // paddingTop: 6,
    
      

  },

    
   
  card: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    width: 140,
    height: 140,
    overflow: 'hidden',
    marginBottom: 7,
    
      
      


  },
    

  coverImage: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    width: 140,
    height: 140,
      
  },

});
  