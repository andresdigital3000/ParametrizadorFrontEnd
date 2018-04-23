import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormEscenarios, saveEscenario, cargarEscenario, limpiarFormEscenario } from '../actions/Actions';

class IEscenarioForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    if(this.props.registro){
      this.props.cargarEscenario(this.props.registro.idescenario)
    }
  }

  //Detecta cambios de estado
  handleInput(e){
    this.props.updateFormEscenarios(e.target.id, e.target.value)
  }

  //Salvar el nuevo registro
  saveEscenario(e){
    this.props.saveEscenario()
  }

  //Limpiar el formulario
  limpiarFormEscenario(e){
    this.props.limpiarFormEscenario()
  }

  render(){
    return(
      <div className="container">
      <Choose>
        <When condition={this.props.registro}>
          <div className="form-wrapper">
            <header className="head-table">
              <div className="form-group">
                <div className="col-sm-12">
                  <center>
                      <h2>Editando Escenario</h2>
                  </center>
                </div>
              </div>
            </header>
            <input id='id' ref='id' type='hidden' value={this.props.registro.idescenario}/>
            <div className="form-group">
              <label htmlFor='nombre'>Nombre</label>
              <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite un nombre de conciiación' />
              <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo pero breve</small>
            </div>
            <div className="form-group">
              <label htmlFor='impacto'>Impacto</label>
              <input id='impacto' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.impacto} onChange={this.handleInput.bind(this)} placeholder='Digite el impacto del escenario' />
              <small id="impactoHelp" className="form-text text-muted">Defina impacto para el escenario</small>
            </div>
            <div className="form-group">
              <Link to={"/politicas"} onClick={this.props.limpiarFormEscenario.bind(this)} className="btn btn-warning">Regresar</Link>&nbsp;&nbsp;&nbsp;
              <button onClick={this.props.saveEscenario.bind(this)} className="btn btn-primary" data-dismiss="modal">Grabar</button>
            </div>
          </div>
        </When>
        <Otherwise>
          <div className="modal fade" id="modalAdd" role="dialog" aria-labelledby="modalAddEscenarioTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalAddEscenarioTitle">Adicionar Escenario</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Cerrar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <input id='id' ref='id' type='hidden' value={this.props.state.id}/>
                    <div className="form-group">
                      <label htmlFor='nombre'>Nombre</label>
                      <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite un nombre de escenario' />
                      <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='impacto'>Impacto</label>
                      <input id='impacto' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.impacto} onChange={this.handleInput.bind(this)} placeholder='Digite impacto del escenario' />
                      <small id="impactoHelp" className="form-text text-muted">Defina impacto para el escenario</small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button onClick={this.props.limpiarFormEscenario.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button onClick={this.props.saveEscenario.bind(this)} className="btn btn-primary" data-dismiss="modal">Grabar</button>
                  </div>
              </div>
            </div>
          </div>
        </Otherwise>
      </Choose>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      id : state.escenarioFormReducer.id,
      nombre : state.escenarioFormReducer.nombre,
      impacto : state.escenarioFormReducer.impacto
    }
  }
}
export default connect (mapStateToProps,{
  updateFormEscenarios, saveEscenario, cargarEscenario, limpiarFormEscenario
})(IEscenarioForm)
