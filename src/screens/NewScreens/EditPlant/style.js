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
    inputsView:{
        flex:Platform.OS === 'ios' ? 0.75 : 0.75,
        alignItems: 'center',
        // backgroundColor:'green',
        marginTop:wp(2)
    },
    dropdownView:
        {
            height: Platform.OS === 'ios' ? hp(7) : hp(7),
            width:wp(90),
            justifyContent:'center',
            alignItems:'center',
            // marginBottom:wp(2.5),
            paddingHorizontal:'5%',
            backgroundColor:colors.app_input_bg,
            paddingBottom:Platform.OS === 'ios' ? '10%' : '8.5%',
            borderRadius:wp(2),
            paddingRight:'7%',
            // borderWidth:2,
            // borderColor:colors.white,
        },
    textArea:{
        height: Platform.OS === 'ios' ? hp(17) : hp(18),
        width:wp(90),
        backgroundColor:colors.app_input_bg,
        borderRadius:wp(2),
        marginTop:1,
        paddingLeft:'4%',
        paddingTop:Platform.OS === 'ios' ? '2%' : 0
    },
    imagesView:{
        height: Platform.OS === 'ios' ? hp(10) : hp(10),
        width:wp(90),
        backgroundColor:colors.app_input_bg,
        borderRadius:wp(2),
        marginTop:6,
        justifyContent:'center',
    },
    photoText:{
        color:colors.placeholder_color
    },
    btnView:{
        flex:Platform.OS === 'ios' ? 0.25 : 0.25,
        // backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
    },
    btn:{
        height:hp(6.5),
        width:'90%',
        borderRadius:wp(2),
        marginBottom:10,
        borderWidth:1,
        borderColor:colors.placeholder_color
    },
    titleBtn:{
        color:colors.black_shadow,
        fontSize:16,
        fontWeight:'bold',
    }

});


export default styles;
