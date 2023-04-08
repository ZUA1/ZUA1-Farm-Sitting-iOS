//================================ React Native Imported Files ======================================//

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../../../../../assets/colors';

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },

  headerView: {
    flex: 0.1,
    backgroundColor: colors.appDarkBlue,
  },
  container: {
    flex: 0.88,
    alignItems: 'center',
    padding: wp(5),
    borderTopColor: colors.white,
    borderTopWidth: wp(0.7),
  },
  textContainer: {
    alignSelf: 'stretch',
    fontSize: wp(4.7),
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'left',
  },
  icon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: '#7c7c7c',
  },
  iconAct: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: '#00c80e',
  },
  btnContainer: {
    backgroundColor: '#eaeaea',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 4,
    borderRadius: 10,
  },
});
export default Styles;
