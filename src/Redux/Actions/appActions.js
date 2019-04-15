import {
    ADD_WEIGHT_RECORD
} from "../../../Constants";
import firebase from 'firebase'

export const addWeightRecord = (weight, date, userWeightGage, callBack) => (dispatch) => {
    console.log(weight, date, userWeightGage)
    // Make Firebase Call
    var userId = firebase.auth().currentUser.uid;

     // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('records').push().key;

     // A post entry.
  var postData = {
        weight, 
        date, 
        userWeightGage,
        entryId: newPostKey
    };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  // updates['/records/' + newPostKey] = postData;
  updates['/users/' + userId + '/records/' + newPostKey] = postData;

  firebase.database().ref().update(updates).then(function(snapshot) {
           dispatch({
         type: ADD_WEIGHT_RECORD,
            payload: postData
        });
        callBack();
    }).catch(err => {
        console.log(err.message)
    });;

};
