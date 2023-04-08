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
    balanceView:{
        flex:0.3,
        alignItems:'center',
        justifyContent: 'center'
    },
    priceText:{
        fontSize:wp(10),
        fontWeight:'bold',
        color:colors.app_ruby
    },
    balanceText:{
        fontSize:wp(3.8),
        fontWeight:'bold',
        color:colors.black,
        paddingTop:'2%'
    },
    bankAccountText:{
        fontSize:wp(3.8),
        fontWeight:'500',
        color:colors.black,
        paddingLeft:'5%',
    },
    flatListView:{
        flex:0.5,
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
