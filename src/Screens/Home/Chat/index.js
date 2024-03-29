import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

// PACKAGES
import {withNavigation} from 'react-navigation';
import Search from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';

// FILES
import styles from './style';

const currentUserId = firebase.auth().currentUser.uid;

const db = firebase.database();

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      messages: [],
      receiverName: '',
      receiverId: '',
      receiverEmail: '',
      noChat: false,
    };
    this.send = this.send.bind(this);
    this.renderItem = this._renderItem.bind(this);
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitleStyle: {color: 'white'},
    title: navigation.state.params.userInfo.name,
    headerStyle: {
      backgroundColor: '#633689',
      color: 'white',
    },
    headerLeft: (
      <TouchableOpacity
        style={{paddingLeft: 10}}
        onPress={() => navigation.goBack()}>
        <Search name="md-arrow-back" color="white" size={25} />
      </TouchableOpacity>
    ),
  });

  componentDidMount() {
    const {id} = this.props.navigation.state.params.userInfo;
    const {receiverId} = this.state;
    const that = this;
    let messages = [];
    let filterMessages = [];

    db.ref('Messages/').on('child_added', snapshot => {
      if (
        (snapshot.val().senderId == currentUserId &&
          snapshot.val().receiverId == id) ||
        (snapshot.val().senderId == id &&
          snapshot.val().receiverId == currentUserId)
      ) {
        messages.push(snapshot.val());
      } else {
        // this.setState({noChat: true});
        console.log('Not founded!');
      }

      that.setState({messages});
    });
    this.setState({receiverId: id});
  }

  send() {
    const {msg, receiverId} = this.state;
    const currentTime = new Date().getTime();

    if (msg) {
      const msgObj = {
        senderId: currentUserId,
        receiverId,
        message: msg,
        sendTime: currentTime,
        seen: false,
      };

      db.ref('Messages/')
        .push(msgObj)
        .then(success => {
          console.log(receiverId, 'receiveruid');
          this.setState({msg: ''});
        })
        .catch(error => console.log(error, 'something went wrong!!!'));
    } else {
      alert('Can not be Empty!');
    }
  }

  _renderItem = ({item}) => {
    const {receiverId} = this.state;

    if (item.senderId === receiverId) {
      return (
        <View style={styles.eachMsg}>
          <Image
            source={{
              uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
            }}
            style={styles.userPic}
          />
          <View style={styles.msgBlock}>
            <Text style={styles.msgTxt}>{item.message}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.rightMsg}>
          <View style={styles.rightBlock}>
            <Text style={styles.rightTxt}>{item.message}</Text>
          </View>
          <Image
            source={{
              uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
            }}
            style={styles.userPic}
          />
        </View>
      );
    }
  };

  render() {
    const {messages, msg, receiverId, noChat} = this.state;

    return (
      <View style={{flex: 1}}>
        {!noChat ? (
          <FlatList
            style={styles.list}
            extraData={this.state}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{fontSize: 22}}>No Messages</Text>
          </View>
        )}
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Write a message..."
              underlineColorAndroid="transparent"
              onChangeText={msg => this.setState({msg})}
              value={msg}
            />
          </View>

          <TouchableOpacity style={styles.btnSend} onPress={() => this.send()}>
            <Image
              source={{
                uri: 'https://png.icons8.com/small/75/ffffff/filled-sent.png',
              }}
              style={styles.iconSend}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(Chat);
