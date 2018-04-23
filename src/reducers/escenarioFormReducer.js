import {
  UPDATE_ESCENARIOS_FORM_REQUEST,
  CARGAR_ESCENARIO_FORM,
  LIMPIAR_FORM_ESCENARIO
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  id : 0,
  nombre : '',
  impacto : ''
}

export const escenarioFormReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_ESCENARIOS_FORM_REQUEST:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case CARGAR_ESCENARIO_FORM:
        return update(state,{
          id : {$set: action.escenario[0].id},
          nombre : {$set: action.escenario[0].nombre},
          impacto : {$set: action.escenario[0].impacto}
        })
    case LIMPIAR_FORM_ESCENARIO:
        return update(state,{
          id : {$set: 0},
          nombre : {$set: ''},
          impacto : {$set: ''}
        })
    default:
        return state
  }
}

export default escenarioFormReducer
