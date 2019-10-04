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
      messages: [
        // {
        //   id: 1,
        //   sent: true,
        //   msg: 'Lorem ipsum dolor',
        //   image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
        // },
        // {
        //   id: 2,
        //   sent: true,
        //   msg: 'sit amet, consectetuer',
        //   image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
        // },
        // {
        //   id: 3,
        //   sent: false,
        //   msg: 'adipiscing elit. Aenean ',
        //   image: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
        // },
        // {
        //   id: 4,
        //   sent: true,
        //   msg: 'commodo ligula eget dolor.',
        //   image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
        // },
        // {
        //   id: 5,
        //   sent: false,
        //   msg:
        //     'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes',
        //   image: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
        // },
        // {
        //   id: 6,
        //   sent: true,
        //   msg:
        //     'nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo',
        //   image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
        // },
        // {
        //   id: 7,
        //   sent: false,
        //   msg: 'rhoncus ut, imperdiet',
        //   image: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
        // },
        // {
        //   id: 8,
        //   sent: false,
        //   msg: 'a, venenatis vitae',
        //   image: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
        // },
      ],
      receiverName: '',
      receiverId: '',
      receiverEmail: '',
    };
    this.send = this.send.bind(this);
    this.reply = this.reply.bind(this);
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
    const that = this;
    let messages = [];

    db.ref('Messages/').on('child_added', snapshot => {
      messages.push(snapshot.val());

      that.setState({messages});
    });

    this.setState({receiverId: id});
  }

  reply() {
    var messages = this.state.messages;
    messages.push({
      id: Math.floor(Math.random() * 99999999999999999 + 1),
      sent: false,
      msg: this.state.msg,
      image: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
    });
    this.setState({msg: '', messages: messages});
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

      db
        .ref('Messages/')
        .push(msgObj)
        .then(success => this.setState({msg: ''}))
        .catch(error => console.log(error, 'something went wrong!!!'));
    } else {
      alert('Can not be Empty!');
    }
  }

  _renderItem = ({item}) => {
    if (item.seen === false) {
      return (
        <View style={styles.eachMsg}>
          <Image source={{uri: "https://www.bootdey.com/img/Content/avatar/avatar1.png"}} style={styles.userPic} />
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
          <Image source={{uri: "https://www.bootdey.com/img/Content/avatar/avatar6.png"}} style={styles.userPic} />
        </View>
      );
    }
  };

  render() {
    const {messages} = this.state;

    return (
      <View style={{flex: 1}}>
        <FlatList
          style={styles.list}
          extraData={this.state}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Write a message..."
              underlineColorAndroid="transparent"
              onChangeText={msg => this.setState({msg})}
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
