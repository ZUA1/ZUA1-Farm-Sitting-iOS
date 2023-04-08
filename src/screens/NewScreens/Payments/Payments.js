import React from 'react';
import {
    Alert,
    View,
    FlatList,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../../../assets/images';
import styles from './style';
import AppHeader from '../../../Components/AppHeader';
import Button from '../../../Components/Button/Button';
import colors from '../../../../assets/colors';
import SetupPaymentComponent from '../../../Components/AppComponents/SetupPaymentComponent/SetupPaymentComponent';
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import Spinner from 'react-native-loading-spinner-overlay';

import { buyItem } from '../../../utils/api'
import { sendPushNotification } from '../../../utils/firebase'
import { createNewStripe } from '../../../utils/stripe'
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore';

class Payment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            items: [
                {
                    id: 0,
                    image:images.ic_mastercard,
                    title:'MASTERCARD',
                    text:'**** **** **** 6524',
                },
                {
                    id: 1,
                    image:images.ic_mastercard,
                    title:'VISA',
                    text:'**** **** **** 1223',
                },

            ],

        }
    }

    clickPay() {
        const self = this;
        //this.props.navigation.navigate('AddCard');
        const job = this.props.route.params?.job;
        const user_id = this.props.user.uid;

        if (!job)
            return;
        createNewStripe(this.props.profile).then(card => {
            if (card && card.tokenId) {
                this.setState({ spinner: true });
                buyItem(card, { price: job.cost }).then(res => {
                    console.log("-----stripe transaction:", res);
                    if (res && res.status == "succeeded") {

                        firestore()
                            .collection('transactions')
                            .add({
                                ...job,
                                job_id: job.key,
                                createdat: Date.now(),
                                buyer: user_id,
                                status: 'onsale',
                                in_transaction: {
                                    amount: res.amount,
                                    balance_transaction: res.balance_transaction,
                                    created: res.created,
                                    currency: res.currency,
                                    id: res.id,
                                    payment_method: res.payment_method,
                                    receipt_url: res.receipt_url,
                                }
                            })
                            .then(() => {
                                sendPushNotification(user_id, job.title, 'Your item is purchased!')
                                self.setState({ spinner: false }, () => {
                                    self._afterPaymentProc(job.key);
                                })
                            });
                    }
                });
            }
            
        });

        
    }
    
    _afterPaymentProc (job_id) {
        const self = this;
        firestore()
            .collection(`jobs`)
            .doc(job_id)
            .update({
                status: 'waiting'
            })
            .then((res) => {
                console.log('# res:', res);
                self.setState({ spinner: false }, () => {
                    setTimeout(() => {
                        MessageBarManager.showAlert({
                            title: '',
                            message: 'Successfully paid!',
                            alertType: 'success'
                        });
                        //self.props.navigation.goBack();
                        self.props.navigation.navigate('Transaction');
                    }, 100);
                });
            })
            .catch(err => {
                self.setState({ spinner: false });
                setTimeout(() => {
                    alert("failed creating job! : " + JSON.stringify(err));
                }, 100);
            });
    }


    _renderItem = item => {
        return  (
            <SetupPaymentComponent
            onPress={()=>{
              console.log(item)  
            }}
                image={item.image}
                title={item.title}
                text={item.text}
                img={item.img}
            />
        );
    };


    render() {
        return (

            <View style={styles.mainContainer}>
                <View style={styles.headerView}>
                    <AppHeader
                        title={'Setup Payment'}
                        leftIconPath={images.ic_back}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />
                </View>



                <View style={styles.container}>

                    <View style={styles.flatListView}>
                        
                        {/* <FlatList
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => '' + item.id}
                            data={this.state.items}
                            renderItem={({item}) => this._renderItem(item)}
                        /> */}
                       
                    </View>


                    <View style={styles.btnView}>
                        <Button
                            title={'Pay'}
                            onPress={() => { this.clickPay() }}
                        />
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

const mapStateToProps = state => ({
    user: state.user.user,
    profile: state.user.profile
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
