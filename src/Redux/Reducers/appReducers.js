import {
    ADD_WEIGHT_RECORD,
    FETCH_WEIGHT_RECORDS,
    EDIT_WEIGHT_RECORD,
    DELETE_WEIGHT_RECORD
} from "../../../Constants";
import { _storeData } from '../Actions'

import { set, omit } from 'lodash'

const INITIAL_STATE = {
    records: {}
};

export default (state = INITIAL_STATE, action) => {
    let newRecords;
    switch (action.type) {
        case ADD_WEIGHT_RECORD:
            newRecords = set(state.records, action.payload.entryId, action.payload)
            _storeData(newRecords);
            return {
                ...state,
                records: newRecords
            };
        case FETCH_WEIGHT_RECORDS:
            newRecords = action.payload
            _storeData(newRecords);
            return {
                ...state,
                records: newRecords
            };
        case EDIT_WEIGHT_RECORD:
            newRecords = set(state.records, action.payload.entryId, action.payload)
            _storeData(newRecords);
            return {
                ...state,
                records: newRecords
            };
        case DELETE_WEIGHT_RECORD:
            newRecords = omit(state.records, action.payload)
            _storeData(newRecords);
            return {
                ...state,
                records: newRecords
            };
        default:
            return state

    }
}