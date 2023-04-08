import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import colors from '../../../../assets/colors';


let Styles = {
    drawerMainContainer: {
        width: "100%",
        height: hp(100),
        // backgroundColor: 'red',
    },
    backgroundImageContainer: {
        width: "100%",
        height: hp(100),
    },
    userInfoContainer: {
        width: "100%",
        height: Platform.OS === 'ios' ? "22%" : '20%',
        // paddingTop: wp(5),
        // backgroundColor: colors.app_header_color,
        // flexDirection: "row"
    },
    userImageContainer: {
        width: "100%",
        height: "75%",
        paddingTop: hp(4),
        // backgroundColor: colors.app_header_color,
        // backgroundColor: colors.blue,
        // width: "40%",
        justifyContent: "center",
        alignItems: "center",

    },

    userProfileImage: {
        width: wp(23),
        height: wp(23),
        resizeMode: 'cover',
        borderRadius: wp(50),
        borderWidth: wp(0.5),
        borderColor: colors.white,
    },
    userTextContainer: {
        width: "100%",
        height: "20%",
        // backgroundColor: colors.white,
        paddingTop:Platform.OS === 'ios' ? hp(0) : hp(2),



        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "flex-start",
        // paddingLeft: wp(5)
    },
    userNameText: {
        textAlign: "center",
        color: colors.white,
        fontSize: 17,
        fontWeight: "bold"
    },
    emailText: {
        marginTop: 5,
        textAlign: "center",
        color: "white",
        fontSize: 13
    },
    drawerItemsContainer: {
        width: "100%",
        height: "80%",
        paddingTop: wp(5),
        // backgroundColor: colors.white,
    },
    drawerItemLabelText: {
        fontWeight: "500",
        fontSize: wp(4),
        color: colors.black,
    },
    drawerItemImage: {
        width: 20,
        height: 20,
        // tintColor: colors.deep_grey,
        resizeMode: "contain",
    },
    drawerItemStyles:
    {
        height: Platform.OS === 'ios' ? wp(15) : wp(14),
        // width:wp(100),
        marginVertical: wp(0.8),
        backgroundColor: colors.white,
        justifyContent: 'center',
        // borderColor: colors.AppGreenColor,
        // borderWidth: 1,
        borderRadius: wp(2)

    },
    drawerItemStylesLogin: {
        height: Platform.OS === 'ios' ? wp(12) : wp(11),
        // width:wp(100),
        marginVertical: wp(0.5),
        backgroundColor: colors.white,
        justifyContent: 'center',
        borderColor: colors.bright_red,
        borderWidth: 1,
        borderRadius: wp(10)
    }

};
export default Styles;
