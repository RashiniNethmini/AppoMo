import React from 'react';
import {StyleSheet, Pressable, Image, View, Alert,Text,TouchableOpacity,ScrollView} from 'react-native';
import { SearchBar } from "react-native-elements";


function SelectServiceCenter() {
  
  return (
    <View>
          <View style={styles.searchStyles}>
              <SearchBar
                placeholder="Search Product Wise..."
                lightTheme
                round
                style={{width:'100%'}}
                // value={this.state.searchValue}
                // onChangeText={(text) => this.searchFunction(text)}
                containerStyle={{borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, backgroundColor:'transparent'}}
                autoCorrect={false}
              />
              
              <SearchBar
                placeholder="Search Location Wise..."
                lightTheme
                round
                style={{width:'100%'}}
                // value={this.state.searchValue}
                // onChangeText={(text) => this.searchFunction(text)}
                containerStyle={{borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, backgroundColor:'transparent'}}
                autoCorrect={false}
              />
          </View>

          <ScrollView>
            <View style={styles.list}>
                <View style={styles.item}>
                  <TouchableOpacity style={styles.imagesStyle}
                  // onPress={()=>createStackNavigator("ServiceCenter")}
                  >
                    <Image
                        // source={this.props.itemImage}a
                        source={require('../assets/a.jpg')}
                        // style={StyleSheet.image}
                        style={styles.imageStyle}
                        />
                  </TouchableOpacity>
                  <Text style={styles.tStyle}>Service Center A</Text>
                </View>
              <View style={styles.item}>
                <TouchableOpacity>
                  <Image
                        // source={this.props.itemImage}a
                        source={require('../assets/a.jpg')}
                        // style={StyleSheet.image}
                        style={styles.imageStyle}
                        />
                </TouchableOpacity>
                <Text style={styles.tStyle}>Service Center B</Text>
              </View>
              <View style={styles.item}>
                <TouchableOpacity>
                  <Image
                        // source={this.props.itemImage}a
                        source={require('../assets/a.jpg')}
                        // style={StyleSheet.image}
                        style={styles.imageStyle}
                        />
                </TouchableOpacity>
                <Text style={styles.tStyle}>Service Center C</Text>
              </View>
              <View style={styles.item}>
                <TouchableOpacity>
                  <Image
                        // source={this.props.itemImage}a
                        source={require('../assets/a.jpg')}
                        // style={StyleSheet.image}
                        style={styles.imageStyle}
                        />
                </TouchableOpacity>
                <Text style={styles.tStyle}>Service Center D</Text>
              </View>
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
    gap:80 
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
  }
});

export default SelectServiceCenter;