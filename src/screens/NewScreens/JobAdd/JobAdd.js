//====> System files <====//

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//====> Local files <====//

import Dropdown from '../../../Components/ModalDropdown';
import AppHeader from '../../../Components/AppHeader';
import images from '../../../../assets/images';
import styles from './style';
import AppInput from '../../../Components/Inputs/AppInput';
import Textarea from 'react-native-textarea';
import colors from '../../../../assets/colors';
import Button from '../../../Components/Button/Button';

var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ActionSheet from 'react-native-action-sheet';
import Spinner from 'react-native-loading-spinner-overlay';

import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {makeid} from '../../../utils/utils';

class JobAdd extends React.Component {
  //====> Constructor Method <====//

  constructor(props) {
    super(props);
    this.state = {
      title: '', //'Caretaker for the weekend',
      cost: '', //'105.00',
      note: '', //'Lorem Ipsum is that it has a more-or-less normal distribution of letters, as',
      photos: [],
      address: '',
      location: null,
      startDate: null,
      endDate: null,

      spinner: false,
      isDatePickerVisible: false,
      whichDate: 'start',
      initDate: null,

      isEditMode: false,
      isPreviewMode: false,
    };
  }

  componentDidMount() {
    const self = this;
    if (!self.props.user) {
      setTimeout(() => {
        //self.props.navigation.pop();
        self.props.navigation.replace('SignupWith');
      }, 100);
    }
  }

