//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";

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
    upperView:
    {
        flex: 0.36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle1:
    {
        fontSize: wp(5),
        color: colors.appYellow,
        textAlign: 'center',
    },
    midView:
    {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: wp(2)
    },
    lowerView:
    {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
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
        color: colors.AppRedColor,
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    buttonStyles:
    {
        borderRadius: wp(7),
        height: hp(8),
        width: '85%',
        marginBottom: wp(4),
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4.5),
        fontWeight: "bold"
    },
    checkBoxContainer:
    {
        flex: 0.4,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    checkBoxIcon:
    {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    checkBoxText:
    {
        flex: 0.6,
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
        color: colors.grey1,
    }

});

export default Styles;
