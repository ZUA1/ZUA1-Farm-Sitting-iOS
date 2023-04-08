import {GiftedChat} from 'react-native-gifted-chat';
import {View, StyleSheet} from 'react-native';
import React from 'react';
import AppHeader from '../../../Components/AppHeader';
import images from '../../../../assets/images';
import styles from './style';

export default class ServiceChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  //==========> For Show Messages <==========//

  componentDidMount() {
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
  }

  //==========> For Send Messages <==========//

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {/* ==========> Header View <==========*/}
        <View style={styles.headerView}>
          <AppHeader
            leftIconPath={images.ic_back}
            title={'John Doe'}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

        {/* ==========> Gifted ServiceChat View <==========*/}

        <View style={styles.container}>
          <GiftedChat
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        </View>
      </View>
    );
  }
}
