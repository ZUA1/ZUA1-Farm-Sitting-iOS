//====> System files <====//
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert, View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import moment from 'moment';
//====> Local files <====//

import Dropdown from '../../../Components/ModalDropdown';
import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import styles from './style';
import AppInput from '../../../Components/Inputs/AppInput';
import Textarea from 'react-native-textarea';
import colors from '../../../../assets/colors';
import Button from '../../../Components/Button/Button';
import CowImageComponent from '../../../Components/AppComponents/CowImageComponent/CowImageComponent';
import FarmInfoComponent from '../../../Components/AppComponents/FarmInfoComponent/FarmInfoComponent';
import JobDetailsComponent from '../../../Components/AppComponents/JobDetailsComponent/JobDetailsComponent';

import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';

class JobDetails extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,

            //farm: {},
            animals: [],
            plants: [],
            vets: []
        }
    }

    componentDidMount() {
        this.fetchlinked();
    }

    fetchlinked() {
        //this.setState({ spinner: true })
        const job = this.props.route.params?.job;

        if (!job?.poster) {
            console.log('# wrong paramter');
            return;
        }
        const poster_id = job.poster.id;
        
        
        

        firestore()
            .collection('farms')
            .doc(poster_id)
            .collection('animals')
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot) {
                    console.log('# querySnapshot:', querySnapshot);
                    return;
                }
                let animals = [];
                querySnapshot.forEach(documentSnapshot => {
                    animals.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                console.log('#animals:', animals);
                this.setState({ animals});
            });

        firestore()
            .collection('farms')
            .doc(poster_id)
            .collection('plants')
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot) {
                    console.log('# querySnapshot:', querySnapshot);
                    return;
                }
                let plants = [];
                querySnapshot.forEach(documentSnapshot => {
                    plants.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                console.log('#plants:', plants);
                this.setState({ plants});
            });

        firestore()
            .collection('farms')
            .doc(poster_id)
            .collection('vets')
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot) {
                    console.log('# querySnapshot:', querySnapshot);
                    return;
                }
                let vets = [];
                querySnapshot.forEach(documentSnapshot => {
                    vets.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                console.log('#vets:', vets);
                this.setState({ vets});
            });
    }

    onAccept() {
        const self = this;

        const job = this.props.route.params?.job;
        const user_id = this.props.user?.uid;
        const profile = this.props.profile;

        if (!user_id || !profile || !job) {
            console.log('#invalid parameter');
            //self.props.navigation.pop();
            self.props.navigation.replace('SignupWith');
            return;
        }

        if(job.status != 'waiting') {
            console.log('#invalid job');
            return;
        }

        Alert.alert(
            "Confirm",
            "Are you sure to join this job?",
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
                        status: 'ongoing', 
                        buyer: {
                            id: user_id,
                            name: profile.name,
                            avatar: profile.avatar
                        }
                    })
                    .then(res => {
                        self.props.navigation.navigate('Transaction', {job_id: job.key});
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

    render() {
        const job = this.props.route.params?.job;
        const isMyFarm = this.props.user?.uid == job.poster?.id;

        return (
            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>
                    <AppHeader title={'Job Details'}
                        leftIconPath={images.ic_back}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                        rightIconOnePath={images.ic_sort_1}
                    // onRightIconPress={()=> this.props.navigation.navigate('SearchScreen')}
                    />
                </View>

                {/*====> Container View <====*/}

                <View style={styles.bottomContainer}>
                    {!job ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Invalid Job!</Text>
                        </View>
                        :
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(5) }}>

                            <JobDetailsComponent data={job}/>

                            <View style={styles.locationView}>
                                <View style={styles.addressView}>
                                    <Image style={styles.icon} source={images.ic_maker} />
                                    <Text style={styles.titleAddress}>{job.address}</Text>
                                </View>

                                <View style={styles.dateView}>
                                    <View style={styles.startDateView}>
                                        <Text>Start Date: </Text>
                                        <Text style={styles.dateText}>{moment(job.startDate).utc().format('Do MMMM / YYYY, HH:00 UTC')}</Text>
                                    </View>
                                    <View style={[styles.startDateView, { paddingTop: '1%' }]}>
                                        <Text>End Date: </Text>
                                        <Text style={styles.dateText}>{moment(job.endDate).utc().format('Do MMMM / YYYY, HH:00 UTC')}</Text>
                                    </View>
                                </View>
                            </View>

                            <FarmInfoComponent
                                data={{
                                    key: this.props.route.params?.id,
                                    animals: this.state.animals,
                                    plants: this.state.plants,
                                    vets: this.state.vets
                                }}
                                navigation={this.props.navigation}
                                addIcon={isMyFarm}
                                editIcon={isMyFarm}
                                deleteIcon={isMyFarm}
                            />

                            <View style={styles.btnView}>
                                <Button
                                    title={'Directions'}
                                    onPress={() => {
                                        this.props.navigation.navigate('Directions', {job: job});
                                    }}
                                />
                                <Button bgColor={colors.app_green} title={'Accept Job'} onPress={() => this.onAccept()} />
                            </View>

                        </ScrollView>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails)



