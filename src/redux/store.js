import { createStore, compose, applyMiddleware  } from "redux"
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const createStoreWithMiddleware =  composeEnhancers(applyMiddleware(thunk))(createStore)
export const store = createStoreWithMiddleware(rootReducer)