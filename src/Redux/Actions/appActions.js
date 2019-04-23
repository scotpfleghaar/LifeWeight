import {
    ADD_WEIGHT_RECORD,
    FETCH_WEIGHT_RECORDS,
    EDIT_WEIGHT_RECORD,
    DELETE_WEIGHT_RECORD,
    DELETE_ALL_RECORDS_PERMINANT,
    UPDATE_GOAL_WEIGHT
} from "../../../Constants";
import firebase from 'firebase'
import {AsyncStorage} from 'react-native';

const GOAL_WEIGHT = 'GOAL_WEIGHT';

export const _storeData = async (userId, records) => {
    if (!userId) return null;
    try {
        await AsyncStorage.setItem(userId, JSON.stringify(records));
        // weightRecordsDispatch(records);
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

export const _storeGoalWeight = async (goalWeight, uid) => {
    if (!goalWeight) return null;
    try {
        await AsyncStorage.setItem(`${GOAL_WEIGHT}-${uid}`, JSON.stringify(goalWeight));
        // goalWeightDispatch(goalWeight)
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
        uid: 'lifeWeight'
    });
    callBack && callBack();
};


export const weightRecordsFetch = (callBack) => (dispatch) => {
    _retrieveData('lifeWeight').then((response) => {
        dispatch({
            type: FETCH_WEIGHT_RECORDS,
            payload: response,
            uid: 'lifeWeight'
        });
        _retrieveGoalWeight('lifeWeight').then((weight) => {
            dispatch({
                type: UPDATE_GOAL_WEIGHT,
                payload: weight,
                uid: 'lifeWeight'
            });
            callBack && callBack();
        });
    });
    // const {currentUser} = firebase.auth();
    // firebase.database().ref(`/users/${currentUser.uid}/records`).once("value", snapshot => {
    //     dispatch({
    //         type: FETCH_WEIGHT_RECORDS,
    //         payload: snapshot.val(),
    //         uid: firebase.auth().currentUser.uid
    //     });
    //     _retrieveGoalWeight(currentUser.uid).then((weight) => {
    //         dispatch({
    //             type: UPDATE_GOAL_WEIGHT,
    //             payload: weight,
    //             uid: firebase.auth().currentUser.uid
    //         });
    //     });
    //     callBack && callBack();
    // }, () => {
    //     _retrieveData(currentUser.uid).then((response) => {
    //         dispatch({
    //             type: FETCH_WEIGHT_RECORDS,
    //             payload: response,
    //             uid: firebase.auth().currentUser.uid
    //         });
    //         callBack && callBack();
    //     })
    // })
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
        uid: 'lifeWeight'
    });
};

export const recordDelete = (entryId, callBack) => (dispatch) => {
    callBack && callBack();
    dispatch({
        type: DELETE_WEIGHT_RECORD,
        payload: entryId,
        uid: 'lifeWeight'
    });
};

export const deleteAllRecordsPERMINANTLY = (entryId, callBack) => (dispatch) => {
    callBack && callBack();
    dispatch({
        type: DELETE_ALL_RECORDS_PERMINANT,
        payload: entryId,
        uid: 'lifeWeight'
    });
};


export const updateGoalWeight = (goalWeight, callBack) => (dispatch) => {
    callBack && callBack();
    dispatch({
        type: UPDATE_GOAL_WEIGHT,
        payload: goalWeight,
        uid: 'lifeWeight'
    });
};