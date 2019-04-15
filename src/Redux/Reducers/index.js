import {combineReducers} from 'redux';
import AuthReducer from './authentication'
import AppReducer from './appReducers'
export default combineReducers({
    auth: AuthReducer,
    app: AppReducer
})