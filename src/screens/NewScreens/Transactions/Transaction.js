//================================ React Native Imported Files ======================================//

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Alert, Image, Text, StatusBar, View, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import moment from 'moment';

var MessageBarManager = require('react-native-message-bar').MessageBarManager;
//================================ Local Imported Files ======================================//

import AppHeader from '../../../Components/AppHeader';
import colors from '../../../../assets/colors';
import images from '../../../../assets/images';
import styles from './Styles';
//import TransactionComponent from '../../../Components/AppComponents/TransactionComponent/TransactionComponent';
import TabsComponent from '../../../Components/TabsComponent';
import JobItemComponent from '../../../Components/AppComponents/JobItemComponent/JobItemComponent';


import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';


class Transaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      spinner: false, // overall
      spinner1: false, // buyers
      spinner2: false, // sellers

      jobs_seller: [],
      jobs_buyer: [],

      leftTab: true,
      rightTab: false,
      // farmInformationView: true,
      // reviewView: false,
      myFarmView: true,
      clientFarm: false,
      messages: [],

    };
  }

  componentDidMount() {
    this.createSubscriber();
  }

  componentWillUnmount() {
    this.subscriber1 && this.subscriber1();
    this.subscriber2 && this.subscriber2();
  }

  createSubscriber() {
    const user_id = this.props.user?.uid;
    const profile = this.props.profile;

    if (!user_id || !profile)
      return;

    this.setState({spinner1: true});
    this.subscriber1 && this.subscriber1();
    this.subscriber1 = firestore()
      .collection('jobs')
      .where('buyer.id', '==', user_id)
      .onSnapshot((querySnapshot) => {
          if (!querySnapshot) {
              console.log('# querySnapshot:', querySnapshot);
              return;
          }
          let jobs = [];
          querySnapshot.forEach(documentSnapshot => {
              let job = {
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
              };
              if (job.status == 'canceled')
                return;
              //job.startDate = job.startDate?.toDate();
              //job.endDate = job.endDate?.toDate();
              //job.postDate = job.postDate?.toDate();
              job.startDate = job.startDate? moment(job.startDate).toDate() : null;
              job.endDate = job.endDate? moment(job.endDate).toDate() : null;
              job.postDate = job.postDate? moment(job.postDate).toDate() : null;
              jobs.push(job);
          });
          console.log('#jobs buyer:', jobs);
          this.setState({
              jobs_buyer: jobs,
              spinner1: false,
          });
      });

      this.setState({spinner2: true});
      this.subscriber2 && this.subscriber2();
      this.subscriber2 = firestore()
        .collection('jobs')
        .where('poster.id', '==', user_id)
        .onSnapshot((querySnapshot) => {
            if (!querySnapshot) {
                console.log('# querySnapshot:', querySnapshot);
                return;
            }
            let jobs = [];
            querySnapshot.forEach(documentSnapshot => {
                let job = {
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                };
                if (job.status == 'canceled')
                  return;
                job.startDate = job.startDate != null ? moment(job.startDate).toDate() : null;
                job.endDate = job.endDate != null ? moment(job.endDate).toDate() : null;
                job.postDate = job.postDate != null?  moment(job.postDate).toDate() : null;
                jobs.push(job);
            });
            console.log('#jobs seller:', jobs);
            this.setState({
                jobs_seller: jobs,
                spinner2: false,
            });
        });
  }

  onAfterActionJob(res) {
    const self = this;
    console.log('# res:', res);
    self.setState({ spinner: false }, () => {
        setTimeout(() => {
            MessageBarManager.showAlert({
                title: '',
                message: 'Done!',
                alertType: 'success'
            });
        }, 100);
    });
  }
  onErrorActionJob(err) {
      this.setState({ spinner: false });
      setTimeout(() => {
          alert("failed ! : " + JSON.stringify(err));
      }, 100);
  }

  incCancelCountByuser(user_id, user_type) {
    firestore()
      .collection('users')
      .doc(user_id)
      .get()
      .then((querySnapshot) => { // get buyer info
        if (querySnapshot) {
          let person = querySnapshot.data();
          const review_obj = user_type == 'buyer'? person.review_as_buyer : person.review_as_seller;
          const completed = parseInt(review_obj?.completed || 0);
          const canceled = parseInt(review_obj?.canceled || 0);
          const reviewed = parseInt(review_obj?.reviewed || 0);
          const avgrate = parseFloat(review_obj?.avgrate || 0);
          
          firestore()
              .collection('users')
              .doc(user_id)
              .update( user_type == 'buyer'? { // inc canceled count
                  review_as_buyer: {
                    completed: completed,
                    canceled: canceled + 1,
                    reviewed: reviewed,
                    avgrate: avgrate,
                  }
                } : {
                  review_as_seller: {
                    completed: completed,
                    canceled: canceled + 1,
                    reviewed: reviewed,
                    avgrate: avgrate,
                  }
              })
              .then(res => {console.log('updated user info! - ' + user_type)})
              .catch(err => {console.log('failed to updated user info! - ' + user_type)});
        }
      })
      .catch(err => {console.log('failed to get user info! - ' + user_type)});
  }

  onActionJob(cmd, job) {
    const user_id = this.props.user?.uid;

    if (!cmd || !job) {
      console.log('# wrong parameter');
      return;
    }
    if (job.poster?.id != user_id && job.buyer?.id != user_id) {
      console.log('# invalid operation');
      return;
    }

    const isSeller = job.poster?.id == user_id;
    console.log('# command:[' + cmd + ']', job);

    const docref = firestore().collection(`jobs`).doc(job.key);
    switch(cmd) {
        case 'cancel':
            if (isSeller) {
                /*
                if (job.status == 'confirm') {
                    this.setState({spinner: true});
                    docref.update({status: 'ongoing'})
                    .then(self.onAfterActionJob)
                    .catch(self.onErrorActionJob);
                    break;
                }
                */
                if (/*job.status == 'waiting' ||*/ job.status == 'ongoing') {
                    Alert.alert(
                        "Confirm",
                        "Are you sure to cancel this job?",
                        [{
                            text: "Cancel",
                            onPress: () => { console.log("Cancel Pressed");},
                            style: "cancel"
                        },{
                            text: "OK",
                            onPress: () => {
                                self.setState({spinner: true});
                                docref
                                .update({
                                  status: 'canceled',
                                  canceled: {
                                    by: 'poster',
                                    at: new Date().valueOf(),
                                  },
                                })
                                .then(self.onAfterActionJob)
                                .catch(self.onErrorActionJob);
                                
                                self.incCancelCountByuser(job.buyer.id, 'buyer');
                                self.incCancelCountByuser(job.poster.id, 'seller');
                            }
                        }],
                        { cancelable: false }
                    );
                    break;
                }
                if (job.status == 'pending') {
                  Alert.alert(
                    "Confirm",
                    "Are you sure to delete this job?",
                    [{
                        text: "Delete",
                        onPress: () => { console.log("Cancel Pressed");},
                        style: "cancel"
                    },{
                        text: "OK",
                        onPress: () => {
                            this.setState({spinner: true});
                            docref.delete()
                            .then(self.onAfterActionJob)
                            .catch(self.onErrorActionJob);
                        }
                    }],
                    { cancelable: false }
                  );
                  break;
                }
            } else { // buyer
                if (job.status == 'ongoing') {
                    Alert.alert(
                        "Confirm",
                        "Are you sure to resign this job?",
                        [{
                            text: "Cancel",
                            onPress: () => { console.log("Cancel Pressed"); },
                            style: "cancel"
                        },{
                            text: "OK",
                            onPress: () => {
                                this.setState({spinner: true});
                                docref.update({
                                    status: 'canceled',
                                    canceled: {
                                      by: 'buyer',
                                      at: new Date().valueOf()
                                    },
                                })
                                .then(self.onAfterActionJob)
                                .catch(self.onErrorActionJob);
                                
                                self.incCancelCountByuser(job.buyer.id, 'buyer');
                                self.incCancelCountByuser(job.poster.id, 'seller');
                            }
                        }],
                        { cancelable: false }
                    );
                    break;
                }
            }
            console.log('# wrong cancel action');
            break;
        case 'confirm':
            if (isSeller && job.status == 'confirm') {
                this.props.navigation.navigate('RateClient', {job: job, isSeller:true});
            }
            break;
        case 'complete':
            if (!isSeller && job.status == 'ongoing') {
                //docref.update({status: 'confirm'})
                //.then(self.onAfterActionJob)
                //.catch(self.onErrorActionJob);
                this.props.navigation.navigate('ConfirmDelivery', {job: job});
            }
            break;
        case 'rate':
            if (!isSeller && job.status == 'completed' && job.review_buyer == null) {
                this.props.navigation.navigate('RateClient', {job_id: job.key, isSeller:false});
            }
            break;
        default:
            console.log('# unknown command:', cmd);
            break;
    }
  }

  render() {
    return (
      <View style={styles.mainCotainer}>
        {/* //================================ StatusBar ======================================// */}
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.AppRedColor}
          translucent={false}
        />
        {/* //================================ Header ======================================// */}
        <View style={styles.headerCotainer}>
          <AppHeader
            leftIconPath={images.ic_hamburger}
            onLeftIconPress={() => this.props.navigation.openDrawer()}
            lefticonSize={wp(5)}
            title={'Transactions'}
            rightIconOnePath={images.ic_sort_1}
          />
        </View>
        <View style={styles.viewTabs}>
          <TabsComponent
            leftText={'My Farm'}
            rightText={'Client Farm'}
            onLeftPress={() => this.setState({ leftTab: true, rightTab: false, myFarmView: true, clientFarm: false })}
            onRightPress={() => this.setState({ rightTab: true, leftTab: false, myFarmView: false, clientFarm: true })}
          />
        </View>

        {/* //================================ Profile ======================================// */}
        <View style={styles.homeContainer}>
          {
            this.state.myFarmView && 
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.state.spinner2 ?
                <View style={{height: 100, alignItems:'center', justifyContent:'center'}}>
                  <ActivityIndicator />
                </View> :
                (this.state.jobs_seller && this.state.jobs_seller.length > 0 ?
                  this.state.jobs_seller.map((job, i) => 
                      <JobItemComponent
                          key={i}
                          viewtype={'seller'}
                          data={job}
                          userId={this.props.user?.uid}
                          //location={this.state.location}
                          navigation={this.props.navigation}
                          onCommand={(cmd, job) => {this.onActionJob(cmd, job)}}
                      />
                  ):
                  <View style={{height: 100, alignItems:'center', justifyContent:'center'}}>
                      <Text>No jobs</Text>
                  </View>
                )
              }
            </ScrollView>
          }
          {
            this.state.clientFarm &&
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.state.spinner1 ?
                <View style={{height: 100, alignItems:'center', justifyContent:'center'}}>
                  <ActivityIndicator />
                </View> :
                (this.state.jobs_buyer && this.state.jobs_buyer.length > 0 ?
                  this.state.jobs_buyer.map((job, i) => 
                      <JobItemComponent
                          key={i}
                          viewtype={'buyer'}
                          data={job}
                          userId={this.props.user?.uid}
                          //location={this.state.location}
                          navigation={this.props.navigation}
                          onCommand={(cmd, job) => {this.onActionJob(cmd, job)}}
                      />
                  ):
                  <View style={{height: 100, alignItems:'center', justifyContent:'center'}}>
                      <Text>No jobs</Text>
                  </View>
                )
              }
            </ScrollView>
          }


        </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
