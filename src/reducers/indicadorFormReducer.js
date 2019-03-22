import {
  UPDATE_INDICADORES_FORM_REQUEST,
  CARGAR_INDICADOR_FORM,
  LIMPIAR_FORM_INDICADOR,
  UPDATE_FORMULA,
  UPDATE_ESCENARIO_EN_INDICADORES,
  CARGA_PARAMETROS_EN_INDICADORES
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  id : 0,
  nombre : '',
  descripcion : '',
  formula : '',
  idEscenario : '0',
  nombreEscenario : '',
  escenario:{"id":0,"nombre":"Ningun Escenario"},
  parametros:[]
}

export const indicadorFormReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_INDICADORES_FORM_REQUEST:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case CARGAR_INDICADOR_FORM:
        return update(state,{
          id : {$set: action.indicador[0].id},
          nombre : {$set: action.indicador[0].nombreFormula},
          descripcion : {$set: action.indicador[0].descripcion},
          formula : {$set: action.indicador[0].textoFormula},
          idEscenario : {$set: action.indicador[0].idEscenario},
          nombreEscenario : {$set: action.indicador[0].nombreEscenario},
          escenario : {$set: JSON.parse('{"id":0,"nombre":"Ningun Escenario"}')}
        })
    case LIMPIAR_FORM_INDICADOR:
        return update(state,{
          id : {$set: 0},
          nombre : {$set: ''},
          descripcion : {$set: ''},
          formula : {$set: ''},
          idEscenario : {$set: '0'},
          nombreEscenario : {$set: ''},
          escenario : {$set: JSON.parse('{"id":0,"nombre":"Ningun Escenario"}')},
          parametros : {$set : []}
        })
    case UPDATE_FORMULA:
        return update(state,{
          formula : {$set: state.formula+action.value+'!'}
        })
    case UPDATE_ESCENARIO_EN_INDICADORES:
        return update(state,{
          escenario: {$set: action.value},
          idEscenario : {$set : action.value.id},
          nombreEscenario : {$set : action.value.nombre}
        })
    case CARGA_PARAMETROS_EN_INDICADORES:
        return update(state,{
          parametros: {$set: action.lista}
        })
    default:
        return state
  }
}

export default indicadorFormReducer
