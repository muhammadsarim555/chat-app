import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import firebase from 'react-native-firebase';

export default class AuthLoader extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      const nav = this.props.navigation;

      user ? nav.navigate('Users') : nav.navigate('Login');
    });
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
