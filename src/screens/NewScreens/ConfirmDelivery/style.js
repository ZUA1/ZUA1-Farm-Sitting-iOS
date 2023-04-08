import {Platform, StyleSheet} from 'react-native';
import colors from '../../../../assets/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles= StyleSheet.create({
    mainContainer:{
        flex:1,
        // alignItems:'center',
        backgroundColor: colors.app_dark_white,
    },
    headerView:{
        flex: 0.1,
        // backgroundColor: 'green',
    },
    bottomContainer:{
        flex: 0.9,
        // backgroundColor:colors.app_header_color
    },
    imageView:{
        flex: Platform.OS === 'ios' ? 0.4 : 0.49,
        backgroundColor: colors.app_ruby,
        alignItems:'center',
        paddingVertical:'7%'

    },
    img:{
        height:Platform.OS === 'ios' ? wp(35) : wp(33),
        width:Platform.OS === 'ios' ? wp(35) : wp(33),
        resizeMode:'cover',
        borderWidth: wp(0.5),
        borderColor: colors.white,
        borderRadius: wp(50),
    },
    name:{
        fontSize:wp(4.5),
        fontWeight:'bold',
        color:colors.white,
        paddingVertical:'2%'
    },
    icon:{
        height: 17,
        width: 17,
        resizeMode: 'contain',
        tintColor:colors.white
    },
    titleAddress:{
        fontSize:wp(3.9),
        fontWeight:'600',
        paddingLeft:'2%',
        color:colors.white
    },
    usersView:{
        flexDirection:'row',
        alignItems:'center',

    },
    text:{
        fontSize:wp(3.5),
        fontWeight:Platform.OS === 'ios' ? '700' : '600',
        paddingHorizontal:'10%',
        color:colors.white,
        textAlign:'center',
        paddingTop:'4%'
    },
    addPhotoView:{
        flex: Platform.OS === 'ios' ? 0.3 : 0.37,
        // backgroundColor: 'orange',
        alignItems:'center',
        justifyContent:'center',
        //paddingTop: '4%', 
    },
    photosView: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        //backgroundColor: '#ffff00',
        height: '100%',
    },
    innerAddPhotoView:{
        height:'80%',
        width:'90%',
        backgroundColor:colors.white,
        borderRadius:wp(2),
        alignItems:'center',
        justifyContent: 'center',
    },
    addBtn: {
        flexDirection: 'row',
        backgroundColor:colors.white,
        alignItems:'center',
        justifyContent:'center',
        width: '90%',
        padding: wp(2),
        //bottom: wp(5),
    },
    addImage:{
        height:35,
        width: 35,
        resizeMode: 'contain',
        tintColor:colors.app_ruby
    },
    addPhotoText:{
        fontSize:wp(3.7),
        fontWeight:'bold',
        paddingHorizontal:'2%',
        color:colors.shadow_black,
        paddingVertical: '3%'
    },
    btnView:{
        flex: Platform.OS === 'ios' ? 0.3 : 0.14,
        // backgroundColor: 'blue',
        alignItems:'center',
        justifyContent:'center'
    }




});


export default styles;
