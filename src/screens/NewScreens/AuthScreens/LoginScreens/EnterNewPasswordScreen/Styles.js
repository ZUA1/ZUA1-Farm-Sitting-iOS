
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {Platform, StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../../../../../assets/colors';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,

    },

    headerView:
    {
        height: wp(13),
        width: '100%',
    },
    SignupWithText: {
        color: colors.white,
        // fontWeight: "bold",
        fontSize: wp(5)
    },
    SignupWith: {
        flex: 0.1,
        // backgroundColor: "red",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    upperView:
    {
        height: wp(50),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    midView:
    {
        height: hp(60),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: wp(2),
        // backgroundColor: "red"

    },
    buttonView:
    {
        height: wp(30),
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: wp(2),

    },
    lowerView:
    {
        height: wp(30),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: wp(10),
    },
    imageStyles:
    {
        height: '75%',
        width: '75%',
        resizeMode: 'contain'
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.bright_red,
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    buttonStyles:
    {
        borderRadius: wp(2),
        height: Platform.OS === 'ios' ? hp(7) : hp(8),
        width: '85%',
        backgroundColor: colors.white,
        marginBottom: wp(4),

    },
    titleStyles: {
        color: colors.pink,
        fontSize: wp(4),
        fontWeight: "bold"
    },
    checkBoxContainer:
    {
        flex: 0.4,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: wp(5),
        paddingHorizontal: wp(12)
    },
    checkBoxIcon:
    {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    checkBoxText:
    {
        flex: 0.9,
        paddingHorizontal: wp(2),
        justifyContent: 'center',
    },
    checkBoxIconStyle:
    {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain',
    },
    checkBoxTextStyle:
    {
        fontSize: wp(3.5),
        color: colors.white,
    }

});
export default Styles;
