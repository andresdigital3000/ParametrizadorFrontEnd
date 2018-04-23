import {
  UPDATE_CONCILIACIONES_FORM_REQUEST,
  CARGAR_CONCILIACION_FORM,
  LIMPIAR_FORM_CONCILIACION
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  id : 0,
  nombre : '',
  shell : '',
  descripcion : ''
}

export const conciliacionFormReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_CONCILIACIONES_FORM_REQUEST:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case CARGAR_CONCILIACION_FORM:
        return update(state,{
          id : {$set: action.conciliacion[0].id},
          nombre : {$set: action.conciliacion[0].nombre},
          descripcion : {$set: action.conciliacion[0].descripcion}
        })
    case LIMPIAR_FORM_CONCILIACION:
        return update(state,{
          id : {$set: 0},
          nombre : {$set: ''},
          descripcion : {$set: ''}
        })
    default:
        return state
  }
}

export default conciliacionFormReducer
