
//================================ React Native Imported Files ======================================//

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, FlatList, StatusBar, Image, Text, TouchableOpacity, Modal } from 'react-native';
import React from 'react';

//================================ Local Imported Files ======================================//

import SettingsItem from '../../../../Components/AppComponents/SettingsItem/SettingItem';
import AppHeader from '../../../../Components/AppHeader';
import RateApp from '../../../../Components/RateModel/RateApp';


import styles from "./Styles";
import colors from '../../../../../assets/colors';
import images from '../../../../../assets/images';

import auth from '@react-native-firebase/auth';
import { updateUser, updateUserProfile } from '../../../../reducers/user';
import { store } from '../../../../../App';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            //================================ Data array ======================================//
            Data: [
                // {
                //     id: 1,
                //     title: 'Notifications',
                //     firstIcon: images.ic_bell,
                //     toggleSwitchButton: true,
                //     leftIconColor: colors.AppRedColor,
                // },

                {
                    id: 0,
                    title: 'Share the App to Social Media',
                    firstIcon: images.ic_share,
                    secondIcon: images.ic_right,
                    leftIconColor: colors.AppRedColor,
                    requireLogin: false,
                },
                {
                    id: 1,
                    title: "Setup Payment",
                    firstIcon: images.ic_payments,
                    // secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,
                    requireLogin: true,
                },
                {
                    id: 2,
                    title: 'Rate App',
                    firstIcon: images.ic_rate,
                    leftIconColor: colors.AppRedColor,
                    requireLogin: false,
                },

                {
                    id: 3,
                    title: 'Send Feedback',
                    firstIcon: images.ic_feedback,
                    leftIconColor: colors.AppRedColor,
                    requireLogin: false,
                },
                {
                    id: 4,
                    title: 'About the App',
                    firstIcon: images.ic_about,
                    // secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,
                    requireLogin: false,
                },
                {
                    id: 5,
                    title: 'Privacy Policy',
                    firstIcon: images.ic_privacy,
                    secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,
                    requireLogin: false,
                },
                {
                    id: 6,
                    title: 'Terms And Conditions',
                    firstIcon: images.ic_terms,
                    secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,
                    requireLogin: false,
                },
                {
                    id: 7,
                    title: 'Logout',
                    firstIcon: images.ic_logout,
                    secondIcon: images.ic_chevron_right,
                    leftIconColor: colors.AppRedColor,
                    requireLogin: true,
                },
            ]
        }
    }

    //================================ Model Functions ======================================//

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };

    inVisible() {
        this.setState({ modalVisible: false })
    }

    onClickListItem(id) {
        switch (id) {
            case 0:
                //this.props.navigation.navigate('AttachDocumentScreen');
                break;

            case 1:
                this.props.navigation.navigate('PaymentsBalance');
                break;

            case 2:
                this.setModalVisible(true);
                break;

            case 3:
                this.props.navigation.navigate('SendFeedback');
                break;

            case 4:
                this.props.navigation.navigate('AboutAppScreen');
                break;

            case 5:
                this.props.navigation.navigate('PrivacyScreen');
                break;
            case 6:
                this.props.navigation.navigate('TermsAndCondtions');
                break;
            case 7:
                if (!this.props.user) {
                    this.props.navigation.navigate('SignupWith');
                } else {
                    try {
                        auth()
                            .signOut()
                            .then(() => {
                                store.dispatch(updateUser())
                                props.navigation.dispatch(
                                    CommonActions.reset({
                                        index: 1,
                                        routes: [
                                            { name: 'SignupWith' },
                                            {
                                                name: 'SignupWith',
                                            },
                                        ],
                                    })
                                );
                                console.log('User signed out!')
                            }).catch(e => {
                                store.dispatch(updateUser())
                            });
                    } catch (e) {
                        store.dispatch(updateUser())
                        return
                    }
                }
                break;
        }
    }
    //================================ Setting Item Function ======================================//
    list(item) {

        if (item.requireLogin && !this.props.user) {
            if (item.title == 'Logout') {
                item.title = 'Login';
            } else {
                return;
            }
        }

        return (
            <SettingsItem
                onPress={() => {
                    this.onClickListItem(item.id)
                }}
                upperText={item.title}
                leftIconImage={item.firstIcon}
                arrowImage={item.secondIcon}
                switchItem={item.switchItem}
                rightIconColor={colors.placeholder_color}
                rightIconSize={wp(3.5)}
                leftIconSize={wp(3.5)}
                height={hp(9)}
                backgroundColor={'rgba(255, 255, 255, 0.6)'}
                leftIconColor={item.color}
                textColor={item.color}
                toggleSwitchButton={item.toggleSwitchButton}
            />
        )
    }
    render() {
        const { modalVisible } = this.state;
        return (
            <View style={styles.mainContainer}>
                {/* //================================ StatusBar ======================================// */}

                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.appDarkBlue} translucent={false} />
                {/* //================================ Header ======================================// */}
                <View style={styles.headerView}>
                    <AppHeader
                        headerHeight='100%'
                        // leftText={'left'}
                        leftIconPath={images.ic_hamburger}
                        lefticonSize={wp(5)}
                        title={'Settings'}
                        titleFontSize={wp(6)}
                        onLeftIconPress={() => this.props.navigation.openDrawer()}
                    />
                </View>
                {/* //================================ FlatList ======================================// */}
                <View style={styles.container}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={this.state.Data}
                        renderItem={({ item }) => this.list(item)}
                        keyExtractor={item => '' + item.id}
                    />

                </View>
                {/* //================================ Model ======================================// */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!modalVisible);
                    }}>
                    <RateApp
                        onPressLater={() => {
                            this.setModalVisible(!modalVisible)
                        }}
                    />
                </Modal>
                {/* //================================ Logout ======================================// */}
                {/* <TouchableOpacity style={styles.logout}
                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                >
                    <Image
                        style={styles.logoutIcon}
                        source={images.ic_logout_settings}
                    />
                    <Text style={[styles.textStyle, {
                        color: colors.white
                    }]}>Log Out</Text>

                </TouchableOpacity> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)