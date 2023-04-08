//====> System files <====//
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View,Text,FlatList,TouchableOpacity,Image,ScrollView, ActivityIndicator} from 'react-native';
import React from 'react';

//====> Local files <====//

import Dropdown from '../../../Components/ModalDropdown';
import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import styles from './style';
//import FarmInformationComponent from '../../../Components/AppComponents/FarmInformationComponent/FarmInformationComponent';
import FarmInfoComponent from '../../../Components/AppComponents/FarmInfoComponent/FarmInfoComponent';

import TabsComponent from '../../../Components/TabsComponent';
import CowImageComponent from '../../../Components/AppComponents/CowImageComponent/CowImageComponent';
import ReviewComponent from '../../../Components/AppComponents/ReviewComponent/ReviewComponent';

import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';

class MyProfile extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);
        this.state = {
            leftTab: true,
            rightTab: false,
            farmInformationView:true,
            reviewView:false,
            spinner: false,
            loading_review: true,
            listMessages: [],
            farm: {},
        }
    }


    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.fetchlinked();
            this.fetchReview();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.route.params?.user != this.props.route.params?.user) {
            this.forceUpdate();
            this.fetchlinked();
            this.fetchReview();
        }
    }

    fetchlinked(sItemType) {
        //this.setState({ spinner: true })
        const other_user = this.props.route.params?.user;
        const user_id = other_user ? other_user.key : this.props.user.uid;

        this.setState({
            farm: { ...this.state.farm, key: user_id }
        });

        if (!sItemType || sItemType == 'animal') {
            firestore()
                .collection('farms')
                .doc(user_id)
                .collection('animals')
                .onSnapshot((querySnapshot) => {
                    if (!querySnapshot) {
                        console.log('# querySnapshot:', querySnapshot);
                        return;
                    }
                    const animals = [];
                    querySnapshot.forEach(documentSnapshot => {
                        animals.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    });
                    console.log('#animals:', animals);
                    //this.setState({ animals});
                    this.setState({
                        farm: { ...this.state.farm, animals }
                    });
                });
        }

        if (!sItemType || sItemType == 'plant') {
            firestore()
                .collection('farms')
                .doc(user_id)
                .collection('plants')
                .onSnapshot((querySnapshot) => {
                    if (!querySnapshot) {
                        console.log('# querySnapshot:', querySnapshot);
                        return;
                    }
                    const plants = [];
                    querySnapshot.forEach(documentSnapshot => {
                        plants.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    });
                    console.log('#plants:', plants);
                    //this.setState({ plants});
                    this.setState({
                        farm: { ...this.state.farm, plants }
                    });
                });
        }

        if (!sItemType || sItemType == 'vet') {
            firestore()
                .collection('farms')
                .doc(user_id)
                .collection('vets')
                .onSnapshot((querySnapshot) => {
                    if (!querySnapshot) {
                        console.log('# querySnapshot:', querySnapshot);
                        return;
                    }
                    const vets = [];
                    querySnapshot.forEach(documentSnapshot => {
                        vets.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    });
                    console.log('#vets:', vets);
                    //this.setState({ vets});
                    this.setState({
                        farm: { ...this.state.farm, vets }
                    });
                });
        }

    }

    async fetchReview() {
        const other_user = this.props.route.params?.user;

        const profile = other_user ? other_user : this.props.profile;
        const user_id = other_user ? other_user.key : this.props.user.uid;

        //if (profile.type == 'seller') {
        //
        //}

        this.setState({
            loading_review: true,
        });

        const results = await firestore()
            .collection('jobs')
            .where('poster.id', '==', user_id)
            .where('status', '==', 'completed')
            .get()
            .catch(err => {});

        if (!results) {
            console.log('# no result:', results);
            return;
        }

        let messages = [];
        results.forEach(res => {
            const job =res.data();

            messages.push({
                ...job.buyer,
                ...job.review_from_buyer,
                job_id: job.id,
            });
        });

        console.log('# messages:', messages);
        this.setState({
            loading_review: false,
            listMessages: messages
        });

    }

