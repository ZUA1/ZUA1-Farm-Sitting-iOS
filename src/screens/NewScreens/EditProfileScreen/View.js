//================================ React Native Imported Files ======================================//

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Image, ImageBackground, StatusBar, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader';
import AppInput from '../../../Components/AppInput';
import Button from '../../../Components/Button/Button';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import styles from './Styles';

import storage from '@react-native-firebase/storage';
import { connect } from 'react-redux'
import { updateUser, updateUserProfile } from '../../../reducers/user'
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import geohash from "ngeohash";
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      profile: {
        avatar: null,
        first_name: null,
        last_name: null,
        name: null,
        address: null,
        phone: null,
        public_first_name: true,
        public_last_name: true,
        public_address: false,
        public_phone: true,
        ...props.profile
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile != this.props.profile) {
      this.setState({ profile: nextProps.profile })
    }
  }
  selectPhoto = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: [
          'Take Photo...',
          'Choose From Library...',
          'Cancel'
        ],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 0,
        tintColor: 'black',
      },
      index => {
        switch (index) {
          case 0: {
            ImagePicker.openCamera({
              width: 300,
              height: 300,
              cropping: true,
              mediaType: 'photo',
              cropperCircleOverlay: true,
            }).then(image => {
              this.updateFormField('avatar', { uri: image.path })
            });
            break;
          }
          case 1: {
            ImagePicker.openPicker({
              width: 300,
              height: 300,
              cropping: true,
              cropperCircleOverlay: true,
              mediaType: 'photo',
            }).then(image => {
              this.updateFormField('avatar', { uri: image.path })
            });
            break;
          }
        }
      },
    );
  };
  updateFormField(name, value) {
    const { profile } = this.state;
    this.setState({
      profile: {
        ...profile,
        [name]: value
      }
    })
  }
  async saveChanges() {
    const { profile } = this.state;
    if (profile.avatar && profile.first_name && profile.last_name && profile.address && profile.phone) {
      const { user } = this.props
      this.setState({ spinner: true })

      let new_avatar = null;
      if (profile.avatar && profile.avatar.uri) {
        try {
          const reference = storage().ref(`users/avatar/${user.uid}.png`);
          const resp_image = await reference.putFile(profile.avatar.uri);
          new_avatar = await reference.getDownloadURL()
        } catch {
          err => {
            console.log("err", err)
          }
        }
      }
      const { location } = this.props
      const profile_doc = firestore().collection('users').doc(user.uid)
      profile_doc.update({
        ...profile,
        avatar: new_avatar ? new_avatar : profile.avatar,
        name: (profile.first_name || '') + ' ' + (profile.last_name || ''),

        ...location ? {
          geohash: location && geohash.encode(location.latitude, location.longitude),
          location
        } : {}
      })
        .then((res) => {
          this.setState({ spinner: false })
          MessageBarManager.showAlert({
            title: '',
            message: 'Successfully updated!',
            alertType: 'success'
          });
          profile_doc.get().then(res => {
            console.log("upated profile:", res.data())
            this.props.updateUserProfile(res.data())
            this.props.navigation.navigate('drawer', { screen: 'MyProfile' });
          })
        })
    } else {
      alert('Please fill out this form.')
    }
  }
  openActionSheet(key) {
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['Public', 'Private'],
        tintColor: 'black',
      },
      index => {
        index != null &&
          this.updateFormField(key, index == 0 ? true : false)
      },
    );
  }
  render() {
    const { avatar, first_name, last_name, name, address, phone, public_first_name, public_last_name, public_address, public_phone } = this.state.profile
    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}>
        <ImageBackground style={styles.mainCotainer} source={images.bg_img}>
          {/* //================================ StatusBar ======================================// */}
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor={colors.app_light_blush}
            translucent={false}
          />
          {/* //================================ Header ======================================// */}
          <View style={styles.headerCotainer}>
            <AppHeader
              headerHeight="100%"
              title={'EDIT PROFILE'}
              titleFontSize={wp(5)}
              leftIconPath={images.ic_back}
              bgColor={'transparent'}
              iconWidth={wp(5)}
              lefticonSize={wp(5)}
              onLeftIconPress={() => {
                //this.props.navigation.goBack();
                //this.props.navigation.navigate('MyProfile');
                this.props.navigation.navigate('drawer', { screen: 'MyProfile' });
              }}
            />
          </View>
          {/* //================================ Profile ======================================// */}
          <KeyboardAwareScrollView contentContainerStyle={styles.editProfileCotainer} enableOnAndroid>
            {/*
            <TouchableOpacity style={styles.profilePicCotainer}
              onPress={() =>  this.selectPhoto()}>
              {avatar ?
                  <Image
                    source={avatar && avatar.uri ? avatar : { uri: avatar }}
                    style={styles.imageStylesTag}
                  /> :
                  <Image source={images.user}
                    style={[styles.imageStylesTag]}
                  />
              }
            </TouchableOpacity>
            */}
            <View style={styles.profilePicCotainer}>
                {avatar ?
                    <Image
                      source={avatar && avatar.uri ? avatar : { uri: avatar }}
                      style={styles.imageStylesTag}
                    /> :
                    <Image source={images.user} style={styles.imageStylesTag} />
                }
                <TouchableOpacity
                    onPress={() => this.selectPhoto()}
                    style={styles.editIconBtn}
                    >
                    <Image source={images.ic_edit_2} style={styles.editIconImg} />
                </TouchableOpacity>
            </View>
            <View style={styles.ProfileCotainer}>
                {/* //================================ Input Fields ======================================// */}
              <AppInput
                height={hp(7)}
                placeholder={'First Name'}
                textInputColor={colors.white}
                paddingLeft={wp(5)}
                placeholderTextColor={colors.white_dark}
                marginBottom={wp(2)}
                marginTop={5}
                borderRadius={wp(2)}
                backgroundColor={"rgba(0,0,0,0.3)"}
                value={first_name}
                onChangeText={value => this.updateFormField('first_name', value)}
              />

              <AppInput
                height={hp(7)}
                placeholder={'Last Name'}
                textInputColor={colors.white}
                paddingLeft={wp(5)}
                placeholderTextColor={colors.white_dark}
                marginBottom={wp(2)}
                marginTop={5}
                borderRadius={wp(2)}
                backgroundColor={"rgba(0,0,0,0.3)"}
                value={last_name}
                onChangeText={value => this.updateFormField('last_name', value)}
              />

              <AppInput
                height={hp(7)}
                placeholder={'Address'}
                textInputColor={colors.white}
                paddingLeft={wp(5)}
                placeholderTextColor={colors.white_dark}
                marginBottom={wp(2)}
                marginTop={5}
                borderRadius={wp(2)}
                backgroundColor={"rgba(0,0,0,0.3)"}
                value={address}
                onChangeText={value => this.updateFormField('address', value)}
              />

              <AppInput
                height={hp(7)}
                placeholder={'Phone Number'}
                textInputColor={colors.white}
                paddingLeft={wp(5)}
                placeholderTextColor={colors.white_dark}
                marginBottom={wp(2)}
                marginTop={5}
                borderRadius={wp(2)}
                backgroundColor={"rgba(0,0,0,0.3)"}
                value={phone}
                onChangeText={value => this.updateFormField('phone', value)}
                keyboardType='numeric'
              />

            </View>
            <View style={styles.buttonCotainer}>
              {/* //================================ Button ======================================// */}
              <Button
                width={'90%'}
                style={styles.buttonStyles}
                title={'SAVE'}
                titleColor={colors.white}
                bgColor={colors.white}
                titleStyle={[styles.titleStyles]}
                onPress={() => {
                  this.saveChanges()
                }}
              />
            </View>
          </KeyboardAwareScrollView>
          <Spinner
            visible={this.state.spinner}
            textContent={'Creating...'}
            textStyle={{ color: 'white' }}
          />
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  profile: state.user.profile,
  location: state.user.location
})

const mapDispatchToProps = {
  updateUser,
  updateUserProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

