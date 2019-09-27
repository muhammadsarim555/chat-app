import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import Login from '../Screens/Login';
import {TabScreens} from '../Screens/Home';
import Register from '../Screens/Register';
import AuthLoader from '../Component/ActivityIndicator';
import CompleteProfile from '../Screens/CompleteProfile';

const {Chat, Status, Users} = TabScreens;

const TabScreen = createMaterialTopTabNavigator(
  {
    Users: {screen: Users},
    Chat: {screen: Chat},
    Status: {screen: Status},
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#633689',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  },
);

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

const AppStack = createStackNavigator({
  Register: {
    screen: Register,
    navigationOptions: {
      header: null,
    },
  },
  CompleteProfile: {
    screen: CompleteProfile,
    navigationOptions: {
      // header: null,
      headerLeft: null,
    },
  },
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#633689',
      },
      headerTintColor: '#FFFFFF',
      headerLeft: null,
      title: 'Story',
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: Register,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
