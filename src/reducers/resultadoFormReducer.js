import {
  UPDATE_RESULTADOS_FORM_REQUEST,
  CARGAR_RESULTADO_FORM,
  UPDATE_CONCILIACION_EN_RESULTADOS,
  LIMPIAR_FORM_RESULTADO
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  id : 0,
  nombre : '',
  conciliacion : {"id":0},
  idConciliacion:'',
  nombreConciliacion:''
}

export const resultadoFormReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_RESULTADOS_FORM_REQUEST:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case CARGAR_RESULTADO_FORM:
        return update(state,{
          id : {$set: action.resultado[0].id},
          nombre : {$set: action.resultado[0].nombre},
          conciliacion : {$set: action.resultado[0].idConciliacion},
          idConciliacion : {$set: action.resultado[0].idConciliacion},
          nombreConciliacion : {$set: action.resultado[0].nombreConciliacion}
        })
    case LIMPIAR_FORM_RESULTADO:
        return update(state,{
          id : {$set: 0},
          nombre : {$set: ''},
          conciliacion: {$set: {"id":"0"}},
          idConciliacion : {$set: ''},
          nombreConciliacion : {$set: ''}
        })
    case UPDATE_CONCILIACION_EN_RESULTADOS:
      return update(state,{
          idConciliacion: {$set: action.value}
      })
    default:
        return state
  }
}

export default resultadoFormReducer
