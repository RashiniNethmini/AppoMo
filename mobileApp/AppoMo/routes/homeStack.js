 import { createStackNavigator } from 'react-navigation-stack';

import {createAppContainer} from 'react-navigation/native';
 import Login from '../Pages/Login';
import UserRegistr from '../Pages/UserReg';


 const screens = {
  login:{
       screen: Login
  },
  userRegistr:{
     screen: UserRegistr
   },


}

 const Homestack = createStackNavigator(screens);
 export default createAppContainer(Homestack);