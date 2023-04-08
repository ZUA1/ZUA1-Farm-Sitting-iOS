//====> System files <====//

import {View,Text,FlatList,TouchableOpacity, Alert, ScrollView, Image} from 'react-native';
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
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { makeid } from '../../../utils/utils';
export default class AddPlant extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            name: '',
            kind: '',
            note: '',
            photos: [],
            isEditMode: false,
        }
    }

    componentDidMount() {
        this.fetchlinked()
    }

    fetchlinked() {
        const farm_id = this.props.route.params?.farm_id;
        const plant_id = this.props.route.params?.plant_id;

        const isEditMode = farm_id && plant_id;
        this.setState({isEditMode});

        if (!isEditMode)
            return;
        
        this.setState({ spinner: true });

        firestore()
            .collection('farms')
            .doc(farm_id)
            .collection('plants')
            .doc(plant_id)
            .get()
            .then((doc) => {
                const plant_data = doc.data();
                if (plant_data) {
                    this.setState({
                        name: plant_data.name,
                        kind: plant_data.kind,
                        note: plant_data.note,
                        photos: plant_data.photos
                    });
                }
                this.setState({ spinner: false });
            }).catch(err => {
                console.log('#err:', err);
                this.setState({ spinner: false });
            });
    }

    selectPhoto = () => {
        ActionSheet.showActionSheetWithOptions(
          {
            options: [
              'Take Photo...',
              'Choose From Library...',
              'Cancel'
            ],
            cancelButtonIndex: 2,
            destructiveButtonIndex: 0,
            tintColor: 'black',
          },
          index => {
            switch (index) {
              case 0: {
                ImagePicker.openCamera({
                  width: 300,
                  height: 300,
                  cropping: false,
                  mediaType: 'photo',
                  cropperCircleOverlay: false,
                }).then(image => {
                  //this.updateFormField('avatar', { uri: image.path })
                  console.log('# selected image 0:', image);
                  const { photos } = this.state;
                  this.setState({ photos: [ ...photos, { uri: image.path }]});
                }).catch(err => {
                    console.log('# select image err:', err);
                });
                break;
              }
              case 1: {
                ImagePicker.openPicker({
                  width: 300,
                  height: 300,
                  cropping: false,
                  cropperCircleOverlay: false,
                  mediaType: 'photo',
                }).then(image => {
                  //this.updateFormField('avatar', { uri: image.path })
                  console.log('# selected image 1:', image);
                  const { photos } = this.state;
                  this.setState({ photos: [ ...photos, { uri: image.path }]});
                }).catch(err => {
                    console.log('# select image err:', err);
                });
                break;
              }
            }
          },
        );
    }

    clickDel() {
        const self = this;
        const farm_id = self.props.route.params?.farm_id;
        const plant_id = self.props.route.params?.plant_id;
        if (!farm_id || !plant_id || !this.state.isEditMode) {
            console.log('No farm or plant id');
            return;
        }
        Alert.alert(
            "Delete",
            "Are you sure to delete this plant?",
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
                        .collection(`plants`)
                        .doc(plant_id)
                        .delete().then(res => {
                            self.props.navigation.goBack();
                        });
                }
            }],
            { cancelable: false }
        );

    }

    async clickAdd() {
        const self = this;
        const farm_id = this.props.route.params?.farm_id;
        const plant_id = this.props.route.params?.plant_id;
        if (!farm_id) {
            console.log('No farm');
            return;
        }

        const {name, kind, note, photos, isEditMode} = this.state;
        if (!name || !note || !kind) {
            alert('Please fill informations!');
            return;
        }

        this.setState({ spinner: true });

        let new_photos = [];
        for (let p of photos) {
            if (p && p.uri) try {
                const fname = '' + Date.now() + '_' + makeid(12);
                const ext = p.uri.split('.').pop();
                const reference = storage().ref('farm/plants/' + fname + '.' + ext);
                const resp_image = await reference.putFile(p.uri);
                let new_url = await reference.getDownloadURL();
                new_photos.push(new_url);
                continue;
            } catch {
                err => {
                  console.log("# photo upload err", err);
                }
            }
            new_photos.push(p);
        }

        console.log('# new photos:', new_photos);

        if (isEditMode) {
            firestore()
                .collection(`farms`)
                .doc(farm_id)
                .collection(`plants`)
                .doc(plant_id)
                .update({
                    name,
                    kind,
                    note,
                    photos: new_photos
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
                        alert("failed update plant! : " + JSON.stringify(err));
                    }, 100);
                });
            return;
        }

        firestore()
            .collection(`farms`)
            .doc(farm_id)
            .collection(`plants`)
            .add({
                name,
                kind,
                note,
                photos: new_photos
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
                    alert("failed adding plant! : " + JSON.stringify(err));
                }, 100);
            });
        
        
    }

    render() {
        const {name, kind, note, photos} = this.state;
        return(
            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>
                    <AppHeader title={this.state.isEditMode? 'Edit Plant' : 'Add Plant'}
                        // lefticonSize={20}
                               leftIconPath={images.ic_back}
                               rightIconOnePath={images.ic_sort_1}
                               onLeftIconPress={()=> this.props.navigation.goBack()}
                        // onRightIconPress={()=> this.props.navigation.navigate('SearchScreen')}
                    />
                </View>

                {/*====> Container View <====*/}

                <View style={styles.bottomContainer}>

                    <View style={styles.inputsView}>
                        <AppInput
                            placeholder={'Name'}
                            placeholderTextColor={colors.placeholder_color}
                            textInputColor={colors.deep_grey}
                            value={name}
                            onChangeText={value => this.setState({name: value})}
                            />
                        <AppInput
                            placeholder={'Classification'}
                            placeholderTextColor={colors.placeholder_color}
                            textInputColor={colors.deep_grey}
                            value={kind}
                            onChangeText={value => this.setState({kind: value})}
                            marginTop={1}
                            />
                        <Textarea
                            containerStyle={styles.textArea}
                            placeholder={'Notes'}
                            placeholderTextColor={colors.placeholder_color}
                            textInputColor={colors.deep_grey}
                            value={note}
                            onChangeText={value => this.setState({ note: value })}
                            />

                        {photos && photos.length > 0 ?
                            <View style={styles.photoReferenceView}>
                                <ScrollView
                                    //style={{flex:1, width:'100%', alignSelf:'stretch'}}
                                    contentContainerStyle={{alignSelf:'stretch', minHeight:95}}
                                    horizontal
                                    >
                                {photos.map((photo, i) => {
                                    const photo_src = (photo && photo.uri)? photo : {uri:photo};
                                    return <Image key={i} style={styles.img} source={photo_src}/>
                                })}
                                </ScrollView>
                                <Button
                                    title={'+'}
                                    style={{width:60, position:'absolute', right: 5, bottom: 25}}
                                    bgColor={colors.app_dark_grey}
                                    onPress={() => this.selectPhoto()}
                                    />
                            </View> :
                            <View style={styles.photoReferenceView}>
                                <Text style={styles.photoText}>Photo Reference</Text>
                                <Button title={'Upload'} style={styles.uploadBtn} bgColor={colors.app_ruby} onPress={() => this.selectPhoto()}/>
                            </View>
                        }

                    </View>

                    {/*====> Button View <====*/}

                    <View style={styles.btnView}>
                        {this.state.isEditMode &&
                            <Button title="Delete" bgColor="#cccccc" titleStyle={{color:colors.black}}  onPress={() => this.clickDel() }/>
                        }
                        <Button title={this.state.isEditMode? 'Save' : 'Add'} onPress={() => this.clickAdd()} />
                    </View>

                </View>

                <Spinner
                    visible={this.state.spinner}
                    textContent={'Wait...'}
                    textStyle={{ color: 'white' }}
                />
            </View>

        );
    }
}




