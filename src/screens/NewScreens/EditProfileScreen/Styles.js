
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../../../assets/colors";


const Styles = StyleSheet.create({

    mainCotainer:
    {
        flex: 1,
        backgroundColor: colors.appDarkBlue
    },
    headerCotainer: {
        flex: 0.09
    },

    editProfileCotainer: {
        flex: 0.9,

    },
    profilePicCotainer: {
        //height: hp(30),
        //width: wp(30),
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: 'center',
        overflow: 'hidden',
        position: 'relative',
        margin: wp(4)
    },
    ProfileCotainer: {
        //paddingHorizontal: wp(4),
        //flex: 0.42,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonCotainer: {
        paddingHorizontal: wp(4),
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 20
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

    inputTextCotainer: {
        width: '100%',
        justifyContent: "center"
    },
    worldImageCotainer: {
        height: '100%',
        width: '7%',
        justifyContent: "center",
        alignItems: "center"
    },
    downImageCotainer: {
        height: '100%',
        width: '8%',
        justifyContent: "center"
    },
    ImageStyles: {
        height: hp(30),
        width: wp(30),
        resizeMode: 'contain',
        backgroundColor: 'gray',
        overflow: 'hidden'
    },
    imageStylesTag: {
        height: wp(30),
        width: wp(30),
        resizeMode: 'contain',
        borderRadius: wp(30),
        overflow: 'hidden'
      },
    worldImageStyles: {
        height: hp(3.5),
        width: wp(3.5),
        resizeMode: 'contain'
    },
    downImageStyles: {
        height: hp(3.5),
        width: wp(3.5),
        resizeMode: 'contain',
        tintColor: colors.black
    },
    lcokImageStyles: {
        height: hp(3),
        width: wp(3),
        resizeMode: 'contain'
    },

    editIconBtn: {
        position:'absolute',
        bottom:0,
        right:0,
        backgroundColor:'#fff',
        borderRadius: 35,
        padding: 8
    },

    editIconImg: {
        width: 16,
        height: 16,
        resizeMode:'contain'
    }

});
export default Styles;