import {
  LOGIN_SUCCESS,
  LOGOUT
} from '../actions/const'

import update from 'react-addons-update'

const initialState = {
  login: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return update(state, {
        login: {$set: true},
        user: {$set: action.login}
      })
    case LOGOUT:
      return update(state, {
        login: {$set: false},
        user: {$set: null}
      })
    default:
      return state
  }
}

export default reducer
