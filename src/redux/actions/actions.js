import { SET_BLUR_VALUE, SET_BRIGHTNESS_VALUE, SET_COLOR_CORRECTION_VALUES, SET_SATURATION_VALUE } from "./actionTypes"

export const setBrightnessValue = (value) => {
    return {
        type: SET_BRIGHTNESS_VALUE,
        payload: value
    }
}

export const setBlurValue = (value) => {
    return {
        type: SET_BLUR_VALUE,
        payload: value
    }
}

export const setSaturationValue = (value) => {
    return {
        type: SET_SATURATION_VALUE,
        payload: value
    }
}

export const setColorCorrectionValues = (values) => {
    return {
        type: SET_COLOR_CORRECTION_VALUES,
        payload: values
    }
}