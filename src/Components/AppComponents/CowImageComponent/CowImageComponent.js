import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,FlatList,ImageBackground,TouchableWithoutFeedback} from 'react-native';
import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';
import Button from '../../Button/Button';
import RevtoneCategoryComponent from '../RevtoncategoryComponent/RevtoncategoryComponent';





export default class CowImageComponent extends React.Component {






    render() {
        return(
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                    <Image style={styles.img} source={this.props.image}/>
                </TouchableOpacity>
            </View>

        );
    }
}




const styles= StyleSheet.create({
    mainContainer:{
        // flex:1,
        // alignItems:'center',
        // backgroundColor:colors.black,
        justifyContent: 'center',
        // paddingHorizontal:'2%'
    },
    container:{
        height:hp(8),
        width:wp(26),
        paddingLeft:'10%',
        borderRadius:wp(1)
        // backgroundColor:colors.deep_grey,
    },
    img:{
        height:'100%',
        width:'100%',
        resizeMode:'cover',
        borderRadius:wp(1)
        // borderRadius:wp(2),


    },




});




