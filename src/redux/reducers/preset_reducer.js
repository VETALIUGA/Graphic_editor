import { RESET_ACTIVE_PRESET, SET_ACTIVE_PRESET } from "../actions/actionTypes";

const initialState = {
    activePreset: null,
    presets: [
        {
            blur: 1,
            brightness: 80,
            saturation: 110,
            color: 122
        },
        {
            blur: 3,
            brightness: 80,
            saturation: 110,
            color: 39
        },
        {
            blur: 2,
            brightness: 50,
            saturation: 110,
            color: 200
        },
        {
            blur: 0,
            brightness: 90,
            saturation: 30,
            color: 10
        }
    ]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_PRESET: {
            return {
                ...state,
                activePreset: action.payload
            }
        }
        case RESET_ACTIVE_PRESET: {
            return {
                ...state,
                activePreset: null
            }
        }
        default:
            return state;
    }
}