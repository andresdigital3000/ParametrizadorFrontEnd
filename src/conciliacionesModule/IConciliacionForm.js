import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormConciliaciones, saveConciliacion, cargarConciliacion, limpiarFormConciliacion, cargarComboPoliticas, updPolitica, calculaPaginadorConciliaciones,refreshListConciliacion } from '../actions/Actions';
import AsyncSelect from 'react-select/lib/Async'

class IConciliacionForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    //this.props.cargarComboPoliticas()
  }
  componentDidMount(){
    if(this.props.params && this.props.params.idconciliacion){
      this.props.cargarConciliacion(this.props.params.idconciliacion)
    }
  }

  //Detecta cambios de estado en los textbox
  handleInput(e){
    this.props.updateFormConciliaciones(e.target.id, e.target.value)
  }

  //Detecta cambio en el combo de Politicas
  cambioPolitica(e){
    //let idpol=JSON.parse(e.target.value)
    this.props.updPolitica(e.target.value)
    this.props.cargarComboPoliticas()
  }

  loadOptions(inputValue, callback) {
    let realInput = inputValue || ''
    if(realInput.length < 3) {
      callback( [{value: 0, label: 'Capture al menos 3 caracteres'}])
      return
    }else{
      this.props.cargarComboPoliticas(realInput, callback)
    }
  };

  cambioPoliticaSelect(newValue){
    if(newValue.value == 0 ){
      this.props.updPolitica(null)
    }else{
      this.props.updPolitica(newValue.value)
      //this.props.cargarComboPoliticas()
    }
  }

  //Salvar el nuevo registro
  grabarConciliacion(e){
    this.props.saveConciliacion()
  }

  //Limpiar el formulario
  limpiarConciliacion(e){
    this.props.refreshListConciliacion()
    this.props.limpiarFormConciliacion()
    this.props.updPolitica(0)
  }

  render(){
    return(
      <div className="container">
      <Choose>
        <When condition={this.props.params}>
          <div className="form-wrapper">
            <header className="head-table">
              <div className="form-group">
                <div className="col-sm-12">
                  <center>
                      <h2>Detalles de la Conciliación</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="form-group">
              <label htmlFor='nombre'>* Código - El prefijo CO_ se colocará automaticamente</label>
              <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite un código de conciiación' autoComplete='off' maxLength='100'/>
              <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo pero breve</small>
            </div>
            <div className="form-group">
              <label htmlFor='descripcion'>* Nombre</label>
              <textarea id='descripcion' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite una descripcion de la conciliación' maxLength='200' autoComplete='off'/>
              <small id="descripcionHelp" className="form-text text-muted">Defina para la conciliación</small>
            </div>
            <div className="form-group">
              <label htmlFor='webservice'>* Paquete</label>
              <input id='webservice' type='text' className='form-control form-control-lg' value={this.props.state.webservice} onChange={this.handleInput.bind(this)} placeholder='Digite nombre paquete ODI' autoComplete='off' maxLength='100'/>
              <small id="webserviceHelp" className="form-text text-muted">Paquete</small>
            </div>
            <div className="form-group">
              <label htmlFor='emailasignado'>* Email Usuario Asignado</label>
              <input id='emailasignado' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.emailasignado} onChange={this.handleInput.bind(this)} placeholder='Digite un correo electrónico válido'  maxLength='100' autoComplete='off'/>
              <small id="emailHelp" className="form-text text-muted">Defina usuario asignado para la conciliación</small>
            </div>
            <div className="form-group">
              <label htmlFor='tablaDestino'> Destino</label>
              <input id='tablaDestino' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.tablaDestino} onChange={this.handleInput.bind(this)} placeholder='Digite la tabla de destino' maxLength='50' autoComplete='off'/>
              <small id="destinoHelp" className="form-text text-muted">Defina la tabla de destino</small>
            </div>
            <div className="form-group">
              <label htmlFor='politica'>* Política</label>
              <AsyncSelect
                cacheOptions
                noOptionsMessage = {() => "No hay resultados"}
                loadOptions={this.loadOptions.bind(this)}
                defaultOptions
                onInputChange={this.handleInputChange}
                value={{value: this.props.state.politica.id, label: this.props.state.politica.nombre }}
                onChange={this.cambioPoliticaSelect.bind(this)}
              />
              <small id="nombreHelp" className="form-text text-muted">Para crear conciliación</small>
            </div>
            <div className="form-group">
              <label htmlFor='requiereAprobacion'>* Requiere Aprobación Resultado</label>
              <select id="requiereAprobacion" name="requiereAprobacion" className='form-control' value={this.props.state.requiereAprobacion} onChange={this.handleInput.bind(this)}>
                <option value="NO">NO</option>
                <option value="SI">SI</option>
              </select>
              <small id="requiereAprobacionHelp" className="form-text text-muted">Seleccione según el caso</small>
            </div>
            <div className="form-group">
              <small>(*) Obligatorio</small>
              <hr/>
              <Link to={"/conciliaciones"} onClick={this.limpiarConciliacion.bind(this)} className="btn btn-warning">Regresar</Link>&nbsp;&nbsp;&nbsp;
              {
                this.props.state.nombre!="" && this.props.state.emailasignado!="" && this.props.state.webservice!="" && this.props.state.descripcion!="" ?
                <button onClick={this.props.saveConciliacion.bind(this)} className="btn btn-primary">Grabar</button> :
                <button className="btn btn-primary" disabled>Formulario incompleto</button>
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
                      <label htmlFor='nombre'>* Código - El prefijo CO_ se colocará automaticamente</label>
                      <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite el código' autoComplete='off' maxLength='100'/>
                      <small id="nombreHelp" className="form-text text-muted">Debe ser breve y descriptivo</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='descripcion'>* Nombre</label>
                      <textarea id='descripcion' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre de la conciliación'  maxLength='200' autoComplete='off'/>
                      <small id="descripcionHelp" className="form-text text-muted">Nombre para la conciliación</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='webservice'>* Paquete</label>
                      <input id='webservice' type='text' className='form-control form-control-lg' value={this.props.state.webservice} onChange={this.handleInput.bind(this)} placeholder='Digite nombre paquete ODI' autoComplete='off' maxLength='100'/>
                      <small id="webserviceHelp" className="form-text text-muted">Paquete</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='emailasignado'>* Email Usuario Asignado</label>
                      <input id='emailasignado' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.emailasignado} onChange={this.handleInput.bind(this)} placeholder='Digite un correo electrónico válido'  maxLength='100' autoComplete='off'/>
                      <small id="emailHelp" className="form-text text-muted">Defina usuario asignado para la conciliación</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='tablaDestino'> Destino</label>
                      <input id='tablaDestino' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.tablaDestino} onChange={this.handleInput.bind(this)} placeholder='Digite la tabla de destino' maxLength='50' autoComplete='off'/>
                      <small id="destinoHelp" className="form-text text-muted">Defina la tabla de destino</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='politica'>* Política</label>
                      <AsyncSelect
                        cacheOptions
                        noOptionsMessage = {() => "No hay resultados"}
                        loadOptions={this.loadOptions.bind(this)}
                        defaultOptions
                        onInputChange={this.handleInputChange}
                        //value={this.props.state.idPolitica}
                        onChange={this.cambioPoliticaSelect.bind(this)}
                      />
                      <small id="nombreHelp" className="form-text text-muted">Para crear conciliación</small>
                    </div>


                    <div className="form-group">
                      <label htmlFor='requiereAprobacion'>* Requiere Aprobación Resultado</label>
                      <select id="requiereAprobacion" name="requiereAprobacion" className='form-control' value={this.props.state.requiereAprobacion} onChange={this.handleInput.bind(this)}>
                        <option value="NO">NO</option>
                        <option value="SI">SI</option>
                      </select>
                      <small id="requiereAprobacionHelp" className="form-text text-muted">Seleccione según el caso</small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    (*) Obligatorio
                    <hr/>
                    <button onClick={this.limpiarConciliacion.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    {
                      this.props.state.politica.id!="0" && this.props.state.emailasignado!="" && this.props.state.descripcion!="" && this.props.state.nombre!="" && this.props.state.webservice!="" ?
                      <button onClick={this.grabarConciliacion.bind(this)} className="btn btn-primary">Grabar</button> :
                      <button className="btn btn-primary" disabled>Formulario incompleto</button>
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
      emailasignado : state.conciliacionFormReducer.emailasignado,
      requiereAprobacion : state.conciliacionFormReducer.requiereAprobacion,
      politica : state.conciliacionReducer.politica,
      politicas: state.conciliacionReducer.politicas,
      idPolitica :  state.conciliacionFormReducer.idPolitica,
      nombrePolitica :  state.conciliacionFormReducer.nombrePolitica,
      tablaDestino : state.conciliacionFormReducer.tablaDestino
    }
  }
}
export default connect (mapStateToProps,{
  updateFormConciliaciones, saveConciliacion, cargarConciliacion, limpiarFormConciliacion, cargarComboPoliticas, updPolitica, calculaPaginadorConciliaciones, refreshListConciliacion
})(IConciliacionForm)
