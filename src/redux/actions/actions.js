import { SET_GAMMA_VALUE } from "./actionTypes"

export const setGammaValue = (value) => {
    return {
        type: SET_GAMMA_VALUE,
        payload: value
    }
}