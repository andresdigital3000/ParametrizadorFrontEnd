import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { cambioConciliacionesQuery, cargarConciliacionesQuery, rechazarConciliacion, aprobarConciliacion, updateFormAprobQuerys } from '../actions/Actions';

class IQueryAprobar extends React.Component{
  constructor(){
    super(...arguments)
  }

  //Detecta cambios de estado en textbox
  handleInput(e){
      this.props.updateFormAprobQuerys(e.target.id, e.target.value)
  }

  cambioConciliacionesQuery(){
    this.props.cambioConciliacionesQuery()
  }

  //Rechazar
  rechazar(){
    this.props.rechazarConciliacion()
  }

  //aprobar
  aprobar(){
    this.props.aprobarConciliacion()
  }

  render(){
    return(
      <div className="container">
        <div className="form-wrapper">
          <header className="head-table">
            <div className="form-group">
              <div className="col-sm-12">
                <center>
                    <h2>Aprobar Queries</h2>
                </center>
              </div>
            </div>
          </header>
          <div className="form-group">
            <label htmlFor='conciliacion'>Conciliación</label>
            <select id="conciliacion" name="conciliacion" className='form-control form-control-lg' value={this.props.state.conciliacion} readOnly>
              {this.props.state.conciliaciones.map(function(currentValue,index,array){
                return(
                  <option key={currentValue.id} value={JSON.stringify(currentValue)}>{currentValue.nombre}</option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor='mensaje'>Mensaje</label>
            <div className="col-sm-12">
              <textarea id="mensaje" name="mensaje" rows="10" className='form-control form-control-lg' value={this.props.state.mensaje} onChange={this.handleInput.bind(this)}/>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-2">
                <Link to="/querys" className="btn btn-warning">Regresar</Link>
              </div>
              <div className="col-sm-6">
              </div>
              <div className="col-sm-2">
                <input type="button" className="btn btn-danger" value="No Aprobar" onClick={this.rechazar.bind(this)}/>
              </div>
              <div className="col-sm-2">
                <input type="button" className="btn btn-success" value="Aprobar" onClick={this.aprobar.bind(this)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      conciliacion : JSON.stringify(state.queryReducer.conciliacion),
      conciliaciones : state.queryReducer.conciliaciones,
      mensaje : state.queryReducer.mensaje
    }
  }
}
export default connect (mapStateToProps,{
  cambioConciliacionesQuery, cargarConciliacionesQuery, rechazarConciliacion, aprobarConciliacion, updateFormAprobQuerys
})(IQueryAprobar)
