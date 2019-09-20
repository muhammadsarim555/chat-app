import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from "../Screens/Login";


const AppNavigator = createStackNavigator({
    Login
  });
  
  export default createAppContainer(AppNavigator);