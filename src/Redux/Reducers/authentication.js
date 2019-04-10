import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER_INITIALIZED
} from "../../../Constants";

const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    error: '',
    user: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE,
                user: action.payload,
            };
        case LOGIN_USER_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case EMAIL_CHANGED:
            return {
                ...state,
                email: action.payload
            };
        case PASSWORD_CHANGED:
            return {
                ...state,
                password: action.payload
            };
        case LOGIN_USER_INITIALIZED:
            return {
                ...state,
                loading: true,
                error: ''
            };
        default:
            return state

    }
}