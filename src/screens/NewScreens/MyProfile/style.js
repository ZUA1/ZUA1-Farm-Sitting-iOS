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
    viewImage:{
        flex:0.3,
        backgroundColor:colors.app_ruby,
        borderBottomRightRadius:wp(15),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    img:{
        height: Platform.OS === 'ios' ? wp(35) : wp(32),
        width:Platform.OS === 'ios' ? wp(35) : wp(32),
        borderRadius: wp(35),
        resizeMode:'contain'
    },
    userName:{
        fontSize:wp(5),
        fontWeight:'bold',
        color:colors.white,
    },
    addressText:{
        fontSize:wp(4.2),
        fontWeight:'500',
        color:colors.white,
    },
    viewText:{
        paddingLeft:'5%'
    },
    viewInfo:{
        flex:0.7,
        backgroundColor:colors.app_ruby,
        // borderTopLeftRadius:wp(15),
    },
    viewTabs:{
        flex: Platform.OS === 'ios' ? 0.116 : 0.117,
        backgroundColor:colors.white,
        borderTopLeftRadius:wp(15),
    },
    viewContent:{
        flex:Platform.OS === 'ios' ? 0.884 : 0.883,
        backgroundColor:colors.app_dark_white,
    },
    touchItem:{
        height: hp(7),
        width: wp(90),
        backgroundColor:colors.white,
        alignSelf:'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:'5%',
        marginTop:10,
        borderRadius:wp(2)
    },
    icon:{
        height:16,
        width:16,
        resizeMode: 'contain'
    },
    titleTouchItem:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.black,
    },
    reviewView:{
            height: hp(7),
            width: wp(90),
            backgroundColor:colors.white,
            alignSelf:'center',
            justifyContent:'center',
            paddingHorizontal:'5%',
            marginTop:14,
            borderTopLeftRadius: wp(2),
            borderTopRightRadius:wp(2),
    },
    titleReview:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.placeholder_color,
    },

    editIconBtn: {
        position:'absolute',
        bottom:0,
        right:0,
        backgroundColor:'#fff',
        borderRadius: 35,
        padding: 8
    },

    editIconImg: {
        width: 16,
        height: 16,
        resizeMode:'contain'
    }



});


export default styles;
