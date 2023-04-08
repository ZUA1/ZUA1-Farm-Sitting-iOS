
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet,Platform } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../../../../../assets/colors';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        backgroundColor: colors.appDarkBlue
    },

    headerView:
    {
        flex: 0.09
    },
    SignupWith: {
        flex: 0.1,
        // backgroundColor: "red",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    SignupWithText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: wp(5)
    },
    textStyle1:
    {
        fontSize: wp(5),
        color: colors.appYellow,
        textAlign: 'center',
        marginBottom: wp(8)
    },
    upperView:
    {
        flex: 0.36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyles: {
        color: colors.app_ruby,
        fontSize: wp(4),
        fontWeight: "bold"
    },
    midView:
    {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: wp(2),
        // backgroundColor: "pink"
    },

    lowerView:
    {
        flex: 0.51,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: "red"
    },
    imageStyles:
    {
        height: '70%',
        width: '70%',
        resizeMode: 'contain'
    },
    textStyle:
    {
        fontSize: wp(4),
        color: colors.white,
        textAlign: 'center'
    },
    buttonStyles:
    {
        borderRadius: wp(2),
        height: Platform.OS === 'ios' ? hp(7) : hp(8),
        width: '85%',
        backgroundColor: colors.white,
        marginBottom: wp(4),
    },
    textContainer:
    {
        flex: 0.5,
        paddingHorizontal: wp(10),
        paddingTop: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
    }

});
export default Styles;
