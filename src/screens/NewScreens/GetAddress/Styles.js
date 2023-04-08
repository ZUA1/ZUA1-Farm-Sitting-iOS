
//================================ React Native Imported Files ======================================//
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({

    mainCotainer:
    {
        flex: 1,

    },
    headerCotainer: {
        flex: 0.1,
    },
    BottomCotainer: {
        flex: 0.9,
    },
    mapView: {
        flex: 0.9,

    },
    mapStyles:
    {

        height: '100%',
        width: '100%',
    },
    bottomtext:
    {
        height: hp(30),
        width: '90%',
        marginHorizontal: '5%',
        position: 'absolute',
        bottom: wp(5),
        elevation: 10,
        borderRadius: wp(4)

    },
});
export default Styles;