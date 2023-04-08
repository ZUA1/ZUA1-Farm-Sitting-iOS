import React from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity,Platform} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';


export default class MessagesComponent extends React.Component {



    render() {
        return(

            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                    <View style={styles.infoView}>
                        <Image style={styles.img} source={this.props?.avatar ?this.props?.avatar : null }/>
                    </View>

                    <View style={styles.textView}>
                        <View style={styles.viewName}>
                        <Text style={styles.name}>{this.props.name}</Text>
                        <Image style={styles.icon} source={images.ic_right}/>
                        </View>
                        <Text numberOfLines={2}  style={styles.text}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}


const styles = StyleSheet.create({

    mainContainer:{
        // flex:1,
        // backgroundColor: colors.deep_grey,
        // justifyContent:'center',
        alignItems:'center',
        // paddingLeft:'3%',
        //     paddingTop:'2%'
    },
    container:{
        height:Platform.OS === 'ios' ? hp(10) : hp(10),
        width: wp(90),
        backgroundColor: colors.white,
        borderRadius:wp(2),
        borderTopWidth:1,
        borderColor:colors.app_input_bg,
        flexDirection:'row',
        marginTop:12,
        alignItems:'center',
        justifyContent:"center"

    },
    img:{
        height: 55,
        width: 55,
        resizeMode:"contain",
    },
    icon:{
        height: 15,
        width: 15,
        resizeMode:"contain",
        tintColor:colors.deep_grey,
    },
    infoView:{
        height:'100%',
        width:'20%',
        // backgroundColor:'green',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textView:{
        height:'100%',
        width:'80%',
        // backgroundColor:'red',
        paddingHorizontal:'3%',
        paddingTop:Platform.OS === 'ios' ? '4%': '3%'
    },
    viewName:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',


    },
    name:{
        fontSize:wp(4.2),
        fontWeight:'500'
    },
    text:{
        fontSize:wp(4),
        fontWeight:'400',
        paddingTop:Platform.OS === 'ios' ? '3%': '2%',
        paddingRight:'4%'

    },







});



