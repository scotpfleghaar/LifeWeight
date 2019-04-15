import {
    ADD_WEIGHT_RECORD
} from "../../../Constants";

export const addWeightRecord = (weight, date, userWeightGage, callBack) => (dispatch) => {
    console.log(weight, date, userWeightGage)
    //Make Firebase Call
    dispatch({
         type: ADD_WEIGHT_RECORD,
            payload: {
                weight, 
                date, 
                userWeightGage
            }
    });
    callBack();
};
