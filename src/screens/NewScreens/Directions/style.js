//================================ React Native Imported Files ======================================//

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet,Platform} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../../../assets/colors';


const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerContainer: {
        flex: 0.1,
    },
    container: {
        flex: 0.9,
    },
    mapView:{
        flex:1,
        // backgroundColor: 'red'
    },
    mapStyle:{
        flex:1
    },

    markerIcon:{
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    addressView:{
        //height: hp(14),
        //width: wp(100),
        alignSelf: 'stretch',
        backgroundColor:colors.white,
        paddingHorizontal: 10,
        paddingVertical:'5%'
    },
    icon:{
        height: 22,
        width: 22,
        resizeMode: 'contain'
    },
    titleAddress:{
        fontSize:wp(4.3),
        fontWeight:'bold',
        paddingLeft:'2%'
    },
    usersView:{
        flexDirection:'row',
        alignItems:'center',

    },
    distanceText:{
        fontSize:wp(3.9),
        fontWeight:'500',
        paddingTop: '1%',
        paddingLeft:'8%'
    },
    kmText:{
        fontSize:wp(3.9),
        fontWeight:'600',
        color:colors.app_ruby
    },
    destination:{
        fontSize:wp(3.5),
        // fontWeight:'500',
        color:'grey'
    }




});
export default Styles;
