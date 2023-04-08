import createReducer, { RESET_STORE } from '../createReducer'
import firestore from '@react-native-firebase/firestore';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';

export const UPDATE_USER = 'User.UPDATE_USER'
export const GET_MYCART = 'User.GET_MYCART'
export const SET_CHANNELS = 'User.SET_CHANNELS'
export const UPDATE_USER_PROFILE = 'User.UPDATE_USER_PROFILE'
export const SET_LOCATION = 'User.SET_LOCATION'
export const SET_MONITOREDAREA = 'User.SET_MONITOREDAREA'
export const SET_MONITOREDINCIDENTS= 'User.SET_MONITOREDINCIDENTS'
export const CLEAR_INCIDENT = 'User.CLEAR_INCIDENT'
export const CLEAR = 'User.CLEAR'

var carts_subscribe = null
// ------------------------------------
// Actions
// ------------------------------------
export const loadMyCart = (uid) => (dispatch, getState) => {
    carts_subscribe = firestore()
        .collection('users')
        .doc(uid)
        .collection('carts')
        .onSnapshot((querySnapshot) => {
            if (querySnapshot) {
                const carts = [];
                querySnapshot && querySnapshot.forEach(documentSnapshot => {
                    carts.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                return dispatch({ type: GET_MYCART, carts })
            }
        });
}
export const updateUser = (user) => (dispatch, getState) => {
    if (user && user.uid)
        dispatch(loadMyCart(user.uid))
    else carts_subscribe && carts_subscribe()

    return dispatch({ type: UPDATE_USER, user })
}
export const updateUserProfile = (profile) => (dispatch, getState) => {
    return dispatch({ type: UPDATE_USER_PROFILE, profile })
}
export const setChannels = (channels) => (dispatch, getState) => {
    return dispatch({ type: SET_CHANNELS, channels })
}
export const updateFCMToken = () => async (dispatch, getState) => {
    const { user } = getState().user
    if (user && user.uid) {
        const fcm_token = await messaging().getToken();
        console.log("#updateFCMToken:", fcm_token)
        if (fcm_token) {
            const profile_doc = firestore().collection('users').doc(user.uid)
            profile_doc.update({
                fcm_token
            })
                .then((res) => {

                })
        }
    }
}
export const setLocation = (location) => (dispatch, getState) => {
    return dispatch({ type: SET_LOCATION, location })
}
export const setMonitoredArea = (monitoredArea) => (dispatch, getState) => {
    return dispatch({ type: SET_MONITOREDAREA, monitoredArea })
}
export const setMonitoredIncidents = (m_incidents) => (dispatch, getState) => {
    return dispatch({ type: SET_MONITOREDINCIDENTS, m_incidents })
}
export const clearIncident = () => (dispatch, getState) => {
    const { clear_incident } = getState().user
    return dispatch({ type: CLEAR_INCIDENT, clear_incident: !clear_incident })
}
export const clear = () => ({ type: CLEAR })

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    user: null,
    profile: null,
    carts: [],
    channels: [],
    location: null,
    clear_incident: false,
    monitoredArea: null,
    m_incidents: []
}

export default createReducer(initialState, {
    [SET_MONITOREDINCIDENTS]: (state, { m_incidents }) => ({
        m_incidents
    }),
    [SET_MONITOREDAREA]: (state, { monitoredArea }) => ({
        monitoredArea
    }),
    [CLEAR_INCIDENT]: (state, { clear_incident }) => ({
        clear_incident
    }),
    [SET_LOCATION]: (state, { location }) => ({
        location
    }),
    [UPDATE_USER]: (state, { user }) => ({
        user
    }),
    [UPDATE_USER_PROFILE]: (state, { profile }) => ({
        profile
    }),
    [GET_MYCART]: (state, { carts }) => ({
        carts
    }),
    [SET_CHANNELS]: (state, { channels }) => ({
        channels
    }),
    [CLEAR]: (state, action) => RESET_STORE,
})
