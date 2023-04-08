//================================ React Native Imported Files ======================================//

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StyleSheet,Platform } from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../../../../../assets/colors';

const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: colors.appDarkBlue,
  },
  SignupWith: {
    flex: 0.1,
    // backgroundColor: "red",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  SignupWithView: {
    flex: Platform.OS === 'ios' ? 0.08 : 0.09,
    marginTop: wp(4),
    marginHorizontal: wp(7),
    borderRadius: wp(2),
    borderWidth: wp(0.2),
    borderColor: "white",
    // justifyContent: "center",
    alignItems: "center",
    paddingLeft: wp(10),
    flexDirection: "row",
    // backgroundColor: "red",
    // justifyContent: "flex-end",
    // alignItems: "center"
  },
  divider: {
    // marginTop: hp(1),
    height: '70%',
    width: '0.2%',

    backgroundColor: colors.white,
  },
  dividerContainer: {
    flex: 0.1,
    // backgroundColor: "red",
    justifyContent: "center",
    paddingHorizontal: wp(8),
    flexDirection: "row",
    alignItems: "center"

  },
  buttonContainer: {
    flex: 0.1,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },

  appInputContainer: {
    flex: 0.23,
    justifyContent: "flex-start",
    // marginTop: 1,
    //backgroundColor: "red",
    paddingTop: wp(4),
  },
  checkBox: {
    flex: 0.3,
    // justifyContent: "center",
    // backgroundColor: "red",
    paddingLeft: wp(6)

  },
  loginButton: {
    flex: 0.18,
    // backgroundColor: "red"
    justifyContent: "center",
    alignItems: "center"
  },
  forgetButton: {
    flex:Platform.OS === 'ios' ?  0.2 : 0.18,
    marginTop: wp(3),
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyles:
  {
    height:hp(7),
    width: '90%',
    borderRadius: wp(2)

  },
  titleStyles: {
    color: colors.app_ruby,
    fontSize: wp(4),
    fontWeight: "bold"
  },
  forgetStyle: {
    color: colors.white,
    fontSize: wp(3.5),
    // fontWeight: "bold"
  },
  dividerbottom: {
    height: wp(0.1),
    width: '44%',
    backgroundColor: colors.white
  },
  orDivider: {
    fontSize:wp(4.3),
    marginLeft: wp(4),
    marginRight: wp(4),
    color: colors.white
  },
  iconAdd: {
    height: '30%',
    width: '30%',
    resizeMode: 'contain'
  },
  googleStyle: {
    height: '30%',
    width: '30%',
    resizeMode: 'contain',
    tintColor: "white"
  },
  SignupWithText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: wp(4.5)
  },
  SignupWithTextStyle: {
    color: colors.white,
    // fontWeight: "bold",
    fontSize: wp(4),
    marginLeft: wp(4)

  },

  checkBoxContainer:
  {
      flex: 0.4,
      justifyContent: 'center',
      flexDirection: 'row',
  },
  checkBoxIcon:
  {
      flex: 0.4,
      justifyContent: 'center',
      alignItems: 'flex-end',

  },
  checkBoxText:
  {
      flex: 0.6,
      paddingHorizontal: wp(2),
      justifyContent: 'center',
  },
  checkBoxIconStyle:
  {
      height: wp(4),
      width: wp(4),
      resizeMode: 'contain',
  },
  checkBoxTextStyle:
  {
      fontSize: wp(3.5),
      color: colors.grey1,
  }

});
export default Styles;
