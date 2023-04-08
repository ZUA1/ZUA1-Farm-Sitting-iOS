import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';

const styles = StyleSheet.create({

    mainContainer:{
        alignSelf:'center',
        backgroundColor:colors.app_input_bg,
        height:hp(8),
        width:wp(92),
        justifyContent:'center',
        marginTop:12,
        borderRadius:wp(3),
        paddingLeft:'3%',
        //     paddingTop:'10%'
    },
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    img:{
        height: hp(5),
        width: wp(8),
        resizeMode:"contain",
        paddingRight:'7%',
    },
    containerInnerUpperView:{
        flexDirection:'row',
        alignItems:'center',
    },
    titleUpperView:{
        fontSize:wp(4),
        fontWeight:'bold',
    },
    textUpperView:{
        fontSize:wp(4),
        paddingTop:'1%'
    },
    containerInnerBottomView:{
        alignItems:'center',
    },
    image:{
        height: hp(10),
        width: wp(14),
        resizeMode:"contain",
    }





});

export default styles;
