
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StatusBar } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../Components/AppHeader';
import colors from '../../../../../assets/colors';
import images from '../../../../../assets/images';
import Button from '../../../../Components/Button/Button';
import AppInput from '../../../../Components/Inputs/AppInput';
import styles from './Styles'

import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

class SendFeedback extends React.Component {

    state = {
        name: '',
        email: '',
        subject: '',
        message: ''
    }

    submit() {
        const { name, email, subject, message } = this.state
        if (name && name.length > 0 && email && email.length && subject && subject.length > 0 && message && message.length) {
            this.setState({ spinner: true })
            var self = this;
            firestore()
                .collection('feedbacks')
                .add({
                    name, email, subject, message, createdat: Date.now(), createdby: this.props.user.uid
                })
                .then(() => {
                    self.setState({ spinner: false }, () => {
                        setTimeout(() => {
                            MessageBarManager.showAlert({
                                title: '',
                                message: 'Successfully sent!',
                                alertType: 'success'
                            });
                            self.props.navigation.goBack()
                        }, 100)
                    })
                });
        } else alert('please fill out this form.')
    }

    render() {
        const { name, email, subject, message } = this.state;
        return (
            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.appDarkBlue} translucent={false} />
                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>

                    <AppHeader
                        title={'Send Feedback'}
                        leftIconPath={images.ic_back}
                        iconWidth={wp(5)}
                        lefticonSize={wp(5)}
                        onLeftIconPress={() => this.props.navigation.goBack()}

                    />

                </View>
                {/* //================================ Middle Container ======================================// */}
                <View style={styles.middleView}>
                    <View style={styles.NameView}>
                        <AppInput
                            height={hp(8)}
                            placeholder={'Name'}
                            width={'100%'}
                            textInputColor={colors.black}
                            placeholderTextColor={colors.dark_grey}
                            backgroundColor={"#E6E6E6"}
                            value={name}
                            onChangeText={value => this.setState({ name: value })}
                        />

                    </View>
                    <View style={styles.EmailView}>
                        <AppInput
                            height={hp(8)}
                            placeholder={'Email Address'}
                            width={'100%'}
                            textInputColor={colors.black}
                            placeholderTextColor={colors.dark_grey}
                            backgroundColor={"#E6E6E6"}
                            value={email}
                            onChangeText={value => this.setState({ email: value })}
                        />
                    </View>
                    <View style={styles.SubjectView}>
                        <AppInput
                            height={hp(8)}
                            placeholder={'Subject/Comments'}
                            width={'100%'}
                            textInputColor={colors.black}
                            placeholderTextColor={colors.dark_grey}
                            backgroundColor={"#E6E6E6"}
                            value={subject}
                            onChangeText={value => this.setState({ subject: value })}
                        />

                    </View>
                    <View style={styles.MessageView}>
                        <AppInput
                            height={hp(15)}
                            placeholder={'Message'}
                            width={'100%'}
                            multiline={true}
                            textAlignVertical="top"
                            textInputColor={colors.black}
                            placeholderTextColor={colors.dark_grey}
                            backgroundColor={"#E6E6E6"}
                            value={message}
                            onChangeText={value => this.setState({ message: value })}
                        />
                    </View>
                    {/*
                    <View style={styles.CharacterView}>
                        <Text style={styles.CharacterStyle}>5000 Remaining Characters</Text>
                    </View>
                    */}
                </View>
                {/* //================================ Buttons ======================================// */}
                <View style={styles.LastView}>
                    <View style={styles.uploadButtonView}>
                        {/* <Button
                            height={hp(8)}
                            width={'90%'}
                            style={styles.buttonStyles}
                            title={'UPLOAD ATTACHMENTS'}
                            bgColor={colors.AppRedColor}
                            titleColor={colors.dark_red}
                            titleStyle={[styles.titleStyles]}
                        /> */}
                    </View>
                    <View style={styles.saveButtonView}>
                        <Button
                            width={'90%'}
                            style={styles.buttonStyles}
                            title={'Send'}
                            titleStyle={[styles.titleStyles]}
                            onPress={() => this.submit()}
                        />
                    </View>
                </View>
                <Spinner
                    visible={this.state.spinner}
                    textStyle={{ color: 'white' }}
                />
            </View>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user.user,
    profile: state.user.profile
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps) (SendFeedback);
