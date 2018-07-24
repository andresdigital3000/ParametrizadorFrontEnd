import {
  UPDATE_PARAMETROS_FORM_REQUEST,
  CARGAR_PARAMETRO_FORM,
  LIMPIAR_FORM_PARAMETRO
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  id : 0,
  parametro : '',
  valor : ''
}

export const parametroFormReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_PARAMETROS_FORM_REQUEST:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case CARGAR_PARAMETRO_FORM:
        return update(state,{
          id : {$set: action.parametro[0].id},
          parametro : {$set: action.parametro[0].parametro},
          valor : {$set: action.parametro[0].valor}
        })
    case LIMPIAR_FORM_PARAMETRO:
        return update(state,{
          id : {$set: 0},
          parametro : {$set: ''},
          valor : {$set: ''}
        })
    default:
        return state
  }
}

export default parametroFormReducer
