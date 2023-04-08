//====> System files <====//
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Alert, View,Text,FlatList,TouchableOpacity,Image} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';
import Spinner from 'react-native-loading-spinner-overlay';
//====> Local files <====//

import Dropdown from '../../../Components/ModalDropdown';
import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import styles from './style';
import AppInput from '../../../Components/Inputs/AppInput';
import Textarea from 'react-native-textarea';
import colors from '../../../../assets/colors';
import Button from '../../../Components/Button/Button';
//import CowImageComponent from '../../../Components/AppComponents/CowImageComponent/CowImageComponent';

import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { sendPushNotification } from '../../../utils/firebase';
import { ScrollView } from 'react-native-gesture-handler';

class ConfirmDelivery extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            photos: [],
        }
    }

    async onConfirm() {
        const self = this;
        const job = this.props.route.params?.job;
        const { photos } = this.state;

        if (!job || job.status != 'ongoing') {
            console.log('invalid job');
            return;
        }
        if (!photos || photos.length < 1) {
            alert('Please add photo!');
            return;
        }

        console.log('# stripe_account: ', this.props.profile.stripe_account);
        if (!this.props.profile.stripe_account) {
            alert('Please setup the payment!');
            self.props.navigation.navigate('PaymentsBalance');
            return;
        }

        let new_photos = [];
        for (let p of photos) {
            if (p && p.uri) try {
                const fname = '' + Date.now() + '_' + makeid(12);
                const ext = p.uri.split('.').pop();
                const reference = storage().ref('farm/reviews/' + fname + '.' + ext);
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

        Alert.alert(
            "Confirm",
            "Are you sure to complete this job?",
            [{
                text: "Cancel",
                onPress: () => { },
                style: "cancel"
            },{
                text: "OK",
                onPress: () => {
                    self.setState({spinner: true});
                    firestore()
                    .collection(`jobs`)
                    .doc(job.key)
                    .update({
                        status: 'confirm', 
                        confirm: {
                            photos: new_photos,
                            confirmDate: new Date().valueOf()
                        },
                    })
                    .then(res => {
                        //self.props.navigation.navigate('RateClient');
                        const buyer_name = job.buyer?.name ? job.buyer.name : 'Someone';
                        const msg = buyer_name + ' completed the job.';
                        sendPushNotification(job.poster?.id, 'Job completed!', msg, {job_id: job.key});
                        setTimeout(() => {
                            self.props.navigation.navigate('Transaction', {job_id: job.key});
                        }, 100);
                    })
                    .catch(err => {
                        this.setState({ spinner: false });
                        setTimeout(() => {
                            alert("failed ! : " + JSON.stringify(err));
                        }, 100);
                    });
                }
            }],
            { cancelable: false }
        );
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

    render() {
        const job = this.props.route.params?.job;

        return(
            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>
                    <AppHeader title={'Confirm Delivery'}
                               leftIconPath={images.ic_back}
                               onLeftIconPress={()=> this.props.navigation.goBack()}
                               rightIconOnePath={images.ic_sort_1}
                        // onRightIconPress={()=> this.props.navigation.navigate('SearchScreen')}
                    />
                </View>

                {/*====> Container View <====*/}

                <View style={styles.bottomContainer}>

                    <View style={styles.imageView}>
                        <Image style={styles.img} source={{uri: job?.poster?.avatar}}/>
                        <Text style={styles.name}>{job?.poster?.name}</Text>
                        <View style={styles.usersView}>
                            <Image style={styles.icon} source={images.ic_maker}/>
                            <Text style={styles.titleAddress}>{job?.address}</Text>
                        </View>

                        <Text style={styles.text}>Note: When you confirm orders are delivered. please post images for proof and we will wait for 72 hours for client to confirm.</Text>

                    </View>

                    <View style={styles.addPhotoView}>

                        {this.state.photos && this.state.photos.length > 0 ?
                            <View style={styles.innerAddPhotoView}>
                                <ScrollView
                                    style={{maxWidth:'100%', backgroundColor:colors.white, borderRadius:wp(2)}}
                                    contentContainerStyle={styles.photosView}
                                    horizontal
                                >
                                    {this.state.photos.map((photo, i) => {
                                        const photo_src = (photo && photo.uri)? photo : {uri:photo};
                                        return <Image key={i} style={{width:wp(20), height: wp(20), resizeMode:'cover', margin: wp(2)}} source={photo_src}/>
                                    })}
                                </ScrollView>
                                <TouchableOpacity style={styles.addBtn} onPress={() => this.selectPhoto()}
                                >
                                    <Image style={styles.addImage} source={images.ic_add}/>
                                    <Text style={styles.addPhotoText}>Add Photo</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity style={styles.innerAddPhotoView} onPress={() => this.selectPhoto()}>
                                <Image style={styles.addImage} source={images.ic_add}/>
                                <Text style={styles.addPhotoText}>Add Photo</Text>
                            </TouchableOpacity>
                        }

                    </View>

                    <View style={styles.btnView}>

                        <Button  title={'Confirm Job Completion'} onPress={() => this.onConfirm()}/>

                    </View>

                </View>

                <Spinner
                    visible={this.state.spinner}
                    textStyle={{ color: 'white' }}
                />

            </View>

        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    profile: state.user.profile
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDelivery)

