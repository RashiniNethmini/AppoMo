import  React, { useState }  from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Card, Searchbar, Avatar } from 'react-native-paper';

export default function ComBranchDetails() {
    
    
    
    

    return (
        <View style={styles.mainContaine1}>
            
                <Avatar.Image size={70} source={require('../assets/avatar.jpg')} style={styles.avatar1}/>
            

            <View style={styles.cardContainer1}>
                <Card style={styles.card1} >
                    <Image style={styles.coverImage1} resizeMode="contain" source={require('../assets/abans.jpg')}/> 
              
                </Card>
               
            </View>
            <Searchbar style={styles.searchBar1} placeholder='Search Company Branch'></Searchbar>
            <View style={styles.container1}>
                <View style={styles.subContainer1}>

                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContaine1: {
    // backgroundColor: '#ffffff',
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 50,
    

        
          
      },

    avatar1: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ffffff',
        maxHeight: 70,
        marginLeft: 210,
        
        
        
    },

    cardContainer1: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: '#ffff00',
        alignItems: 'center', 
        justifyContent: 'center',
        width: 70,
        maxHeight: 70, 
        margin: 10,
        marginTop: 30,
          
    
    },
    
        
       
    card1: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        width: 70,
        height: 70,
        overflow: 'hidden',
    
    },
        
    
    coverImage1: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        width: 70,
        height: 70,
          
    },

    searchBar1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        marginTop: 20,
        maxHeight: 50,
        width: 320,
    },

    container1: {
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

    subContainer1: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: '#ffff00',
        alignItems: 'center', 
        justifyContent: 'center',
        width: 300,
        height: 200,
        marginTop: 30,
        marginBottom: 50,
    }
});