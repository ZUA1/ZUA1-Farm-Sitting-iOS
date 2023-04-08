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
export default Styles;
