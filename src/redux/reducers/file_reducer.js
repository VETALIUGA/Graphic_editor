import { SET_INITIAL_IMAGE } from "../actions/actionTypes";

const initialState = {
    links: {
        original: '',
        modified: ''
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_INITIAL_IMAGE: {
            return {
                ...state,
                original: action.payload
            }
        }
        default:
            return state;
    }
}