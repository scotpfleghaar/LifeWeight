import {
    ADD_WEIGHT_RECORD,
    FETCH_WEIGHT_RECORDS,
    EDIT_WEIGHT_RECORD
} from "../../../Constants";

import { set } from 'lodash'

const INITIAL_STATE = {
    records: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_WEIGHT_RECORD:
            return {
                ...state,
                records: set(state.records, action.payload.entryId, action.payload)
            };
        case FETCH_WEIGHT_RECORDS:
            return {
                ...state,
                records: action.payload
            };
        case EDIT_WEIGHT_RECORD:
            return {
                ...state,
                records: set(state.records, action.payload.entryId, action.payload)
            };
        default:
            return state

    }
}