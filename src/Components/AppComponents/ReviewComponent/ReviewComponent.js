import React from 'react';
import {View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import moment from 'moment';

export default class ReviewComponent extends React.Component {



    render() {
        return(

                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <View style={styles.infoView}>
                            <View style={{flexDirection:'row'}}>
                                {this.props.avatar &&
                                    <Image style={styles.img} source={{uri:this.props.avatar}}  />
                                }
                                <View style={{paddingLeft:'7%'}}>
                                    <Text style={styles.name}>{this.props.name}</Text>
                                    <View style={{flexDirection:'row',alignItems: 'center',paddingTop:'2.5%'}}>
                                        <Image style={styles.icon} source={images.ic_star}/>
                                        <Image style={styles.icon} source={images.ic_star}/>
                                        <Image style={styles.icon} source={images.ic_star}/>
                                        <Image style={styles.icon} source={images.ic_star}/>
                                        <Image style={styles.icon} source={images.ic_star_grey}/>
                                    </View>
                                </View>
                            </View>

                            <Text>{moment(this.props.date).format('MMMM DD, YYYY')}</Text>
                        </View>

                        <View style={styles.textView}>
                            <Text>{this.props.text}</Text>
                        </View>
                    </View>

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
        height: hp(18),
        width: wp(90),
        backgroundColor: colors.white,
        borderRadius:wp(2),
        borderTopWidth:1,
        borderColor:colors.app_input_bg
    },
    img:{
        height: 40,
        width: 40,
        resizeMode:"contain",
        paddingRight:'7%',
    },
    infoView:{
        height:'50%',
        width:'100%',
        // backgroundColor:'green',
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal:'5%',
        alignItems: 'center',

    },
    textView:{
        height:'50%',
        width:'100%',
        // backgroundColor:'red',
        paddingHorizontal:'5%'

    },
    icon:{
        height:17,
        width:17,
        resizeMode: 'contain',
        marginRight:5
    },
    name:{
        fontSize:wp(4.4),
        fontWeight:'500'
    },
    text:{
        fontSize:wp(4),
        fontWeight:'400'
    }







});



