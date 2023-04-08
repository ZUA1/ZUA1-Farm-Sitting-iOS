//====> System files <====//

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View,Text,Image,ImageBackground,TouchableOpacity} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

//====> Local files <====//

import Button from "../../Components/Button/Button";
import colors from "../../../assets/colors";
import images from "../../../assets/images";
import Swiper from 'react-native-swiper';
import styles from "./styles";



class OnBoarding extends React.Component{

//====> Constructor Method <====//

    constructor(props) {
        super(props);


        this.state={
            newIndex:1,
            currentIndex:0,
        }
    }

//====> OnChane Index Method <====//

    onIndexChanged(index){
        this.setState({ currentIndex: index});
    }


    //====> Scroll Method <====//
    async scrollItem(){
        if (this.state.currentIndex === 2){
            try {
                await AsyncStorage.setItem('welcome', 'true')
                this.props.navigation.navigate('SignupWith')
            } catch (e) {
                console.log(e)
            }
        } else {
            this.refs.swiper.scrollBy(1)
        }
    }



//====> Render Method <====//

    render()
    {
        return(

//====> ImageBackground  <====//

            <ImageBackground style={styles.mainContainer} source={images.bg_img}>

                {/*====> Swiper View <====*/}

                <View style={styles.upperView}>

                    <Swiper
                            showsButtons={false}
                            loop={false}
                            ref={'swiper'}
                            onIndexChanged={this.onIndexChanged.bind(this)}
                            activeDotColor={colors.white}
                            dotColor={colors.shadow_black}>

                        {/*====> Image View <====*/}

                        <View style={styles.slides}>

                            <View style={styles.imageView}>
                                <Image
                                    style={styles.imageStyles}
                                    source={images.logo}/>


                            </View>

                            {/*====> Info View <====*/}

                            <View style={styles.midView}>
                                <Text style={styles.textStyleWelcome}>Welcome to Farm Sitting Services!</Text>
                            </View>

                        </View>


                        {/*====> Image View <====*/}
                        <View style={styles.slides}>

                            <View style={styles.imageView}>
                                <Image
                                    style={styles.imageStyles}
                                    source={images.logo}/>


                            </View>

                            {/*====> Info View <====*/}

                            <View style={styles.midView}>

                                <Text style={styles.textStyleWelcome}>Welcome to Farm Sitting Services!</Text>

                            </View>
                        </View>

                        {/*====> Image View <====*/}

                        <View style={styles.slides}>

                            <View style={styles.imageView}>
                                <Image  style={styles.imageStyles} source={images.logo}/>
                            </View>

                            {/*====> Info View <====*/}

                            <View style={styles.midView}>

                                <Text style={styles.textStyleWelcome}>Welcome to Farm Sitting Services!</Text>

                            </View>
                        </View>


                    </Swiper>
                </View>

                {/*====> Button View <====*/}

                <View style={styles.lowerView}>
                    <Button
                       style={styles.btnStyle}
                       titleStyle={styles.titleBtn}
                       bgColor={colors.white}
                       onPress={()=> this.scrollItem()}
                       title={'Continue'}
                    />


                    {/*====> Button View <====*/}

                    <TouchableOpacity style={{width:wp('70%'), height:hp('7%'), alignItems:'center',marginTop:8}}
                                  onPress={() =>  this.props.navigation.navigate('SignupWith')}>
                    <Text style={{color: colors.white, fontSize: wp('4.1%'),
                        textDecorationLine: 'underline',}}>SKIP</Text>
                </TouchableOpacity>

            </View>

            </ImageBackground>
        )
    }
}


export default OnBoarding;
