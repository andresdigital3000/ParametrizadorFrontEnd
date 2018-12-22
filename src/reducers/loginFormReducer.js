import {
  UPDATE_LOGIN_FORM_REQUEST,
  LOGIN_ERROR,
  LIMPIAR_FORM_LOGIN
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  username:'',
  password:'',
  loginError:false,
  loginMessage:null,
  dominio:'Claro'
}

export const loginFormReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_LOGIN_FORM_REQUEST:
      if(action.field === 'username'){
        let value = action.value.replace(' ','').replace('@','').substring(0,15)
        return update(state,{
          [action.field] : {$set: action.value}
        })
      }else{
        return update(state,{
          [action.field]: {$set: action.value}
        })
      }
    case LOGIN_ERROR:
      return update(state,{
        loginError: {$set: true},
        loginMessage: {$set: action.loginMessage}
      })
    case LIMPIAR_FORM_LOGIN:
      return update(state,{
        username : {$set: ''},
        password : {$set: ''},
        loginError : {$set: false},
        loginMessage : {$set: null},
        dominio : {$set: 'Claro'}
      })
    default:
      return state
  }
}

export default loginFormReducer
