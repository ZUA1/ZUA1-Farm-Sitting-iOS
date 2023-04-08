import {StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:colors.app_dark_white
    },
    headerView:{
        flex:0.1
    },
    container:{
        flex:0.9
    },
    flatListView:{
       flex:0.8,
        alignItems: 'center',
        // backgroundColor: 'green'
    },
    btnView:{
        flex:0.2,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor: 'orange'

    },



});


export default styles;
