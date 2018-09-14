import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { cargarComboConciliaciones, updateEjecucion, getStatusEjecucionConciliacion, doEjecutarConciliacion, doCancelarConciliacion } from '../actions/Actions';
import tinysoap from 'tinysoap'
import IMsg from './IMsg'
import { ToastContainer, toast } from 'react-toastify';
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';

class IEjecucion extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    this.props.cargarComboConciliaciones()
  }
  //Detecta cambios de estado
  handleInput(e){
    this.props.updateEjecucion(e.target.id, e.target.value)
  }

  render(){
    return(
      <div className="container">
          <div className="form-wrapper">
            <header className="head-table">
              <div className="form-group">
                <div className="col-sm-12">
                  <center>
                      <h2>Ejecución de conciliaciones</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="form-group">
              <label htmlFor='conciliacion'><h4>Conciliación</h4></label>
              <select id='conciliacion' className='form-control form-control-lg' value={JSON.stringify(this.props.state.conciliacion)} onChange={this.handleInput.bind(this)}>
                <option value='{"id":0,"nombre":"Ninguna"}'>Seleccione una</option>
                {this.props.state.conciliaciones.map(function(currentValue,index,array){
                  return(
                    <option key={currentValue.id} value={JSON.stringify(currentValue)}>{currentValue.nombre}</option>
                  );
                })}
              </select>
              <small id="conciliacionHelp" className="form-text text-muted">conciliación para realizar el proceso</small>
            </div>
            <div className="form-group">
              {
                this.props.state.conciliacion.id!=0 && this.props.state.conciliacion!='' && this.props.state.conciliacion!={"id":0,"nombre":"Ninguna"} ?
                <button id='ejecutar' className='btn btn-primary' onClick={() => toast.info(<IMsg {...this.props} mensaje='Está seguro de ejecutar la conciliación?' accion='ejecutar'/>, { autoClose: false, position: toast.POSITION.BOTTOM_CENTER })}>Ejecutar proceso</button> :
                <button id='ejecutar' className='btn btn-primary' disabled>Ejecutar proceso</button>
              }
              &nbsp;&nbsp;&nbsp;&nbsp;
              {
                this.props.state.conciliacion.id!=0 && this.props.state.conciliacion!='' && this.props.state.conciliacion!={"id":0,"nombre":"Ninguna"} ?
                <Link to="/ejecucion/programar" className='btn btn-primary'>Programar Ejecución</Link> :
                <button className='btn btn-primary' disabled>Programar Ejecución</button>
              }
            </div>
            <div className="form-group">
              {
                this.props.state.conciliacion.id!=0 && this.props.state.conciliacion!='' && this.props.state.conciliacion!={"id":0,"nombre":"Ninguna"} ?
                <button id='cancelar' className='btn btn-warning' onClick={() => toast.info(<IMsg {...this.props} mensaje='Está seguro de detener la ejecución de la conciliación?' accion='cancelar'/>, { autoClose: false, position: toast.POSITION.BOTTOM_CENTER })}>Abortar proceso</button> :
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
      conciliaciones : state.ejecucionReducer.conciliaciones,
      conciliacion : state.ejecucionReducer.conciliacion
    }
  }
}

export default connect (mapStateToProps,{
  cargarComboConciliaciones, updateEjecucion, getStatusEjecucionConciliacion, doEjecutarConciliacion, doCancelarConciliacion
})(IEjecucion)
