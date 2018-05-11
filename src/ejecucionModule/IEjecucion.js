import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { cargarComboConciliaciones, updateEjecucion } from '../actions/Actions';

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
                      <h2>Gestión de Resultados</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="form-group">
              <label htmlFor='conciliacion'>Conciliación</label>
              <select id='conciliacion' className='form-control form-control-lg' value={this.props.state.conciliacion} onChange={this.handleInput.bind(this)}>
                <option value=''>Seleccione una</option>
                {this.props.state.conciliaciones.map(function(currentValue,index,array){
                  return(
                    <option key={currentValue.id} value={JSON.stringify(currentValue)}>{currentValue.nombre}</option>
                  );
                })}
              </select>
              <small id="conciliacionHelp" className="form-text text-muted">conciliación para realizar el proceso</small>
            </div>
            <div className="form-group">
              <button id='ejecutar' className='btn btn-primary'>Ejecutar</button>&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/ejecucion/programar" className='btn btn-primary'>Programar Ejecución</Link>
            </div>
            <div className="form-group">
              <button id='cancelar' className='btn btn-primary'>Cancelar Proceso</button>
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
  cargarComboConciliaciones, updateEjecucion
})(IEjecucion)
