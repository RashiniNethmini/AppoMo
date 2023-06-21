import React,{useEffect,useState} from 'react';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import {StyleSheet, Pressable, Image, View, Alert,Text,TouchableOpacity,ScrollView} from 'react-native';
// import { SearchBar } from "react-native-elements";
import { SearchBar } from "@rneui/base";
// import { useNavigation } from '@react-navigation/native';
import ServiceCenter from './ServiceCenter';
// export { handlePress };
import { BackHandler } from 'react-native';

function SelectServiceCenter() {

  const navigate = useNavigate();
  
  const handleBackButton = () => {
    navigate('/CompanyOrServiceCenter/:objectId');
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  }, [handleBackButton]);




  const handlePress = (serviceProviderName) => {
    navigate('/ServiceCenter', { serviceProviderName, _id});
  };

  // const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8070/serviceprovider/getSC");
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
      const responsee = await fetch(`http://10.0.2.2:8070/serviceprovider/get/${searchTerm}`);
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
        <Link to={`/ServiceCenter/${item._id}/${item.serviceProviderName}`} component={TouchableOpacity} style={styles.imagesStyle}>
          <Image source={require('../assets/a.jpg')} style={styles.imageStyle} />
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
      placeholder="Search location wis..."
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

export default SelectServiceCenter;
