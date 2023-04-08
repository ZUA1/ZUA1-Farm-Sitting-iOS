//====> System files <====//
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Alert, View,Text,FlatList,TouchableOpacity,Image,ScrollView} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import React from 'react';
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
import CowImageComponent from '../../../Components/AppComponents/CowImageComponent/CowImageComponent';

import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { getBalanceTransaction, getPayment  } from '../../../utils/api';

class RateClient extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,

            person: null,
            percent: 0,
            review_count: 0,
            avg_rate: 0,

            rate: 0,
            note: '',
        }
    }

    componentDidMount() {
        this.fetchPersonInfo();
    }

    fetchPersonInfo() {
        const self = this;

        const job = this.props.route.params?.job;
        const isSeller = this.props.route.params?.isSeller;
        const userobj = isSeller ? job?.buyer : job?.poster;

        if (!userobj?.id) {
            alert('Invalid access');
            return;
        }
        this.setState({ spinner: true });
        firestore()
            .collection(`users`)
            .doc(userobj.id)
            .get()
            .then((doc) => {
                if (doc) {
                    const user_data = doc.data();
                    const review_obj = isSeller? user_data.review_as_buyer : user_data.review_as_seller;
                    let avg_rate = 0;
                    let review_count = 0;
                    let percent = 0;
                    if (isSeller && review_obj) {
                        avg_rate = review_obj.avgrate;
                        review_count = review_obj.reviewed;
                        percent = review_obj.completed * 100 / (review_obj.completed + review_obj.canceled);
                    }
                    this.setState({
                        spinner: false,
                        person: {...user_data, id: userobj.id},
                        avg_rate: avg_rate,
                        review_count: review_count,
                        percent: percent,
                    });
                } else {
                    alert('Not found user : ' + user.name);
                    this.setState({ spinner: false });
                }
            })
            .catch(err => {
                console.log('# fetchPersonInfo err:', err);
                alert(JSON.stringify(err));
                this.setState({ spinner: false });
            });
    }

    doPayment(){
        console.log('# do payment');
    }

    onComplete() {
        const self = this;

        const job = this.props.route.params?.job;
        const isSeller = this.props.route.params?.isSeller;
        const person = this.state.person;

        if (job?.status != 'confirm' && job?.status != 'completed') {
            alert('Invalid Job access!');
            return;
        }

        if (!person) {
            console.log('Invalid user!');
            return;
        }

        console.log('# person:', person);

        if (!self.state.rate || !self.state.note) {
            alert('Please fill review!');
            return;
        }

        Alert.alert(
            "Confirm",
            isSeller? 'Are you sure to complete this job?' : 'Are you sure to post this review?',
            [{
                text: "Cancel",
                onPress: () => { },
                style: "cancel"
            },{
                text: "OK",
                onPress: () => {

                    self.setState({spinner: true});

                    if (isSeller) {

                        // release payment
                        this.processPayment(() => {

                            firestore()
                                .collection(`jobs`)
                                .doc(job.key)
                                .update({
                                    status: 'completed', 
                                    review_from_seller: {
                                        rate: self.state.rate,
                                        note: self.state.note,
                                        postDate: new Date().valueOf(),
                                    },
                                })
                                .then(res => {
                                    //self.doPayment();
                                    self.props.navigation.navigate('Transaction', {job_id: job.key});
                                })
                                .catch(err => {
                                    this.setState({ spinner: false });
                                    console.log('#err:', err);
                                });

                            const review_obj = person.review_as_buyer;
                            const completed = parseInt(review_obj?.completed || 0);
                            const canceled = parseInt(review_obj?.canceled || 0);
                            const reviewed = parseInt(review_obj?.reviewed || 0);
                            const avgrate = parseFloat(review_obj?.avgrate || 0);
                            const new_avg_rate = parseFloat((avgrate * reviewed + parseInt(self.state.rate)) / (reviewed + 1));

                            firestore()
                                .collection(`users`)
                                .doc(person.id)
                                .update({
                                    review_as_buyer: {
                                        completed: completed + 1,
                                        canceled: canceled,
                                        reviewed: reviewed + 1,
                                        avgrate: new_avg_rate,
                                    },
                                })
                                .then(res => {
                                    self.props.navigation.navigate('Transaction', {job_id: job.key});
                                })
                                .catch(err => {
                                    this.setState({ spinner: false });
                                    console.log('#err:', err);
                                });
                        });

                    } else { // buyer
                        firestore()
                            .collection(`jobs`)
                            .doc(job.key)
                            .update({
                                status: 'completed',
                                review_from_buyer: {
                                    rate: self.state.rate,
                                    note: self.state.note,
                                    postDate: new Date().valueOf(),
                                },
                            })
                            .then(res => {
                                self.doPayment();
                                self.props.navigation.navigate('Transaction', {job_id: job.key});
                            })
                            .catch(err => {
                                this.setState({ spinner: false });
                                console.log('#err:', err);
                            });

                        const review_obj = person.review_as_seller;
                        const completed = parseInt(review_obj?.completed || 0);
                        const canceled = parseInt(review_obj?.canceled || 0);
                        const reviewed = parseInt(review_obj?.reviewed || 0);
                        const avgrate = parseFloat(review_obj?.avgrate || 0);
                        const new_avg_rate = parseFloat((avgrate * reviewed + parseInt(self.state.rate)) / (reviewed + 1));

                        firestore()
                            .collection(`users`)
                            .doc(person.id)
                            .update({
                                review_as_seller: {
                                    completed: completed + 1,
                                    canceled: canceled,
                                    reviewed: reviewed + 1,
                                    avgrate: new_avg_rate,
                                },
                            })
                            .then(res => {
                                self.props.navigation.navigate('Transaction', {job_id: job.key});
                            })
                            .catch(err => {
                                this.setState({ spinner: false });
                                console.log('#err:', err);
                            });
                    }

                }
            }],
            { cancelable: false }
        );

        if (isSeller) {

        } else {

        }
    }

    async processPayment(_callback) {
        const self = this;
        const job = this.props.route.params?.job;

        const results = await firestore()
            .collection(`transactions`)
            .where('job_id', '==', job.key)
            .get();

        let transaction = null;
        results && results.forEach(documentSnapshot => {
            transaction = {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            };
        });

        if (!transaction) {
            alert('Invalid transaction!');
            this.setState({spinner: false});
            return;
        }

        const doc = await firestore()
            .collection(`users`)
            .doc(job.buyer?.id)
            .get();

        const buyer_data = doc?.data();
        if (!buyer_data) {
            alert('Invalid buyer!');
            this.setState({spinner: false});
            return;
        }

        if (!buyer_data.stripe_account) {
            alert(buyer_data.name + ' has no payment account.');
            this.setState({spinner: false});
            return;
        }

        const balance = await getBalanceTransaction(transaction.in_transaction?.balance_transaction)
            .catch(err => {console.log('getBalanceTransaction err:', err)});
        
        if (!balance) {
            alert('Charge has some problem for this job');
            this.setState({spinner: false});
            return;
        }

        const price = balance.amount ? parseFloat(balance.amount) : 0;

        const res = await getPayment(
            buyer_data.stripe_account,
            price, // * 0.9,
            balance.currency,
            transaction.in_transaction?.id ? transaction.in_transaction.id : null
        ).catch(err => {
            console.log('payment err:', err);
            alert('Got payment error: ' + err.raw?.message);
            this.setState({spinner: false});
        });

        console.log('# payment result:', res);

        if (res?.id) {

            firestore()
                .collection('transactions')
                .doc(transaction.key)
                .update({
                    completed: true,
                    out_transaction: res
                })
                .then(() => {
                    _callback && _callback();
                });
        }

    }

    render() {
        const job = this.props.route.params?.job;
        const isSeller = this.props.route.params?.isSeller;
        const person = this.state.person;

        return(
            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>
                    <AppHeader title={isSeller? 'Confirm Job Completion' : 'Rate Client'}
                               leftIconPath={images.ic_back}
                               onLeftIconPress={()=> this.props.navigation.goBack()}
                               rightIconOnePath={images.ic_sort_1}
                        // onRightIconPress={()=> this.props.navigation.navigate('SearchScreen')}
                    />
                </View>

                {/*====> Container View <====*/}

                <ScrollView style={styles.bottomContainer} contentContainerStyle={{}}>

                    <View style={styles.imageView}>
                        <Image style={styles.img} source={{uri: person?.avatar}}/>
                        <Text style={styles.name}>{person?.name}</Text>
                        {isSeller ?
                            <View>
                                <Text style={styles.titleAddress}>
                                    <Text style={{color: colors.bright_green_color}}>{this.state.percent}%</Text> successful service rate
                                </Text>
                            </View> :
                            <View style={styles.usersView}>
                                <Image style={styles.icon} source={images.ic_maker}/>
                                <Text style={styles.titleAddress}>{job?.address}</Text>
                            </View>
                        }

                        {isSeller?
                            <Text style={styles.text}>
                                Note : When you confirm job is complete,
                                please leave a feedback to the provider to release complete payment.
                            </Text>:
                            <Text style={styles.text}>
                                Note : When your client confirms job is complete, 
                                please leave feedback to the client so we can release the complete payment to you.
                            </Text>
                        }

                        <View style={styles.ratingView}>
                            <AirbnbRating
                                count={5}
                                reviews={false}
                                defaultRating={this.state.avg_rate}
                                size={22}
                                showRating={false}
                                isDisabled={true}
                            />
                            <Text style={styles.reviewText}>{this.state.review_count} Reviews</Text>
                        </View>

                    </View>

                    <View style={styles.addPhotoView}>

                        <View style={styles.innerAddPhotoView}>

                            {isSeller &&
                                <View style={styles.rating}>
                                    <Text>{'Service Provider has confirmed completion of job.\nTap on the photos to view proof.'}</Text>
                                    <View style={{flexDirection: 'row', paddingTop: wp(2)}}>
                                    {job?.confirm?.photos && job.confirm.photos.map((photo, i) => {
                                        const photo_src = (photo && photo.uri)? photo : {uri:photo};
                                        if (i > 2)
                                            return;
                                        return <Image key={i} style={{width:wp(20), height: wp(20), margin:wp(1), resizeMode:'cover'}} source={photo_src}/>
                                    })}
                                    {job?.confirm?.photos?.length > 3 &&
                                        <TouchableOpacity style={styles.overPhotoBtn} onPress={() => {}}>
                                            <Text style={styles.titleAddress}>+{job.confirm.photos.length - 3}</Text>
                                        </TouchableOpacity>
                                    }
                                    </View>
                                </View>
                            }

                            <View style={styles.rating}>
                                <AirbnbRating
                                    count={5}
                                    reviews={false}
                                    defaultRating={0}
                                    size={25}
                                    showRating={false}
                                    onFinishRating={(num) => { this.setState({rate: num}) }}
                                />
                            </View>

                            <View style={styles.writeReview}>
                                <View style={styles.viewReviewText}>
                                    <Text style={styles.writeReviewText}>Write a Review</Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                        <Text style={styles.skipReviewText}>Skip Review</Text>
                                    </TouchableOpacity>
                                </View>

                                <Textarea
                                    containerStyle={styles.textArea}
                                    placeholder={'Type something here..'}
                                    placeholderTextColor={colors.placeholder_color}
                                    value={this.state.note}
                                    onChangeText={value => this.setState({
                                        note: value
                                    })}
                                />

                            </View>

                        </View>

                    </View>

                    <View style={styles.btnView}>
                        {isSeller?
                            <View style={{width:'90%', flexDirection:'row', justifyContent: 'space-around'}}>
                                <Button
                                    style={{width: wp(40), borderRadius:wp(2)}}
                                    bgColor={colors.app_green}
                                    title={'Confirm Job Done'}
                                    onPress={() => this.onComplete()}
                                />
                                <Button
                                    style={{width: wp(40), borderRadius:wp(2)}}
                                    bgColor={colors.app_dark_grey}
                                    title={'Message Provider'}
                                    onPress={() => {this.props.navigation.navigate('ServiceChat', {job: job, userId: this.props.userId})}}
                                />
                            </View> :
                            <Button title={'Job Complete'} onPress={() => this.onComplete()} />
                        }
                    </View>

                </ScrollView>


                <Spinner
                    visible={this.state.spinner}
                    //textContent={'Wait...'}
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

export default connect(mapStateToProps, mapDispatchToProps)(RateClient)


