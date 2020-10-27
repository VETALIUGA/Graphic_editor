import { combineReducers } from "redux"
import color_reducer from "./color_reducer"
import file_reducer from "./file_reducer";
import preset_reducer from "./preset_reducer";
import recovery_reducer from "./recovery_reducer"

export default combineReducers({ 
    color: color_reducer,
    file: file_reducer,
    preset: preset_reducer,
    recovery: recovery_reducer
 });