//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text, Alert, ImageBackground, StatusBar } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//
import AppHeader from '../../../../../Components/AppHeader';
import colors from '../../../../../../assets/colors';
import images from '../../../../../../assets/images';
import Button from '../../../../../Components/Button/Button';
import AppInput from '../../../../../Components/Inputs/AppInput';
import styles from './Styles';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';

class ResetPassword extends React.Component {
  ShowAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'OKAY' }]);
  };
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      spinner: false,
      email: ''
    }
  };

  sendResetMail = () => {
    //this.setState({ showAlert: !this.state.showAlert });
    if (this.state.email) {
      this.setState({ spinner: true })
      auth().sendPasswordResetEmail(this.state.email).then(res => {
        this.setState({ spinner: false })
        setTimeout(() => {
          if (res == null) {
            this.setState({ showAlert: true, email: '' })
            //this.props.navigation.goBack()
            //alert('sent reset email!');
            Alert.alert(
              'Reset Password',
              'We have sent a password reset link to your email',
              [{ text: 'OKAY',onPress: () => {
                //this.props.navigation.navigate('NewPassword')
                this.props.navigation.goBack()
               }}],
            )
          }
        }, 100)
      }).catch(error => {
        this.setState({ spinner: false })
        setTimeout(() => {
          if (error.code === 'auth/invalid-email') {
            alert('Please enter valid email address.');
            return
          }

          if (error.code === 'auth/user-not-found') {
            alert('There is no user corresponding to the email address.');
            return
          }

          alert(error);
        }, 100)
      })
    } else alert('Please enter email address.')
  };

  render() {
    const { email } = this.state
    return (
      <ImageBackground
        style={styles.mainContainer} source={images.bg_img}>
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
            // title={'RESET PASSWORD'}
            titleFontSize={wp(5)}
            leftIconPath={images.ic_back}
            bgColor={'transparent'}
            iconWidth={wp(5)}
            lefticonSize={wp(5)}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>

        {/* //================================ Logo ======================================// */}
        {/* <View style={styles.upperView}>
          <Image style={styles.imageStyles} source={images.logo}></Image>
        </View> */}
        <View style={styles.SignupWith} >
          <Text style={styles.SignupWithText}>Reset Password</Text>
        </View>
        {/* //================================ Password Input ======================================// */}
        <View style={styles.midView}>
          <AppInput
            height={hp(7)}
            placeholder={'Email'}
            textInputColor={colors.white}
            paddingLeft={wp(5)}
            placeholderTextColor={colors.white_dark}
            marginBottom={wp(2)}
            marginTop={5}
            borderRadius={wp(2)}
            backgroundColor={"rgba(0,0,0,0.3)"}
            value={email}
            onChangeText={(email) => this.setState({ email })}
          />
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>
              Input the email used to create your account. We will send you a
              link to reset your password.
            </Text>
          </View>
        </View>
        {/* //================================ Button ======================================// */}
        <View style={styles.lowerView}>
          <Button
            width={'90%'}
            // height={10}
            style={styles.buttonStyles}
            title={"Reset Password"}
            titleColor={colors.white}
            bgColor={colors.white}
            titleStyle={[styles.titleStyles]}
            onPress={() => this.sendResetMail() }
          />
        </View>
        <Spinner
          visible={this.state.spinner}
          textContent={''}
        />
      </ImageBackground>
    );
  }
}

export default ResetPassword;
