
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet,Platform } from "react-native";

//================================ Local Imported Files ======================================//

import colors from '../../../../../assets/colors';

const Styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
    },
    headerView:
    {
        backgroundColor: colors.appDarkBlue,
        flex: 0.09
    },
    middleView: {
        flex: 0.7,
        marginHorizontal: wp(3),
    },
    LastView: {
        flex: 0.21,
        marginHorizontal: wp(3),
    },
    uploadButtonView: {
        width: '100%',
        height: '50%',
        justifyContent: "flex-end",
        alignItems: "center",

    },
    saveButtonView: {
        width: '100%',
        height: '50%',
        justifyContent: "center",
        alignItems: "center",
    },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4),
        fontWeight:'bold'

    },
    NameView: {
        marginTop: wp(2),
        height: hp(8),

    },
    EmailView: {
        marginTop: wp(2),
        height: hp(8),

    },
    SubjectView: {
        marginTop: wp(2),
        height: hp(8),

    },
    MessageView: {
        marginTop: wp(2),
        height: hp(15),

    },
    CharacterView: {
        height: hp(5),
        backgroundColor: "#E6E6E6",
        alignItems: "flex-end",
        paddingRight:'3%',

    },
    CharacterStyle: {
        color: colors.placeholder_color
    },
    buttonStyles:
    {
        borderRadius: wp(2),
        height: Platform.OS === 'ios' ? hp(7) :hp(7),
        width: '90%',
    },
});
export default Styles;
