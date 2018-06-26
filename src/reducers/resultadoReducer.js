import {
  CARGA_CONCILIACIONES_RESULTADO,
  UPDATE_VALUE_COMBO_CONCILIACIONES_RESULTADO
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  conciliaciones : [],
  conciliacion : '',
  frecuencia : 0,
  tipoFrecuencia : ''
}

export const resultadoReducer = (state = initialState,action) =>{
  switch (action.type) {
    case CARGA_CONCILIACIONES_RESULTADO:
        return update(state,{
          conciliaciones : {$set: action.lista}
        })
    case UPDATE_VALUE_COMBO_CONCILIACIONES_RESULTADO:
        return update(state,{
          [action.field] : {$set: JSON.parse(action.value)}
        })
    default:
      return state
  }
}

export default resultadoReducer
