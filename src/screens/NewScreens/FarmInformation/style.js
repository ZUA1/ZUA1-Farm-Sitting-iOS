import {Platform, StyleSheet} from 'react-native';
import colors from '../../../../assets/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles= StyleSheet.create({
    mainContainer:{
        flex:1,
        // alignItems:'center',
        backgroundColor: colors.app_dark_white,
    },
    headerView:{
        flex: 0.1,
        // backgroundColor: 'green',
    },
    bottomContainer:{
        flex: 0.9,
        // backgroundColor:colors.app_header_color
    },
    iconAdd:{
        height:'45%',
        width:'45%',
        resizeMode:'contain'
    },

    addBtn:{
        height:wp(14),
        width:wp(14),
        position:'absolute',
        top:Platform.OS === 'ios' ? hp(80) : hp(75),
        left:wp(80),
        right:0,
        bottom:0,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:wp(14),
        backgroundColor:colors.app_ruby
    },


});


export default styles;
