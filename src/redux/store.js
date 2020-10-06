import { createStore, compose, applyMiddleware  } from "redux"
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'
import throttledMiddleware from './middleware/throttled'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const createStoreWithMiddleware =  composeEnhancers(applyMiddleware(throttledMiddleware, thunk))(createStore)
export const store = createStoreWithMiddleware(rootReducer)