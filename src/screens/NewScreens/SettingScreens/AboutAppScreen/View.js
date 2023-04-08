
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StatusBar, Image, } from 'react-native';
import React from 'react';
//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader';
import colors from '../../../../../assets/colors';
import images from '../../../../../assets/images';
import Button from '../../../../Components/Button/Button';
import styles from "./Styles";

class AboutApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (

            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.appDarkBlue} translucent={false} />

                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>

                    <AppHeader
                        headerHeight='100%'
                        title={'ABOUT THE APP'}
                        titleFontSize={wp(5)}
                        leftIconPath={images.ic_back}
                        iconWidth={wp(5)}
                        lefticonSize={wp(5)}
                        onLeftIconPress={() => this.props.navigation.goBack()}

                    />

                </View>

                {/* //================================ Uper View ======================================// */}

                <View style={styles.uperView}>
                    <View style={styles.uperImageView}>
                        <Image
                            style={styles.imageStyles}
                            source={images.logo} />
                    </View>
                    <View style={styles.uperText1View}>
                        <Text style={styles.CopyrightTextStyle}>Version 1.00</Text>
                    </View>
                    {/*
                    <View style={styles.uperText2View}>
                        <Text style={styles.DeveloperTextStyle}>Copyright 2021 - NetworkAgainstCrime.com</Text>
                    </View>
                    <View style={styles.uperText3View}>
                        <Text style={styles.VersionTextStyle}>Developer Name Inc.</Text>
                    </View>
                    */}
                </View>

                {/* //================================ Text ======================================// */}

                <View style={styles.BottomTextView}>
                    <Text style={styles.MainTextStyle}>
                    Farm Sitting Services app that gets farm owners connected to people who can look out for their land and animals while they go on vacation or to deal with an emergency.
                    </Text>
                </View>

                {/* //================================ Button ======================================// */}

                <View style={styles.BottonView}>
                    <Button
                        height={wp(13)}
                        width={'90%'}
                        style={styles.buttonStyles}
                        title={'CONTACT US'}
                        bgColor={colors.AppRedColor}
                        titleColor={colors.dark_red}
                        titleStyle={[styles.titleStyles]}
                    />
                </View>
            </View>
        )
    }
}
export default AboutApp;
