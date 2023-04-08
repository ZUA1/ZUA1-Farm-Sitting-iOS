//================================ React Native Imported Files ======================================//

import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../../Components/AppHeader';
import colors from '../../../../../../assets/colors';
import images from '../../../../../../assets/images';
import Button from '../../../../../Components/Button/Button';
import AppInput from '../../../../../Components/Inputs/AppInput';
import styles from './Styles';

import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {
  updateUser,
  updateUserProfile,
  updateFCMToken,
} from '../../../../../reducers/user';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE_REMEMBER} from '../../../../../constant';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      email: null,
      password: null,
      isUser: true,
      showPassword: true,
      rememberColor: 'red',
      image: images.ic_filter_active,
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
    this.setState({isUser: !this.state.isUser});
  };
  togglePassword() {
    this.setState({showPassword: !this.state.showPassword});
  }

  onLoginEmailAndPassword() {
    if (this.state.email && this.state.password) {
      this.setState({spinner: true});
      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(async (res) => {
          if (res && res.user && res.user._user) {
            try {
              await AsyncStorage.setItem(
                'email',
                this.state.remember ? this.state.email : null,
              );
              await AsyncStorage.setItem(
                'password',
                this.state.remember ? this.state.password : null,
              );
            } catch (e) {
              console.log(e);
            }
            console.log('User account created & signed in!', res);
            firestore()
              .collection(`users`)
              .doc(`${res.user._user.uid}`)
              .get()
              .then((doc) => {
                if (doc) {
                  console.log('fetch user profile!', doc.data());
                  const user_data = doc.data();
                  if (user_data && user_data.disabled) {
                    alert('Your account is inactived.');
                    try {
                      auth()
                        .signOut()
                        .then(() => {
                          this.props.updateUser();
                        })
                        .catch((e) => {
                          this.props.updateUser();
                        });
                    } catch (e) {
                      this.props.updateUser();
                    }
                    return;
                  }
                  this.props.updateUserProfile(doc.data());
                }
              });
            this.props.updateUser(res.user._user);
            this.setState({spinner: false});
            setTimeout(() => {
              this.props.navigation.navigate('drawer', {screen: 'Home'});
            }, 100);
            this.props.updateFCMToken();
          } else {
            this.setState({spinner: false});
            setTimeout(() => {
              alert('failed login!');
            }, 100);
          }
        })
        .catch((error) => {
          this.setState({spinner: false});
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

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerView}>
          {/* //================================ StatusBar ======================================// */}
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor={colors.appDarkBlue}
            translucent={false}
          />

          {/* //================================ Header ======================================// */}
          <AppHeader
            headerHeight="100%"
            title={'LOGIN'}
            titleFontSize={wp(5)}
            leftIconPath={images.headerLeftBack}
            iconWidth={wp(5)}
            onLeftIconPress={() => this.props.navigation.goBack()}
            lefticonSize={wp(5)}
          />
        </View>
        {/* //================================ Logo ======================================// */}
        <View style={styles.upperView}>
          <Image style={styles.imageStyles} source={images.logo}></Image>
        </View>

        <View style={styles.midView}>
          {/* //================================ Email Input ======================================// */}

          <AppInput
            height={hp(6)}
            placeholder={'Email'}
            width={'80%'}
            colortextInput={colors.black}
            paddingLeft={wp(5)}
            placeholderTextColor={colors.black}
            marginBottom={wp(3)}
            marginTop={5}
            borderRadius={wp(7)}
            backgroundColor={colors.grey}
            value={this.state.email}
            onChangeText={(value) => this.setState({email: value})}
            keyboardType="email-address"
          />
          {/* //================================ Password Input ======================================// */}
          <AppInput
            height={hp(6)}
            borderRadius={wp(7)}
            placeholder={'Password'}
            width={'80%'}
            marginTop={5}
            secureEntry={this.state.showPassword}
            onRightIconPress={() => this.togglePassword()}
            colortextInput={colors.black}
            paddingLeft={wp(5)}
            placeholderTextColor={colors.black}
            rightIconSize={wp(5)}
            marginBottom={wp(3)}
            backgroundColor={colors.grey}
            rightIconPath={images.ic_eye}
            tintColor={colors.grey1}
            value={this.state.password}
            onChangeText={(value) => this.setState({password: value})}
          />
          {/* //================================ Remember Me ======================================// */}
          <View style={styles.checkBoxContainer}>
            <TouchableOpacity style={styles.checkBoxIcon}>
              <Image
                style={styles.checkBoxIconStyle}
                source={images.ic_check_green}
              />
            </TouchableOpacity>
            <View style={styles.checkBoxText}>
              <Text style={[styles.checkBoxTextStyle]}>Remember Me</Text>
            </View>
          </View>
        </View>
        {/* //================================ Buttons ======================================// */}
        <View style={styles.lowerView}>
          <Button
            height={hp(7)}
            width={'80%'}
            style={styles.buttonStyles}
            title={'Login'}
            bgColor={colors.AppRedColor}
            titleColor={colors.dark_red}
            titleStyle={[styles.titleStyles]}
            onPress={() => this.onLoginEmailAndPassword()}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ResetPassword')}>
            <Text style={styles.textStyle}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <Spinner visible={this.state.spinner} textContent={''} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  updateUser,
  updateUserProfile,
  updateFCMToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
