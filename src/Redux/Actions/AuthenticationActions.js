import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER_INITIALIZED
} from "../../../Constants";
import firebase from 'firebase';
import {firebaseErrorCodesTranslated} from "../../screens/Utilities";
// import { AsyncStorage } from 'react-native';

export const emailChange = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
};

export const passwordChange = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
};

export const loginUser = (email, password, callBack) => (dispatch) => {
    dispatch({
        type: LOGIN_USER_INITIALIZED
    });
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user, callBack))
        .catch((err) => loginUserFail(dispatch, err));
};

export const createAccount = (email, password, matcherPassword, callBack) => (dispatch) => {
    console.log("createAccount", email, password, matcherPassword);
    dispatch({
        type: LOGIN_USER_INITIALIZED
    });
    if (password === matcherPassword) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user, callBack))
            .catch((err) => loginUserFail(dispatch, err))
    }
    loginUserFail(dispatch, {message: 'Passwords do not match'});
};

const loginUserSuccess = (dispatch, user, callBack) => {
    // AsyncStorage.setItem('userID', '.....UserData');
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    callBack();
};

const loginUserFail = (dispatch, error) => {
    return dispatch({
        type: LOGIN_USER_FAILED,
        payload: firebaseErrorCodesTranslated(error)
    })
};