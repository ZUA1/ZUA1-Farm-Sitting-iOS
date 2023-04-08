import {GiftedChat} from 'react-native-gifted-chat';
import {View, StyleSheet, Keyboard, ActivityIndicator} from 'react-native';
import React from 'react';
import AppHeader from '../../../Components/AppHeader';
import images from '../../../../assets/images';
import styles from './style';

import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

class ServiceChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channel: null,
      messages: [],
    };
  }

  //==========> For Show Messages <==========//

  componentDidMount() {
    /*
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        });
        */

    const job = this.props.route.params?.job;
    const channel = this.props.route.params?.channel;
    const me = this.props.user;
    const profile = this.props.profile;

    console.log('#chat job:', job);

    if (channel) {
      this.setState({
        channel: {
          ...channel,
          job_id: job?.key || channel.job_id,
          job_name: job?.title || channel.job_name,
        },
      });
      this.setMessagesByChannel(channel.key);
    } else if (job) {
      firestore()
        .collection('channel')
        .where('job_id', '==', job.key)
        .get()
        .then((querySnapshot) => {
          let found_channel = null;
          querySnapshot &&
            querySnapshot.forEach((documentSnapshot) => {
              const doc = documentSnapshot.data();
              const found_user = doc?.users?.find((u) => u.id == me.uid);
              if (found_user) {
                found_channel = {
                  ...doc,
                  key: documentSnapshot.id,
                };
                return false;
              }
            });
          if (found_channel) {
            this.setState({channel: found_channel});
            this.setMessagesByChannel(found_channel.key);
          } else {
            let _users = [];
            if (job.poster) {
              _users.push({
                id: job.poster.id,
                name: job.poster.name,
                avatar: job.poster.avatar,
              });
            }
            if (job.buyer) {
              _users.push({
                id: job.buyer.id,
                name: job.buyer.name,
                avatar: job.buyer.avatar,
              });
            } else if (job.poster?.id != me.uid) {
              _users.push({
                id: me.uid,
                name: profile.name,
                avatar: profile.avatar,
              });
            }
            const user_ids = _users.map((u) => u.id);
            this.setState({
              channel: {
                job_id: job.key,
                job_name: job.title,
                users: _users,
                user_ids,
              },
              messages: [],
            });
          }
        })
        .catch((err) => {
          console.log('getting channel err:', err);
        });
    }
  }

  createNewChannel(_callback) {
    const job = this.props.route.params?.job;
    if (!this.state.channel || this.state.channel.key) {
      console.log("#couldn't create channel");
      return;
    }
    const user_ids = this.state.channel.users?.map((u) => u.id);
    firestore()
      .collection('channel')
      .add({
        //pending: true,
        job_id: this.state.channel.job_id || job?.key,
        job_name: this.state.channel.job_name || job?.title,
        users: this.state.channel.users,
        user_ids,
      })
      .then((res) => {
        console.log('#channel created! :', res);
        const new_channel_id = res?.id;
        //this.setState({ spinner: false })
        //sendPushNotification(target_uid, 'Request', 'You got new invitation.')
        //this.props.navigation.navigate('MessagesScreen')
        this.setState({
          channel: {
            ...this.state.channel,
            key: new_channel_id,
          },
        });
        _callback && _callback(res);
      });
  }

  setMessagesByChannel(channel_id) {
    if (!channel_id) {
      return;
    }

    this.messagesListener = firestore()
      .collection('channel')
      .doc(channel_id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot?.docs?.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().valueOf(),
            ...firebaseData,
          };
          /*
                    if (!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            name: firebaseData.user.name || firebaseData.user.email
                        };
                    }
                    */
          return data;
        });
        this.setState({messages});
      });
  }

  //==========> For Send Messages <==========//

  postMessage(channel_id, msg) {
    if (!channel_id) {
      return;
    }
    const job = this.props.route.params?.job;
    const {user, profile} = this.props;

    const channel_ref = firestore().collection('channel').doc(channel_id);

    channel_ref
      .collection('messages')
      .add({
        text: msg,
        createdAt: new Date().valueOf(),
        user: {
          _id: user.uid,
          name: profile.name || profile.email,
          avatar: profile.avatar,
        },
      })
      .then((res) => {
        channel_ref.get().then((res) => {
          const ch = res?.data();
          let user_ids = [];
          const users = ch?.users?.map((u) => {
            user_ids.push(u.id);
            if (u.id == user.uid) {
              u.last_msg = msg;
              u.last_time = new Date().valueOf();
            }
            return u;
          });
          channel_ref
            .update({
              job_id: job?.key || ch.job_id,
              job_name: job?.title || ch.job_name,
              users,
              user_ids,
            })
            .then((res) => {});
        });
      });
  }

  onSend(messages = []) {
    Keyboard.dismiss();
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    const text = messages[0].text;
    const {channel} = this.state;

    if (!channel?.key) {
      this.createNewChannel((res) => {
        this.postMessage(res?.id, text);
      });
    } else {
      this.postMessage(channel.key, text);
    }
  }

  getPersonName() {
    const {user, profile} = this.props;
    const person = this.state.channel?.users?.find((u) => u.id != user.uid);
    if (person?.name) {
      return person?.name;
    }
    return 'User Name';
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }

  render() {
    const {user} = this.props;
    return (
      <View style={styles.mainContainer}>
        {/* ==========> Header View <==========*/}

        <View style={styles.headerView}>
          <AppHeader
            leftIconPath={images.ic_back}
            title={this.getPersonName()}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

        {/* ==========> Gifted ServiceChat View <==========*/}

        <View style={styles.container}>
          <GiftedChat
            // onPressAvatar={() => this.props.navigation.navigate('Chat')}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: user && user.uid,
            }}
            scrollToBottom
            renderLoading={() => this.renderLoading()}
            isLoadingEarlier={true}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  profile: state.user.profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceChat);
