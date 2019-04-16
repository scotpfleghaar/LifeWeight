import {
    ADD_WEIGHT_RECORD,
    FETCH_WEIGHT_RECORDS
} from "../../../Constants";

const INITIAL_STATE = {
    records: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_WEIGHT_RECORD:
            return {
                ...state,
                records: state.records.concat(action.payload)
            };
        case FETCH_WEIGHT_RECORDS:
            return {
                ...state,
                records: action.payload
            };

        default:
            return state

    }
}