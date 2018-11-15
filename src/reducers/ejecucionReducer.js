import {
  CARGA_CONCILIACIONES,
  UPDATE_VALUE_COMBO_CONCILIACIONES,
  UPDATE_EJECUTAR_CONCILIACIONES_FORM_REQUEST,
  LIMPIAR_CONCILIACION_SELECCIONADA,
  LIMPIAR_ESCENARIO_SELECCIONADO_EJ,
  CARGA_ESCENARIOS_EJ,
  UPDATE_VALUE_COMBO_ESCENARIOS_EJ,
  UPDATE_EJECUTAR_ESCENARIO_FORM_REQUEST
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  conciliaciones : [],
  conciliacion : '',
  escenarios : [],
  escenario : '',
  frecuencia : 0,
  tipoFrecuencia : '',
  hora : '0',
  minuto : '0',
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
       let conciliac = JSON.parse(action.value)
       let fechaAg = new Date();
       if (conciliac.transformaciones != undefined){
         if (conciliac.transformaciones[conciliac.transformaciones.length - 1].fechaAgendamiento != null){
            fechaAg = new Date(conciliac.transformaciones[conciliac.transformaciones.length - 1].fechaAgendamiento)
         } else fechaAg = null;
       }
        return update(state,
          {
          [action.field] : {$set: JSON.parse(action.value)},
          fecha : {$set: fechaAg != undefined? fechaAg.toISOString().split('T')[0]: null},
          hora : {$set: fechaAg != null? fechaAg.getHours():null},
          minuto: {$set: fechaAg != null? fechaAg.getMinutes(): null}
          })
    case UPDATE_EJECUTAR_CONCILIACIONES_FORM_REQUEST:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case LIMPIAR_ESCENARIO_SELECCIONADO_EJ:
        return update(state,{
          escenario : {$set: action.lista}
        })
    case CARGA_ESCENARIOS_EJ:
        return update(state,{
          escenarios : {$set: action.lista}
        })
    case UPDATE_VALUE_COMBO_ESCENARIOS_EJ:
        return update(state,{
          [action.field] : {$set: JSON.parse(action.value)}
        })
    case UPDATE_EJECUTAR_ESCENARIO_FORM_REQUEST:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    default:
      return state
  }
}

export default ejecucionReducer
