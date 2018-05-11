import {
  CARGA_CONCILIACIONES,
  UPDATE_VALUE_COMBO_CONCILIACIONES
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  conciliaciones : [],
  conciliacion : '',
  frecuencia : 0,
  tipoFrecuencia : ''
}

export const ejecucionReducer = (state = initialState,action) =>{
  switch (action.type) {
    case CARGA_CONCILIACIONES:
        return update(state,{
          conciliaciones : {$set: action.lista}
        })
    case UPDATE_VALUE_COMBO_CONCILIACIONES:
        return update(state,{
          [action.field] : {$set: JSON.parse(action.value)}
        })
    default:
      return state
  }
}

export default ejecucionReducer
