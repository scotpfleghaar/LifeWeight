import {
    ADD_WEIGHT_RECORD,
    FETCH_WEIGHT_RECORDS,
    EDIT_WEIGHT_RECORD,
    DELETE_WEIGHT_RECORD
} from "../../../Constants";
import firebase from 'firebase'
import { keys } from 'lodash'
import { AsyncStorage } from 'react-native';

const WEIGHT_RECORDS = 'WEIGHT_RECORDS';

export const _storeData = async (records) => {
    try {
        await AsyncStorage.setItem(WEIGHT_RECORDS, JSON.stringify(records));
        console.log(keys(records));
        weightRecordsDispatch(records);
    } catch (error) {
        console.log('_storeData', error)
    }
};

const _retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem(WEIGHT_RECORDS);
        if (value !== null) {
            return JSON.parse(value)
        }
    } catch (error) {
        console.log('_retrieveData', error)
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
        payload: postData
    });
    callBack && callBack();
};


export const weightRecordsFetch = (callBack) => {
    const {currentUser} = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/records`).on("value", snapshot => {
            console.log('weightRecordsFetch', snapshot.val());
            callBack && callBack();
            if (snapshot.val()) {
                dispatch({
                    type: FETCH_WEIGHT_RECORDS,
                    payload: snapshot.val()
                });
            }
        }, () => {
            _retrieveData().then((response)=>{
                dispatch({
                    type: FETCH_WEIGHT_RECORDS,
                    payload: response
                });
                callBack && callBack();
            })
        })
    };
};

export const weightRecordsDispatch = (records) => {
    const {currentUser} = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/records`).set(records).then(()=> {
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
        payload: postData
    });
};

 export const recordDelete = (entryId, callBack) => (dispatch) => {
     callBack && callBack();
     dispatch({
         type: DELETE_WEIGHT_RECORD,
         payload: entryId
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
