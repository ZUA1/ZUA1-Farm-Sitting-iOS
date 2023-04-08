//================================ React Native Imported Files ======================================//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Text, Image, StatusBar} from 'react-native';
import React from 'react';
import DocumentPicker from 'react-native-document-picker';

//================================ Local Imported Files ======================================//

import AppHeader from '../../../../../Components/AppHeader';
import colors from '../../../../../../assets/colors';
import images from '../../../../../../assets/images';
import styles from './Styles';
import Button from '../../../../../Components/Button/Button';
import {makeid} from '../../../../../utils/utils';

import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

class AttachDocumentScreen extends React.Component {
  constructor(props) {
    super(props);
    //================================ Dummy Text ======================================//
    this.state = {
      spinner: false,
      doc1_files: [],
      doc2_files: [],
      doc3_files: [],
      doc4_files: [],
    };
  }

  async clickDocumentButton(doc_num) {
    // Pick multiple files
    try {
      const results = await DocumentPicker.pickMultiple({
        type:
          doc_num == 1
            ? [DocumentPicker.types.pdf]
            : [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      let file_paths = [];
      for (const res of results) {
        let file_url = res.fileCopyUri;
        if (!file_url.startsWith('file://')) {
          file_url = 'file://' + file_url;
        }
        file_paths.push(file_url);
      }
      console.log('# file_paths:', file_paths);
      const setobj = {};
      setobj['doc' + doc_num + '_files'] = file_paths;
      this.setState(setobj);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log('# err:', err);
        //throw err;
      }
    }
  }

  checkValidFiles() {
    if (this.state.doc1_files.length < 1) return false;
    if (this.state.doc2_files.length < 1) return false;
    if (this.state.doc3_files.length < 1) return false;
    if (this.state.doc4_files.length < 1) return false;
    return true;
  }

  async doUpload() {
    const self = this;
    const user_id = this.props.user.uid;

    this.setState({spinner: true});

    let new_docs_1 = [];
    for (let doc of this.state.doc1_files)
      try {
        if (doc.startsWith('http')) {
          new_docs_1.push(doc);
          continue;
        }
        const fname = '' + Date.now() + '_' + makeid(12);
        const ext = doc.split('.').pop();
        const reference = storage().ref('users/docs/' + fname + '.' + ext);
        const resp_doc = await reference.putFile(doc);
        let new_url = await reference.getDownloadURL();
        new_docs_1.push(new_url);
      } catch {
        (err) => {
          console.log('# doc1 upload err', err);
        };
      }

    let new_docs_2 = [];
    for (let doc of this.state.doc2_files)
      try {
        if (doc.startsWith('http')) {
          new_docs_2.push(doc);
          continue;
        }
        const fname = '' + Date.now() + '_' + makeid(12);
        const ext = doc.split('.').pop();
        const reference = storage().ref('users/docs/' + fname + '.' + ext);
        const resp_doc = await reference.putFile(doc);
        let new_url = await reference.getDownloadURL();
        new_docs_2.push(new_url);
      } catch {
        (err) => {
          console.log('# doc2 upload err', err);
        };
      }

    let new_docs_3 = [];
    for (let doc of this.state.doc3_files)
      try {
        if (doc.startsWith('http')) {
          new_docs_3.push(doc);
          continue;
        }
        const fname = '' + Date.now() + '_' + makeid(12);
        const ext = doc.split('.').pop();
        const reference = storage().ref('users/docs/' + fname + '.' + ext);
        const resp_doc = await reference.putFile(doc);
        let new_url = await reference.getDownloadURL();
        new_docs_3.push(new_url);
      } catch {
        (err) => {
          console.log('# doc3 upload err', err);
        };
      }

    let new_docs_4 = [];
    for (let doc of this.state.doc4_files)
      try {
        if (doc.startsWith('http')) {
          new_docs_4.push(doc);
          continue;
        }
        const fname = '' + Date.now() + '_' + makeid(12);
        const ext = doc.split('.').pop();
        const reference = storage().ref('users/docs/' + fname + '.' + ext);
        const resp_doc = await reference.putFile(doc);
        let new_url = await reference.getDownloadURL();
        new_docs_4.push(new_url);
      } catch {
        (err) => {
          console.log('# doc4 upload err', err);
        };
      }

    this.setState({
      doc1_files: new_docs_1,
      doc2_files: new_docs_2,
      doc3_files: new_docs_3,
      doc4_files: new_docs_4,
    });

   // console.log(new_docs_1, new_docs_2, new_docs_3, new_docs_4);
 
    firestore()
      .collection(`users`)
      .doc(user_id)
      .collection(`docs`)
      .add({
        docs1: new_docs_1,
        docs2: new_docs_2,
        docs3: new_docs_3,
        docs4: new_docs_4,
        created: new Date().valueOf(),
      })
      .then((snapshot) => {
        //console.log('# res:', snapshot);
        self.updateUserForDoc();
      })
      .catch((err) => {
        self.setState({spinner: false});
        setTimeout(() => {
          alert('failed adding documment! : ' + JSON.stringify(err));
        }, 100);
      });
  }

  updateUserForDoc() {
    const self = this;
    const user_id = this.props.user.uid;
    firestore()
      .collection(`users`)
      .doc(user_id)
      .update({
        seller_status: '_pending',
      })
      .then(() => {
        //self.props.navigation.navigate('drawer');
        self.setState({spinner: false}, () => {
          setTimeout(() => {
            MessageBarManager.showAlert({
              title: '',
              message: 'Successfully added!',
              alertType: 'success',
            });
            //self.props.navigation.goBack();
            //self.props.navigation.navigate('drawer');
            console.log("seller_status added.")
            self.props.navigation.navigate('EditProfile');
          }, 100);
        });
      })
      .catch((err) => {
        console.log('# fetchPersonInfo err:', err);
        //alert(JSON.stringify(err));
        this.setState({spinner: false});
      });
  }
componentDidMount(){
  const user_id = this.props.user.uid;
  const farm = {
    owner_email: 'seller@gmail.com'
};
  firestore()
          .collection(`farms`)
          .doc(user_id)
          .set(farm)
          .catch(err => {
              console.log("error while creating farm",err)
          });
}
  render() {
    return (
      <View style={styles.mainContainer}>
        {/* //================================ StatusBar ======================================// */}
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.appDarkBlue}
          translucent={false}
        />
        {/* //================================ Header ======================================// */}
        <View style={styles.headerView}>
          <AppHeader
            title={'Application'}
            leftIconPath={images.ic_back}
            onLeftIconPress={() => this.props.navigation.navigate('SignupWith')}
          />
        </View>
        {/* //================================ Bottom Container ======================================// */}
        <View style={styles.container}>
          <Text style={styles.textContainer}>Application Details</Text>
          <View style={{paddingVertical: 20}}>
            <View style={styles.btnContainer}>
              {this.state.doc1_files.length > 0 ? (
                <Image style={styles.iconAct} source={images.ic_check} />
              ) : (
                <Image style={styles.icon} source={images.ic_doc} />
              )}
              <Button
                title={'Upload Proof of Residency'}
                onPress={() => this.clickDocumentButton(1)}
              />
            </View>
            <View style={styles.btnContainer}>
              {this.state.doc2_files.length > 0 ? (
                <Image style={styles.iconAct} source={images.ic_check} />
              ) : (
                <Image style={styles.icon} source={images.ic_doc} />
              )}
              <Button
                title={'Upload Farm/Home Images'}
                onPress={() => this.clickDocumentButton(2)}
              />
            </View>
            <View style={styles.btnContainer}>
              {this.state.doc3_files.length > 0 ? (
                <Image style={styles.iconAct} source={images.ic_check} />
              ) : (
                <Image style={styles.icon} source={images.ic_doc} />
              )}
              <Button
                title={'Upload Animal Images'}
                onPress={() => this.clickDocumentButton(3)}
              />
            </View>
            <View style={styles.btnContainer}>
              {this.state.doc4_files.length > 0 ? (
                <Image style={styles.iconAct} source={images.ic_check} />
              ) : (
                <Image style={styles.icon} source={images.ic_doc} />
              )}
              <Button
              
                title={'Upload pictures of other\nservices needed'}
                onPress={() => this.clickDocumentButton(4)}
              />
            </View>
          </View>

          <View style={{paddingBottom: 20}}>
            <Text>
              You won't be able to continue until the admin verifies your
              account.
            </Text>
          </View>

          <View>
            {this.checkValidFiles() ? (
              <Button title="Submit" onPress={() => this.doUpload()} />
            ) : (
              <Button title="Submit" bgColor={colors.app_light_grey} />
            )}
            {/* <Button title="Cancel" bgColor={colors.dark_orange} /> */}
          </View>
        </View>
        <Spinner
          visible={this.state.spinner}
          //textContent={'Wait...'}
          textStyle={{color: 'white'}}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttachDocumentScreen);
