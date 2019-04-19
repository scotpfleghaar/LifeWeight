import {
    ADD_WEIGHT_RECORD,
    FETCH_WEIGHT_RECORDS,
    EDIT_WEIGHT_RECORD,
    DELETE_WEIGHT_RECORD
} from "../../../Constants";
import firebase from 'firebase'
import { values } from 'lodash'
import { AsyncStorage } from 'react-native';

const WEIGHT_RECORDS = 'WEIGHT_RECORDS';

export const _storeData = async (records) => {
    try {
        await AsyncStorage.setItem(WEIGHT_RECORDS, JSON.stringify(records));
    } catch (error) {
        console.log('_storeData', error)
    }
};

const _retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem(WEIGHT_RECORDS);
        if (value !== null) {
            console.log('_retrieveData', JSON.parse(value));
            return JSON.parse(value)
        }
    } catch (error) {
        console.log('_retrieveData', error)
    }
};

export const addWeightRecord = (weight, date, userWeightGage, callBack) => (dispatch) => {
    // Make Firebase Call

    const userId = firebase.auth().currentUser.uid;

    // Get a key for a new Post.
    const newPostKey = firebase.database().ref().child('records').push().key;
    // A post entry.
    const postData = {
        weight,
        date,
        userWeightGage,
        entryId: newPostKey
    };

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    // updates['/records/' + newPostKey] = postData;
    updates['/users/' + userId + '/records/' + newPostKey] = postData;

    firebase.database().ref().update(updates).then(function (snapshot) {
        dispatch({
            type: ADD_WEIGHT_RECORD,
            payload: postData
        });
        callBack && callBack("Weight Added!");
    }).catch(err => {
        console.log(err.message);
        dispatch({
            type: ADD_WEIGHT_RECORD,
            payload: postData
        });
        callBack && callBack("Weight Added!");
    });
};


export const weightRecordsFetch = (callBack) => {
    const {currentUser} = firebase.auth();
    callBack && callBack();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/records`).on("value", snapshot => {
            dispatch({
                type: FETCH_WEIGHT_RECORDS,
                payload: snapshot.val()
            });
        }, () => {
            _retrieveData().then((response)=>{
                dispatch({
                    type: FETCH_WEIGHT_RECORDS,
                    payload: response
                });
            })
        })
    };
};

export const editWeightRecord = (weight, date, userWeightGage, entryId, callBack) => (dispatch) => {
    const {currentUser} = firebase.auth();
    const postData = {
        weight,
        date,
        userWeightGage,
        entryId
    };
    callBack && callBack();
    firebase.database().ref(`/users/${currentUser.uid}/records/${entryId}`).set(postData).then(() => {
        dispatch({
            type: EDIT_WEIGHT_RECORD,
            payload: postData
        });
    }).catch(err => {
        dispatch({
            type: EDIT_WEIGHT_RECORD,
            payload: postData
        });
    });
};

 export const recordDelete = (entryId, callBack) => (dispatch) => {
    const {currentUser} = firebase.auth();
     callBack && callBack();

     firebase.database().ref(`/users/${currentUser.uid}/records/${entryId}`).remove().then(() => {
         dispatch({
             type: DELETE_WEIGHT_RECORD,
             payload: entryId
         });
    }).catch(err => {
         dispatch({
             type: DELETE_WEIGHT_RECORD,
             payload: entryId
         });
    });
};

// export const employeeUpdate = ({prop, value}) => {
//     return {
//         type: EMPLOYEE_UPDATE,
//         payload: {prop, value}
//     }
// };
//
// export const employeeCreate = ({name, phone, shift}) => {
//     const {currentUser} = firebase.auth();
//     return () => {
//         firebase.database().ref(`/users/${currentUser.uid}/employees`).push({name, phone, shift}).then(() => {
//             Actions.pop();
//             return {
//                 type: EMPLOYEE_CREATE
//             };
//         });
//     };
// };
//
// export const employeesFetch = () => {
//     const {currentUser} = firebase.auth();
//     return (dispatch) => {
//         firebase.database().ref(`/users/${currentUser.uid}/employees`).on("value", snapshot => {
//             dispatch({
//                 type: EMPLOYEES_FETCH_SUCCESS,
//                 payload: snapshot.val()
//             })
//         });
//     };
// };
//
// export const employeeEdit = ({name, phone, shift, uid}) => {
//     const {currentUser} = firebase.auth();
//     return () => {
//         firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`).set({name, phone, shift}).then(() => {
//             Actions.pop();
//             return {
//                 type: EMPLOYEE_EDIT
//             };
//         });
//     };
// };
//
// export const recordDelete = ({uid}) => {
//     const {currentUser} = firebase.auth();
//     return () => {
//         firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`).remove().then(() => {
//             Actions.pop();
//             return {
//                 type: EMPLOYEE_EDIT
//             };
//         });
//     };
// };
