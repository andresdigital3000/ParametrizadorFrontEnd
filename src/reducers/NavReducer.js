import {
  NAVIGATION
} from '../actions/const'

import update from 'react-addons-update'

const initialState = {
  currentPage: 'dashboard'
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATION:
      return update(state, {
        currentPage: {$set: action.value}
      })
    default:
      return state
  }
}

export default reducer
