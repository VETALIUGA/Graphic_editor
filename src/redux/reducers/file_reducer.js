import { SET_IMAGE_PARAMS, SET_INITIAL_IMAGE, SET_MODIFIED_IMAGE, SET_NEW_FILENAME } from "../actions/actionTypes";

const initialState = {
    links: {
        original: '',
        modified: ''
    },
    params: {
        width: 0,
        height: 0
    },
    fileName: 'Edited_image'
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
        case SET_NEW_FILENAME: {
            return {
                ...state,
                fileName: action.payload
            }
        }
        case SET_IMAGE_PARAMS: {
            return {
                ...state,
                params: {
                    ...action.payload
                }
            }
        }
        default:
            return state;
    }
}