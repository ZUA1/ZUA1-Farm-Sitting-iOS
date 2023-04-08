//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Alert,
} from 'react-native';
import React from 'react';

import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {
  updateUser,
  updateUserProfile,
  updateFCMToken,
} from '../../../../../reducers/user';
import {
  createUserByData,
  createFarmByUser,
} from '../../../../../utils/firebase';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../../Components/AppHeader';
import colors from '../../../../../../assets/colors';
import images from '../../../../../../assets/images';
import Button from '../../../../../Components/Button/Button';
import AppInput from '../../../../../Components/Inputs/AppInput';
import CheckBox from '../../../../../Components/CheckBox';

import styles from './Styles';
import MyModel from '../../../../../Components/model/Model';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      view: 'this',
      showPassword: false,
      checkAgree: false,

      showAlert: false,
      email: null,
      password: null,
      spinner: false,
      isValidEmail: false,
      isLeast6Char: false,
      isContainLetter: false,
      isContainNum: false,
      isContainSpecial: false,
    };
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  hasNumber(password) {
    return /\d/.test(password);
  }
  hasLetter(password) {
    return password.search(/[a-z]/i) < 0 ? false : true;
  }
  hasSpecial(password) {
    const re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return re.test(String(password));
  }
  //================================ Navigation Functions ======================================//

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  navigateScreem() {
    this.props.navigation.navigate('TermsAndCondtions'),
      this.setModalVisible(!this.state.modalVisible);
  }
  Privacy() {
    this.props.navigation.navigate('PrivacyScreen'),
      this.setModalVisible(!this.state.modalVisible);
  }

  navigteToHome() {
    this.props.navigation.navigate('drawer'),
      this.setModalVisible(!this.state.modalVisible);
  }

  togglePassword() {
    this.setState({showPassword: !this.state.showPassword});
  }

  async onClickSignUp() {
    const {
      isValidEmail,
      isLeast6Char,
      isContainLetter,
      isContainNum,
      isContainSpecial,
      checkAgree,
    } = this.state;

    //const user_type = this.props.navigation.getParam("type");
    const user_type = this.props.route.params?.type || 'buyer';

    if (
      isValidEmail &&
      isLeast6Char &&
      isContainLetter &&
      isContainNum &&
      isContainSpecial
    ) {
      //this.setModalVisible(true)
      if (!checkAgree) {
        alert('Please accept Terms and Conditions');
        return;
      }
      this.setState({spinner: true});
      const res = await auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
          this.setState({spinner: false});
          setTimeout(() => {
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

      if (res && res.user && res.user._user) {
        console.log('User account created & signed in!===========================>>', res.user._user);
        this.props.updateUser(res.user._user);
        const providerData =
          res.user._user.providerData && res.user._user.providerData.length > 0
            ? res.user._user.providerData[0]
            : {};

        const user_profile = await createUserByData(
          res.user._user.uid,
          user_type,
          providerData,
        ).catch((err) => {
          console.log('user add err:', err);
        });
        if (user_profile) {
          console.log('User added!=======>',this.props.updateUserProfile);
        // this.props.updateUserProfile(user_profile);
          this.props.updateFCMToken();
          this.setState({spinner: false});
          //this.props.navigation.navigate('AttachDocumentScreen');
          if (user_type == 'buyer'){
            this.props.navigation.navigate('AttachDocumentScreen');
            // const res = createFarmByUser(
            //   res.user._user.uid,
            //   providerData,
            // )
            // .then((res)=>{
            //   console.log(res)
            // })
            // .catch((err) => {
            //   console.log("err",err)
            // });
            // this.setState({spinner: false});
            // if (res) {
            //   this.props.navigation.navigate('AttachDocumentScreen');
            // } else {
            //   setTimeout(() => {
            //     alert('failed adding farm data!');
            //   }, 100);
            // }
            // return;
          }
          else{
            this.props.navigation.replace('drawer', {screen: 'Home'});
          }
          
          
          //this.setState({ spinner: false });
          //this.props.navigation.navigate('drawer');
        } else {
          console.log('# signup err:', err);
          this.setState({spinner: false});
          setTimeout(() => {
            alert('failed adding user data!');
          }, 100);
        }
        // this.setState({spinner: false});
        // this.props.navigation.goBack();
        // Alert.alert('User Created Successfully', 'You can sign in now');
      } else {
        this.setState({spinner: false});
        Alert.alert('Error while creating user');
      }
     
    } else {
      if (isValidEmail) {
        alert('Please enter valid password.');
        return;
      }
      if (this.state.email && this.state.email.length > 0) {
        alert('Please enter valid email address.');
        return;
      }
      alert('Please enter email address.');
      return;
    }
  }

  render() {
    const {
      modalVisible,
      email,
      password,
      isValidEmail,
      isLeast6Char,
      isContainLetter,
      isContainNum,
      isContainSpecial,
      showPassword,
      checkAgree,
    } = this.state;
    return (
      <ImageBackground style={styles.mainContainer} source={images.bg_img}>
        {/* //================================ StatusBar ======================================// */}
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.app_light_blush}
          translucent={false}
        />
        {/* //================================ Header ======================================// */}
        <View style={styles.headerView}>
          <AppHeader
            headerHeight="100%"
            // title={'SIGN UP'}
            titleFontSize={wp(5)}
            leftIconPath={images.ic_back}
            iconWidth={wp(5)}
            lefticonSize={wp(5)}
            bgColor={'transparent'}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>
        {/* //================================ Logo ======================================// */}
        {/* <View style={styles.upperView}>
          <Image style={styles.imageStyles} source={images.logo}></Image>
        </View> */}
        <View style={styles.SignupWith}>
          <Text style={styles.SignupWithText}>Sign Up</Text>
        </View>
        <View style={styles.midView}>
          {/* //================================ Email Input ======================================// */}
          <AppInput
            height={hp(7)}
            placeholder={'Email'}
            textInputColor={colors.white}
            paddingLeft={wp(5)}
            placeholderTextColor={colors.white_dark}
            marginBottom={wp(2)}
            marginTop={5}
            borderRadius={wp(2)}
            backgroundColor={'rgba(0,0,0,0.3)'}
            value={email}
            onChangeText={(value) =>
              this.setState({
                email: value,
                isValidEmail: this.validateEmail(value),
              })
            }
            keyboardType="email-address"
          />
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[
                  styles.checkBoxIconStyle,
                  {
                    tintColor: isValidEmail
                      ? colors.light_green_color
                      : 'white',
                  },
                ]}
                source={
                  isValidEmail ? images.check_icon_green : images.ic_check
                }
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text style={styles.checkBoxTextStyle}>Valid email</Text>
            </View>
          </View>
          {/* //================================ Password Input ======================================// */}
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
            tintColor={colors.grey}
            secureEntry={!showPassword}
            value={password}
            onChangeText={(value) =>
              this.setState({
                password: value,
                isLeast6Char: value && value.length >= 6 ? true : false,
                isContainLetter: this.hasLetter(value),
                isContainNum: this.hasNumber(value),
                isContainSpecial: this.hasSpecial(value),
              })
            }
            onRightIconPress={() => this.togglePassword()}
          />
          {/* //================================ CheckBoxs ======================================// */}
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[
                  styles.checkBoxIconStyle,
                  {
                    tintColor: isLeast6Char
                      ? colors.light_green_color
                      : 'white',
                  },
                ]}
                source={
                  isLeast6Char ? images.check_icon_green : images.ic_check
                }
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text style={[styles.checkBoxTextStyle]}>
                At least 6 characters long
              </Text>
            </View>
          </View>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[
                  styles.checkBoxIconStyle,
                  {
                    tintColor: isContainLetter
                      ? colors.light_green_color
                      : 'white',
                  },
                ]}
                source={
                  isContainLetter ? images.check_icon_green : images.ic_check
                }
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text style={[styles.checkBoxTextStyle]}>Contains a letter</Text>
            </View>
          </View>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[
                  styles.checkBoxIconStyle,
                  {
                    tintColor: isContainNum
                      ? colors.light_green_color
                      : 'white',
                  },
                ]}
                source={
                  isContainNum ? images.check_icon_green : images.ic_check
                }
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text style={[styles.checkBoxTextStyle]}>Contains a number</Text>
            </View>
          </View>
          <View style={styles.checkBoxContainer}>
            <View style={styles.checkBoxIcon}>
              <Image
                style={[
                  styles.checkBoxIconStyle,
                  {
                    tintColor: isContainSpecial
                      ? colors.light_green_color
                      : 'white',
                  },
                ]}
                source={
                  isContainSpecial ? images.check_icon_green : images.ic_check
                }
              />
            </View>
            <View style={styles.checkBoxText}>
              <Text style={[styles.checkBoxTextStyle]}>
                Contains a special character
              </Text>
            </View>
          </View>
        </View>
        {/* //================================ Buttons ======================================// */}
        <View style={styles.buttonAgreeView}>
          <CheckBox
            value={checkAgree}
            clicked={(chk) => this.setState({checkAgree: chk})}
          />
          <Text style={styles.AgreesStyle}>Agree to </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('TermsAndCondtions')}>
            <Text style={styles.termsStyle}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonView}>
          <Button
            width={'90%'}
            // height={10}
            style={styles.buttonStyles}
            title={'Sign Up '}
            titleColor={colors.white}
            bgColor={colors.white}
            titleStyle={[styles.titleStyles]}
            onPress={() => {
              //this.setModalVisible(true)
              this.onClickSignUp();
            }}
          />
        </View>
        <View style={styles.lowerView}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignupWith')}>
            <Text style={styles.textStyle}>Already have an account.</Text>
          </TouchableOpacity>
        </View>
        {/* //================================ model ======================================// */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <MyModel
            onPressPrivacy={() => this.Privacy()}
            onPressTerm={() => this.navigateScreem()}
            onPressCondition={() => this.navigateScreem()}
            onPressAgree={() => this.navigteToHome()}
            onPressCancel={() => {
              this.setModalVisible(!modalVisible);
            }}
          />
        </Modal>
        <Spinner
          visible={this.state.spinner}
          textContent={'Creating...'}
          textStyle={{color: 'white'}}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
