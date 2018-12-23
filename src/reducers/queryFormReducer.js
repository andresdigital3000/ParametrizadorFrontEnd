import {
  UPDATE_QUERYS_FORM_REQUEST,
  CARGAR_QUERY_FORM,
  LIMPIAR_FORM_QUERY,
  UPDATE_ESCENARIO_QUERYS_FORM_REQUEST
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  id : 0,
  nombre : '',
  query : '',
  orden : '',
  estado : '',
  idEscenario:0,
  nombreEscenario:'',
  idConciliacion:0,
  nombreConciliacion:''
}

export const queryFormReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_ESCENARIO_QUERYS_FORM_REQUEST:
      return update(state, {
        idEscenario: {$set: action.idEscenario},
        nombreEscenario: {$set: action.descEscenario},
      })
    case UPDATE_QUERYS_FORM_REQUEST:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case CARGAR_QUERY_FORM:
        return update(state,{
          id : {$set: action.query[0].id},
          nombre : {$set: action.query[0].nombreQuery},
          query : {$set: action.query[0].query},
          orden : {$set: action.query[0].orden},
          estado : {$set: action.query[0].estado},
          idEscenario : {$set: action.query[0].idEscenario},
          nombreEscenario : {$set: action.query[0].nombreEscenario},
          idConciliacion : {$set: action.query[0].idConciliacion},
          nombreConciliacion : {$set: action.query[0].nombreConciliacion}
        })
    case LIMPIAR_FORM_QUERY:
        return update(state,{
          id : {$set: 0},
          nombre : {$set: ''},
          query : {$set: ''},
          orden : {$set: ''},
          estado : {$set: ''},
          idEscenario : {$set: 0},
          nombreEscenario : {$set: ''},
          idConciliacion : {$set: 0},
          nombreConciliacion : {$set: ''}
        })
    default:
        return state
  }
}

export default queryFormReducer
