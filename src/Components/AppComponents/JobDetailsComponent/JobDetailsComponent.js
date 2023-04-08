import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,Platform,FlatList,ImageBackground,TouchableWithoutFeedback} from 'react-native';
import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors';
import Button from '../../Button/Button';

import moment from 'moment';



export default class JobDetailsComponent extends React.Component {






    render() {
        const job = this.props.data;
        return(
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.nameView}>
                        <View>
                            <Text style={styles.title}>{job.title}</Text>
                            <Text style={styles.price}>${job.cost}</Text>
                        </View>
                        {this.props.editView ?
                            <TouchableOpacity>
                                <Image style={styles.icon} source={images.ic_edit}/>
                            </TouchableOpacity>  : null
                        }

                        {job.poster ?
                            <View style={{paddingLeft:Platform.OS === 'ios' ? '4%' :0}}>
                                <Text>posted {moment(job.postDate).fromNow()}</Text>
                                <Text>by <Text style={{color:colors.app_ruby}}>{job.poster.name}</Text></Text>
                            </View> :null
                        }

                    </View>

                    <View style={styles.infoView}>
                            <View style={{paddingBottom: '5%'}}>
                                <Text numberOfLines={4} style={styles.text}>{job.note}</Text>
                            </View>
                    </View>

                    {job.photos && job.photos.length > 0 &&
                        <View style={styles.imageView}>
                            <View style={styles.innerViewImages}>
                            {job.photos.map((photo, i) => {
                                if (i > 2) return;
                                return <Image key={i} style={styles.img} source={{uri:photo}}/>
                            })}
                            </View>
                            {job.photos.length > 0 ?
                                <TouchableOpacity style={styles.viewEdit} onPress={() => {}}>
                                    <Text style={styles.viewAllText}>VIEW ALL...</Text>
                                </TouchableOpacity> : null
                            }
                        </View>
                    }
                    

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
        //height: Platform.OS === 'ios' ? hp(32):hp(38),
        //width:wp(100),
        // paddingLeft:'10%',
        alignSelf: 'stretch',
        borderRadius:wp(2),
        backgroundColor:colors.white,
        marginTop:12
    },
    nameView:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        //height:'28%',
        width:'100%',
        // backgroundColor:'green',
        paddingHorizontal:'5%',
        paddingVertical: '5%',
        // borderBottomWidth:1,
        // borderColor:colors.placeholder_color,
    },
    title:{
        fontSize:wp(4),
        fontWeight:'bold',
    },
    price:{
        fontSize:wp(4.7),
        fontWeight:'bold',
        color:colors.app_ruby,
        paddingTop:Platform.OS === 'ios' ? '2%':'1%'
    },
    viewAllText:{
        fontSize:wp(4),
        fontWeight:'bold',
        color:colors.app_ruby
    },
    infoView:{
        //height:'37%',
        //width:'100%',
        alignSelf: 'stretch',
        //backgroundColor:'orange',

        paddingHorizontal:'5%',
        paddingTop:Platform.OS === 'ios' ? '1%' : 0
    },
    imageView:{
        //height:'35%',
        //width:'100%',
        // backgroundColor:'yellow',
        paddingHorizontal:'5%',
        flexDirection:'row',
        alignItems:'center',
        //justifyContent:'flex-start'
    },

    img:{
        //height:'auto',
        width: wp(21),
        resizeMode:'cover',
        borderRadius:wp(1),
        marginRight:5,
        //backgroundColor:'red',
        // borderRadius:wp(2),
    },
    iconInfoView:{
        flexDirection:'row',
        alignItems: 'center',
        paddingTop:Platform.OS === 'ios' ? '1%' : '0.5%'
    },
    icon:{
        height:20,
        width:20,
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
    innerViewImages:{
        width: wp(70),
        height: hp(10),
        flexDirection:'row',
        //alignItems:'center',
        //alignSelf: 'stretch',
        paddingBottom: hp(2),
    },
    viewEdit:{
        //flexDirection:'row',
        //height:'100%',
        //width:'30%',
        //alignItems:'flex-end',
        //justifyContent:'flex-start',
        // paddingTop:'10%',
        //backgroundColor: 'green',
        alignSelf: 'flex-end',
        paddingBottom: hp(2),
    },
    detailText:{
        fontSize:wp(3.6),
        lineHeight:wp(4.5),
        paddingTop:'3%'
    }




});