//====> Images Method <====//

    messageComponent(item){
        return(
            <ReviewComponent
                avatar={item.avatar}
                name={item.name}
                date={item.postDate}
                text={item.note}
                // onPress={() => this.props.navigation.navigate('')}
            />
        )
    }




    render() {
        const other_user = this.props.route.params?.user;
        const profile = other_user ? other_user : this.props.profile;

        const {farm} = this.state;
        const isMyFarm = this.props.user?.uid == farm.key;
        
        return(
            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>
                    <AppHeader title={'My Profile'}
                               leftIconPath={images.ic_hamburger}
                               onLeftIconPress={()=> {
                                   //this.props.navigation.goBack()
                                   this.props.navigation.openDrawer();
                               }}
                               rightIconOnePath={images.ic_add_farm}
                               rightIconSize={28}
                               onRightIconPress={()=> this.props.navigation.navigate('FarmInformation', {id: this.state.farm.key})}
                    />
                </View>

                {/*====> Container View <====*/}

                <View style={styles.bottomContainer}>
                    <View style={styles.viewImage}>
                        <View style={{position:'relative'}}>
                            {profile && profile.avatar ?
                                <Image
                                    source={profile.avatar.uri ? profile.avatar : { uri: profile.avatar }}
                                    style={[styles.img, { resizeMode: 'cover' }]}
                                /> :
                                <Image source={images.user} style={styles.img} />
                            }
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('EditProfile')}
                                style={styles.editIconBtn}
                                >
                                <Image source={images.ic_edit_2} style={styles.editIconImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewText}>
                            <Text style={styles.userName}>
                                {profile.first_name || profile.last_name ? 
                                    `${(profile.first_name || '')} ${(profile.last_name || '')}` :
                                    `${(profile.displayName || ' - ')}`
                                }
                            </Text>
                            {/* <Text style={styles.userName}>55, Male</Text> */}
                            <Text style={styles.addressText}>{profile.address || 'No address'}</Text>
                        </View>
                    </View>

                    <View style={styles.viewInfo}>
                        <View style={styles.viewTabs}>
                            <TabsComponent
                                leftText={'Farm Information'}
                                rightText={'Ratings & Reviews'}
                                onLeftPress={() => this.setState({ leftTab: true, rightTab: false ,farmInformationView:true, reviewView:false})}
                                onRightPress={() => this.setState({ rightTab: true, leftTab: false,farmInformationView:false, reviewView:true })}
                            />
                        </View>

                        <View style={styles.viewContent}>

                            {this.state.reviewView &&
                                <View>
                                <View style={styles.reviewView}>
                                    <Text style={styles.titleReview}>Reviews</Text>
                                </View>
                                {this.state.loading_review ?
                                    <ActivityIndicator />
                                    :
                                    (this.state.listMessages?.length > 0 ?
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            data={this.state.listMessages}
                                            renderItem={({ item }) => this.messageComponent(item)}
                                            keyExtractor={item => '' + item.id}
                                        /> :
                                        <View style={styles.reviewView}>
                                            <Text>Nothing</Text>
                                        </View>
                                    )
                                }
                                </View>
                            }



                            {this.state.farmInformationView &&

                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1,paddingBottom:hp(5)}}>
                                
                                <FarmInfoComponent
                                    data={this.state.farm}
                                    navigation={this.props.navigation}
                                    addIcon={isMyFarm}
                                    editIcon={isMyFarm}
                                    deleteIcon={isMyFarm}
                                    onRefresh={(sItemType) => {this.fetchlinked(sItemType)}}
                                />

                            </ScrollView>
                            }

                        </View>

                    </View>



                            {profile?.seller_status ? (

                            <Text
                            style={{alignSelf:"center",marginBottom:30  , textTransform:"capitalize"}}
                            >Farm Approve Status : {profile.seller_status === "_pending" ? "pending" : profile.seller_status }</Text>
                            ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)

