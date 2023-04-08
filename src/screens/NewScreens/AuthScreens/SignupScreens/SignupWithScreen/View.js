//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';
// import { NavigationContainer, route } from '@react-navigation/native';
import React from 'react';

//================================ Local Imported Files ======================================//

import styles from './Styles';
import AppHeader from '../../../../../Components/AppHeader';
import colors from '../../../../../../assets/colors';
import images from '../../../../../../assets/images';
import Button from '../../../../../Components/Button/Button';
import AppInput from '../../../../../Components/Inputs/AppInput';
import CheckBox from '../../../../../Components/CheckBox';

import moment from 'moment';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';

import {connect} from 'react-redux';
import {
  updateUser,
  updateUserProfile,
  updateFCMToken,
} from './../../../../../reducers/user';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE_REMEMBER} from '../../../../../constant';

import {
  createUserByData,
  createFarmByUser,
} from '../../../../../utils/firebase';

class SignupWith extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      email: null,
      password: null,
      remember: false,
      showpwd: false,
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem(STORAGE_REMEMBER);
      if (value !== null) {
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        this.setState({remember: true, email, password});
      }
    } catch (e) {
      // error reading value
    }
  }

  rememberPassword = () => {
    //
  };
  togglePassword() {
    this.setState({showpwd: !this.state.showpwd});
  }

  onLoginEmailAndPassword() {
    let self = this;
    if (self.state.email && self.state.password) {
      self.setState({spinner: true});
      auth()
        .signInWithEmailAndPassword(self.state.email, self.state.password)
        .then(async (res) => {
          if (res && res.user && res.user._user) {
            try {
              if (self.state.remember) {
                await AsyncStorage.setItem('email', self.state.email);
                await AsyncStorage.setItem('password', self.state.password);
              } else {
                await AsyncStorage.removeItem('email');
                await AsyncStorage.removeItem('password');
              }
            } catch (e) {
              console.log(e);
            }
            console.log('User account created & signed in!', res);
            self.afterLoginProcess(res.user._user);
          } else {
            self.setState({spinner: false});
            setTimeout(() => {
              alert('failed login!');
            }, 100);
          }
        })
        .catch((error) => {
          self.setState({spinner: false});
          setTimeout(() => {
            if (error.code === 'auth/user-not-found') {
              alert('Please enter register email and password');
              return;
            }
            if (error.code === 'auth/email-already-in-use') {
              alert('That email address is already in use!');
              return;
            }

            if (error.code === 'auth/invalid-email') {
              alert('That email address is invalid!');
              return;
            }

            alert(error);
          }, 100);
        });
    } else {
      if (this.state.email && this.state.email.length > 0) {
        alert('Please enter password.');
        return;
      }
      alert('Please enter email address.');
    }
  }

  async facebookLogin() {
    const self = this;
    // this.props.navigation.navigate('drawer')
    try {
      //LoginManager.getInstance().logOut();
      LoginManager.logOut();
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      const res = await auth()
        .signInWithCredential(facebookCredential)
        .catch((error) => {
          console.log('# facebook err:', error);
          self.setState({spinner: false});
          alert(error);
        });

      if (res && res.user && res.user._user) {
        self.afterLoginProcess(res.user._user);
      }
      console.log('# FB login result:', res);
    } catch (error) {
      console.log('# FB login err:', error);
      alert(error);
    }
  }

  async googleLogin() {
    const self = this;
    // this.props.navigation.navigate('drawer')

    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const res = await auth()
        .signInWithCredential(googleCredential)
        .catch((error) => {
          console.log('# googlr err:', error);
          self.setState({spinner: false});
          alert(error);
        });

      if (res && res.user && res.user._user) {
        self.afterLoginProcess(res.user._user);
      }
      console.log('# Google login result:', res);
    } catch (error) {
      console.log('# Google login err:', error);
      alert(error);
    }
  }

  async appleLogin() {
    const self = this;

    try {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw 'Apple Sign-In failed - no identify token returned';
      }

      // Create a Firebase credential from the response
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      // Sign the user in with the credential
      const res = await auth()
        .signInWithCredential(appleCredential)
        .catch((error) => {
          console.log('# apple err:', error);
          self.setState({spinner: false});
          alert(error);
        });

      if (res && res.user && res.user._user) {
        self.afterLoginProcess(res.user._user);
      }

      console.log('# Apple login result:', res);
    } catch (error) {
      console.log('# Apple login err:', error);
      alert(error);
    }
  }

  async afterLoginProcess(user) {
    //res.user._user
    const user_id = user.uid;
    const self = this;
    const doc = await firestore().collection(`users`).doc(user_id).get();

    const user_data = doc?.data();
    console.log('fetch user profile!', user_data);
    if (user_data) {
      if (user_data.disabled) {
        alert('Your account is inactived.');
        try {
          auth()
            .signOut()
            .then(() => {
              self.props.updateUser();
            })
            .catch((e) => {
              self.props.updateUser();
            });
        } catch (e) {
          self.props.updateUser();
        }
        self.setState({spinner: false});
        return;
      }
      self.props.updateUserProfile(user_data);
    } else {
      const providerData =
        user.providerData && user.providerData.length > 0
          ? user.providerData[0]
          : {};
      if (providerData?.photoURL && !providerData?.avatar) {
        providerData.avatar = providerData.photoURL;
      }

      const user_profile = await createUserByData(
        user_id,
        'buyer',
        providerData,
      ).catch((err) => {
        console.log('user add err:', err);
      });

      if (user_profile) {
        console.log('User added!');
        this.props.updateUserProfile(user_profile);
        this.props.updateFCMToken();

        //if (user_type == 'seller')
        {
          const res = createFarmByUser(
            user_id,
            providerData,
          ).catch((err) => {});
          this.setState({spinner: false});
          if (res) {
            this.props.navigation.navigate('AttachDocumentScreen');
          } else {
            setTimeout(() => {
              alert('failed adding farm data!');
            }, 100);
          }
          return;
        }
        //this.setState({ spinner: false });
        //this.props.navigation.navigate('drawer');
      } else {
        this.setState({spinner: false});
        setTimeout(() => {
          alert('failed adding user data!');
        }, 100);
      }
    }

    self.props.updateUser(user);
    self.setState({spinner: false});
    setTimeout(() => {
      self.props.navigation.navigate('drawer', {screen: 'Home'});
    }, 200);
    self.props.updateFCMToken();
  }

  render() {
    const {email, password, remember, showpwd} = this.state;
    return (
      <ImageBackground style={styles.mainContainer} source={images.bg_img}>
        {/* //================================ StatusBar ======================================// */}
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={colors.app_light_blush}
          translucent={false}
        />
        <View style={styles.SignupWith}>
          <Text style={styles.SignupWithText}>Sign Up With</Text>
        </View>
        <TouchableOpacity
          style={styles.SignupWithView}
          onPress={() => this.facebookLogin()}>
          <Image style={styles.iconAdd} source={images.ic_facebook} />
          <View style={styles.divider}></View>
          <Text style={styles.SignupWithTextStyle}>Sign in with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignupWithView}
          onPress={() => this.googleLogin()}>
          <Image style={styles.googleStyle} source={images.ic_google} />
          <View style={styles.divider}></View>
          <Text style={styles.SignupWithTextStyle}>Sign in with Google</Text>
        </TouchableOpacity>
        {Platform.OS == 'ios' && (
          <TouchableOpacity
            style={styles.SignupWithView}
            onPress={() => this.appleLogin()}>
            <Image style={styles.googleStyle} source={images.ic_apple} />
            <View style={styles.divider}></View>
            <Text style={styles.SignupWithTextStyle}>Sign in with Apple</Text>
          </TouchableOpacity>
        )}

        <View style={styles.dividerContainer}>
          <View style={styles.dividerbottom}></View>
          <Text style={styles.orDivider}>or</Text>
          <View style={styles.dividerbottom}></View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            width={'90%'}
            // height={10}
            style={styles.buttonStyles}
            title={'Sign Up with Email'}
            titleColor={colors.white}
            bgColor={'rgba(255,255,255,0.3)'}
            titleStyle={[styles.titleStyles, {color: colors.white}]}
            onPress={() => {
              this.props.navigation.navigate('SelectUserTypeScreen');
              // this.props.navigation.navigate('SignUpScreen', {type: 'buyer'});
            }}
          />
        </View>
        <View style={styles.appInputContainer}>
          <AppInput
            height={hp(7)}
            placeholder={'Email'}
            textInputColor={colors.white}
            paddingLeft={wp(5)}
            placeholderTextColor={colors.white_dark}
            marginBottom={wp(2)}
            marginTop={0}
            borderRadius={wp(2)}
            backgroundColor={'rgba(0,0,0,0.3)'}
            value={email}
            onChangeText={(value) => this.setState({email: value})}
            keyboardType="email-address"
          />
          <AppInput
            height={hp(7)}
            placeholder={'Password'}
            textInputColor={colors.white}
            paddingLeft={wp(5)}
            placeholderTextColor={colors.white_dark}
            marginBottom={wp(3)}
            borderRadius={wp(2)}
            backgroundColor={'rgba(0,0,0,0.3)'}
            rightIconPath={true}
            rightIconPath={images.ic_eye}
            secureEntry={!showpwd}
            value={password}
            onChangeText={(value) => this.setState({password: value})}
            onRightIconPress={() => this.togglePassword()}
          />
          <View style={styles.checkBox}>
            <CheckBox
              checkTitle={'Remember Me'}
              value={remember}
              clicked={(chk) => this.setState({remember: chk})}
            />
          </View>
        </View>
        <View style={styles.loginButton}>
          <Button
          
            width={'90%'}
            style={styles.buttonStyles}
            title={'Login'}
            titleColor={colors.app_ruby}
            bgColor={colors.white}
            titleStyle={[styles.titleStyles]}
            //onPress={() => this.props.navigation.navigate('drawer')}
            onPress={() => this.onLoginEmailAndPassword()}
          />
          <TouchableOpacity
            style={styles.forgetButton}
            onPress={() => this.props.navigation.navigate('ResetPassword')}>
            <Text style={styles.forgetStyle}>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        <Spinner visible={this.state.spinner} textContent={''} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  updateUser,
  updateUserProfile,
  updateFCMToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupWith);
