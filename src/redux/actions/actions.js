import { SET_ACTIVE_PRESET, SET_BLUR_VALUE, SET_BRIGHTNESS_VALUE, SET_COLOR_CORRECTION_VALUES, SET_INITIAL_IMAGE, SET_SATURATION_VALUE } from "./actionTypes"

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

///////////////////////

export const setInitialImage = (file) => {
    return {
        type: SET_INITIAL_IMAGE,
        payload: file
    }
}

////////////////////////////

export const setActivePreset = (id) => {
    return {
        type: SET_ACTIVE_PRESET,
        payload: id
    }
}