import {
    ADD_WEIGHT_RECORD,
    FETCH_WEIGHT_RECORDS,
    EDIT_WEIGHT_RECORD,
    DELETE_WEIGHT_RECORD,
    DELETE_ALL_RECORDS_PERMINANT,
    UPDATE_GOAL_WEIGHT,
    PREMIUM_USER
} from "../../../Constants";
import firebase from 'firebase'
import {AsyncStorage} from 'react-native';
import InAppBilling from "react-native-billing";

const GOAL_WEIGHT = 'GOAL_WEIGHT';

export const _storeData = async (userId, records, isUserPremium = false) => {
    if (!userId) return null;
    try {
        await AsyncStorage.setItem(userId, JSON.stringify(records));
        isUserPremium && weightRecordsDispatch(records);
    } catch (error) {
        console.log('_storeData', error)
    }
};

const _retrieveData = async (userId) => {
    try {
        const value = await AsyncStorage.getItem(userId);
        if (value !== null) {
            return JSON.parse(value)
        }
    } catch (error) {
        console.log('_retrieveData', error)
    }
};

export const _storeGoalWeight = async (goalWeight, uid, isUserPremium = false) => {
    if (!goalWeight) return null;
    try {
        await AsyncStorage.setItem(`${GOAL_WEIGHT}-${uid}`, JSON.stringify(goalWeight));
        isUserPremium && goalWeightDispatch(goalWeight)
    } catch (error) {
        console.log('_storeGoalWeight', error)
    }
};

const _retrieveGoalWeight = async (uid) => {
    try {
        const value = await AsyncStorage.getItem(`${GOAL_WEIGHT}-${uid}`);
        if (value !== null) {
            return JSON.parse(value)
        }
    } catch (error) {
        console.log('_retrieveGoalWeight', error)
    }
};

export const addWeightRecord = (weight, date, userWeightGage, dateEnteredWeek, callBack) => (dispatch) => {
    // Make Firebase Call
    // Get a key for a new Post.
    const newPostKey = '_' + Math.random().toString(36).substr(2, 9);
    // A post entry.
    const postData = {
        weight,
        date,
        dateEnteredWeek,
        userWeightGage,
        entryId: newPostKey
    };
    dispatch({
        type: ADD_WEIGHT_RECORD,
        payload: postData,
        uid: firebase.auth().currentUser.uid
    });
    callBack && callBack();
};


export const weightRecordsFetch = (callBack) => async (dispatch) => {
    const {currentUser} = firebase.auth();
     let isUserPremium;

    const checkSubscription = async () => {
        try {
            await InAppBilling.open();
            // If subscriptions/products are updated server-side you
            // will have to update cache with loadOwnedPurchasesFromGoogle()
            await InAppBilling.loadOwnedPurchasesFromGoogle();
            return await InAppBilling.isSubscribed("android.test.purchased")
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            try {
                await InAppBilling.close();
            } catch(err) {
                console.log(err);
            } finally {
                return false;
            }
        }
    }
    console.log( await checkSubscription());
    isUserPremium = await checkSubscription();
    console.log('isUserPremium', isUserPremium)
    if (isUserPremium) {
        firebase.database().ref(`/users/${currentUser.uid}/records`).once("value", snapshot => {
            dispatch({
                type: FETCH_WEIGHT_RECORDS,
                payload: snapshot.val(),
                uid: firebase.auth().currentUser.uid
            });
            _retrieveGoalWeight(currentUser.uid).then((weight) => {
                dispatch({
                    type: UPDATE_GOAL_WEIGHT,
                    payload: weight,
                    uid: firebase.auth().currentUser.uid
                });
            });
            callBack && callBack();
        }, () => {
            _retrieveData(currentUser.uid).then((response) => {
                dispatch({
                    type: FETCH_WEIGHT_RECORDS,
                    payload: response,
                    uid: firebase.auth().currentUser.uid
                });
                callBack && callBack();
            })
        })
    } else {
         _retrieveGoalWeight(currentUser.uid).then((weight) => {
                dispatch({
                    type: UPDATE_GOAL_WEIGHT,
                    payload: weight,
                    uid: firebase.auth().currentUser.uid
                });
            });
        _retrieveData(currentUser.uid).then((response) => {
            dispatch({
                type: FETCH_WEIGHT_RECORDS,
                payload: response,
                uid: firebase.auth().currentUser.uid
            });
            callBack && callBack();
        })
    }
     dispatch({
        type: PREMIUM_USER,
        payload: isUserPremium,
        uid: firebase.auth().currentUser.uid
    });
};

export const weightRecordsDispatch = (records) => {
    const {currentUser} = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/records`).set(records).then(() => {
        console.log('weightRecordsDispatch Success')
    }).catch((err) => {
        console.log(err.message)
    })
};

export const goalWeightFetch = (callBack) => (dispatch) => {
    const {currentUser} = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/goalWeight`).once("value", snapshot => {
        dispatch({
            type: UPDATE_GOAL_WEIGHT,
            payload: snapshot.val(),
            uid: firebase.auth().currentUser.uid
        });
        callBack && callBack();
    }, () => {
        _retrieveGoalWeight(currentUser.uid).then((response) => {
            dispatch({
                type: UPDATE_GOAL_WEIGHT,
                payload: response,
                uid: firebase.auth().currentUser.uid
            });
            callBack && callBack();
        })
    })
};

export const storePurchaseFirebase = (device, reciept) => {
      const {currentUser} = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/${device}-reciept`).set(reciept).then(() => {
            console.log('goalWeightDispatch Success')
        }).catch((err) => {
            console.log(err.message)
        })
};

export const goalWeightDispatch = (goalWeight) => {
    const {currentUser} = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/goalWeight`).set(goalWeight).then(() => {
        console.log('goalWeightDispatch Success')
    }).catch((err) => {
        console.log(err.message)
    })
};

export const editWeightRecord = (weight, date, userWeightGage, entryId, dateEnteredWeek, callBack) => (dispatch) => {
    const postData = {
        weight,
        date,
        dateEnteredWeek,
        userWeightGage,
        entryId
    };
    callBack && callBack();
    dispatch({
        type: EDIT_WEIGHT_RECORD,
        payload: postData,
        uid: firebase.auth().currentUser.uid
    });
};

export const recordDelete = (entryId, callBack) => (dispatch) => {
    callBack && callBack();
    dispatch({
        type: DELETE_WEIGHT_RECORD,
        payload: entryId,
        uid: firebase.auth().currentUser.uid
    });
};

export const deleteAllRecordsPERMINANTLY = (entryId, callBack) => (dispatch) => {
    callBack && callBack();
    dispatch({
        type: DELETE_ALL_RECORDS_PERMINANT,
        payload: entryId,
        uid: firebase.auth().currentUser.uid
    });
};


export const updateGoalWeight = (goalWeight, callBack) => (dispatch) => {
    callBack && callBack();
    dispatch({
        type: UPDATE_GOAL_WEIGHT,
        payload: goalWeight,
        uid: firebase.auth().currentUser.uid
    });
};