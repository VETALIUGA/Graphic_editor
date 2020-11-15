import { SET_ACTIVE_PRESET, SET_BLUR_VALUE, SET_BRIGHTNESS_VALUE, SET_COLOR_CORRECTION_VALUES, SET_INITIAL_IMAGE, SET_MEDIAN_FILTER_VALUE, SET_MODIFIED_IMAGE, SET_SATURATION_VALUE, SET_IS_FILTER_LOADING, SET_BILATERAL_FILTER_VALUE, RESET_FILTER_VALUE, SET_NEW_FILENAME, RESET_COLOR_CORRECTION } from "./actionTypes"

///////////////////////CANVAS_FILTERS/////////////////////////

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

export const resetColorCorrectionValues = () => {
    return {
        type: RESET_COLOR_CORRECTION
    }
}

///////////////////////FILE/////////////////////////

export const setInitialImage = (file) => {
    return {
        type: SET_INITIAL_IMAGE,
        payload: file
    }
}

export const setModifiedImage = (file) => {
    return {
        type: SET_MODIFIED_IMAGE,
        payload: file
    }
}

export const setNewName = (string) => {
    return {
        type: SET_NEW_FILENAME,
        payload: string
    }
}

////////////////////////////PRESETS/////////////////////////////

export const setActivePreset = (id) => {
    return {
        type: SET_ACTIVE_PRESET,
        payload: id
    }
}

///////////////////////////OPEN_CV_FILTERS////////////////////////

export const setMedianValue = (value) => {
    return {
        type: SET_MEDIAN_FILTER_VALUE,
        payload: value
    }
}

export const setBilateralValue = (value) => {
    return {
        type: SET_BILATERAL_FILTER_VALUE,
        payload: value
    }
}

export const setFilterLoading = (bool) => {
    return {
        type: SET_IS_FILTER_LOADING,
        payload: bool
    }
}

export const resetRecoveryFilters = () => {
    return {
        type: RESET_FILTER_VALUE
    }
}