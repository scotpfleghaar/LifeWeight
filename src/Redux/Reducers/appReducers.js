import {
    ADD_WEIGHT_RECORD,
    FETCH_WEIGHT_RECORDS,
    EDIT_WEIGHT_RECORD,
    DELETE_WEIGHT_RECORD,
    DELETE_ALL_RECORDS_PERMINANT,
    UPDATE_GOAL_WEIGHT
} from "../../../Constants";
import {_storeData, _storeGoalWeight} from '../Actions'

import { set, omit } from 'lodash'


const INITIAL_STATE = {
    records: {}
};

export default (state = INITIAL_STATE, action) => {
    let newRecords;
    switch (action.type) {
        case ADD_WEIGHT_RECORD:
            newRecords = set(state.records, action.payload.entryId, action.payload);
            _storeData(action.uid, newRecords).catch(err => err);
            return {
                ...state,
                records: newRecords
            };
        case FETCH_WEIGHT_RECORDS:
            newRecords = action.payload ? action.payload : {};
            _storeData(action.uid, newRecords).catch(err => err);
            return {
                ...state,
                records: newRecords
            };
        case EDIT_WEIGHT_RECORD:
            newRecords = set(state.records, action.payload.entryId, action.payload);
            _storeData(action.uid, newRecords).catch(err => err);
            return {
                ...state,
                records: newRecords
            };
        case DELETE_WEIGHT_RECORD:
            newRecords = omit(state.records, action.payload);
            _storeData(action.uid, newRecords).catch(err => err);
            return {
                ...state,
                records: newRecords
            };
        case DELETE_ALL_RECORDS_PERMINANT:
            _storeData(action.uid, {}).catch(err => err);
            return {
                ...state,
                records: {}
            };
        case UPDATE_GOAL_WEIGHT:
            _storeGoalWeight(action.payload, action.uid).catch(err => err);
            return {
                ...state,
                goalWeight: action.payload
            };
        default:
            return state

    }
}