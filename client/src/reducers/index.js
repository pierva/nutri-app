import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'

import auth from './auth'
import message from './message'

export default combineReducers({
  auth,
  message,
  loadingBar: loadingBarReducer
})
