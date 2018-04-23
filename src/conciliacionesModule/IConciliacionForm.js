import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormConciliaciones, saveConciliacion, cargarConciliacion, limpiarFormConciliacion } from '../actions/Actions';

class IConciliacionForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    if(this.props.registro){
      this.props.cargarConciliacion(this.props.registro.idconciliacion)
    }
  }

  //Detecta cambios de estado
  handleInput(e){
    this.props.updateFormConciliaciones(e.target.id, e.target.value)
  }

  //Salvar el nuevo registro
  saveConciliacion(e){
    this.props.saveConciliacion()
  }

  //Limpiar el formulario
  limpiarFormConciliacion(e){
    this.props.limpiarFormConciliacion()
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
                      <h2>Editando Conciliación</h2>
                  </center>
                </div>
              </div>
            </header>
            <input id='id' ref='id' type='hidden' value={this.props.registro.idconciliacion}/>
            <div className="form-group">
              <label htmlFor='nombre'>Nombre</label>
              <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite un nombre de conciiación' />
              <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo pero breve</small>
            </div>
            <div className="form-group">
              <label htmlFor='shell'>Shell</label>
              <input id='shell' type='text' className='form-control form-control-lg' value={this.props.state.shell} onChange={this.handleInput.bind(this)} placeholder='Digite shell de conciliación' />
              <small id="shellHelp" className="form-text text-muted">Shell</small>
            </div>
            <div className="form-group">
              <label htmlFor='descripcion'>Descripción</label>
              <input id='descripcion' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite una descripcion de la conciliación' />
              <small id="descripcionHelp" className="form-text text-muted">Defina para la conciliación</small>
            </div>
            <div className="form-group">
              <Link to={"/politicas"} onClick={this.props.limpiarFormConciliacion.bind(this)} className="btn btn-warning">Regresar</Link>&nbsp;&nbsp;&nbsp;
              <button onClick={this.props.saveConciliacion.bind(this)} className="btn btn-primary" data-dismiss="modal">Grabar</button>
            </div>
          </div>
        </When>
        <Otherwise>
          <div className="modal fade" id="modalAdd" role="dialog" aria-labelledby="modalAddConciliacionTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalAddConciliacionTitle">Adicionar Conciliación</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Cerrar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <input id='id' ref='id' type='hidden' value={this.props.state.id}/>
                    <div className="form-group">
                      <label htmlFor='nombre'>Nombre</label>
                      <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite un nombre de conciliación' />
                      <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='shell'>Shell</label>
                      <input id='shell' type='text' className='form-control form-control-lg' value={this.props.state.shell} onChange={this.handleInput.bind(this)} placeholder='Digite shell de conciliación' />
                      <small id="shellHelp" className="form-text text-muted">Que sea shell</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='descripcion'>Descripcion</label>
                      <input id='descripcion' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite una descripción para la conciliación' />
                      <small id="descripcionHelp" className="form-text text-muted">Defina para la política</small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button onClick={this.props.limpiarFormConciliacion.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button onClick={this.props.saveConciliacion.bind(this)} className="btn btn-primary" data-dismiss="modal">Grabar</button>
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
      id : state.conciliacionFormReducer.id,
      nombre : state.conciliacionFormReducer.nombre,
      shell : state.conciliacionFormReducer.shell,
      descripcion : state.conciliacionFormReducer.descripcion
    }
  }
}
export default connect (mapStateToProps,{
  updateFormConciliaciones, saveConciliacion, cargarConciliacion, limpiarFormConciliacion
})(IConciliacionForm)
