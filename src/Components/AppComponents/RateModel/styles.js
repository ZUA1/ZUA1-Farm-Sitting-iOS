import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from '../../../../assets/colors';

const styles = StyleSheet.create({

    mainContainer:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(153, 153, 153, 0.3)'
        // backgroundColor:colors.black
    },



    container:
    {
        height: wp(70),
        width: '80%',
        borderRadius: wp(4),
        padding: wp(5),
        backgroundColor: colors.white,
    },
    topTitle:
    {
        height: '15%',
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor:colors.grey,
    },
    textDescriptionContainer:
    {
        height: '30%',
        width: '100%',
        // alignItems:'center',
        // paddingHorizontal:'5%',
        // justifyContent:'center',
        // backgroundColor: 'red',
    },
    textRateApp:
    {
        fontSize: wp(5),
        color: colors.light_blue_apptheme,
        fontWeight: 'bold',
    },
    textDescription:
    {
        fontSize: wp(4),
        color: colors.black,
        textAlign: 'center',
        // fontWeight:'bold'
    },
    textContainer:
    {
        fontSize: wp(4.2),
        color: colors.black,
        // textAlign:'center'
    },
    ratingContainer:
    {
        height: '18%',
        width: '100%',
        alignItems: 'center',
        // backgroundColor:colors.white,
        // backgroundColor: 'green',
        justifyContent: "center",
        paddingBottom: wp(4)
    },
    line:
    {
        height: '0.5%',
        marginTop: '10%',

    },
    bottomButtons:
    {
        height: '40%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor:colors.grey
    },
    rateNowContainer:
    {
        // flex:1,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    laterContainer:
    {
        // flex:1,
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBurron:
    {
        fontSize: wp(4.5),
        color: colors.dark_green,
        fontWeight: '500',
    },
    buttonViewContainer: {
        height: '35%',
        width: '100%',
        // flexDirection:'row',
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end',
        // backgroundColor: 'pink'
    },
    countinueStyle: {
        height: '50%',
        width: '100%',
        // backgroundColor: "yellow",
        justifyContent: "center",
        alignItems: "center"
    },
    closeStyle: {
        height: '50%',
        width: '100%',
        // backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center"
    },
    AgreeTextStyleContainer: {
        // fontWeight: 'bold',
        fontSize: wp(4.2),

        color: colors.most_blue_button
    },
    closeTextStyleContainer: {
        fontSize: wp(4.2),

        color: colors.app_red
    },

});
export default styles;
