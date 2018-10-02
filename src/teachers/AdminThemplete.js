import React from 'react'
import ReactDOM from 'react-dom'
//import Menu from './Menu'
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
import IEjecucionE from '../ejecucionModule/IEjecucionE'
import IProgramar from '../ejecucionModule/IProgramar'
import IResultados from '../resultadosModule/IResultados'
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
import IUnderConstruction from '../IUnderConstruction'
import IModal from '../IModal'
import Loading from '../politicasModule/Loading.js'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { relogin } from '../actions/Actions'
import { ToastContainer, toast } from 'react-toastify';
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';

import { mostrarModal,ocultarModal } from '../actions/Actions';

class AdminThemplete extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.relogin()
  }

  componentDidMount(){
    console.log("AdminThemplate PROPS==>")
    console.log(this.props)
  }

  mostrarModal() {
    this.props.mostrarModal()
  }

  ocultarModal(){
    this.props.ocultarModal()
  }

  //<button className="btn btn-primary" data-toggle="modal" data-target="#modalMsg"><i className="fa fa-plus-circle"/>Mostrar Modal</button>
  
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
                      <IEscenarioForm registro={this.props.params}/>
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
                <If condition={this.props.location.pathname.substr(1,10) == 'resultados'}>
                    <IResultados/>
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
