import { StyleSheet,Platform } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from '../../../../assets/colors';


const Styles = StyleSheet.create({

    mainContainer:
        {
            flex: 1,
            // backgroundColor: "red",

        },
    mainCard: {
        height: hp(59),
        width: '90%',
        backgroundColor: "white",
        margin: wp(5),
        borderRadius: wp(2),
        paddingHorizontal: hp(2),
        alignSelf: "center"

    },
    nameAndIcon: {
        height: hp(6),
        width: '100%',
        // backgroundColor: "pink",
        flexDirection: "row",
        // justifyContent: "space-between"
    },
    price: {
        height: hp(3),
        width: '100%',
        // backgroundColor: "yellow",
        justifyContent: "center",

    },
    job: {
        height: hp(5),
        width: '100%',
        // backgroundColor: "yellow",
        // justifyContent: "center",
        flexDirection: "row",
    },
    jobTextView: {
        height: '100%',
        width: '30%',
        // backgroundColor: "pink",
        justifyContent: "center",
    },
    statusStyle: {
        height: '100%',
        width: '70%',
        justifyContent: "center"
        // backgroundColor: "blue",
        // borderColor: colors.AppLightPink,
        // borderWidth: wp(0.5),
        // borderRadius: wp(2),
        // justifyContent: "center",
        // alignItems: "center",
        // alignSelf: "flex-end"

        // backgroundColor: "green",
    },
    statusStyleOngoing: {
        height: '90%',
        width: Platform.OS === 'ios' ? '60%' : '56%',
        // backgroundColor: "yellow",
        // alignSelf: "flex-end",
        borderColor: colors.AppLightPink,
        borderWidth: wp(0.5),
        borderRadius: wp(2),
        justifyContent: "center",
        alignItems: "center",
        // paddingLeft: wp(1),
        // alignItems: "center",
        alignSelf: "flex-end",
        flexDirection: "row"

        // backgroundColor: "green",
    },
    checkImageStyles: {
        height: wp(4),
        width: wp(4),
        // tintColor: colors.AppRedColor,
        resizeMode: 'contain'
    },
    divider: {
        marginTop: hp(1),
        height: hp(0.05),
        width: '100%',
        backgroundColor: colors.AppGrey,
    },
    locationStyle: {
        height: hp(6),
        width: '100%',
        // backgroundColor: "yellow",
        flexDirection: "row",
        marginTop: hp(1)
    },
    locationIcon: {
        height: '100%',
        width: '5%',
        // backgroundColor: "green",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    locationName: {
        height: '100%',
        width:Platform.OS === 'ios' ? '42%' : '40%',
        // backgroundColor: "red",
        justifyContent: "center",
        paddingLeft:'2%'
    },
    awayIcon: {
        height: '100%',
        width:'25%',
        // backgroundColor: "green",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight:Platform.OS === 'ios' ? '2%' :0
    },
    awayText: {
        height: '100%',
        width: Platform.OS === 'ios' ? '26%' :'25%',
        // backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: wp(2),

    },
    startDate: {
        height: hp(3),
        width: '100%',
        // backgroundColor: "red",
        flexDirection: "row"
    },
    startDateText: {
        height: '100%',
        width: '50%',
        // backgroundColor: "red",
    },
    startDateNumber: {
        height: '100%',
        width: '50%',
        // backgroundColor: "green",
    },
    viewInformation: {
        height: hp(5),
        width: '100%',
        // backgroundColor: "blue",
        alignItems: "flex-end",
        paddingRight: wp(4),
        justifyContent: "center"
    },
    jobDescription: {
        height: hp(4),
        width: '100%',
        // backgroundColor: "grey",
        justifyContent: "center"
    },
    jobDescriptionInfo: {
        height: hp(10),
        width: '100%',
        // backgroundColor: "red",
        // justifyContent: "center"
    },
    button: {
        height: hp(11),
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "pink",
    },
    buttons: {
        height: hp(11),
        width: '100%',
        flexDirection: "row",
        // justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "pink",
    },
    buttonStyles:
        {
            height: Platform.OS === 'ios'  ? hp(7) : hp(8),
            width: '100%',
            borderRadius: wp(2)

        },
    titleStyles: {
        color: colors.white,
        fontSize: wp(4),
        fontWeight: "bold"
    },
    joinButton: {
        height: '100%',
        width: '50%',
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red"
    },
    cancelButton: {
        height: '100%',
        width: '50%',
        // backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
    },
    awaitingButton: {
        height: hp(7),
        width: '100%',
        borderRadius: wp(2),
        borderWidth: wp(0.5),
        borderColor: colors.app_ruby,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red"
    },
    ratingButton: {
        height: Platform.OS === 'ios'  ? hp(7) : hp(8),
        width: '100%',
        // backgroundColor:"red"
        justifyContent: "center",
        alignItems: "center"
    },
    name: {
        height: '100%',
        width: '50%',
        // backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: {
        height: '100%',
        width: '50%',
        // backgroundColor: "blue",
        // flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: wp(3),
        paddingTop: hp(1)
    },
    CilentName: {
        fontSize: wp(4),
    },
    titleName: {
        fontSize: wp(4),
        fontWeight: "bold"
    },
    rightIconStyle:
        {
            height: wp(5),
            width: wp(5),
            resizeMode: 'contain',
            // tintColor: colors.white,
        },
    locationStyleIcon: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain',
    },
    awayIconStyle: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain',
    },
    pricetextStyle: {
        fontSize: wp(6),
        fontWeight: "bold",
        color: colors.app_ruby,

    },
    jobTextStyle: {
        fontSize: wp(4),
        // fontWeight: "bold",
        color: colors.app_ruby,
    },
    ongoingTextStyle: {
        fontSize: Platform.OS === 'ios' ? wp(3.2) : wp(3),
        fontWeight: "600",
        color: colors.app_ruby,
        paddingLeft: wp(1)

    },
    locationNameStyle: {
        fontSize: wp(3),
        fontWeight: "bold",
        color: colors.app_ruby,
        textDecorationLine: "underline"
    },
    awayTextStyle: {
        fontSize: Platform.OS === 'ios' ? wp(3) : wp(3),
        fontStyle: "italic",
        fontWeight: "bold",
        // color: colors.AppLightPink,
    },
    startDateStyle: {
        fontSize: Platform.OS === 'ios' ? wp(3.2) : wp(3.2),
        // fontStyle: "italic"

        // fontWeight: "bold",
        color: colors.AppGrey,
    },
    EndDateStyle: {
        fontSize: wp(3),
        // fontStyle: "italic"

        fontWeight: "bold",
        // color: colors.AppGrey,
    },
    viewInformationStyle: {
        fontSize: wp(3.5),
        // fontStyle: "italic",
        textDecorationLine: 'underline',

        // fontWeight: "bold",
        color: colors.app_ruby,
    },
    jobDescriptionStyle: {
        fontSize: wp(3.5),
        // fontStyle: "italic",
        // textDecorationLine: 'underline',

        // fontWeight: "bold",
        color: colors.grey
    },
    jobDescriptionInfoStyle: {
        fontSize: wp(3.5),
        // fontStyle: "italic",
        // textDecorationLine: 'underline',

        // fontWeight: "bold",

    },
    awaitingStyle: {
        fontSize: wp(3.5),
        // fontStyle: "italic",
        // textDecorationLine: 'underline',

        fontWeight: "bold",
        color: colors.app_ruby,
    },
});
export default Styles;
