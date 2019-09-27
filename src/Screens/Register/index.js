import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';

// PACKAGES
import firebase from 'react-native-firebase';

export default class Register extends Component {
  constructor(props) {
    super(props);
    state = {
      email: '',
      password: '',
      name: '',
    };
  }

  onClickListener = viewId => {
    this.props.navigation.navigate(viewId);
  };

  signUp = () => {
    const {email, password, name} = this.state;
    const id = firebase.auth().currentUser.uid;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        firebase
          .database()
          .ref('/StoryAppUsers')
          .child(`${firebase.auth().currentUser.uid}`)
          .set({
            email,
            password,
            name,
          })
          .then(s => console.log('data has been added'));
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Name"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={name => this.setState({name})}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/message/ultraviolet/50/3498db',
            }}
          />

          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({email})}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({password})}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.signUp('TabScreen')}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('CompleteProfile')}>
          <Text>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2FBFD',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
});
