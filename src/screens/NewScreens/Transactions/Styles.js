
//================================ React Native Imported Files ======================================//

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StyleSheet } from "react-native";

//================================ Local Imported Files ======================================//
import colors from '../../../../assets/colors';


const Styles = StyleSheet.create({

    mainCotainer:
    {
        flex: 1,

    },
    headerCotainer: {
        flex: 0.1,
        backgroundColor: "red"
    },
    homeContainer: {
        flex: 0.9,

    },
    viewTabs: {
        flex: Platform.OS === 'ios' ? 0.080 : 0.082,
        backgroundColor: colors.white,
        // borderTopLeftRadius: wp(15),
    },


});
export default Styles;
