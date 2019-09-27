import React, {Component} from 'react';
import {
  SafeAreaView,
  TouchableHighlight,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';

// PACKAGES
import EditIcon from 'react-native-vector-icons/MaterialIcons';

// FILES
import styles from './style';

export default class CompleteProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'white',
            borderRadius: 50,

            shadowColor: '#00000021',
            justifyContent: 'center',
            shadowOffset: {
              width: 0,
              height: 3,
              justifyContent: 'center',
              alignItems: 'center',
            },
            shadowOpacity: 0.22,
            shadowRadius: 3,
            elevation: 3,
          }}
          //   onPress={() => this.changeAvatar()}
        >
          <Image
            source={{
              uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
            }}
            resizeMode="cover"
            style={{
              flexDirection: 'row',
              width: 70,
              height: 70,
              borderRadius: 35,
              alignSelf: 'center',
            }}
          />

          <View
            style={{
              position: 'absolute',
              right: 10,
              top: 75,
              width: 20,
              height: 20,
              borderRadius: 15,
              shadowColor: '#00000021',
              justifyContent: 'center',
              shadowOffset: {
                width: 0,
                height: 3,
                justifyContent: 'center',
                alignItems: 'center',
              },
              shadowOpacity: 1,
              shadowRadius: 3,
              elevation: 3,
              backgroundColor: 'white',
            }}>
            <EditIcon
              name="edit"
              size={22}
              color={'red'}
              style={{alignSelf: 'center'}}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db',
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Name"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={name => this.setState({name})}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
        //   onPress={() => this.signUp('TabScreen')}
          >
          <Text style={styles.loginText}>Update</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
