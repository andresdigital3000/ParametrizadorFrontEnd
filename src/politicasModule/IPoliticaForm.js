import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormPoliticas, savePolitica, cargarPolitica, limpiarFormPolitica, onNombreIngresado } from '../actions/Actions';

class IPoliticaForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    if(this.props.registro){
      this.props.cargarPolitica(this.props.registro.idpolitica)
    }
  }

  //Detecta cambios de estado
  handleInput(e){
    this.props.updateFormPoliticas(e.target.id, e.target.value)
  }

  nombreIngresado(e){
    this.props.onNombreIngresado(e.target.value)
  }

  //Salvar el nuevo registro
  savePolitica(e){
    this.props.savePolitica()
  }

  //Limpiar el formulario
  limpiarFormPolitica(e){
    this.props.limpiarFormPolitica()
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
                      <h2>Detalles de la Política</h2>
                  </center>
                </div>
              </div>
            </header>
            <input id='id' ref='id' type='hidden' value={this.props.state.id}/>
            <div className="form-group">
              <label htmlFor='nombre'>* Nombre</label>
              <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite un nombre de política' autoComplete='off'  maxLength='100'/>
              <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo pero breve</small>
            </div>
            <div className="form-group">
              <label htmlFor='descripcion'>* Descripción</label>
              <textarea id='descripcion' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite una descripcion de la política'  maxLength='254' autoComplete='off'/>
              <small id="descripcionHelp" className="form-text text-muted">Defina para la política</small>
            </div>
            <div className="form-group">
              <label htmlFor='objetivo'>* Objetivo</label>
              <textarea id='objetivo' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.objetivo} onChange={this.handleInput.bind(this)} placeholder='Digite el objetivo de la política'  maxLength='200' autoComplete='off'/>
              <small id="objetivoHelp" className="form-text text-muted">Defina para la política</small>
            </div>
            <div className="form-group">
              <small>(*) Obligatorio</small>
              <hr/>
              <Link to={"/politicas"} onClick={this.props.limpiarFormPolitica.bind(this)} className="btn btn-warning">Regresar</Link>&nbsp;&nbsp;&nbsp;
              {
                this.props.state.nombre!="" && this.props.state.objetivo!="" && this.props.state.descripcion!="" ?
                <button onClick={this.props.savePolitica.bind(this)} className="btn btn-primary">Grabar</button> :
                <button className="btn btn-primary" disabled>Formulario incompleto</button>
              }
            </div>
          </div>
        </When>
        <Otherwise>
          <div className="modal fade" id="modalAdd" role="dialog" aria-labelledby="modalAddPoliticaTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalAddPoliticaTitle">Adicionar Política</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Cerrar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <input id='id' ref='id' type='hidden' value={this.props.state.id}/>
                    <div className="form-group">
                      <label htmlFor='nombre'>* Nombre</label>
                      <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} onBlur={this.nombreIngresado.bind(this)} placeholder='Digite un nombre de política' placeholder='Digite un nombre de política' autoComplete='off' maxLength='100'/>
                      <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo</small>
                      {
                        this.props.state.errorNombre=="A"?
                      <div className="alert alert-danger">
                        <strong>Error! </strong> El nombre de la política ya existe
                      </div>
                      : <span></span>
                      }
                    </div>
                    <div className="form-group">
                      <label htmlFor='descripcion'>* Descripción</label>
                      <textarea id='descripcion' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite una descripción para la política'  maxLength='254' autoComplete='off'/>
                      <small id="descripcionHelp" className="form-text text-muted">Defina para la política</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='objetivo'>* Objetivo</label>
                      <textarea id='objetivo' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.objetivo} onChange={this.handleInput.bind(this)} placeholder='Digite el objetivo de la política'  maxLength='200' autoComplete='off'/>
                      <small id="objetivoHelp" className="form-text text-muted">Defina para la política</small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    (*) Obligatorio
                    <hr/>                   
                    <button onClick={this.props.limpiarFormPolitica.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    {
                      this.props.state.nombre!="" && this.props.state.objetivo!="" && this.props.state.descripcion!="" && this.props.state.errorNombre=="" ?
                      <button onClick={this.props.savePolitica.bind(this)} className="btn btn-primary">Grabar</button> :
                      <button className="btn btn-primary"  disabled>Formulario incompleto</button>
                    }
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
      id : state.politicaFormReducer.id,
      nombre : state.politicaFormReducer.nombre,
      descripcion : state.politicaFormReducer.descripcion,
      objetivo : state.politicaFormReducer.objetivo,
      errorNombre : state.politicaFormReducer.errorNombre
    }
  }
}
export default connect (mapStateToProps,{
  updateFormPoliticas, savePolitica, cargarPolitica, limpiarFormPolitica, onNombreIngresado
})(IPoliticaForm)
