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

// FILES
import firebase from 'react-native-firebase';

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

  filterCurrentUser = () => {
   
  };

  renderItem = ({item}) => {
    var callIcon = 'https://img.icons8.com/color/48/000000/phone.png';
    if (item.video == true) {
      callIcon = 'https://img.icons8.com/color/48/000000/video-call.png';
    }
    return (
      <View>
        <TouchableOpacity>
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
            <Image
              style={[styles.icon, {marginRight: 50}]}
              source={{uri: callIcon}}
            />
          </View>
        </TouchableOpacity>
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
          <Text>logout</Text>
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

    allUsers = users
    

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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
  },
  icon: {
    height: 28,
    width: 28,
  },
});
