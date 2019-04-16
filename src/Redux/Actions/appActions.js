import {
    ADD_WEIGHT_RECORD
} from "../../../Constants";
import firebase from 'firebase'

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
