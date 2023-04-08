//====> System files <====//

import {
  Alert,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  InteractionManager,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import React from 'react';
import moment from 'moment';
//====> Local files <====//

import Dropdown from '../../../Components/ModalDropdown';
import AppHeader from '../../../Components/AppHeader';
import images from '../../../../assets/images';
import styles from './style';
import AppInput from '../../../Components/Inputs/AppInput';
import Textarea from 'react-native-textarea';
import colors from '../../../../assets/colors';
import Button from '../../../Components/Button/Button';
//import TransactionComponent from '../../../Components/AppComponents/TransactionComponent/TransactionComponent';
import JobItemComponent from '../../../Components/AppComponents/JobItemComponent/JobItemComponent';
import Spinner from 'react-native-loading-spinner-overlay';
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import Geolocation from 'react-native-geolocation-service';

import {calcCrow} from '../../../utils/utils';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native';

class Home extends React.Component {
  //====> Constructor Method <====//

  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      transactionView: true,
      location: null,
      job_list: [],
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(async () => {
        await this.requestLocation();
        this.createSubscriber();
      }, 50);
    });
  }

  componentWillUnmount() {
    this.subscriber && this.subscriber();
  }

  componentWillReceiveProps(nextprops) {
    this.subscriber && this.subscriber();
    this.createSubscriber();
  }

  jobSortFunc(a, b) {
    const da = a.distance;
    const db = b.distance;
    if (da > db) return 1;
    if (da < db) return -1;
    return 0;
  }

  setCurrentLocation(loc) {
    this.setState({location: loc});
  }

  getLocation() {
    Geolocation.getCurrentPosition(
      async (position) => {
        console.log(position);
        if (position.coords) {
          this.setCurrentLocation(position.coords);
          return;
        }
      },
      (error) => {
        // See error code charts below.
        console.log('error:', error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
    Geolocation.watchPosition(
      async (position) => {
        console.log(position);
        if (position.coords) {
          console.log('--------watchPosition:', position);
          this.setCurrentLocation(position.coords);
          return;
        }
      },
      (error) => {
        // See error code charts below.
        console.log('error:', error.code, error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
        showsBackgroundLocationIndicator: true,
      },
    );
  }

  async requestLocation() {
    if (Platform.OS == 'android') {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted) {
        console.log('You can use the ACCESS_FINE_LOCATION');
        this.getLocation();
      } else {
        try {
          const allowed = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (allowed === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
            this.getLocation();
          } else {
            console.log('location permission denied');
            alert('location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    } else {
      Geolocation.requestAuthorization('whenInUse');
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
      this.getLocation();
    }
  }

  createSubscriber() {
    const user_id = this.props.user?.uid;
    //const profile = this.props.profile;
    //const current_loc = this.state.location;

    //console.log('# user:', this.props.user);
    //console.log('# profile:', profile);

    //if (!user_id || !profile)
    //    return;

    this.setState({spinner: true});
    this.subscriber && this.subscriber();

    this.subscriber = firestore()
      .collection('jobs')
      .where('status', '==', 'waiting')
      .onSnapshot((querySnapshot) => {
        if (!querySnapshot) {
          console.log('# querySnapshot:', querySnapshot);
          this.setState({spinner: false});
          return;
        }

        let jobs = [];
        querySnapshot.forEach((documentSnapshot) => {
          let job = {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          };
          if (job.status != 'canceled' && job.poster?.id != user_id) {
            //job.startDate = job.startDate?.toDate();
            //job.endDate = job.endDate?.toDate();
            //job.postDate = job.postDate?.toDate();
            job.startDate = job.startDate
              ? moment(job.startDate).toDate()
              : null;
            job.endDate = job.endDate ? moment(job.endDate).toDate() : null;
            job.postDate = job.postDate ? moment(job.postDate).toDate() : null;
            jobs.push(job);
          }
        });
        console.log('#jobs buyer:', jobs);
        this.setState({
          job_list: jobs,
          spinner: false,
        });
      });
  }

  onClick_List = () => {
    this.setState({transactionView: !this.state.transactionView});
  };

  onActionJob(cmd, job) {
    const self = this;
    const user_id = this.props.user?.uid;
    const profile = this.props.profile;

    if (!cmd || !job) {
      console.log('#invalid parameter');
      return;
    }

    if (!user_id) {
      self.props.navigation.replace('SignupWith');
      return;
    }

    console.log('# command:[' + cmd + ']', job);
    if (cmd != 'accept' || job.status != 'waiting') {
      console.log('#invalid job');
      return;
    }

    Alert.alert(
      'Confirm',
      'Are you sure to join this job?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log(profile);
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            self.setState({spinner: true});
            firestore()
              .collection(`jobs`)
              .doc(job.key)
              .update({
                status: 'ongoing',
                buyer: {
                  id: user_id,
                  name: profile?.name,
                  avatar: profile?.avatar,
                },
              })
              .then((res) => {
                self.props.navigation.navigate('Transaction', {
                  job_id: job.key,
                });
              })
              .catch((err) => {
                this.setState({spinner: false});
                setTimeout(() => {
                  alert('failed ! : ' + JSON.stringify(err));
                }, 100);
              });
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    const {job_list, location} = this.state;

    let jobs = job_list
      .map((job) => {
        if (location) {
          job.distance = calcCrow(
            job.location?.latitude,
            job.location?.longitude,
            location.latitude,
            location.longitude,
          );
        }
        return job;
      })
      .sort(this.jobSortFunc);

    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerContainer}>
          <AppHeader
            title={'Home'}
            leftIconPath={images.ic_hamburger}
            onLeftIconPress={() => this.props.navigation.openDrawer()}
            rightIconOnePath={
              this.state.transactionView ? images.ic_map : images.ic_list
            }
            onRightIconPress={this.onClick_List}
          />
        </View>

        {/*====> Container View <====*/}

        <View style={styles.container}>
          {this.state.transactionView ? (
            <>
              <ScrollView style={{flex: 1}} contentContainerStyle={{}}>
                {jobs && jobs.length > 0 ? (
                  jobs.map((job, i) => (
                    <JobItemComponent
                      key={i}
                      viewtype={'buyer'}
                      data={job}
                      userId={this.props.user?.uid}
                      location={location}
                      navigation={this.props.navigation}
                      onCommand={(cmd, job) => {
                        this.onActionJob(cmd, job);
                      }}
                    />
                  ))
                ) : (
                  <View
                    style={{
                      height: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text>No available jobs</Text>
                  </View>
                )}
              </ScrollView>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  if (this.props?.profile) {
                    if (this.props?.profile?.type === 'seller') {
                      Alert.alert(
                        'MESSAGE',
                        'You are not register as owner please register as owner',
                      );
                    } else {
                      if (this.props.profile.seller_status === 'approved') {
                        this.props.navigation.navigate('JobAdd', {
                          location: location,
                        });
                      } else {
                        Alert.alert(
                          'MESSAGE',
                          this.props.profile.seller_status === '_pending'
                            ? 'You farm documents are in under review.'
                            : 'You farm documents are rejected',
                        );
                      }
                    }
                    // this.props.navigation.navigate('Directions')
                  } else {
                    this.props.navigation.replace('SignupWith');
                  }
                }}>
                <Image style={styles.iconAdd} source={images.ic_add} />
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.mapView}>
              <MapView
                style={styles.mapStyle}
                initialRegion={{
                  latitude: location?.latitude || 37.78825,
                  longitude: location?.longitude || -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                {job_list.map((job, i) => (
                  <Marker key={i} coordinate={job.location}>
                    <Image
                      source={images.ic_map_marker}
                      style={styles.markerIcon}
                    />
                  </Marker>
                ))}
              </MapView>
            </View>
          )}
        </View>

        <Spinner visible={this.state.spinner} textStyle={{color: 'white'}} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  profile: state.user.profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
