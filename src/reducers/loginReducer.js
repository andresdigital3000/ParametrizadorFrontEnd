import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SHOW_MODAL,
  HIDE_MODAL
}  from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  load: false,
  profile: null,
  showmodal : false,
  tipomensaje : '',
  mensaje : ''
}

export const loginReducer = (state = initialState,action) => {

  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        load : true,
        profile : action.profile,
        showmodal : false,
        tipomensaje : '',
        mensaje : ''
      }
    case SHOW_MODAL:
      return update(state,{
        showmodal: {$set : true},
        tipomensaje : {$set: action.tipomensaje},
        mensaje : {$set: action.mensaje}
      })
    case HIDE_MODAL:
      return update(state,{
        showmodal: {$set : false},
        tipomensaje : {$set: ''},
        mensaje : {$set: ''}
      })
    default:
      return state
  }
}

export default loginReducer
