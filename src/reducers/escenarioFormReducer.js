import {
  UPDATE_ESCENARIOS_FORM_REQUEST,
  CARGAR_ESCENARIO_FORM,
  UPDATE_CONCILIACION_EN_ESCENARIOS,
  LIMPIAR_FORM_ESCENARIO
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  id : 0,
  nombre : '',
  impacto : 'BAJO',
  conciliacion : {"id":0},
  idConciliacion:'',
  nombreConciliacion:'',
  descripcion : ''
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
          impacto : {$set: action.escenario[0].impacto},
          conciliacion : {$set: action.escenario[0].idConciliacion},
          idConciliacion : {$set: action.escenario[0].idConciliacion},
          nombreConciliacion : {$set: action.escenario[0].nombreConciliacion},
          descripcion : {$set: action.escenario[0].descripcion},
        })
    case LIMPIAR_FORM_ESCENARIO:
        return update(state,{
          id : {$set: 0},
          nombre : {$set: ''},
          impacto : {$set: 'BAJO'},
          conciliacion: {$set: {"id":"0"}},
          idConciliacion : {$set: ''},
          nombreConciliacion : {$set: ''},
          descripcion : {$set: ''}
        })
    case UPDATE_CONCILIACION_EN_ESCENARIOS:
      return update(state,{
        idConciliacion: {$set: action.value}
      })
    default:
        return state
  }
}

export default escenarioFormReducer
