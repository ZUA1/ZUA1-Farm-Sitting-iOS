import {Platform, StyleSheet} from 'react-native';
import colors from '../../../../assets/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // alignItems:'center',
    backgroundColor: colors.app_dark_white,
  },
  headerView: {
    flex: 0.1,
    // backgroundColor: 'green',
  },
  bottomContainer: {
    flex: 0.9,
    // backgroundColor:colors.app_header_color
  },
  inputsView: {
    flex: Platform.OS === 'ios' ? 0.8 : 0.8,
    alignItems: 'center',
    // backgroundColor:'green',
    marginTop: wp(2),
  },

  textArea: {
    height: Platform.OS === 'ios' ? hp(17) : hp(18),
    width: wp(90),
    backgroundColor: colors.app_input_bg,
    borderRadius: wp(2),
    marginTop: 5,
    paddingLeft: '4%',
    paddingTop: Platform.OS === 'ios' ? '2%' : 0,
  },
  photoReferenceView: {
    minHeight: Platform.OS === 'ios' ? hp(7) : hp(7),
    width: wp(90),
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '5%',
    backgroundColor: colors.app_input_bg,
    paddingLeft: '5%',
    marginTop: 5,
  },
  img: {
    //height:'80%',
    width: 95,
    height: 'auto',
    //resizeMode:'contain',
    borderRadius: wp(1),
    marginRight: 5,
    //backgroundColor:'red'
    // borderRadius:wp(2),
  },
  uploadBtn: {
    //height:'80%',
    width: '40%',
    backgroundColor: 'white',
    borderRadius: wp(2),
    alignItems:"center",
    justifyContent:"center",
  },
  photoText: {
    color: colors.placeholder_color,
  },
  btnView: {
    flex: Platform.OS === 'ios' ? 0.2 : 0.2,
    // backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nameView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  price: {
    fontSize: wp(4.7),
    fontWeight: 'bold',
    color: colors.app_ruby,
    paddingTop: Platform.OS === 'ios' ? '2%' : '1%',
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 7,
  },
  infoView: {
    width: '100%',
    //backgroundColor:'orange',
    paddingHorizontal: '5%',
    paddingVertical: 10,
    //paddingTop:Platform.OS === 'ios' ? '1%' : 0
  },
});

export default styles;
