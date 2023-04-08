import {Platform, StyleSheet} from 'react-native';
import colors from '../../../../assets/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles= StyleSheet.create({
    mainContainer:{
        flex:1,
        // alignItems:'center',
        //flexDirection: 'column',
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
        //flex: Platform.OS === 'ios' ? 0.55 : 0.66,
        backgroundColor: colors.app_ruby,
        alignItems:'center',
        //paddingTop:Platform.OS === 'ios' ? '7%' : '3%',
        //paddingBottom: '3%',
        paddingTop: wp(1),
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
        paddingVertical: wp(1),
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
        paddingHorizontal:'5%',
        color:colors.white,
        textAlign:'center',
        paddingTop: wp(1),
    },
    addPhotoView:{
        //flex: Platform.OS === 'ios' ? 0.45 : 0.4,
        //backgroundColor: 'orange',
        //flexDirection: 'column',
        alignItems:'center',
        //justifyContent:'center'
        paddingTop: wp(3),
    },
    innerAddPhotoView:{
        //height:'80%',
        width:'90%',
        backgroundColor:colors.white,
        borderRadius:wp(2),
        // alignItems:'center',
        // justifyContent: 'center'
    },

    btnView:{
        //flex: Platform.OS === 'ios' ? 0.15 : 0.12,
        // backgroundColor: 'blue',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical: wp(5),
    },
    reviewText:{
        fontSize:wp(3.7),
        fontWeight:'bold',
        // paddingLeft:'2%',
        color:colors.white,
        paddingTop: '2%',
        textAlign: 'center'
    },
    ratingView:{
        paddingTop:'2%',
        paddingBottom:'2%',
    },
    rating:{
        //height:'25%',
        width:'100%',
        // backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderColor:'#c6c6c6',
        paddingVertical: wp(3),
        paddingHorizontal: wp(2),
    },
    writeReview:{
        //height:'75%',
        width:'100%',
        paddingTop:Platform.OS === 'ios' ? '2%' : '1%',
        // backgroundColor:'green',
        // borderBottomWidth:1,
        // borderColor:colors.placeholder_color,
        paddingBottom: wp(5),
    },
    writeReviewText:{
        fontSize: Platform.OS === 'ios' ? wp(3.5) : wp(3.4),
        fontWeight:'500',
        color:colors.shadow_black,
    },
    skipReviewText:{
        fontSize: Platform.OS === 'ios' ? wp(3.5) : wp(3.4),
        fontWeight:'500',
        color:colors.app_ruby,
        textDecorationLine:'underline'
    },
    viewReviewText:{
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal: '6%'
    },
    textArea:{
        //height: Platform.OS === 'ios' ? '75%' : '70%',
        width:Platform.OS === 'ios' ? '90%' : '90%',
        height: wp(30),
        backgroundColor:colors.app_input_bg,
        borderRadius:wp(2),
        marginTop:8,
        paddingLeft:'4%',
        paddingTop:Platform.OS === 'ios' ? '2%' : 0,
        alignSelf:'center'
    },

    overPhotoBtn: {
        backgroundColor:'rgba(251,102,83,0.5)',
        position:'absolute',
        right: wp(1),
        bottom: wp(1),
        width:wp(20),
        height: wp(20),
        justifyContent: 'center',
        alignItems: 'center',
    },




});


export default styles;
