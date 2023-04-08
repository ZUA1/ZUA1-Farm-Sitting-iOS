//====> System files <====//
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View,Text,FlatList,TouchableOpacity,Image,ScrollView} from 'react-native';
import React from 'react';

//====> Local files <====//

import Dropdown from '../../../Components/ModalDropdown';
import AppHeader from "../../../Components/AppHeader";
import images from "../../../../assets/images";
import styles from './style';
import FarmInformationComponent from '../../../Components/AppComponents/FarmInformationComponent/FarmInformationComponent';

import TabsComponent from '../../../Components/TabsComponent';
import CowImageComponent from '../../../Components/AppComponents/CowImageComponent/CowImageComponent';
import ReviewComponent from '../../../Components/AppComponents/ReviewComponent/ReviewComponent';
import MessagesComponent from '../../../Components/AppComponents/MessagesComponent/MessagesComponent';

import Spinner from 'react-native-loading-spinner-overlay';

import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
class Messages extends React.Component {

    //====> Constructor Method <====//

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            listMessages: [],
            /*
            listMessages: [
                {
                    id: 1,
                    avatar: images.avatar,
                    name:'John Williams',
                    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.'
                },
                {
                    id: 2,
                    avatar: images.avatar,
                    name:'John Williams',
                    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.'
                },
            ],
            */

        }
    }

    componentDidMount() {
        const self = this;
        if (!self.props.user) {
            setTimeout(() => {
                //self.props.navigation.pop();
                self.props.navigation.replace('SignupWith');
            }, 100);
        }

        self.fetchChannels();
    }

    componentWillUnmount() {
        this.subscriber && this.subscriber()
    }

    componentWillReceiveProps(nextprops) {
        const job = this.props.route.params?.job;
        //console.log('nextprops?.job', nextprops?.job);
        //console.log('curr?.job', job);
        if (nextprops?.job != job) {
            this.fetchChannels();
        }
    }

    getListFromSnapshot(querySnapshot) {
        if (!querySnapshot) {
            return [];
        }
        const me = this.props.user;
        let listMessages = [];
        querySnapshot.forEach(documentSnapshot => {
            const doc = documentSnapshot.data();
            const other_user_obj = doc?.users?.find(u => u.id != me?.uid);
            if (other_user_obj) {
                listMessages.push({
                    id: documentSnapshot.id,
                    avatar: other_user_obj.avatar,
                    name: other_user_obj.name,
                    //text: other_user_obj.last_msg,
                    text: doc.job_name,
                    lasttime: other_user_obj.last_time,
                    channel: {...doc, key: documentSnapshot.id},
                });
                return false;
            }
        });
        return listMessages;
    }

    sortListMessage(a, b) {
        if(a.lasttime > b.lasttime) return 1;
        if(a.lasttime < b.lasttime) return -1;
        return 0;
    }

    fetchChannels() {
        const self = this;
        const me = this.props.user;
        const job = this.props.route.params?.job;

        this.subscriber && this.subscriber();

        if (job) {
            self.setState({spinner: true});
            self.subscriber = firestore()
                .collection('channel')
                .where('job_id', '==', job.key)
                .onSnapshot(querySnapshot => {
                    console.log('#fetchChannels1:', querySnapshot);

                    if (querySnapshot) {
                        let listMessages = self.getListFromSnapshot(querySnapshot);
                        listMessages.sort(self.sortListMessage);
                        self.setState({spinner: false,listMessages});
                    } else {
                        self.setState({spinner: false});
                    }
                });
        } else {
            self.setState({spinner: true});
            self.subscriber = firestore()
                .collection('channel')
                .where("user_ids", "array-contains-any", [me?.uid])
                .onSnapshot(querySnapshot => {
                    console.log('#fetchChannels2:', querySnapshot);

                    if (querySnapshot) {
                        let listMessages = self.getListFromSnapshot(querySnapshot);
                        listMessages.sort(self.sortListMessage);
                        self.setState({spinner: false, listMessages});
                    } else {
                        self.setState({spinner: false});
                    }
                });
        }
    }

//====> Images Method <====//

    messageComponent(item){
        return(
            <MessagesComponent
                avatar={{uri: item.avatar}}
                name={item.name}
                text={item.text}
                onPress={() => this.props.navigation.navigate('ServiceChat', {channel: item.channel} )}
            />
        )
    }


    render() {
        const job = this.props.route.params?.job;
        return(
            <View style={styles.mainContainer}>

                {/*====> Header View <====*/}

                <View style={styles.headerView}>
                    {job?
                        <AppHeader title={'Messages'}
                                    leftIconPath={images.ic_back}
                                    onLeftIconPress={()=> this.props.navigation.goBack()}
                            // onRightIconPress={()=> this.props.navigation.navigate('SearchScreen')}
                        /> :
                        <AppHeader
                            title={'Messages'}
                            leftIconPath={images.ic_hamburger}
                            onLeftIconPress={()=> this.props.navigation.openDrawer()}
                        />
                    }
                </View>

                {/*====> Container View <====*/}

                <View style={styles.bottomContainer}>
                    {this.state.listMessages?.length > 0 ?
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.listMessages}
                            renderItem={({ item }) => this.messageComponent(item)}
                            keyExtractor={item => '' + item.id}
                        /> :
                        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                            <Text>No messages</Text>
                        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Messages)



