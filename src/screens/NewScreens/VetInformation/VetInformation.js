//====> System files <====//

import {View,Text,FlatList,TouchableOpacity, Alert} from 'react-native';
import React from 'react';

//====> Local files <====//

import Dropdown from '../../../Components/ModalDropdown';
import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import styles from './style';
import AppInput from '../../../Components/Inputs/AppInput';
import Textarea from 'react-native-textarea';
import colors from '../../../../assets/colors';
import Button from '../../../Components/Button/Button';

var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';

export default class VetInformation extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            name: '',
            phone: '',
            email: '',
            username: '',
            note: '',
            isEditMode: false,
        }
    }

    componentDidMount() {
        this.fetchlinked()
    }

    fetchlinked() {
        const farm_id = this.props.route.params?.farm_id;
        const vet_id = this.props.route.params?.vet_id;

        const isEditMode = farm_id && vet_id;
        this.setState({isEditMode});

        if (!isEditMode)
            return;
        
        this.setState({ spinner: true });

        firestore()
            .collection('farms')
            .doc(farm_id)
            .collection('vets')
            .doc(vet_id)
            .get()
            .then((doc) => {
                const vet_data = doc.data();
                if (vet_data) {
                    this.setState({
                        name: vet_data.name,
                        phone: vet_data.phone,
                        email: vet_data.email,
                        username: vet_data.username,
                        note: vet_data.note,
                    });
                }
                this.setState({ spinner: false });
            }).catch(err => {
                console.log('#err:', err);
                this.setState({ spinner: false });
            });
    }

    clickDel() {
        const self = this;
        const farm_id = self.props.route.params?.farm_id;
        const vet_id = this.props.route.params?.vet_id;
        if (!farm_id || !vet_id || !this.state.isEditMode) {
            console.log('No farm or vet id');
            return;
        }
        Alert.alert(
            "Delete",
            "Are you sure to delete this vet?",
            [{
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },{
                text: "OK",
                onPress: () => {
                    firestore()
                        .collection(`farms`)
                        .doc(farm_id)
                        .collection(`vets`)
                        .doc(vet_id)
                        .delete().then(res => {
                            self.props.navigation.goBack();
                        });
                }
            }],
            { cancelable: false }
        );

    }

    clickAdd() {
        const self = this;
        const farm_id = this.props.route.params?.farm_id;
        const vet_id = this.props.route.params?.vet_id;
        if (!farm_id) {
            console.log('No farm');
            return;
        }

        const {name, phone, email, username, note, isEditMode} = this.state;

        if (!name || !phone || !email || !username ) {
            alert('Please fill informations!');
            return;
        }

        this.setState({ spinner: true });

        if (isEditMode) {
            firestore()
                .collection(`farms`)
                .doc(farm_id)
                .collection(`vets`)
                .doc(vet_id)
                .update({
                    name,
                    phone,
                    email,
                    username,
                    note
                })
                .then((snapshot) => {
                    console.log('# res:', snapshot);
                    self.setState({ spinner: false }, () => {
                        setTimeout(() => {
                            MessageBarManager.showAlert({
                                title: '',
                                message: 'Successfully updated!',
                                alertType: 'success'
                            });
                            self.props.navigation.goBack()
                        }, 100)
                    });
                })
                .catch(err => {
                    self.setState({ spinner: false });
                    setTimeout(() => {
                        alert("failed update vet! : " + JSON.stringify(err));
                    }, 100);
                });
            return;
        }

        firestore()
            .collection(`farms`)
            .doc(farm_id)
            .collection(`vets`)
            .add({
                name,
                phone,
                email,
                username,
                note
            })
            .then((snapshot) => {
                console.log('# res:', snapshot);
                self.setState({ spinner: false }, () => {
                    setTimeout(() => {
                        MessageBarManager.showAlert({
                            title: '',
                            message: 'Successfully created!',
                            alertType: 'success'
                        });
                        self.props.navigation.goBack()
                    }, 100)
                });
            })
            .catch(err => {
                self.setState({ spinner: false });
                setTimeout(() => {
                    alert("failed adding vet! : " + JSON.stringify(err));
                }, 100);
            });
    }

    render() {
        const {name, phone, email, username, note} = this.state;
        return(
            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>
                    <AppHeader title={this.state.isEditMode? 'Edit Vet Information' : 'Vet Information'}
                        // lefticonSize={20}
                        leftIconPath={images.ic_back}
                        rightIconOnePath={images.ic_sort_1}
                        onLeftIconPress={()=> this.props.navigation.goBack()}
                        onRightIconPress={()=> {
                            //this.props.navigation.navigate('EditVetInformation')
                        }}
                    />
                </View>

                {/*====> Container View <====*/}

                <View style={styles.bottomContainer}>

                    <View style={styles.inputsView}>
                        <AppInput
                            placeholder={'Veterinary Clinic Name'}
                            placeholderTextColor={colors.placeholder_color}
                            textInputColor={colors.deep_grey}
                            value={name}
                            onChangeText={value => this.setState({
                                name: value
                            })}
                            />
                        <AppInput
                            placeholder={'Phone Number'}
                            placeholderTextColor={colors.placeholder_color}
                            marginTop={1}
                            textInputColor={colors.deep_grey}
                            value={phone}
                            onChangeText={value => this.setState({
                                phone: value
                            })}
                            />
                        <AppInput
                            placeholder={'Email Address'}
                            placeholderTextColor={colors.placeholder_color}
                            marginTop={1}
                            textInputColor={colors.deep_grey}
                            value={email}
                            onChangeText={value => this.setState({
                                email: value
                            })}
                            />
                        <AppInput
                            placeholder={'Doctor\'s Name'}
                            placeholderTextColor={colors.placeholder_color}
                            marginTop={1}
                            textInputColor={colors.deep_grey}
                            value={username}
                            onChangeText={value => this.setState({
                                username: value
                            })}
                            />

                        <Textarea
                            containerStyle={styles.textArea}
                            placeholder={'Your notes to services providers'}
                            placeholderTextColor={colors.placeholder_color}
                            textInputColor={colors.deep_grey}
                            value={note}
                            onChangeText={value => this.setState({
                                note: value
                            })}
                            />


                    </View>

                    {/*====> Button View <====*/}

                    <View style={styles.btnView}>
                        {this.state.isEditMode &&
                            <Button title="Delete" bgColor="#cccccc" titleStyle={{color:colors.black}}  onPress={() => this.clickDel() }/>
                        }
                        <Button title={this.state.isEditMode? 'Save' : 'Add'} onPress={() => this.clickAdd() }/>
                    </View>

                </View>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Creating...'}
                    textStyle={{ color: 'white' }}
                />
            </View>

        );
    }
}




