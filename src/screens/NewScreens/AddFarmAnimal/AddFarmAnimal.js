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
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {makeid} from '../../../utils/utils';

const DefaultKindArray = Array.from(Array(9).keys()).map(
  (i) => 'kind ' + (1 + i),
);
const DefaultAgeArray = Array.from(Array(99).keys()).map(
  (i) => 1 + i + ' years old',
);

export default class AddFarmAnimal extends React.Component {
  //====> Constructor Method <====//

  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      name: '',
      kind_idx: -1,
      age_idx: -1,
      note: '',
      photos: [],
      kinds: [],
      isEditMode: false,
      breed: '',
    };
  }

  componentDidMount() {
    this.fetchlinked();
  }

  fetchlinked() {
    const farm_id = this.props.route.params?.farm_id;
    const animal_id = this.props.route.params?.animal_id;

    const isEditMode = farm_id && animal_id;
    this.setState({isEditMode});

    firestore()
      .collection('animal_kinds')
      //.orderBy('name', 'asc')
      .get()
      .then((res) => {
        console.log('# animal_kinds:', res.docs);
        var docs = res.docs;
        if (docs && docs.length > 0) {
          var kinds = [];
          docs.forEach((doc) => {
            var d = doc.data();
            kinds.push(d.name);
            console.log({kinds});
          });
          this.setState({kinds: kinds});
        }
      })
      .catch((err) => {
        console.log('# animal_kinds err:', err);
      });

    if (!isEditMode) return;

    this.setState({spinner: true});

    firestore()
      .collection('farms')
      .doc(farm_id)
      .collection('animals')
      .doc(animal_id)
      .get()
      .then((doc) => {
        const animal_data = doc.data();
        if (animal_data) {
          this.setState({
            name: animal_data.name,
            kind_idx: this.state.kinds.indexOf(animal_data.kind),
            age_idx: DefaultAgeArray.indexOf(animal_data.age),
            note: animal_data.note,
            photos: animal_data.photos,
            breed: animal_data.breed,
          });
        }
        this.setState({spinner: false});
      })
      .catch((err) => {
        console.log('#err:', err);
        this.setState({spinner: false});
      });
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

  clickDel() {
    const self = this;
    const farm_id = self.props.route.params?.farm_id;
    const animal_id = self.props.route.params?.animal_id;
    if (!farm_id || !animal_id || !this.state.isEditMode) {
      console.log('No farm or animal id');
      return;
    }
    Alert.alert(
      'Delete',
      'Are you sure to delete this animal?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            firestore()
              .collection(`farms`)
              .doc(farm_id)
              .collection(`animals`)
              .doc(animal_id)
              .delete()
              .then((res) => {
                self.props.navigation.goBack();
              });
          },
        },
      ],
      {cancelable: false},
    );
  }

  async clickAdd() {
    const self = this;
    const farm_id = this.props.route.params?.farm_id;
    const animal_id = this.props.route.params?.animal_id;
    if (!farm_id) {
      console.log('No farm');
      return;
    }

    const {name, kind_idx, age_idx, note, photos, isEditMode, breed} =
      this.state;

    if (!name || !note || age_idx < 0 || !breed) {
      alert('Please fill informations!');
      return;
    }

    this.setState({spinner: true});

    let new_photos = [];
    for (let p of photos) {
      if (p && p.uri)
        try {
          const fname = '' + Date.now() + '_' + makeid(12);
          const ext = p.uri.split('.').pop();
          const reference = storage().ref('farm/animals/' + fname + '.' + ext);
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

    if (isEditMode) {
      firestore()
        .collection(`farms`)
        .doc(farm_id)
        .collection(`animals`)
        .doc(animal_id)
        .update({
          name,
          kind: this.state.kinds[kind_idx],
          age: DefaultAgeArray[age_idx],
          note,
          photos: new_photos,
          breed,
        })
        .then((snapshot) => {
          console.log('# res:', snapshot);
          self.setState({spinner: false}, () => {
            setTimeout(() => {
              MessageBarManager.showAlert({
                title: '',
                message: 'Successfully updated!',
                alertType: 'success',
              });
              self.props.navigation.goBack();
            }, 100);
          });
        })
        .catch((err) => {
          self.setState({spinner: false});
          setTimeout(() => {
            alert('failed update animal! : ' + JSON.stringify(err));
          }, 100);
        });
      return;
    }

    firestore()
      .collection(`farms`)
      .doc(farm_id)
      .collection(`animals`)
      .add({
        name,
        kind: this.state.kinds[kind_idx],
        age: DefaultAgeArray[age_idx],
        note,
        photos: new_photos,
        breed,
      })
      .then((snapshot) => {
        console.log('# res:', snapshot);
        self.setState({spinner: false}, () => {
          setTimeout(() => {
            MessageBarManager.showAlert({
              title: '',
              message: 'Successfully created!',
              alertType: 'success',
            });
            self.props.navigation.goBack();
          }, 100);
        });
      })
      .catch((err) => {
        self.setState({spinner: false});
        setTimeout(() => {
          alert('failed adding animal! : ' + JSON.stringify(err));
        }, 100);
      });
  }

  render() {
    //const farm_id = this.props.route.params?.farm_id;

    const {name, kind_idx, age_idx, note, photos, breed} = this.state;
    return (
      <View style={styles.mainContainer}>
        {/*====> Header View <====*/}

        <View style={styles.headerView}>
          <AppHeader
            title={
              this.state.isEditMode ? 'Edit Farm Animal' : 'Add Farm Animal'
            }
            // lefticonSize={20}
            leftIconPath={images.ic_back}
            rightIconOnePath={images.ic_sort_1}
            onLeftIconPress={() => this.props.navigation.goBack()}
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
              onChangeText={(value) =>
                this.setState({
                  name: value,
                })
              }
            />

            {/*====> DropDown View <====*/}
            <AppInput
              placeholder={'Breed'}
              placeholderTextColor={colors.placeholder_color}
              textInputColor={colors.deep_grey}
              value={breed}
              onChangeText={(value) =>
                this.setState({
                  breed: value,
                })
              }
            />
            {/* <View style={styles.dropdownView}>
              <Dropdown
                listViewWidth={'90%'}
                // options={DefaultKindArray}
                options={this.state.kinds}
                tintColor={colors.app_ruby}
                dropdownStyle={{height: '100%', width: '100%'}}
                dropdownOptionsStyle={{
                  width: '91.5%',
                  marginRight: '14.5%',
                  marginTop: '6%',
                }}
                buttonTextColor={colors.deep_grey}
                buttonTextStyle={{
                  color:
                    kind_idx < 0 ? colors.placeholder_color : colors.deep_grey,
                }}
                defaultButtontext={
                  kind_idx < 0 ? 'Breed' : this.state.kinds[kind_idx]
                }
                onPress={() => {
                  console.log('# onpress');
                }}
                onSelect={(idx, value) => {
                  console.log('#kind_idx:', idx);
                  console.log('#kind_val:', value);
                  this.setState({kind_idx: idx});
                }}
              />
            </View> */}

            <View style={[styles.dropdownView, {marginTop: 5}]}>
              <Dropdown
                listViewWidth={'90%'}
                options={DefaultAgeArray}
                tintColor={colors.app_ruby}
                dropdownStyle={{height: '100%', width: '100%'}}
                dropdownOptionsStyle={{
                  width: '91.5%',
                  marginRight: '14.5%',
                  marginTop: '6%',
                }}
                buttonTextColor={colors.deep_grey}
                buttonTextStyle={{
                  color:
                    age_idx < 0 ? colors.placeholder_color : colors.deep_grey,
                }}
                defaultButtontext={
                  age_idx < 0 ? 'Age' : DefaultAgeArray[age_idx]
                }
                onSelect={(value) =>
                  this.setState({
                    age_idx: value,
                  })
                }
              />
            </View>

            <Textarea
              containerStyle={styles.textArea}
              placeholder={'Notes'}
              placeholderTextColor={colors.placeholder_color}
              textInputColor={colors.deep_grey}
              value={note}
              onChangeText={(value) =>
                this.setState({
                  note: value,
                })
              }
            />

            {photos && photos.length > 0 ? (
              <View style={styles.photoReferenceView}>
                <ScrollView
                  //style={{flex:1, width:'100%', alignSelf:'stretch'}}
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
                <Text style={styles.photoText}>Photo Reference</Text>
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
              title={this.state.isEditMode ? 'Save' : 'Add'}
              onPress={() => this.clickAdd()}
            />
          </View>
        </View>

        <Spinner
          visible={this.state.spinner}
          textContent={'Wait...'}
          textStyle={{color: 'white'}}
        />
      </View>
    );
  }
}
