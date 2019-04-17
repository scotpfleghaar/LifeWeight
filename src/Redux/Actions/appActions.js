import {
    ADD_WEIGHT_RECORD,
    FETCH_WEIGHT_RECORDS,
    EDIT_WEIGHT_RECORD
} from "../../../Constants";
import firebase from 'firebase'
import { values } from 'lodash'

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
        callBack();
    }).catch(err => {
        console.log(err.message)
    });

};


export const weightRecordsFetch = (callBack) => {
    const {currentUser} = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/records`).on("value", snapshot => {
            dispatch({
                type: FETCH_WEIGHT_RECORDS,
                payload: snapshot.val()
            });
            callBack && callBack();
        });
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
    firebase.database().ref(`/users/${currentUser.uid}/records/${entryId}`).set(postData).then(() => {
        dispatch({
            type: EDIT_WEIGHT_RECORD,
            payload: postData
        });
        callBack && callBack();
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
// export const employeeDelete = ({uid}) => {
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
