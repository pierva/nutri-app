import { createStore } from 'redux'
import rootReducer from './reducers'
import middleware from './middleware'
import reducers from './reducers'

const store = createStore(reducers, middleware)

export default store