  selectPhoto = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['Take Photo...', 'Choose From Library...', 'Cancel'],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 0,
        tintColor: 'black',
      },
      (index) => {
        switch (index) {
          case 0: {
            ImagePicker.openCamera({
              width: 300,
              height: 300,
              cropping: false,
              mediaType: 'photo',
              cropperCircleOverlay: false,
            })
              .then((image) => {
                //this.updateFormField('avatar', { uri: image.path })
                console.log('# selected image 0:', image);
                const {photos} = this.state;
                this.setState({photos: [...photos, {uri: image.path}]});
              })
              .catch((err) => {
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
            })
              .then((image) => {
                //this.updateFormField('avatar', { uri: image.path })
                console.log('# selected image 1:', image);
                const {photos} = this.state;
                this.setState({photos: [...photos, {uri: image.path}]});
              })
              .catch((err) => {
                console.log('# select image err:', err);
              });
            break;
          }
        }
      },
    );
  };
  /*
    clickDel() {
        const self = this;
        const farm_id = self.props.route.params?.farm_id;
        const animal_id = self.props.route.params?.animal_id;
        if (!farm_id || !animal_id || !this.state.isEditMode) {
            console.log('No farm or animal id');
            return;
        }
        Alert.alert(
            "Delete",
            "Are you sure to delete this animal?",
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
                        .collection(`animals`)
                        .doc(animal_id)
                        .delete().then(res => {
                            self.props.navigation.goBack();
                        });
                }
            }],
            { cancelable: false }
        );

    }
    */
  async clickAdd() {
    const self = this;

    const {
      title,
      cost,
      note,
      photos,
      address,
      location,
      startDate,
      endDate,
    } = this.state;
    const user_id = this.props.user.uid;

    console.log('this.props.user:', this.props.user);
    console.log('this.props.profile:', this.props.profile.seller_status);

    if (
      !title ||
      !cost ||
      !note ||
      !address ||
      !location ||
      !startDate ||
      !endDate
    ) {
      alert('Please fill informations!');
      return;
    }

    if (!this.state.isPreviewMode) {
      this.setState({isPreviewMode: true});
      return;
    }

   
    if(this.props.profile.seller_status === "_pending"){
      Alert.alert("MESSAGE","Your farm docs did not approved yet!")
    }
    else{
      this.setState({spinner: true});
      let new_photos = [];
      for (let p of photos) {
        if (p && p.uri)
          try {
            const fname = '' + Date.now() + '_' + makeid(12);
            const ext = p.uri.split('.').pop();
            const reference = storage().ref('farm/jobs/' + fname + '.' + ext);
            const resp_image = await reference.putFile(p.uri);
            let new_url = await reference.getDownloadURL();
            new_photos.push(new_url);
            continue;
          } catch {
            (err) => {
              console.log('# photo upload err', err);
            };
          }
        new_photos.push(p);
      }
      console.log('# new photos:', new_photos);
      if (!this.state.isEditMode) {
        firestore()
          .collection(`jobs`)
          .add({
            title,
            cost,
            note,
            address,
            location,
            photos: new_photos,
            startDate: startDate?.valueOf(),
            endDate: endDate?.valueOf(),
            postDate: new Date().valueOf(),
            status: 'pending',
            poster: {
              id: user_id,
              name: self.props.profile?.name,
              avatar: self.props.profile?.avatar,
            },
            buyer: null,
          })
          .then((res) => {
            console.log('# res:', res);
            self.setState({spinner: false}, () => {
              setTimeout(() => {
                MessageBarManager.showAlert({
                  title: '',
                  message: 'Successfully created!',
                  alertType: 'success',
                });
                //self.props.navigation.goBack();
  
                const job_id = res.id;
                firestore()
                  .collection(`jobs`)
                  .doc(job_id)
                  .get()
                  .then((doc) => {
                    const job_data = doc.data();
                    let job = {...job_data, key: job_id};
                    self.props.navigation.navigate('Payments', {job});
                  });
              }, 100);
            });
          })
          .catch((err) => {
            console.log({err});
            self.setState({spinner: false});
            setTimeout(() => {
              alert('failed creating job! : ' + JSON.stringify(err));
            }, 100);
          });
      } else {
        this.setState({spinner: false});
      }
    }



  }

  updateLocation(data) {
    if (data) {
      this.setState({
        address: data.address,
        location: {
          latitude: data.latitude,
          longitude: data.longitude,
        },
      });
    }
  }

  render() {
    //const farm_id = this.props.route.params?.farm_id;

    const {
      title,
      cost,
      note,
      photos,
      address,
      location,
      startDate,
      endDate,
      isEditMode,
      isPreviewMode,
    } = this.state;
    return isPreviewMode ? (
      <View style={styles.mainContainer}>
        <View style={styles.headerView}>
          <AppHeader
            title="Job Details"
            leftIconPath={images.ic_back}
            onLeftIconPress={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.inputsView}>
            <View style={styles.nameView}>
              <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>{'$' + cost}</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({isPreviewMode: false})}>
                <Image style={styles.icon} source={images.ic_edit} />
              </TouchableOpacity>
            </View>
            <View style={styles.infoView}>
              <View style={{}}>
                <Text numberOfLines={4} style={styles.text}>
                  {note}
                </Text>
              </View>
            </View>
            <View style={styles.photoReferenceView}>
              <ScrollView
                contentContainerStyle={{alignSelf: 'stretch', minHeight: 95}}
                horizontal>
                {photos.map((photo, i) => {
                  const photo_src = photo && photo.uri ? photo : {uri: photo};
                  return (
                    <Image key={i} style={styles.img} source={photo_src} />
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.photoReferenceView}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <Image
                  source={images.ic_maker_2}
                  style={{}}
                  width={wp(5)}
                  height={wp(5)}
                  resizeMode="contain"
                />
                <Text style={{color: colors.deep_grey, fontSize: 16}}>
                  {address}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                height: hp(7),
                marginVertical: 5,
              }}>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Text style={{color: colors.deep_grey, fontSize: 16}}>
                  Start Date:
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  borderRadius: wp(2),
                  justifyContent: 'center',
                  backgroundColor: colors.app_input_bg,
                }}>
                <Text style={{color: colors.deep_grey, fontSize: 16}}>
                  {moment(startDate).format('MMM DD / YYYY')}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                height: hp(7),
                marginVertical: 5,
              }}>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Text style={{color: colors.deep_grey, fontSize: 16}}>
                  End Date:
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  borderRadius: wp(2),
                  justifyContent: 'center',
                  backgroundColor: colors.app_input_bg,
                }}>
                <Text style={{color: colors.deep_grey, fontSize: 16}}>
                  {moment(endDate).format('MMM DD / YYYY')}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                height: hp(7),
                marginVertical: 5,
              }}>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Text style={{color: colors.deep_grey, fontSize: 16}}>
                  mode Of Payment:
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  borderRadius: wp(2),
                  justifyContent: 'center',
                  backgroundColor: colors.app_input_bg,
                }}>
                <Text style={{color: colors.deep_grey, fontSize: 16}}>
                  Credit Card
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.btnView}>
            <Button title="Confirm Post" onPress={() => this.clickAdd()} />
          </View>
        </View>
        <Spinner
          visible={this.state.spinner}
          textContent={'Wait...'}
          textStyle={{color: 'white'}}
        />
      </View>
    ) : (
      <View style={styles.mainContainer}>
        {/*=============================> Edit View <===============================*/}

        <View style={styles.headerView}>
          <AppHeader
            title={isEditMode ? 'Edit Job' : 'New Job Order'}
            // lefticonSize={20}
            leftIconPath={images.ic_back}
            rightIconOnePath={images.ic_sort_1}
            onLeftIconPress={() => this.props.navigation.goBack()}
            // onRightIconPress={()=> this.props.navigation.navigate('SearchScreen')}
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.inputsView}>
            <AppInput
              placeholder={'Job Title'}
              placeholderTextColor={colors.placeholder_color}
              textInputColor={colors.deep_grey}
              value={title}
              onChangeText={(value) =>
                this.setState({
                  title: value,
                })
              }
            />

            <AppInput
              placeholder={'Service Fee'}
              placeholderTextColor={colors.placeholder_color}
              textInputColor={colors.deep_grey}
              value={cost}
              onChangeText={(value) =>
                this.setState({
                  cost: value,
                })
              }
            />

            <Textarea
              containerStyle={styles.textArea}
              placeholder={'Description'}
              placeholderTextColor={colors.placeholder_color}
              textInputColor={colors.deep_grey}
              value={note}
              onChangeText={(value) =>
                this.setState({
                  note: value,
                })
              }
            />

            <View style={styles.photoReferenceView}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  this.props.navigation.navigate('GetAddress', {
                    initLocation: location || this.props.route.params?.location,
                    getLocation: this.updateLocation.bind(this),
                  });
                }}>
                {address && location ? (
                  <Text style={{color: colors.deep_grey, fontSize: 16}}>
                    {address}
                  </Text>
                ) : (
                  <Text style={{color: colors.placeholder_color, fontSize: 16}}>
                    Location
                  </Text>
                )}
                <Image
                  source={images.ic_maker_2}
                  style={{}}
                  width={wp(5)}
                  height={wp(5)}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.photoReferenceView}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  this.setState({
                    isDatePickerVisible: true,
                    whichDate: 'start',
                    initDate: startDate,
                  });
                }}>
                {startDate ? (
                  <Text style={{color: colors.deep_grey, fontSize: 16}}>
                    {moment(startDate).format('MMM DD / YYYY')}
                  </Text>
                ) : (
                  <Text style={{color: colors.placeholder_color, fontSize: 16}}>
                    Start Date
                  </Text>
                )}
                <Image
                  source={images.ic_calender}
                  style={{}}
                  width={wp(5)}
                  height={wp(5)}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.photoReferenceView}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  this.setState({
                    isDatePickerVisible: true,
                    whichDate: 'end',
                    initDate: endDate,
                  });
                }}>
                {endDate ? (
                  <Text style={{color: colors.deep_grey, fontSize: 16}}>
                    {moment(endDate).format('MMM DD / YYYY')}
                  </Text>
                ) : (
                  <Text style={{color: colors.placeholder_color, fontSize: 16}}>
                    End Date
                  </Text>
                )}
                <Image
                  source={images.ic_calender}
                  style={{}}
                  width={wp(5)}
                  height={wp(5)}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {photos && photos.length > 0 ? (
              <View style={styles.photoReferenceView}>
                <ScrollView
                  contentContainerStyle={{alignSelf: 'stretch', minHeight: 95}}
                  horizontal>
                  {photos.map((photo, i) => {
                    const photo_src = photo && photo.uri ? photo : {uri: photo};
                    return (
                      <Image key={i} style={styles.img} source={photo_src} />
                    );
                  })}
                </ScrollView>
                <Button
                  title={'+'}
                  style={{
                    width: 60,
                    position: 'absolute',
                    right: 5,
                    bottom: 25,
                  }}
                  bgColor={colors.app_dark_grey}
                  onPress={() => this.selectPhoto()}
                />
              </View>
            ) : (
              <View style={styles.photoReferenceView}>
                <Text style={styles.photoText}>Photos</Text>
                <Button
                  title={'Upload'}
                  style={styles.uploadBtn}
                  bgColor={colors.app_ruby}
                  onPress={() => this.selectPhoto()}
                />
              </View>
            )}
          </View>

          {/*====> Button View <====*/}

          <View style={styles.btnView}>
            {this.state.isEditMode && (
              <Button
                title="Delete"
                bgColor="#cccccc"
                titleStyle={{color: colors.black}}
                onPress={() => this.clickDel()}
              />
            )}
            <Button
           
            title="Proceed" onPress={() => this.clickAdd()} />
          </View>
        </View>

        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          value={this.state.initDate}
          //maximumDate={new Date()}
          onConfirm={(data) => {
            if (this.state.whichDate == 'start') {
              this.setState({startDate: data, isDatePickerVisible: false});
            } else {
              this.setState({endDate: data, isDatePickerVisible: false});
            }
          }}
          onCancel={() => {
            this.setState({isDatePickerVisible: false});
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  profile: state.user.profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(JobAdd);
