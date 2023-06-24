import React from 'react';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
    const navigate = useNavigate();

 
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/Calendra-Icon.webp')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                
            }]}>Welcome to AppoMo!</Text>
            <Text style={styles.text}>Sign in with an account</Text>
            <View style={styles.button}>
            <Link to={`/Login`} component={TouchableOpacity}
    
            >
                    
                    <Text style={styles.textSign}>Get Started 
                    <View style={marginLeft=10}>
                     {/* <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />  */}
                    </View>
                </Text>
               
            </Link>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

// const {height} = Dimensions.get("screen");
// const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#108F94'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 80,
      borderTopRightRadius: 10,
      paddingVertical: 90,
      paddingHorizontal: 25,
      width:ScreenWidth
  },
  logo: {
      width: 340,
      maxWidth:ScreenWidth,
      height:220,
      borderRadius:500,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.8,
      shadowRadius: 4,
     
  },
  title: {
      color: "#084C4F",
      fontSize: 35,
      fontWeight: 'bold',
      
 
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 40,
      backgroundColor: "#084C4F",
      borderRadius: 15,
      width: "40%",
      height: 45,
      padding: 6,
      marginLeft:200,
      paddingTop: 10,
      paddingRight:10,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 8,
  
      

  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row',
      
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold',
      marginRight:20

  }
});
