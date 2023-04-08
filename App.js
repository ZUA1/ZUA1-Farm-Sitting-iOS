/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import RootStack from './src/screens/RootStack';

import createStore from './src/reducers';
import {Provider} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {updateUser, updateUserProfile} from './src/reducers/user';
import firestore from '@react-native-firebase/firestore';
import stripe from 'tipsi-stripe';
import {STRIPE_APIKEY} from './src/config';
import messaging, {AuthorizationStatus} from '@react-native-firebase/messaging';

var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

// import {GoogleSignin} from '@react-native-community/google-signin';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const store = createStore();

export default class App extends React.Component {
  constructor() {
    super();
    this.initialize = false;
    stripe.setOptions({
      publishableKey: STRIPE_APIKEY,
    });
    try {
      GoogleSignin.configure({
        //  offlineAccess: true,
        webClientId:
          '747767169117-m6hu258l6i2b0t16jcmdbeqffntqib92.apps.googleusercontent.com',
        // androidClientId:
        //   '747767169117-ll41olm5s6qq4pdcp0nmn3nopkap9qkr.apps.googleusercontent.com',
        // iosClientId:
        //   '747767169117-jv5t9sfqd4rcfi0s17kuf8qf1i4e7ift.apps.googleusercontent.com',
        //iosClientId: 'com.googleusercontent.apps.381830035588-q9mck3tt304s74rmuq6me5d7u2k27e46',
        // scopes: ['profile', 'email'],
      });
      // await GoogleSignin.hasPlayServices();
      // console.log("reached google sign in");
      // const userInfo = await GoogleSignin.signIn();
      // console.log(userInfo);
      // this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('error occured SIGN_IN_CANCELLED');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('error occured IN_PROGRESS');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('error occured PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.log(error);
        console.log('error occured unknow error');
      }
    }
  }

  componentDidMount() {
    this.subscriber = auth().onAuthStateChanged(async (user) => {
      if (user) {
        if (!this.initialize) {
          this.initialize = true;
        }
        console.log('-----user:', user._user);
        firestore()
          .collection(`users`)
          .doc(`${user._user.uid}`)
          .get()
          .then((res) => {
            if (res) {
              console.log('fetch user profile!', res.data());
              store.dispatch(updateUserProfile(res.data()));
            }
          });
        store.dispatch(updateUser(user._user));
      } else {
        if (!this.initialize) {
          this.initialize = true;
          store.dispatch(updateUser(null));
        }
      }
    });
    MessageBarManager.registerMessageBar(this.refs.alert);
    this.requestUserPermission();
  }

  componentWillUnmount() {
    // Remove the alert located on this master page from the manager
    MessageBarManager.unregisterMessageBar();
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    // const enabled =
    //     authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //     console.log('Authorization status:', authStatus);
    // }
    await messaging().registerDeviceForRemoteMessages();
    const fcmToken = await messaging().getToken();
    console.log('-----------------fcmToken', fcmToken);
  }

  render() {
    if (__DEV__) {
      import('./ReactotronConfig').then(() =>
        console.log('Reactotron Configured'),
      );
    }
    return (
      <Provider store={store}>
        <RootStack />
        <MessageBarAlert ref="alert" titleStyle={{height: 0}} />
      </Provider>
    );
  }
}
