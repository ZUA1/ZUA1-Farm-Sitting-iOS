//====> System files <====//

import {Image,ImageBackground} from 'react-native';
import React from 'react';

//====> Local files <====//

import styles from "./styles";
import images from "../../../assets/images";
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';


class SplashScreen extends React.Component {


//====> ComponentDidMount Method <====//

    componentDidMount() {

        setTimeout(async () => {
            try {
                const value = await AsyncStorage.getItem('welcome');
                if (value !== null) {
                    this.props.navigation.replace('SignupWith');
                    return;
                }
                /*
                if (this.props.user) {
                    this.props.navigation.navigate('drawer');
                } else {
                    this.props.navigation.navigate('OnBoarding');
                }
                */
                this.props.navigation.replace('drawer');
            } catch (e) {
                // error reading value
            }
        }, 1500);
    }


//====> Render Method <====//

    render()
    {
        return(

            //====> Image <====//
                  <Image style={styles.container} source={images.splash}/>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    profile: state.user.profile
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
