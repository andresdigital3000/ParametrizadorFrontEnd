import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
//import { cargarComboConciliaciones, updateEjecucion } from '../actions/Actions';

class IProgramar extends React.Component{
  constructor(){
    super(...arguments)
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
                      <h2>Programar ejecución</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="form-group">
              <label htmlFor='fechainicia'>Inicia el:</label><br/>
              <div className='row'>
                <div className='col-sm-6'>
                  <input className='form-control' type='date' id='fechainicia'/>
                </div>
                <div className='col-sm-3'></div>
              </div>
              <small id="fechainiciaHelp" className="form-text text-muted">Seleccione desde cuando inicia ejecución</small>
            </div>
            <div className="form-group">
              <label htmlFor='frecuencia'>Repetir cada:</label>
              <div className='row'>
                <div className='col-sm-3'>
                  <input type='number' className='form-control' id='frecuencia' step='1' value={this.props.state.frecuencia}/>&nbsp;&nbsp;&nbsp;
                </div>
                <div className='col-sm-9'>
                  <select id='tipoFrecuencia' className='form-control' value={this.props.state.tipoFrecuencia} onChange={this.handleInput.bind(this)}>
                    <option value=''>Seleccione uno</option>
                    <option value='semana'>Semana</option>
                    <option value='mes'>Mes</option>
                    <option value='año'>Año</option>
                  </select>
                </div>
              </div>
              <small id="frecuenciaHelp" className="form-text text-muted">Seleccione frecuencia de ejecución</small>
            </div>
            <div className="form-group">
              <label htmlFor='diasdesemana'>Repetir el:</label><br/>
              <button id='diasdesemana' value='L' className='btn btn-primary' type='checkbox'>L</button>
              <button id='diasdesemana' value='M' className='btn btn-primary' type='checkbox'>M</button>
              <button id='diasdesemana' value='MC' className='btn btn-primary' type='checkbox'>MC</button>
              <button id='diasdesemana' value='J' className='btn btn-primary'>J</button>
              <button id='diasdesemana' value='V' className='btn btn-primary'>V</button>
              <button id='diasdesemana' value='S' className='btn btn-primary'>S</button>
              <button id='diasdesemana' value='D' className='btn btn-primary'>D</button>
              <small id="frecuenciaHelp" className="form-text text-muted">Seleccione en qué dias de la semana</small>
            </div>
            <div className="form-group">
              <label htmlFor='cuando'>Finaliza el:</label><br/>
              <div className='row'>
                <div className='col-sm-12'>
                  <input type='radio' name='cuando' id='cuando' value='nunca'/>Nunca<br/>&nbsp;
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-3'>
                  <input type='radio' name='cuando' id='cuando' value='el'/>El&nbsp;&nbsp;
                </div>
                <div className='col-sm-6'>
                  <input className='form-control' type='date' id='fechacuando'/>
                </div>
                <div className='col-sm-3'></div>
              </div>
              <div className='row'>
                <div className='col-sm-3'>
                  <input type='radio' name='cuando' id='cuando' value='despuesde'/>Después de&nbsp;&nbsp;
                </div>
                <div className='col-sm-2'>
                <input type='number' className='form-control' value={this.props.state.despuesde} step='1'/>
                </div>
                <div className='col-sm-7'>
                  <label>Ocurrencias</label>
                </div>
              </div>
              <small id="cuandoHelp" className="form-text text-muted">Seleccione el tipo de ocurrencia</small>
            </div>
            <div className="form-group">
              <Link to="/ejecucion" className='btn btn-warning'>Regresar</Link>&nbsp;&nbsp;&nbsp;
              <Link to="#" className="btn btn-primary">Salvar</Link>
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
  //cargarComboConciliaciones, updateEjecucion
})(IProgramar)
