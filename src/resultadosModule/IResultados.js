import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { cargarComboConciliacionesResultados, updateResultados } from '../actions/Actions';
import tinysoap from 'tinysoap'

class IResultados extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    this.props.cargarComboConciliacionesResultados()
  }
  //Detecta cambios de estado
  handleInput(e){
    this.props.updateResultados(e.target.id, e.target.value)
  }

  //Ejecuta llamado a web service SOAP
  onClick(e){
    console.log("Se oprime el botón de ejecutar...")
  }

  render(){
    return(
      <div className="container">
          <div className="form-wrapper">
            <header className="head-table">
              <div className="form-group">
                <div className="col-sm-12">
                  <center>
                      <h2>Gestión de resultados</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="form-group">
              <label htmlFor='conciliacion'>Conciliación</label>
              <select id='conciliacion' className='form-control form-control-lg' value={JSON.stringify(this.props.state.conciliacion)} onChange={this.handleInput.bind(this)}>
                <option value=''>Seleccione una</option>
                {this.props.state.conciliaciones.map(function(currentValue,index,array){
                  return(
                    <option key={currentValue.id} value={JSON.stringify(currentValue)}>{currentValue.nombre}</option>
                  );
                })}
              </select>
              <small id="conciliacionHelp" className="form-text text-muted">conciliación para obtener los resultados</small>
            </div>
            <div className="form-group">
              Archivo de resultados&nbsp;&nbsp;&nbsp;
              <button id='descargar' className='btn btn-primary' >Descargar</button>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div className="progress">
              <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60"
                   aria-valuemin="0" aria-valuemax="100" style={{width: '60%'}}>
                <span className="sr-only">60% completado</span>
              </div>
            </div>
            <div className="form-group">
              <br/>
              <button id='aceptar' className='btn btn-primary' >Aceptar Resultados</button>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div className="form-group">
              <Link to="#" className='btn btn-primary'>Enviar Correo</Link>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      conciliaciones : state.resultadoReducer.conciliaciones,
      conciliacion : state.resultadoReducer.conciliacion
    }
  }
}

export default connect (mapStateToProps,{
  cargarComboConciliacionesResultados, updateResultados
})(IResultados)
