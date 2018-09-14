import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { cargarComboEscenariosE, updateEjecucionE, getStatusEjecucionEscenario, doEjecutarEscenario, doCancelarEscenario } from '../actions/Actions';
import tinysoap from 'tinysoap'
import IMsg from './IMsg'
import IMsgE from './IMsgE'
import { ToastContainer, toast } from 'react-toastify';
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';

class IEjecucionE extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    this.props.cargarComboEscenariosE()
  }
  //Detecta cambios de estado
  handleInput(e){
    this.props.updateEjecucionE(e.target.id, e.target.value)
  }

  render(){
    return(
          <div className="container">
            <div className="form-wrapper">
            <header className="head-table">
              <div className="form-group">
                <div className="col-sm-12">
                  <center>
                      <h2>Ejecución de escenarios</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="form-group">
              <label htmlFor='escenario'><h4>Escenario</h4></label>
              <select id='escenario' className='form-control form-control-lg' value={JSON.stringify(this.props.state.escenario)} onChange={this.handleInput.bind(this)}>
                <option value='{"id":0,"nombre":"Ninguno"}'>Seleccione uno</option>
                {this.props.state.escenarios.map(function(currentValue,index,array){
                  return(
                    <option key={currentValue.id} value={JSON.stringify(currentValue)}>{currentValue.nombre}</option>
                  );
                })}
              </select>
              <small id="escenarioHelp" className="form-text text-muted">escenario para realizar el proceso</small>
            </div>
            <div className="form-group">
              {
                this.props.state.escenario.id!=0 && this.props.state.escenario!='' && this.props.state.escenario!={"id":0,"nombre":"Ninguno"} ?
                <button id='ejecutarE' className='btn btn-primary' onClick={() => toast.info(<IMsgE {...this.props} mensaje='Está seguro de ejecutar el escenario?' accion='ejecutar'/>, { autoClose: false, position: toast.POSITION.BOTTOM_CENTER })}>Ejecutar proceso</button> :
                <button id='ejecutarE' className='btn btn-primary' disabled>Ejecutar proceso</button>
              }
            </div>
            <div className="form-group">
              {
                this.props.state.escenario.id!=0 && this.props.state.escenario!='' && this.props.state.escneario!={"id":0,"nombre":"Ninguno"} ?
                <button id='cancelar' className='btn btn-warning' onClick={() => toast.info(<IMsgE {...this.props} mensaje='Está seguro de detener la ejecución del escenario?' accion='cancelar'/>, { autoClose: false, position: toast.POSITION.BOTTOM_CENTER })}>Abortar proceso</button> :
                <button id='cancelar' className='btn btn-warning' disabled>Abortar proceso</button>
              }
            </div>
          </div>
          </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      escenarios : state.ejecucionReducer.escenarios,
      escenario : state.ejecucionReducer.escenario
    }
  }
}

export default connect (mapStateToProps,{
  cargarComboEscenariosE, updateEjecucionE, getStatusEjecucionEscenario, doEjecutarEscenario, doCancelarEscenario
})(IEjecucionE)
