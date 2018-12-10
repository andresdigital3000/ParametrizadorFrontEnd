import {
  UPDATE_POLITICAS_FORM_REQUEST,
  CARGAR_POLITICA_FORM,
  LIMPIAR_FORM_POLITICA
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  id : 0,
  nombre : '',
  descripcion : '',
  objetivo : '', 
  errorNombre : ''
}

export const politicaFormReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_POLITICAS_FORM_REQUEST:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case CARGAR_POLITICA_FORM:
        return update(state,{
          id : {$set: action.politica[0].id},
          nombre : {$set: action.politica[0].nombre.substring(3,(action.politica[0].nombre.length))},
          descripcion : {$set: action.politica[0].descripcion},
          objetivo : {$set: action.politica[0].objetivo},
          errorNombre : {$set:''}
        })
    case LIMPIAR_FORM_POLITICA:
        return update(state,{
          id : {$set: 0},
          nombre : {$set: ''},
          descripcion : {$set: ''},
          objetivo : {$set: ''},
          errorNombre : {$set:''}
        })
    default:
        return state
  }
}

export default politicaFormReducer
