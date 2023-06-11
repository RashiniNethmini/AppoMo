import React,{useEffect,useState} from 'react';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import {StyleSheet, Pressable, Image, View, Alert,Text,TouchableOpacity,ScrollView} from 'react-native';
import { SearchBar } from "react-native-elements";
// import { useNavigation } from '@react-navigation/native';
import ServiceCenter from './ServiceCenter';


function SelectServiceCenter() {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate('/ServiceCenter');
  };
  // const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8070/serviceprovider/");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    
    <View>
          <View style={styles.searchStyles}>
              <SearchBar
                placeholder="Search Product Wise..."
                lightTheme
                round
                style={{width:'100%'}}
                containerStyle={{borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, backgroundColor:'transparent'}}
                autoCorrect={false}
              />
              
              <SearchBar
                placeholder="Search Location Wise..."
                lightTheme
                round
                style={{width:'100%'}}
                containerStyle={{borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, backgroundColor:'transparent'}}
                autoCorrect={false}
              />
          </View>
        
          <ScrollView style={{ flexGrow: 0.75 }}>     
    
            <View style={styles.list}>
            {data.map(item => (
                <View style={styles.item}>
                
                  <TouchableOpacity style={styles.imagesStyle} onPressOut={handlePress}
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
                ))}
            </View>
        
        </ScrollView> 
      
    </View>

  )
}

const styles = StyleSheet.create({
  searchStyles:{
    marginVertical:50,
    marginTop:200
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

export default SelectServiceCenter;