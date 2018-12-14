import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IEscenarioList from './IEscenarioList'
import IEscenarioFinder from './IEscenarioFinder'
import IEscenarioPaginador from './IEscenarioPaginador'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { updConciliacion,findTextEscenario,refreshListEscenario,cargarComboConciliaciones,calculaPaginadorEscenarios, cambioConciliacionesEscenario, cargarConciliacionesEscenario, cargarImpactos } from '../actions/Actions';

class IEscenario extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    this.props.cargarImpactos()
    this.props.cargarConciliacionesEscenario()
    if(this.props.escenario != undefined){
      this.props.refreshListEscenario(this.props.escenario)
    }else if(this.props.conciliacion != undefined && this.props.conciliacion != 0){
      this.props.updConciliacion(this.props.conciliacion)
    }else if(this.props.registro != undefined && this.props.registro != 0){
      this.props.updConciliacion(this.props.registro)
    }else{
      this.props.updConciliacion(0)
    }
  }

  cambioConciliacionesEscenario(e){
    this.props.updConciliacion(e.target.value)
  }

  render(){
    return(
        <div className="container">
          <header className="head-table">
            <div className="row">
                <br/>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <If condition={this.props.registro==undefined}>
                    <button className="btn btn-primary" id="buttonadd" data-toggle="modal" data-target="#modalAdd"><i className="fa fa-plus-circle"/> Adicionar</button>
                </If>
              </div>
              <div className="col-sm-4">
                <center>
                  <h2>Escenarios</h2>
                </center>
              </div>
              <div className="col-sm-4">
                  <If condition={this.props.registro==undefined}>
                      <IEscenarioFinder/>
                  </If>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <label htmlFor='conciliacion'>Conciliación</label>
                <select id="conciliacion" name="conciliacion" className='form-control' value={this.props.state.conciliacion.id} onChange={this.cambioConciliacionesEscenario.bind(this)}>
                  <option key="0" value="0">Todas</option>
                  {this.props.state.conciliaciones.map(function(currentValue,index,array){
                    return(
                      <option key={currentValue.id} value={currentValue.id}>{currentValue.nombre}</option>
                    );
                  })}
                </select>
              </div>
            </div>
            <hr/>
            <Choose>
            <When condition={this.props.registro != undefined}>
              <IEscenarioList conciliacion={this.props.registro}/>
            </When>
            <When condition={this.props.conciliacion != undefined}>
              <IEscenarioList conciliacion={this.props.conciliacion}/>
            </When>
            <Otherwise>
              <IEscenarioList conciliacion={0}/>
            </Otherwise>
            </Choose>
            <hr/>
            <div className="row">
              <div className="col-sm-1">
              </div>
              <div className="col-sm-4">
                <center>
                  <IEscenarioPaginador/>
                </center>
              </div>
              <div className="col-sm-1">
              </div>
            </div>
          </header>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      conciliacion: state.escenarioReducer.conciliacion,
      conciliaciones: state.escenarioReducer.conciliaciones
    }
  }
}

export default connect (mapStateToProps,{
  updConciliacion, findTextEscenario, refreshListEscenario, cargarComboConciliaciones, calculaPaginadorEscenarios, cambioConciliacionesEscenario, cargarConciliacionesEscenario, cargarImpactos
})(IEscenario)
