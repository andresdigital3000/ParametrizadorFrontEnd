import {
  LOGIN_SUCCESS,
  LOGIN_ERROR
}  from '../actions/const'

const initialState = {
  load: false,
  profile: null
}

export const loginReducer = (state = initialState,action) => {

  switch (action.type) {

    case LOGIN_SUCCESS:
      return {
        load : true,
        profile : action.profile
      }

    default:
      return state 
  }
}

export default loginReducer
