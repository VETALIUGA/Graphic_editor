import { RESET_FILTER_VALUE, SET_BILATERAL_FILTER_VALUE, SET_IS_FILTER_LOADING, SET_MEDIAN_FILTER_VALUE } from "../actions/actionTypes";

const initialState = {
    filters: {
        median: 1,
        bilateral: 0
    },
    isLoading: false
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
        case SET_BILATERAL_FILTER_VALUE: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    bilateral: action.payload
                }
            }
        }
        case SET_IS_FILTER_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case RESET_FILTER_VALUE: {
            return {
                ...state,
                filters : {
                    ...initialState.filters
                }
            }
        }
        default:
            return state;
    }
}