import {
  CARGA_CONCILIACIONES,
  UPDATE_VALUE_COMBO_CONCILIACIONES,
  UPDATE_EJECUTAR_CONCILIACIONES_FORM_REQUEST,
  LIMPIAR_CONCILIACION_SELECCIONADA
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  conciliaciones : [],
  conciliacion : '',
  frecuencia : 0,
  tipoFrecuencia : '',
  hora : '00',
  minuto : '00',
  fecha : ''
}

export const ejecucionReducer = (state = initialState,action) =>{
  switch (action.type) {
    case CARGA_CONCILIACIONES:
        return update(state,{
          conciliaciones : {$set: action.lista}
        })
    case LIMPIAR_CONCILIACION_SELECCIONADA:
        return update(state,{
          conciliacion : {$set: action.lista}
        })  
    case UPDATE_VALUE_COMBO_CONCILIACIONES:
        return update(state,{
          [action.field] : {$set: JSON.parse(action.value)}
        })
    case UPDATE_EJECUTAR_CONCILIACIONES_FORM_REQUEST:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    default:
      return state
  }
}

export default ejecucionReducer
