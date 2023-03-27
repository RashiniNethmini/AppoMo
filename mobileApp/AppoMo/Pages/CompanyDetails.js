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
            <Card style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/abans.jpg')}/> 
              {/* <Text>ABANS</Text> */}
            </Card>
               
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/sinhagiri.png')}/>
              {/* <Text>ABANS</Text> */}
            </Card>
          </View> 
        </View>
        <View>
          <View style={styles.cardContainer}>
            <Card style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/Singer-logo.jpg')}/>
              {/* <Text>ABANS</Text>  */}
            </Card>
          </View>
          
          
          <View style={styles.cardContainer}>
            <Card style={styles.card} >
              <Image style={styles.coverImage} resizeMode="contain" source={require('../assets/damro.png')}/>
              {/* <Text>ABANS</Text> */}
            </Card>
          </View>
        </View>
      </View>
          

            
            
            
    </View>
    
  );
}


const styles =StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'center',
    width: 350,
    maxheight: 500,
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
    
      
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
    marginTop: 90,
    maxHeight: 50,
    width: 300,
    

  },

  container: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#ffff00',
    alignItems: 'center', 
    justifyContent: 'center',
    width: 300,
    height: 200,
    marginTop: 30,
    marginBottom: 50,
    
  },

  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#ffff00',
    alignItems: 'center', 
    justifyContent: 'center',
    width: 140,
    height: 140, 
    margin: 10,
    marginTop: 30,
    paddingBottom: 20,
    paddingTop: 0,
      

  },

    
   
  card: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
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

});
  