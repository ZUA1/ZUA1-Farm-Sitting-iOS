import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppHeader from '../../../../../Components/AppHeader';
import IconButton from '../../../../../Components/IconButton';
import images from '../../../../../../assets/images';
import colors from '../../../../../../assets/colors';
import styles from './style';

export default class SelectUserTypeScreen extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.mainContainer,
          {backgroundColor: colors.splash_background},
        ]}>
        <AppHeader
        
          title={'Select User Type'}
          leftIconPath={images.ic_back}
          onLeftIconPress={() => this.props.navigation.goBack()}
        />

        <Image style={styles.logo} source={images.logo} />

        <View style={styles.btnView}>
          <IconButton
            onPress={() =>
              this.props.navigation.navigate('SignUpScreen', {type: 'buyer'})
            }
            iconHeight={hp(4.5)}
            iconWidth={wp(5)}
            bgColor={colors.header}
            imgLeftColor={'#fff'}
            imgLeft={images.ic_buyer}
            textColor={'#fff'}
            title={'Owner'}
          />
          <IconButton
            onPress={() =>
              this.props.navigation.navigate('SignUpScreen', {type: 'seller'})
            }
            bgColor={colors.header}
            imgLeftColor={'#fff'}
            iconHeight={hp(4.5)}
            iconWidth={wp(4)}
            imgLeft={images.ic_seller}
            textColor={'#fff'}
            title={'Provider'}
          />
        </View>
      </View>
    );
  }
}
