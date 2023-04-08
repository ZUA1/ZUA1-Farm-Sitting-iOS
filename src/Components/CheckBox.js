import React from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,ImageBackground} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from "../../assets/images";
import colors from '../../assets/colors';

export default class CheckBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            radioButtonChecked: this.props.value || false
        }

    }

    onRadioPress() {
        if (this.state.radioButtonChecked){
            this.setState({radioButtonChecked:false})
        }else{
            this.setState({radioButtonChecked:true})
        }
        this.props.clicked && this.props.clicked(!this.state.radioButtonChecked);
    }

    render() {
        return(
            <View style={styles.mainContainer} >
                <View style={[styles.container,{marginTop:this.props.marginTop ,marginLeft:this.props.marginLeft,marginRight: this.props.marginRight}]}>

                    <TouchableOpacity onPress={()=>this.onRadioPress()} style={[styles.touchViewRadio,{height:this.props.height || wp(4),width:this.props.width ||wp(4),borderRadius: this.props.borderRadius || wp(0)}]}>
                        {this.state.radioButtonChecked &&   <Image style={styles.img} source={this.props.imgCheck ? images.checkbox_checked : images.checkbox_checked} />  }
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.text}>{this.props.checkTitle}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    mainContainer:{
        // justifyContent: 'center',
        // alignItems:'center',
        // backgroundColor:'green',
        // flex:1,

    },
    text: {
        color:colors.white,
        // fontFamily:'Montserrat-Regular'

    },
    container: {
        flexDirection:'row',
        alignItems: 'center',
        // backgroundColor: '#fff',
        // height:hp(10),
        // width:wp(10),
    },
    touchViewRadio: {
        height:wp(4.5),
        width:wp(4.5),
        // backgroundColor: '#fff',
        // borderRadius:wp(4.5),
        borderWidth:wp(0.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:wp(2),
        borderColor:colors.white
        // borderColor:colors.deep_grey,
    },
    innerTouchViewRadio:{
        backgroundColor: 'red',
        width:'80%',
        height:'80%',
        borderRadius:wp(5),
        margin:1,
    },
    img:{
        resizeMode:'contain',
        height:hp(5),
        width:wp(5),
        // borderRadius: wp(10),
        tintColor:colors.white,
    }



});


