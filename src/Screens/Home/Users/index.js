import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';

// PACKAGES
import firebase from 'react-native-firebase';

// FILES
import styles from './style';

export default class Calls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentUserId: {},
    };
  }

  componentDidMount() {
    let users = [];
    const that = this;
    let currentUser = firebase.auth().currentUser;

    firebase
      .database()
      .ref('StoryAppUsers/')
      .on('child_added', function(snapshot) {
        users.push(snapshot.val());
        that.setState({users, currentUserId: currentUser._user.uid});
      });
  }

  filterCurrentUser = () => {};

  renderItem = ({item}) => {
    var callIcon = 'https://img.icons8.com/color/48/000000/phone.png';
    if (item.video == true) {
      callIcon = 'https://img.icons8.com/color/48/000000/video-call.png';
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Chat', {userInfo: item})
          }>
          <View style={styles.row}>
            <Image
              source={{
                uri: item.image
                  ? item.image
                  : 'https://bootdey.com/img/Content/avatar/avatar1.png',
              }}
              style={styles.pic}
            />
            <View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>{item.name}</Text>
              </View>
              <View style={styles.end}>
                <Image
                  style={[
                    styles.icon,
                    {marginLeft: 15, marginRight: 5, width: 14, height: 14},
                  ]}
                  source={{
                    uri:
                      'https://img.icons8.com/small/14/000000/double-tick.png',
                  }}
                />
                <Text style={styles.time}>
                  time
                  {/* {item.date} {item.time} */}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {users, currentUserId} = this.state;
    let allUsers = null;

    let obj = users.find(o => o.id === currentUserId);

    var index = users.indexOf(obj);
    if (index > -1) {
      users.splice(index, 1);
    }

    allUsers = users;

    this.filterCurrentUser();

    return (
      <View style={{flex: 1}}>
        <FlatList
          extraData={this.state}
          data={allUsers}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
