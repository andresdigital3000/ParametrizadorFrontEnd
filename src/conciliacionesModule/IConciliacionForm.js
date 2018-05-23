import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormConciliaciones, saveConciliacion, cargarConciliacion, limpiarFormConciliacion, cargarComboPoliticas, updPolitica, calculaPaginadorConciliaciones,refreshListConciliacion } from '../actions/Actions';

class IConciliacionForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    //Cargar el combo de politicas
    this.props.cargarComboPoliticas()
    console.log("Props luego de cargar politicas =>")
    console.log(this.props)
  }
  componentDidMount(){
    if(this.props.registro){
      this.props.cargarConciliacion(this.props.registro.idconciliacion)
    }
  }

  //Detecta cambios de estado en los textbox
  handleInput(e){
    this.props.updateFormConciliaciones(e.target.id, e.target.value)
  }

  //Detecta cambio en el combo de Politicas
  cambioPolitica(e){
    let idpol=JSON.parse(e.target.value)
    this.props.updPolitica(idpol.id)
    this.props.cargarComboPoliticas()
  }

  //Salvar el nuevo registro
  saveConciliacion(e){
    this.props.saveConciliacion()
    this.props.refreshListConciliacion()
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
            <div className="form-group">
              <label htmlFor='nombre'>Nombre</label>
              <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite un nombre de conciiación' />
              <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo pero breve</small>
            </div>
            <div className="form-group">
              <label htmlFor='webservice'>Web Service</label>
              <input id='webservice' type='text' className='form-control form-control-lg' value={this.props.state.webservice} onChange={this.handleInput.bind(this)} placeholder='Digite Web Service' />
              <small id="webserviceHelp" className="form-text text-muted">Web Service</small>
            </div>
            <div className="form-group">
              <label htmlFor='descripcion'>Descripción</label>
              <textarea id='descripcion' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite una descripcion de la conciliación' />
              <small id="descripcionHelp" className="form-text text-muted">Defina para la conciliación</small>
            </div>
            <div className="form-group">
              <Link to={"/conciliaciones"} onClick={this.props.limpiarFormConciliacion.bind(this)} className="btn btn-warning">Regresar</Link>&nbsp;&nbsp;&nbsp;
              {
                this.props.state.nombre!="" ?
                <button onClick={this.props.saveConciliacion.bind(this)} className="btn btn-primary" data-dismiss="modal">Grabar</button> :
                <button onClick={this.props.saveConciliacion.bind(this)} className="btn btn-primary" data-dismiss="modal" disabled>Formulario incompleto</button>
              }
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

                    <div className="form-group">
                      <label htmlFor='politica'>Política</label>
                      <select id="politica" name="politica" className='form-control' value={this.props.state.politica} onChange={this.cambioPolitica.bind(this)}>
                        <option value='{"id":0,"nombre":"Ninguna"}'>Seleccione una</option>
                        {this.props.state.politicas.map(function(currentValue,index,array){
                          return(
                            <option key={currentValue.id} value={JSON.stringify(currentValue)}>{currentValue.nombre}</option>
                          );
                        })}
                      </select>
                      <small id="nombreHelp" className="form-text text-muted">Para crear conciliación</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='nombre'>Nombre</label>
                      <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite un nombre de conciliación' />
                      <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='webservice'>Web Service</label>
                      <input id='webservice' type='text' className='form-control form-control-lg' value={this.props.state.webservice} onChange={this.handleInput.bind(this)} placeholder='Digite Web service' />
                      <small id="webserviceHelp" className="form-text text-muted">Web Service</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='descripcion'>Descripcion</label>
                      <textarea id='descripcion' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite una descripción para la conciliación' />
                      <small id="descripcionHelp" className="form-text text-muted">Defina para la política</small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button onClick={this.props.limpiarFormConciliacion.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    {
                      this.props.state.politica.substr(1,7)!='"id":0,' && this.props.state.nombre!="" ?
                      <button onClick={this.props.saveConciliacion.bind(this)} className="btn btn-primary" data-dismiss="modal">Grabar</button> :
                      <button onClick={this.props.saveConciliacion.bind(this)} className="btn btn-primary" data-dismiss="modal" disabled>Formulario incompleto</button>
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
      id : state.conciliacionFormReducer.id,
      nombre : state.conciliacionFormReducer.nombre,
      webservice : state.conciliacionFormReducer.webservice,
      descripcion : state.conciliacionFormReducer.descripcion,
      politica : JSON.stringify(state.conciliacionReducer.politica),
      politicas: state.conciliacionReducer.politicas,
      idPolitica :  state.conciliacionFormReducer.idPolitica,
      nombrePolitica :  state.conciliacionFormReducer.nombrePolitica
    }
  }
}
export default connect (mapStateToProps,{
  updateFormConciliaciones, saveConciliacion, cargarConciliacion, limpiarFormConciliacion, cargarComboPoliticas, updPolitica, calculaPaginadorConciliaciones, refreshListConciliacion
})(IConciliacionForm)
