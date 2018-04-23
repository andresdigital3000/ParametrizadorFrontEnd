import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Match } from "react-router";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
import AdminThemplete from './teachers/AdminThemplete'
import Dashboard from './teachers/Dashboard'
import ILogin from './ILogin'
import IPolitica from './politicasModule/IPolitica'
import IPoliticaList from './politicasModule/IPoliticaList'
import IPoliticaForm from './politicasModule/IPoliticaForm'
import IPoliticaDelete from './politicasModule/IPoliticaDelete'
import IConciliacion from './conciliacionesModule/IConciliacion'
import IConciliacionList from './conciliacionesModule/IConciliacionList'
import IConciliacionForm from './conciliacionesModule/IConciliacionForm'
import IConciliacionDelete from './conciliacionesModule/IConciliacionDelete'
import IEscenario from './escenariosModule/IEscenario'
import IEscenarioList from './escenariosModule/IEscenarioList'
import IEscenarioForm from './escenariosModule/IEscenarioForm'
import IEscenarioDelete from './escenariosModule/IEscenarioDelete'

//import APIInvoker from './utils/APIInvoker'

var createBrowserHistory = require('history/createBrowserHistory')

const middleware=[ thunk ];
if(process.env.NODE_ENV !== 'production'){
  middleware.push(createLogger());
}

export const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

render((
    <Provider store={ store }>
      <Router history={ browserHistory }>
          <Route path="/login" component={ILogin}></Route>
          <Route path="/" component={ AdminThemplete } >
            <Route path="/politicas" component={IPolitica}></Route>
            <Route path="/politicas/:idpoliticafilter" component={IPolitica}></Route>
            <Route path="/politicas/edit/:idpolitica" component={IPoliticaForm}></Route>
            <Route path="/politicas/delete/:idpoliticadelete" component={IPoliticaDelete}></Route>
            <Route path="/conciliaciones" component={IConciliacion}></Route>
            <Route path="/conciliaciones/:idconciliacionfilter" component={IConciliacion}></Route>
            <Route path="/conciliaciones/edit/:idconciliacion" component={IConciliacionForm}></Route>
            <Route path="/conciliaciones/delete/:idconciliaciondelete" component={IConciliacionDelete}></Route>
            <Route path="/escenarios" component={IEscenario}></Route>
            <Route path="/escenarios/:idconciliacion" component={IEscenario}></Route>
            <Route path="/escenarios/edit/:idescenario" component={IEscenarioForm}></Route>
            <Route path="/escenarios/delete/:idescenariodelete" component={IEscenarioDelete}></Route>
          </Route>
      </Router>
    </Provider>
),document.getElementById('root'));
