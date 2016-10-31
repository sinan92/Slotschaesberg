import { combineReducers } from 'redux'

import counter from './counter'
import group from './groupReducer'

export default combineReducers({
  counter,
  group,
})
