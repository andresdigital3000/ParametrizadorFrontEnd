import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Toolbar from './Toolbar'
import IPolitica from '../politicasModule/IPolitica'
import IPoliticaForm from '../politicasModule/IPoliticaForm'
import IPoliticaDelete from '../politicasModule/IPoliticaDelete'
import IConciliacion from '../conciliacionesModule/IConciliacion'
import IConciliacionForm from '../conciliacionesModule/IConciliacionForm'
import IConciliacionDelete from '../conciliacionesModule/IConciliacionDelete'
import IEscenario from '../escenariosModule/IEscenario'
import IEscenarioForm from '../escenariosModule/IEscenarioForm'
import IEscenarioDelete from '../escenariosModule/IEscenarioDelete'
import IEjecucion from '../ejecucionModule/IEjecucion'
import IProgramar from '../ejecucionModule/IProgramar'
import IResultado from '../resultadosModule/IResultado'
import IIndicador from '../indicadoresModule/IIndicador'
import IIndicadorForm from '../indicadoresModule/IIndicadorForm'
import IIndicadorDelete from '../indicadoresModule/IIndicadorDelete'
import IParametro from '../parametrosModule/IParametro'
import IParametroForm from '../parametrosModule/IParametroForm'
import IParametroDelete from '../parametrosModule/IParametroDelete'
import IQuery from '../querysModule/IQuery'
import IQueryForm from '../querysModule/IQueryForm'
import IQueryDelete from '../querysModule/IQueryDelete'
import IQueryAprobar from '../querysModule/IQueryAprobar'
import IUsuario from '../usuariosModule/IUsuario'
import IUsuarioForm from '../usuariosModule/IUsuarioForm'
import IUsuarioDelete from '../usuariosModule/IUsuarioDelete'

import IUnderConstruction from '../IUnderConstruction'
import IModal from '../IModal'
import Loading from '../politicasModule/Loading.js'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { relogin } from '../actions/Actions'
import { ToastContainer, toast } from 'react-toastify';
import '!style-loader!css-loader!react-toastify/../../resources/css/ReactToastify.css';

import { mostrarModal,ocultarModal } from '../actions/Actions';

// Valor en milisiegundos del intervalo de revisión para autoLogout
const CHECK_INTERVAL = 60000;
const STORE_KEY =  'lastAction';

class AdminThemplete extends React.Component{

  constructor(props){
    super(props)
    this.check();
    this.initListener();
    this.initInterval();
  }

  getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }

  setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    //document.body.addEventListener('mouseover',()=> this.reset());
    //document.body.addEventListener('mouseout',() => this.reset());
    document.body.addEventListener('keydown',() => this.reset());
    document.body.addEventListener('keyup',() => this.reset());
    document.body.addEventListener('keypress',() => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
    this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    // Valor límite en minutos para autoLogout
    const MINUTES_UNITL_AUTO_LOGOUT = parseInt(window.localStorage.getItem("tiempoexpirasesion"))-1
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;
    //console.log("LocalStore" + window.localStorage.getItem("tiempoexpirasesion"));
    //console.log("Minutos para Expirar " + MINUTES_UNITL_AUTO_LOGOUT);
    //console.log("timeleft " + timeleft);
    //console.log("Diferencia " + diff);
    //console.log("Booleano " + isTimeout);
    if (isTimeout) {
      // Call here logout function, expire session
      localStorage.clear();
      window.location = '/';
    }
  }

  componentWillMount(){
    this.props.relogin()
  }

  mostrarModal() {
    this.props.mostrarModal()
  }

  ocultarModal(){
    this.props.ocultarModal()
  }

  render(){
    return(
      <div data-reactroot="" className="container-fluid">
          <ToastContainer modal={true} zIndex={9999} hideProgressBar={true} autoClose={5000}/>
          <IModal/>
          <Choose>
            <When condition={this.props.load}>
                <Toolbar/>
                <If condition={this.props.location.pathname == '/uc'}>
                  <IUnderConstruction/>
                </If>
                <If condition={this.props.location.pathname.substr(1,9) == 'politicas'}>
                  <Choose>
                    <When condition={this.props.params.idpolitica && this.props.location.pathname.substr(1,14) == 'politicas/edit'}>
                      <IPoliticaForm registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idpolitica && this.props.location.pathname.substr(1,14) != 'politicas/edit'}>
                      <IPolitica registro={this.props.params.idpolitica}/>
                    </When>
                    <When condition={this.props.params.idpoliticadelete}>
                      <IPoliticaDelete registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idpoliticafiltro}>
                      <IPolitica registro={this.props.params}/>
                    </When>
                    <Otherwise>
                      <IPoliticaForm/>
                      <IPolitica/>
                    </Otherwise>
                  </Choose>
                </If>
                <If condition={this.props.location.pathname.substr(1,14) == 'conciliaciones'}>
                  <Choose>
                    <When condition={this.props.params.idconciliacion}>
                      <IConciliacionForm registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idconciliaciondelete}>
                      <IConciliacionDelete registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idpolitica}>
                      <IConciliacion registro={this.props.params.idpolitica}/>
                    </When>
                    <Otherwise>
                      <IConciliacionForm />
                      <IConciliacion/>
                    </Otherwise>
                  </Choose>
                </If>
                <If condition={this.props.location.pathname.substr(1,10) == 'escenarios'}>
                  <Choose>
                    <When condition={this.props.params.idescenario}>
                      <If condition={this.props.location.pathname.substr(1,15) == 'escenarios/list'}>
                          <IEscenario escenario={this.props.params.idescenario}/>
                      </If>
                      <If condition={this.props.location.pathname.substr(1,15) == 'escenarios/edit'}>
                          <IEscenarioForm registro={this.props.params}/>
                      </If>
                      <If condition={this.props.location.pathname.length == 10}>
                          <IEscenarioForm registro={this.props.params}/>
                      </If>
                    </When>
                    <When condition={this.props.params.idescenariodelete}>
                      <IEscenarioDelete registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idescenario}>
                      <IEscenario registro={this.props.params.idescenario}/>
                    </When>
                    <When condition={this.props.params.idconciliacion}>
                      <IEscenarioForm conciliacion={this.props.params.idconciliacion}/>
                      <IEscenario conciliacion={this.props.params.idconciliacion}/>
                    </When>
                    <Otherwise>
                      <IEscenarioForm/>
                      <IEscenario/>
                    </Otherwise>
                  </Choose>
                </If>
                <If condition={this.props.location.pathname.substr(1,10) == 'ejecucion'}>
                    <IEjecucion/>
                </If>
                <If condition={this.props.location.pathname.substr(1,10) == 'ejecucione'}>
                    <IEjecucionE/>
                </If>
                <If condition={this.props.location.pathname.substr(1,19) == 'ejecucion/programar'}>
                    <IProgramar/>
                </If>
                <If condition={this.props.location.pathname.substr(1,9) == 'resultado'}>
                    <IResultado/>
                </If>
                <If condition={this.props.location.pathname.substr(1,11) == 'indicadores'}>
                  <Choose>
                    <When condition={this.props.params.idindicador && this.props.location.pathname.substr(1,16) == 'indicadores/edit'}>
                      <IIndicadorForm registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idindicador && this.props.location.pathname.substr(1,16) != 'indicadores/edit'}>
                      <IIndicador registro={this.props.params.idindicador}/>
                    </When>
                    <When condition={this.props.params.idindicadordelete}>
                      <IIndicadorDelete registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idindicadorfiltro}>
                      <IIndicador registro={this.props.params}/>
                    </When>
                    <Otherwise>
                      <IIndicadorForm/>
                      <IIndicador/>
                    </Otherwise>
                  </Choose>
                </If>
                <If condition={this.props.location.pathname.substr(1,10) == 'parametros'}>
                  <Choose>
                    <When condition={this.props.params.idescenario && this.props.location.pathname.substr(1,11) == 'parametros/'}>
                      <IParametro idescenario={this.props.params.idescenario}/>
                    </When>
                    <When condition={this.props.params.idparametro && this.props.location.pathname.substr(1,15) == 'parametros/edit'}>
                      <IParametroForm registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idparametro && this.props.location.pathname.substr(1,15) != 'parametros/edit'}>
                      <IParametro registro={this.props.params.idparametro}/>
                    </When>
                    <When condition={this.props.params.idparametrodelete}>
                      <IParametroDelete registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idparametrofiltro}>
                      <IParametro registro={this.props.params}/>
                    </When>
                    <Otherwise>
                      <IParametroForm/>
                      <IParametro/>
                    </Otherwise>
                  </Choose>
                </If>
                <If condition={this.props.location.pathname.substr(1,6) == 'querys'}>
                  <Choose>
                    <When condition={this.props.params.idquery}>
                      <IQueryForm registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idquerydelete}>
                      <IQueryDelete registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idquery}>
                      <IQuery registro={this.props.params.idquery}/>
                    </When>
                    <When condition={this.props.params.idconciliacion}>
                      <IQueryForm conciliacion={this.props.params.idconciliacion}/>
                      <IQuery conciliacion={this.props.params.idconciliacion}/>
                    </When>
                    <When condition={this.props.params.aprobar}>
                      <IQueryAprobar/>
                    </When>
                    <Otherwise>
                      <IQueryForm/>
                      <IQuery/>
                    </Otherwise>
                  </Choose>
                </If>
                <If condition={this.props.location.pathname.substr(1,8) == 'usuarios'}>
                  <Choose>
                    <When condition={this.props.params.idusuario && this.props.location.pathname.substr(1,13) == 'usuarios/edit'}>
                      <IUsuarioForm registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idusuario && this.props.location.pathname.substr(1,13) != 'usuarios/edit'}>
                      <IUsuarioForm registro={this.props.params.idusuario}/>
                    </When>
                    <When condition={this.props.params.idusuariodelete}>
                      <IUsuarioDelete registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idusuariofiltro}>
                      <IUsuarioForm registro={this.props.params}/>
                    </When>
                    <Otherwise>
                      <IUsuarioForm/>
                      <IUsuario/>
                    </Otherwise>
                  </Choose>
                </If>
            </When>
            <Otherwise>
              <Loading/>
            </Otherwise>
          </Choose>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    load : state.loginReducer.load,
    profile : state.loginReducer.profile,
    showmodal : state.loginReducer.showmodal
  }
}

export default connect(mapStateToProps,{
  relogin, mostrarModal, ocultarModal
})(AdminThemplete);
