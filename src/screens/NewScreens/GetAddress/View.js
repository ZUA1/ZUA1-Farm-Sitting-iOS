//================================ React Native Imported Files ======================================//

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';
import { StatusBar, View } from 'react-native';

//================================ Local Imported Files ======================================//

import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import MapView from 'react-native-maps';
import styles from './Styles';
import colors from '../../../../assets/colors';
import LocationView from './LocationView/lib'
import { connect } from 'react-redux'

const DEFAULT_LOCATION = {
  latitude: 46.9487764,
  longitude: 7.427142,
};

class GetAddress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;
    const initLocation = this.props.route.params?.initLocation;
    console.log('# initLocation:', initLocation);
    return (
      <View style={styles.mainCotainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.AppRedColor}
          translucent={false}
        />

        <View style={styles.headerCotainer}>
          <AppHeader
            headerHeight="100%"
            onLeftIconPress={() => this.props.navigation.goBack()}
            leftIconPath={images.ic_back}
            lefticonSize={wp(5)}
            title={'MAP'}
            app_header={'white'}
          />
        </View>
        <View style={{ flex: 1 }}>
          <LocationView
            apiKey={'AIzaSyD9N8ud_1NGY3KuHhm9kIVMgvTAeOZa8ig'}
            actionTextStyle={{backgroundColor: colors.app_ruby, padding: wp(2), borderRadius: wp(2)}}
            initialLocation={
              initLocation ? initLocation : (location ? location : DEFAULT_LOCATION)
            }
            onLocationSelect={async location => {
              const getLocation = this.props.route.params?.getLocation
              getLocation && getLocation(location)
              this.props.navigation.goBack()
            }}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.user,
  profile: state.user.profile,
  location: state.user.location
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GetAddress)
