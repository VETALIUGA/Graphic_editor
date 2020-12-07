import { INIT_LINK_GENERATION, SET_GENERATED_LINK, SET_IMAGE_PARAMS, SET_INITIAL_IMAGE, SET_MODIFIED_IMAGE, SET_NEW_FILENAME } from "../actions/actionTypes";

const initialState = {
    links: {
        original: '',
        modified: ''
    },
    params: {
        width: 0,
        height: 0
    },
    fileName: 'Edited_image',
    generated: {
        isProcessing: false,
        canvasRef: '',
        link: ''
    }
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

        case INIT_LINK_GENERATION: {
            return {
                ...state,
                generated: {
                    ...state.generated,
                    isProcessing: !state.generated.isProcessing
                }
            }
        }

        case SET_GENERATED_LINK: {
            return {
                ...state,
                generated: {
                    ...state.generated,
                    link: action.payload
                }
            }
        }

        // case SET_CANVAS_REF: {
        //     return {
        //         ...state,
        //         generated: {
        //             ...state.generated,
        //             canvasRef: action.payload
        //         }
        //     }
        // }

        // case CREATE_PROCESSED_LINK: {
        //     return {
        //         ...state,
        //         generated: {
        //             ...state.generated,
        //             link: state.generated.canvasRef.toDataURL('image/png', 1)

        //         }
        //     }
        // }

        // case SET_GENERATION_STARTED: {
        //     return {
        //         ...state,
        //         generated: {
        //             isProcessing: true
        //         }
        //     }
        // }


        // case SET_GENERATION_FINISHED: {
        //     return {
        //         ...state,
        //         generated: {
        //             isProcessing: false,
        //             link: action.payload
        //         }
        //     }
        // }

        default:
            return state;
    }
}