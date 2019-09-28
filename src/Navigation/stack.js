import React, {Component} from 'react';
import {Button} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import LogOut from 'react-native-vector-icons/AntDesign';
import firebase from 'react-native-firebase';

import Login from '../Screens/Login';
import {TabScreens} from '../Screens/Home';
import Register from '../Screens/Register';
import AuthLoader from '../Component/ActivityIndicator';
import CompleteProfile from '../Screens/CompleteProfile';
import {TouchableOpacity, View} from 'react-native';

const {Chat, Status, Users, Call} = TabScreens;

const TabScreen = createMaterialTopTabNavigator(
  {
    Users: {screen: Users},
    Status: {screen: Status},
    Call: {screen: Call},
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
      headerRight: (
        <TouchableOpacity
          onPress={() =>
            firebase
              .auth()
              .signOut()
              .then(s => {
                alert('logout');
              })
              .catch(error => {
                alert('not logout');
              })
          }>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
            }}>
            <LogOut name="logout" size={30} color="white" />
          </View>
        </TouchableOpacity>
      ),
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#633689',
      },
      headerTintColor: '#FFFFFF',
      title: 'Chat',
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoader,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
