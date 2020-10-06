import { SET_BLUR_VALUE, SET_BRIGHTNESS_VALUE, SET_COLOR_CORRECTION_VALUES, SET_SATURATION_VALUE } from "../actions/actionTypes";

const initialState = {
  settingValues: {
    blur: 0,
    saturation: 100,
    brightness: 100
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BRIGHTNESS_VALUE: {
      return {
        ...state,
        brightness: action.payload
      };
    }
    case SET_BLUR_VALUE: {
      return {
        ...state,
        blur: action.payload
      };
    }
    case SET_SATURATION_VALUE: {
      return {
        ...state,
        saturation: action.payload
      };
    }
    case SET_COLOR_CORRECTION_VALUES: {
      return {
        ...state,
        settingValues: {...action.payload}
      };
    }
    default:
      return state;
  }
}