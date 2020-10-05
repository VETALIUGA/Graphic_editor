import { SET_GAMMA_VALUE } from "../actions/actionTypes";

const initialState = {
    blur: 0,
    saturation: 100,
    brightness: 100
}

export default function (state = initialState, action) {
    switch (action.type) {
      case SET_GAMMA_VALUE: {
        return {
          ...state,
          brightness: action.payload
        };
      }
      default:
        return state;
    }
  }