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

    btnView:{
        flex:Platform.OS === 'ios' ? 0.2 : 0.2,
        // backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
    }

});


export default styles;
