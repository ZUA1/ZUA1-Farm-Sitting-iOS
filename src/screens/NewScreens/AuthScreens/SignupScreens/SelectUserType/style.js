import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles= StyleSheet.create({
    mainContainer:{
        flex:1,
        // backgroundColor:'grey',
        alignItems:'center',
       // paddingTop:Platform.OS === 'ios' ? '5%' : 0
    },
    logo: {
        resizeMode:'contain',
        marginVertical: '10%',
        height: hp(17),
        width:wp(50),
    },
    logoView:{
        height:hp(45),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'gold'
    },
    btnView:{
        height:hp(47),
        alignItems: 'center',
        marginTop:50
        // backgroundColor: 'green'
    },

});


export default styles;