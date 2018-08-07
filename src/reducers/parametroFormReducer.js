import {
  UPDATE_PARAMETROS_FORM_REQUEST,
  CARGAR_PARAMETRO_FORM,
  LIMPIAR_FORM_PARAMETRO,
  CARGA_ESCENARIOS_EN_PARAMETROS
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  id : 0,
  parametro : '',
  valor : '',
  descripcion : '',
  tipo : '',
  escenario:0,
  escenarios : []
}

export const parametroFormReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_PARAMETROS_FORM_REQUEST:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case CARGAR_PARAMETRO_FORM:
        return update(state,{
          id : {$set: action.parametro[0].id},
          parametro : {$set: action.parametro[0].parametro},
          valor : {$set: action.parametro[0].valor},
          descripcion : {$set: action.parametro[0].descripcion},
          tipo : {$set: action.parametro[0].tipo},
          escenario : {$set : action.parametro[0].codPadre}
        })
    case LIMPIAR_FORM_PARAMETRO:
        return update(state,{
          id : {$set: 0},
          parametro : {$set: ''},
          valor : {$set: ''},
          descripcion : {$set: ''},
          tipo : {$set: ''},
          escenario : {$set : 0}
        })
    case CARGA_ESCENARIOS_EN_PARAMETROS:
        return update(state,{
          escenarios: {$set: action.lista}
        })
    default:
        return state
  }
}

export default parametroFormReducer
