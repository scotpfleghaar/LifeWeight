import {
    ADD_WEIGHT_RECORD,
    FETCH_WEIGHT_RECORDS,
    EDIT_WEIGHT_RECORD,
    DELETE_WEIGHT_RECORD,
    DELETE_ALL_RECORDS_PERMINANT,
    UPDATE_GOAL_WEIGHT
} from "../../../Constants";
import firebase from 'firebase'

// uid: firebase.auth().currentUser.uid;
import {keys} from 'lodash'
import {AsyncStorage} from 'react-native';

const GOAL_WEIGHT = 'GOAL_WEIGHT';

export const _storeData = async (userId, records) => {
    if (!userId) return null;
    try {
        await AsyncStorage.setItem(userId, JSON.stringify(records));
        weightRecordsDispatch(records);
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

export const _storeGoalWeight = async (goalWeight) => {
    if (!goalWeight) return null;
    try {
        await AsyncStorage.setItem(GOAL_WEIGHT, JSON.stringify(goalWeight));
    } catch (error) {
        console.log('_storeGoalWeight', error)
    }
};

const _retrieveGoalWeight = async () => {
    try {
        const value = await AsyncStorage.getItem(GOAL_WEIGHT);
        if (value !== null) {
            return JSON.parse(value)
        }
    } catch (error) {
        console.log('_retrieveGoalWeight', error)
    }
};

export const addWeightRecord = (weight, date, userWeightGage, callBack) => (dispatch) => {
    // Make Firebase Call
    // Get a key for a new Post.
    const newPostKey = '_' + Math.random().toString(36).substr(2, 9);
    // A post entry.
    const postData = {
        weight,
        date,
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


export const weightRecordsFetch = (callBack) => (dispatch) => {
    const {currentUser} = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/records`).once("value", snapshot => {
        dispatch({
            type: FETCH_WEIGHT_RECORDS,
            payload: snapshot.val(),
            uid: firebase.auth().currentUser.uid
        });
        _retrieveGoalWeight().then((weight) => {
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
};

export const weightRecordsDispatch = (records) => {
    const {currentUser} = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/records`).set(records).then(() => {
        console.log('weightRecordsDispatch Success')
    }).catch((err) => {
        console.log(err.message)
    })
};

export const editWeightRecord = (weight, date, userWeightGage, entryId, callBack) => (dispatch) => {
    const postData = {
        weight,
        date,
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
    _storeGoalWeight(goalWeight).then(() => {
        callBack && callBack();
        dispatch({
            type: UPDATE_GOAL_WEIGHT,
            payload: goalWeight,
            uid: firebase.auth().currentUser.uid
        });
    }).catch(() => {
        callBack && callBack();
        dispatch({
            type: UPDATE_GOAL_WEIGHT,
            payload: goalWeight,
            uid: firebase.auth().currentUser.uid
        });
    });
};