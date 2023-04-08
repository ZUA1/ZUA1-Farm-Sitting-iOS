//================================ React Native Imported Files ======================================//
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text, StatusBar, Image, ScrollView, ImageBackground } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../../Components/AppHeader';
import colors from '../../../../../../assets/colors';
import images from '../../../../../../assets/images';
import Button from '../../../../../Components/Button/Button';
import AppInput from '../../../../../Components/Inputs/AppInput';
import styles from './Styles';

class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: true,
      showConfirmPassword: true,
    };
  }

  togglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  toggleConfirmPassword() {
    this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
  }

  render() {
    return (
      <ImageBackground
        style={styles.mainContainer} source={images.bg_img}>
        <View style={styles.headerView}>
          {/* //================================ StatusBar ======================================// */}
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor={colors.app_light_blush}
            translucent={false}
          />

          {/* //================================ Header ======================================// */}
          <AppHeader
            headerHeight="100%"
            // title={'ENTER NEW PASSWORD'}
            titleFontSize={wp(5)}
            leftIconPath={images.ic_back}
            iconWidth={wp(3)}
            bgColor={'transparent'}
            lefticonSize={wp(5)}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>
        <ScrollView>
          {/* //================================ Logo ======================================// */}
          {/* <View style={styles.upperView}>
            <Image style={styles.imageStyles} source={images.logo}></Image>
          </View> */}
          <View style={styles.SignupWith} >
            <Text style={styles.SignupWithText}>Enter New Password</Text>
          </View>
          {/* //================================ Input Fields ======================================// */}
          <View style={styles.midView}>
            <AppInput
              height={hp(8)}
              placeholder={'John'}
              textInputColor={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.white_dark}
              marginBottom={wp(2)}
              marginTop={5}
              borderRadius={wp(2)}
              backgroundColor={"rgba(0,0,0,0.3)"}
            />
            <AppInput
              height={hp(8)}
              placeholder={'Smith'}
              textInputColor={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.white_dark}
              marginBottom={wp(2)}
              marginTop={5}
              borderRadius={wp(2)}
              backgroundColor={"rgba(0,0,0,0.3)"}
            />
            <AppInput
              height={hp(8)}
              placeholder={'sample@email.com'}
              textInputColor={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.white_dark}
              marginBottom={wp(2)}
              marginTop={5}
              borderRadius={wp(2)}
              backgroundColor={"rgba(0,0,0,0.3)"}
            />
            <AppInput
              height={hp(8)}
              placeholder={'New Password'}
              textInputColor={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.white_dark}
              marginBottom={wp(3)}
              borderRadius={wp(2)}
              backgroundColor={"rgba(0,0,0,0.3)"}
              rightIconPath={true}
              rightIconPath={images.ic_eye}
            />
            <AppInput
              height={hp(8)}
              placeholder={'Confirm New Password'}
              textInputColor={colors.white}
              paddingLeft={wp(5)}
              placeholderTextColor={colors.white_dark}
              marginBottom={wp(3)}
              borderRadius={wp(2)}
              backgroundColor={"rgba(0,0,0,0.3)"}
              rightIconPath={true}
              rightIconPath={images.ic_eye}
            />

            <View style={styles.checkBoxContainer}>
              <View style={styles.checkBoxIcon}>
                <Image
                  style={styles.checkBoxIconStyle}
                  source={images.check_icon_green}
                />
              </View>
              <View style={styles.checkBoxText}>
                <Text style={styles.checkBoxTextStyle}>Password matched</Text>
              </View>
            </View>
          </View>

          {/* //================================ Button ======================================// */}
          <View style={styles.lowerView}>
            <Button
              width={'90%'}
              // height={10}
              style={styles.buttonStyles}
              title={"Save Changes"}
              titleColor={colors.white}
              bgColor={colors.white}
              titleStyle={[styles.titleStyles]}
              onPress={() => this.props.navigation.navigate('SignupWith')}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default NewPassword;
