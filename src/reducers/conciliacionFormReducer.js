import {
  UPDATE_CONCILIACIONES_FORM_REQUEST,
  CARGAR_CONCILIACION_FORM,
  LIMPIAR_FORM_CONCILIACION
} from '../actions/const'
import update from 'react-addons-update'

const initialState = {
  id : 0,
  nombre : '',
  webservice : '',
  descripcion : '',
  idPolitica : '',
  nombrePolitica : ''
}

export const conciliacionFormReducer = (state = initialState,action) =>{
  switch (action.type) {
    case UPDATE_CONCILIACIONES_FORM_REQUEST:
        return update(state,{
          [action.field] : {$set: action.value}
        })
    case CARGAR_CONCILIACION_FORM:
        return update(state,{
            id : {$set: action.conciliacion[0].id},
            nombre : {$set: action.conciliacion[0].nombre},
            webservice : {$set: action.conciliacion[0].webservice},
            descripcion : {$set: action.conciliacion[0].descripcion},
            idPolitica : {$set: action.conciliacion[0].idPolitica},
            nombrePolitica : {$set: action.conciliacion[0].nombrePolitica}
          }
        )
    case LIMPIAR_FORM_CONCILIACION:
        return update(state,{
          id : {$set: 0},
          nombre : {$set: ''},
          webservice : {$set: ''},
          descripcion : {$set: ''},
          idPolitica : {$set: ''},
          nombrePolitica : {$set: ''}
        })
    default:
        return state
  }
}

export default conciliacionFormReducer
