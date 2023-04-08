
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {Platform, StyleSheet} from 'react-native';

//================================ Local Imported Files ======================================//

import colors from '../../../../../../assets/colors';


const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        // backgroundColor: 'red'
    },

    headerView:
    {
        flex: 0.09
    },
    SignupWith: {
        flex: 0.1,
        // backgroundColor: "red",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    SignupWithText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: wp(5)
    },
    upperView:
    {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle1:
    {
        fontSize: wp(5),
        color: colors.appYellow,
        textAlign: 'center',
        marginBottom: wp(3)
    },
    midView:
    {
        flex: 0.42,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonView:
    {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: wp(2),
        // backgroundColor: "red"
    },
    buttonAgreeView: {
        flex: 0.2,
        //  backgroundColor: "green",
        justifyContent: "center",
        alignItems: "flex-end",
        flexDirection: "row"
        // paddingLeft: wp(8)
    },
    lowerView:
    {
        flex: 0.07,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    imageStyles:
    {
        height: '80%',
        width: '80%',
        resizeMode: 'contain'
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.white,
        textAlign: 'center',
        // textDecorationLine: "underline",
    },
    termsStyle: {
        // fontSize: wp(3.5),
        color: colors.white,
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    AgreesStyle: {
        color: colors.white,
        textAlign: 'center',
    },
    buttonStyles:
    {
        height:hp(7),
        borderRadius: wp(2),
        width: '85%',
        marginBottom: wp(4),

    },
    titleStyles: {
        color: colors.app_ruby,
        fontSize: wp(4.5),
        fontWeight: "bold"
    },
    checkBoxContainer:
    {
        flex: 0.4,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: wp(4)

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
        // backgroundColor: "red"
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
