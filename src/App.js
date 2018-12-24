import React from 'react';
import "isomorphic-fetch";
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Match } from "react-router";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
import AdminThemplete from './teachers/AdminThemplete'
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
import IEjecucion from './ejecucionModule/IEjecucion'
import IProgramar from './ejecucionModule/IProgramar'
import IResultado from './resultadosModule/IResultado'
import IIndicador from './indicadoresModule/IIndicador'
import IIndicadorList from './indicadoresModule/IIndicadorList'
import IIndicadorForm from './indicadoresModule/IIndicadorForm'
import IIndicadorDelete from './indicadoresModule/IIndicadorDelete'
import IParametro from './parametrosModule/IParametro'
import IParametroList from './parametrosModule/IParametroList'
import IParametroForm from './parametrosModule/IParametroForm'
import IParametroDelete from './parametrosModule/IParametroDelete'
import IQuery from './querysModule/IQuery'
import IQueryList from './querysModule/IQueryList'
import IQueryForm from './querysModule/IQueryForm'
import IQueryDelete from './querysModule/IQueryDelete'
import IQueryAprobar from './querysModule/IQueryAprobar'
import IUsuario from './usuariosModule/IUsuario'
import IUsuarioList from './usuariosModule/IUsuarioList'
import IUsuarioForm from './usuariosModule/IUsuarioForm'
import IUsuarioDelete from './usuariosModule/IUsuarioDelete'

import IUnderConstruction from './IUnderConstruction'
import IPaginaNoExiste from './IPaginaNoExiste';

var createBrowserHistory = require('history/createBrowserHistory')

const middleware=[ thunk ];
if(process.env.NODE_ENV !== 'production'){
  //middleware.push(createLogger());
}

export const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

render((
    <Provider store={ store }>
      <Router history={ browserHistory }>
          <Route path="/" component={ILogin}></Route>
          <Route path="/politicas/edit/:idpolitica" component={IPoliticaForm}></Route>
          <Route path="/admin" component={ AdminThemplete } >
            <Choose>
              <When condition = {window.localStorage.getItem("userrol") == 1}>
                <div>
                  <Route path="/resultados" component={IResultado}></Route>
                  <Route path="/indicadores" component={IIndicador}></Route>
                  <Route path="/indicadores/:idindicador" component={IIndicador}></Route>
                  <Route path="/indicadores/edit/:idindicador" component={IIndicadorForm}></Route>
                  <Route path="/indicadores/delete/:idindicadordelete" component={IIndicadorDelete}></Route>
                </div>
              </When>
              <When condition = {window.localStorage.getItem("userrol") == 2}>
                <div>
                  <Route path="/ejecucion" component={IEjecucion}></Route>
                  <Route path="/ejecucion/programar" component={IProgramar}></Route>
                  <Route path="/resultados" component={IResultado}></Route>
                </div>
              </When>
              <When condition = {window.localStorage.getItem("userrol") == 3}>
                <div>
                  <Route path="/politicas" component={IPolitica}></Route>
                  <Route path="/politicas/:idpolitica" component={IPolitica}></Route>
                  <Route path="/politicas/edit/:idpolitica" component={IPoliticaForm}></Route>
                  <Route path="/politicas/delete/:idpolitica" component={IPoliticaDelete}></Route>
                  <Route path="/conciliaciones" component={IConciliacion}></Route>
                  <Route path="/conciliaciones/:idconciliacion" component={IConciliacion}></Route>
                  <Route path="/conciliaciones/edit/:idconciliacion" component={IConciliacionForm}></Route>
                  <Route path="/conciliaciones/delete/:idconciliaciondelete" component={IConciliacionDelete}></Route>
                  <Route path="/conciliaciones/aprobar/:idconciliacion" component={IQueryAprobar}></Route>
                  <Route path="/escenarios" component={IEscenario}></Route>
                  <Route path="/escenarios/:id" component={IEscenario}></Route>
                  <Route path="/escenarios/list/:idescenario" component={IEscenario}></Route>
                  <Route path="/escenarios/edit/:idescenario" component={IEscenarioForm}></Route>
                  <Route path="/escenarios/delete/:idescenario" component={IEscenarioDelete}></Route>
                  <Route path="/ejecucion" component={IEjecucion}></Route>
                  <Route path="/ejecucion/programar" component={IProgramar}></Route>
                  <Route path="/resultados" component={IResultado}></Route>
                  <Route path="/indicadores" component={IIndicador}></Route>
                  <Route path="/indicadores/:idindicador" component={IIndicador}></Route>
                  <Route path="/indicadores/edit/:idindicador" component={IIndicadorForm}></Route>
                  <Route path="/indicadores/delete/:idindicador" component={IIndicadorDelete}></Route>
                  <Route path="/parametros" component={IParametro}></Route>
                  <Route path="/parametros/:idparametro" component={IParametro}></Route>
                  <Route path="/parametros/edit/:idparametro" component={IParametroForm}></Route>
                  <Route path="/parametros/delete/:idparametro" component={IParametroDelete}></Route>
                  <Route path="/querys" component={IQuery}></Route>
                  <Route path="/querys/:idquery" component={IQuery}></Route>
                  <Route path="/querys/edit/:idquery" component={IQueryForm}></Route>
                  <Route path="/querys/delete/:idquery" component={IQueryDelete}></Route>
                  <Route path="/querys/escenario/:idquery" component={IQuery}></Route>
                  <Route path="/usuarios" component={IUsuario}></Route>
                  <Route path="/usuarios/:idusuario" component={IUsuario}></Route>
                  <Route path="/usuarios/edit/:idusuario" component={IUsuarioForm}></Route>
                  <Route path="/usuarios/delete/:idusuario" component={IUsuarioDelete}></Route>
                </div>
              </When>
            </Choose>
            <Route path="/uc" component={IUnderConstruction}></Route>
          </Route>
          <Route path="*" component={IPaginaNoExiste} />
      </Router>
    </Provider>
),document.getElementById('root'));
