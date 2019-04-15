import {
    ADD_WEIGHT_RECORD
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
       
        default:
            return state

    }
}