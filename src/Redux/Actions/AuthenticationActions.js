import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER_INITIALIZED
} from "../../../Constants";
import firebase from 'firebase';

export const emailChange = (text) => {
    console.log('emailChange', text);
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

export const loginUser = ({email, password}) => (dispatch) => {
    dispatch({
        type: LOGIN_USER_INITIALIZED
    });
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => loginUserSuccess(dispatch, user))
                .catch(() => loginUserFail(dispatch))
        });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
   // @TODO Handle Navigation
};

const loginUserFail = (dispatch) => {
    return dispatch({
        type: LOGIN_USER_FAILED,
        payload: "Authentication Failed"
    })
};