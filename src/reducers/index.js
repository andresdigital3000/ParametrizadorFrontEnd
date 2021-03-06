import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import loginFormReducer from './loginFormReducer'
import politicaReducer from './politicaReducer'
import politicaFormReducer from './politicaFormReducer'
import conciliacionReducer from './conciliacionReducer'
import conciliacionFormReducer from './conciliacionFormReducer'
import escenarioReducer from './escenarioReducer'
import escenarioFormReducer from './escenarioFormReducer'
import ejecucionReducer from './ejecucionReducer'
import resultadoReducer from './resultadoReducer'
import resultadoFormReducer from './resultadoFormReducer'
import indicadorReducer from './indicadorReducer'
import indicadorFormReducer from './indicadorFormReducer'
import parametroReducer from './parametroReducer'
import parametroFormReducer from './parametroFormReducer'
import queryReducer from './queryReducer'
import queryFormReducer from './queryFormReducer'
import usuarioReducer from './usuarioReducer'
import usuarioFormReducer from './usuarioFormReducer'

export default combineReducers({
  loginReducer,
  loginFormReducer,
  politicaReducer,
  politicaFormReducer,
  conciliacionReducer,
  conciliacionFormReducer,
  escenarioReducer,
  escenarioFormReducer,
  ejecucionReducer,
  resultadoReducer,
  resultadoFormReducer,
  indicadorReducer,
  indicadorFormReducer,
  parametroReducer,
  parametroFormReducer,
  queryReducer,
  queryFormReducer,
  usuarioReducer,
  usuarioFormReducer
})
