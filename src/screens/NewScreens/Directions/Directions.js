//====> System files <====//

import {Alert, View,Text,FlatList,TouchableOpacity,Image, InteractionManager, PermissionsAndroid} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
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

import Geolocation from 'react-native-geolocation-service';
import { calcCrow } from '../../../utils/utils'

export default class Directions extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);

        this.state = {

            location: null

        }
    }

    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {
            setTimeout(async() => {
                await this.requestLocation();
            }, 50);
        });
    }

    getLocation() {
        Geolocation.getCurrentPosition(
          async position => {
            console.log(position);
            if (position.coords) {
              console.log('--------position', position);
              //this.updateLocation(position.coords)
              this.setState({ location: position.coords })
              //let tempCoords = {
              //  latitude: Number(position.coords.latitude),
              //  longitude: Number(position.coords.longitude)
              //}
              //this._map && this._map.animateToCoordinate(tempCoords, 1);
              //this.props.setLocation(position.coords)
              return
            }
          },
          error => {
            // See error code charts below.
            console.log('error:', error.code, error.message);
          },
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
        );
        Geolocation.watchPosition(
          async position => {
            console.log(position);
            if (position.coords) {
              console.log('--------watchPosition:', position);
              //this.updateLocation(position.coords)
              this.setState({ location: position.coords })
              //this.props.setLocation(position.coords)
              return
            }
          },
          error => {
            // See error code charts below.
            console.log('error:', error.code, error.message);
          },
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000, showsBackgroundLocationIndicator: true },
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

    render() {
        const job = this.props.route.params?.job;
        let distance = ' - ';
        if (job && job.location && this.state.location) {
            distance = calcCrow(job.location.latitude, job.location.longitude, this.state.location.latitude, this.state.location.longitude);
            distance = distance.toFixed(2);
        }
        console.log('# job.location:', job?.location);
        return(
            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerContainer}>
                    <AppHeader title={'Directions'}
                               leftIconPath={images.ic_back}
                               rightIconOnePath={images.ic_sort}
                               onLeftIconPress={()=> this.props.navigation.goBack()}
                        // onRightIconPress={()=> this.props.navigation.navigate('SearchScreen')}
                    />
                </View>

                {/*====> Container View <====*/}

                <View style={styles.container}>

                    <View style={styles.mapView}>
                        <MapView style={styles.mapStyle}
                                 initialRegion={{
                                     latitude: job?.location?.latitude,
                                     longitude: job?.location?.longitude,
                                     latitudeDelta: 0.0922,
                                     longitudeDelta: 0.0421,
                                 }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: job?.location?.latitude,
                                    longitude: job?.location?.longitude
                                }}
                            >
                                <Image source={images.ic_map_marker} style={styles.markerIcon} />
                            </Marker>

                        </MapView>

                        <View style={styles.addressView}>
                            <View style={styles.usersView}>
                                <Image style={styles.icon} source={images.ic_maker}/>
                                <Text style={styles.titleAddress}>{job?.address}</Text>
                            </View>
                            <Text style={styles.distanceText}>Total Distance: 
                                <Text style={styles.kmText}>{distance} km <Text style={styles.destination}>(from pickup to destination)</Text>
                                </Text>
                            </Text>
                        </View>


                    </View>


                </View>

            </View>

        );
    }
}




