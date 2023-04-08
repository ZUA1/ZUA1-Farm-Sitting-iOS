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
    locationView:{
        height: Platform.OS === 'ios' ? hp(16): hp(18) ,
        width:wp(90),
        backgroundColor: colors.white,
        alignSelf:'center',
        borderRadius:wp(2),
        marginTop:wp(5),
        paddingLeft: '5%'
    },
    addressView:{
        height:'40%',
        // width:'100%',
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'green'

    },
    icon:{
        height: 17,
        width: 17,
        resizeMode: 'contain',
        tintColor:colors.app_ruby
    },
    titleAddress:{
        fontSize:wp(3.9),
        fontWeight:'600',
        paddingLeft:'2%',
        paddingRight:'4%',
        color:colors.app_ruby,
        //backgroundColor: '#ffff00',
    },
    dateView:{
        height:'60%',
        width:'100%',
        // flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        // backgroundColor:'orange'
    },
    startDateView:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    dateText:{
        fontSize:wp(3.8),
        fontWeight:'600',
        color:colors.black,
        paddingRight:'5%'
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
    iconRightArrow:{
        height:16,
        width:16,
        resizeMode: 'contain'
    },
    titleTouchItem:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.black,
    },
    btnView:{
        alignItems:'center',
        marginTop:wp(5)
    }



});


export default styles;
