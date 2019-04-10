import {combineReducers} from 'redux';
import AuthReducer from './authentication'
export default combineReducers({
    auth: AuthReducer
})