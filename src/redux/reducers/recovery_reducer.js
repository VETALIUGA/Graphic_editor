import { SET_MEDIAN_FILTER_VALUE } from "../actions/actionTypes";

const initialState = {
    filters: {
        median: 1
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_MEDIAN_FILTER_VALUE: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    median: action.payload
                }
            }
        }
        default:
            return state;
    }
}