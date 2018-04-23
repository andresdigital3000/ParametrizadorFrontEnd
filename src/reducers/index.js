import { combineReducers } from 'redux'
import loginReducer from './LoginReducer'
import loginFormReducer from './LoginFormReducer'
import politicaReducer from './PoliticaReducer'
import politicaFormReducer from './PoliticaFormReducer'
import conciliacionReducer from './ConciliacionReducer'
import conciliacionFormReducer from './ConciliacionFormReducer'
import escenarioReducer from './EscenarioReducer'
import escenarioFormReducer from './EscenarioFormReducer'



export default combineReducers({
  loginReducer,
  loginFormReducer,
  politicaReducer,
  politicaFormReducer,
  conciliacionReducer,
  conciliacionFormReducer,
  escenarioReducer,
  escenarioFormReducer
})
