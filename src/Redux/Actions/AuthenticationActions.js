import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER_INITIALIZED
} from "../../../Constants";
import firebase from 'firebase';

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
        .catch(() => {
            // Create Account?
        });
};

export const createAccount = (email, password, callBack) => (dispatch) => {
    dispatch({
        type: LOGIN_USER_INITIALIZED
    });
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user, callBack))
        .catch((err) => loginUserFail(dispatch))
};

const loginUserSuccess = (dispatch, user, callBack) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    callBack();
};

const loginUserFail = (dispatch) => {
    return dispatch({
        type: LOGIN_USER_FAILED,
        payload: "Authentication Failed"
    })
};