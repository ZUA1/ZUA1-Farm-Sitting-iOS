
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'
import { Alert } from 'react-native';

export const sendPushNotification = async (user_uid, title, body, data) => {
    if (user_uid) {
        firestore()
            .collection(`users`)
            .doc(`${user_uid}`)
            .get()
            .then((doc) => {
                if (doc) {
                    const user_data = doc.data()
                    const fcm_token = user_data && user_data.fcm_token
                    if (fcm_token) {
                        firestore()
                            .collection('notifications')
                            .add({
                                fcm_token, title, body, data
                            })
                            .then(() => {

                            });
                    }
                }
            })
    }
}

export const createUserByData = async (user_id, user_type, providerData) => {
    //debugger;
    if (!user_type || !providerData) {
        return Promise.reject('wrong parameter');
    }
    const user_profile = {
        type: user_type,
        createat: moment().valueOf(),
        ...providerData,
        public_first_name: true,
        public_last_name: true,
        public_address: false,
        public_phone: true,
        notification: true,
    }
    return firestore()
        .collection(`users`)
        .doc(user_id)
        .set(user_profile)
        .then((res) => {
            console.log('User added!:', res);
            return Promise.resolve(user_profile);
        })
        .catch(err => {
            console.log('# signup err:', err);
            return Promise.reject(err);
        });
}

export const createFarmByUser = async (uid, user_data) => {
    if (uid && user_data) {
        const farm = {
            owner_email: user_data.email
        };
    
        const res = await firestore()
            .collection(`farms`)
            .doc(uid)
            .set(farm)
            .catch(err => {
                console.log("error while creating farm",err)
            });

        if (res) {
            return Promise.resolve(res)
        } else {
            return Promise.reject('farm creating error');
        }
    } else {
        return Promise.reject('farm wrong parameter');
    }
}
