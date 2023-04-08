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
        flex:Platform.OS === 'ios' ? 0.8 : 0.8,
        alignItems: 'center',
        // backgroundColor:'green',
        marginTop:wp(2)
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
    photoReferenceView:{
        minHeight: Platform.OS === 'ios' ? hp(7) : hp(7),
        width:wp(90),
        borderRadius:wp(2),
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        paddingRight: '2%',
        backgroundColor:colors.app_input_bg,
        paddingLeft:'5%',
        marginTop:5,
    },
    uploadBtn:{
        height:'80%',
        width:'40%',
        backgroundColor:'white',
        borderRadius:wp(2),
    },
    photoText:{
        color:colors.placeholder_color
    },
    btnView:{
        flex:Platform.OS === 'ios' ? 0.2 : 0.2,
        // backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
    },
    img:{
        //height:'80%',
        width:95,
        height: 'auto',
        //resizeMode:'contain',
        borderRadius:wp(1),
        marginRight:5,
        backgroundColor:'red'
        // borderRadius:wp(2),
    },

});


export default styles;
