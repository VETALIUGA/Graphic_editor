import { SET_INITIAL_IMAGE, SET_MODIFIED_IMAGE } from "../actions/actionTypes";

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
                links: {
                    ...state.links,
                    original: action.payload
                }
                    
                
            }
        }
        case SET_MODIFIED_IMAGE: {
            return {
                ...state,
                links: {
                    ...state.links,
                    modified: action.payload
                }
                    
                
            }
        }
        default:
            return state;
    }
}