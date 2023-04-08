import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import images from '../../../../assets/images';
import styles from './style';
import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import SetupPaymentComponent from '../../../Components/AppComponents/SetupPaymentComponent/SetupPaymentComponent';

import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {
  /*getPayment,*/ getAuthInfo,
  getStripeAccount,
} from '../../../utils/api';
import {WebView} from 'react-native-webview';
import {STRIPE_CLIENT_ID} from '../../../config';
import {updateUserProfile} from '../../../reducers/user';

var MessageBarManager = require('react-native-message-bar').MessageBarManager;

class PaymentsBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      auth_code: null,
      stripe_user_id: null,
      balance: 0,
      stripe_account: null,
      items: [
        {
          id: 0,
          image: images.ic_mastercard,
          title: 'MASTERCARD',
          text: '**** **** **** 6524',
        },
      ],
    };
  }

  componentDidMount() {
    if (this.props.profile?.stripe_account) {
      this.onSuccess(this.props.profile.stripe_account);
    }
  }

  async onSuccess(auth_code) {
    this.setState({auth_code});

    getAuthInfo(auth_code)
      .then((res) => {
        console.log('# stripeAuthInfo:', res);
        if (res?.stripe_user_id) {
          const doc = firestore().collection('users').doc(this.props.user.uid);

          doc
            .update({
              stripe_account: res.stripe_user_id,
            })
            .then((res) => {
              doc.get().then((doc) => {
                console.log('###doc', doc);
                if (doc) {
                  console.log('fetch user profile!', doc.data());
                  const user_data = doc.data();
                  this.setState({stripe_account: user_data});
                  this.props.updateUserProfile(user_data);
                }
              });
              MessageBarManager.showAlert({
                title: '',
                message: 'Successfully added!',
                alertType: 'success',
              });
              //this.props.navigation.goBack();
            });
          this.setState({stripe_user_id: res.stripe_user_id});
        } else {
          this.setState({auth_code: null, stripe_user_id: null});
        }
      })
      .catch((er) => {
        console.log(er);
      });
  }

  getStripeAccountInfo(stripeAccountId) {
    //this.setState({spinner: true});
    getStripeAccount(stripeAccountId)
      .then((res) => {
        console.log('# stripeAccountInfo:', res);
        if (res?.id) {
          this.setState({stripe_account: res, spinner: false});
        } else {
          this.setState({stripe_account: null, spinner: false});
        }
      })
      .catch((err) => {
        this.setState({stripe_account: null, spinner: false});
        console.log('# getStripeAccount err:', err);
      });
  }

  onWebViewStateChange(navState) {
    console.log('# onWebViewStateChange: ', navState.url);
    if (navState.url.includes('?code=')) {
      console.log('# has code ! ');
      const auth_code = navState.url.split('?code=')[1];
      console.log(auth_code, this.state.auth_code);
      //if (auth_code != this.state.auth_code)
      this.onSuccess(auth_code);
    }
  }

  _renderItem = (item) => {
    return (
      <SetupPaymentComponent
        image={item.image}
        title={item.title}
        text={item.text}
        img={item.img}
      />
    );
  };

  render() {
    const {auth_code, stripe_user_id, balance} = this.state;
    //const STRIPE_URL = `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://stripe.com/connect/default/oauth/test&client_id=${STRIPE_CLIENT_ID}`;
    const STRIPE_URL = `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://connect.stripe.com/connect/default/oauth/test&client_id=${STRIPE_CLIENT_ID}`;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerView}>
          <AppHeader
            title={'Payments'}
            leftIconPath={images.ic_back}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

        <View style={styles.container}>
          {/*
                    <View style={styles.balanceView}>
                        <Text style={styles.priceText}>$320.98</Text>
                        <Text style={styles.balanceText}>WALLET BALANCE</Text>
                    </View>

                    <View style={styles.flatListView}>
                        <Text style={styles.bankAccountText}>Bank Accounts</Text>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => '' + item.id}
                            data={this.state.items}
                            renderItem={({item}) => this._renderItem(item)}
                        />
                    </View>


                    <View style={styles.btnView}>
                        <Button
                            title={'Cash Out'}
                            // onPress={() => this.props.navigation.navigate('AddCard')}
                        />

                        <Button
                            title={'Add another Bank Account'}
                            onPress={() => this.props.navigation.navigate('Payments')}
                        />
                    </View>
                    */}

          {this.state.stripe_account ? ( //this.props.profile?.stripe_account ?
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              {this.state.stripe_account ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={styles.balanceView}>
                    {/*
                                        <Text style={styles.priceText}>${balance}</Text>
                                        <Text style={styles.balanceText}>BALANCE</Text>
                                        */}
                    <Text style={styles.balanceText}>
                      Attached Stripe Account
                    </Text>
                    <Text style={styles.balanceText}>
                      {this.state.stripe_account.email}
                    </Text>
                    <View style={{height: 30}} />
                    <Button
                      title="Detach Account"
                      onPress={() => {
                        this.setState({stripe_account: null});
                      }}
                    />
                  </View>
                </View>
              ) : (
                <ActivityIndicator color="gray" style={{alignSelf: 'center'}} />
              )}
            </View>
          ) : (
            <WebView
              source={{uri: STRIPE_URL}}
              startInLoadingState
              scalesPageToFit
              javaScriptEnabled
              bounces={false}
              onNavigationStateChange={(navState) => {
                console.log(navState.url);
                this.onWebViewStateChange(navState);
              }}
              javaScriptEnabledAndroid
              //incognito={true}
            />
          )}
        </View>
        <Spinner visible={this.state.spinner} textStyle={{color: 'white'}} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  profile: state.user.profile,
});

const mapDispatchToProps = {
  updateUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsBalance);
