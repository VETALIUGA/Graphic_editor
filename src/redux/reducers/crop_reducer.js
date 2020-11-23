import { RESET_CROP_VALUES, SET_CROP_VALUES } from "../actions/actionTypes";

const initialState = {
    unit: 'px',
    width: 0,
    height: 0,
    x: 0,
    y: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
      case SET_CROP_VALUES: {
        return {
          ...state,
          ...action.payload
        };
      }
      case RESET_CROP_VALUES: {
        return {
          ...initialState
        };
      }
      default:
        return state;
    }
  }