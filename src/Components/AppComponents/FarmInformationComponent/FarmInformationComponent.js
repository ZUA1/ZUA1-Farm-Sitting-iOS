import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,Platform,FlatList,ImageBackground,TouchableWithoutFeedback} from 'react-native';
import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';
import Button from '../../Button/Button';





export default class FarmInformationComponent extends React.Component {






    render() {
        return(
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.nameView}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <TouchableOpacity>
                            <Image style={styles.icon} source={images.ic_up}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoView}>
                        {this.props.simpleInfoView ?
                            <View style={{height:'100%',}}>
                                <Text style={styles.textInfo}>{this.props.type}</Text>
                                <Text style={styles.textInfo}>{this.props.cattleName}</Text>
                                <Text style={styles.textInfo}>{this.props.age}</Text>
                                <Text style={styles.textInfo}>{this.props.provide}</Text>
                            </View>: null
                        }

                        {this.props.infoClinicView ?
                            <View style={{height:'100%',}}>
                                <Text style={styles.clinicText}>{this.props.clinicName}</Text>
                                <View style={styles.iconInfoView}>
                                    <Image style={styles.icon} source={images.phone}/>
                                    <Text>{this.props.phoneNumber}</Text>
                                </View>
                                <View style={styles.iconInfoView}>
                                    <Image style={styles.icon} source={images.mail}/>
                                    <Text>{this.props.email}</Text>
                                </View>
                                <View style={styles.iconInfoView}>
                                    <Image style={styles.icon} source={images.user}/>
                                    <Text>{this.props.userName}</Text>
                                </View>
                            </View> : null
                        }



                    </View>

                    <View style={styles.imageView}>
                        {this.props.imagesView ?
                            <View style={styles.mainViewImages}>
                                <View style={styles.innerViewImages}>
                                    <Image style={styles.img} source={this.props.imageOne}/>
                                    <Image style={styles.img} source={this.props.imageTwo}/>
                                </View>
                                <TouchableOpacity style={styles.viewEdit}>
                                    {this.props.addIcon ?
                                            <Image style={[styles.iconEdit,{marginRight:9}]} source={images.ic_add_2}/>

                                    : null
                                    }
                                    <TouchableOpacity onPress={this.props.onPressEdit}>
                                        <Image style={[styles.iconEdit,{marginRight:9}]} source={images.ic_edit}/>
                                    </TouchableOpacity>

                                    {this.props.deleteIcon ?

                                    <Image style={styles.iconEdit} source={images.ic_delete}/>
                                        : null
                                    }
                                </TouchableOpacity>

                            </View> : null
                        }
                        {this.props.textDetailView ?
                            <View style={{height:'100%',}}>
                                <Text style={styles.detailText}>{this.props.text}</Text>
                            </View> : null
                        }

                    </View>

                </View>
            </View>

        );
    }
}




const styles= StyleSheet.create({
    mainContainer:{
        // flex:1,
        alignItems:'center',
        // backgroundColor:colors.black,
        // justifyContent: 'center',
        // paddingHorizontal:'2%'
    },
    container:{
        height: Platform.OS === 'ios' ? hp(30):hp(37),
        width:wp(90),
        // paddingLeft:'10%',
        borderRadius:wp(2),
        backgroundColor:colors.white,
        marginTop:12
    },
    nameView:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        height:'28%',
        width:'100%',
        // backgroundColor:'green',
        paddingHorizontal:'5%',
        borderBottomWidth:1,
        borderColor:colors.placeholder_color,
    },
    title:{
        fontSize:wp(4),
        fontWeight:'bold',
    },
    infoView:{
        height:'37%',
        width:'100%',
        // backgroundColor:'orange',
        paddingHorizontal:'5%',
        paddingTop:Platform.OS === 'ios' ? '1%' : 0
    },
    imageView:{
        height:'35%',
        width:'100%',
        // backgroundColor:'yellow',
        paddingHorizontal:'5%',
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'space-between'
    },

    img:{
        height:'80%',
        width:95,
        resizeMode:'contain',
        borderRadius:wp(1),
        marginRight:5
        // backgroundColor:'red'
        // borderRadius:wp(2),
    },
    iconInfoView:{
        flexDirection:'row',
        alignItems: 'center',
        paddingTop:Platform.OS === 'ios' ? '1%' : '0.5%'
    },
    icon:{
        height:16,
        width:16,
        resizeMode:'contain',
        marginRight:7
    },
    iconEdit:{
        height:19,
        width:19,
        resizeMode:'contain',
    },
    textInfo:{
        fontSize:wp(4),
        paddingTop:Platform.OS === 'ios' ? 0.5 : 0
    },
    clinicText:{
        fontSize:wp(3.7),
        fontWeight: '500',
        paddingTop:'1%',
    },
    mainViewImages:{
        height:'100%',
        width:'100%',
        flexDirection:'row',
    },
    innerViewImages:{
        height:'100%',
        width:'75%',
        flexDirection:'row',
        alignItems:'center'
    },
    viewEdit:{
        flexDirection:'row',
        height:'100%',
        width:'25%',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        // paddingTop:'10%',
        // backgroundColor: 'green',
        paddingBottom:'4%'
    },
    detailText:{
        fontSize:wp(3.6),
        lineHeight:wp(4.5),
        paddingTop:'3%'
    }




});




