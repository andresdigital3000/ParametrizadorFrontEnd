import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormParametros, updateFormConciliacionParametros, cargarListadoEscenarioEnParametros, updateFormEscenarioParametros, saveParametro, cargarParametro, limpiarFormParametro, refreshListParametro, cargarListadoConciliacionEnParametros } from '../actions/Actions';
import AsyncSelect from 'react-select/lib/Async'

//import Select from 'react-select';
//import 'react-select/dist/react-select.css';

class IParametroForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    //Cargar combo de esecenarios
    //this.props.cargarListadoEnParametros()
  }

  componentDidMount(){
    if(this.props.params && this.props.params.idparametro){
      this.props.cargarParametro(this.props.params.idparametro)
    }else{
      this.props.limpiarFormParametro()
    }
  }

  //Detecta cambios de estado en textbox
  handleInput(e){
    this.props.updateFormParametros(e.target.id, e.target.value)
  }

  //Detecta cambio en el combo de Conciliaciones
  cambioEscenarios(e){
    let idesc=JSON.parse(e.target.value)
    this.props.refreshListParametro()
  }

  //Salvar el nuevo registro
  grabarParametro(e){
    this.props.saveParametro()
    //this.props.refreshListEscenario()
    //this.props.updConciliacion(0)
  }

  //Limpiar el formulario
  limpiarParametro(e){
    this.props.limpiarFormParametro()
  }

  loadOptionsConciliaciones(inputValue, callback) {
    let realInput = inputValue || ''
    if(realInput.length < 3) {
      callback( [{value: 0, label: 'Capture al menos 3 caracteres'}])
      return
    }else if(this.props.state.tipo!='' && this.props.state.tipo!='GENERAL'){
      //this.props.cargarComboConciliaciones(realInput, callback)
      this.props.cargarListadoConciliacionEnParametros(realInput, callback)
    }else{
      callback( [{value: 0, label: 'No aplica'}])
      return
    }
  };

  loadOptionsEscenarios(inputValue, callback) {
    let realInput = inputValue || ''
    if(realInput.length < 3) {
      callback( [{value: 0, label: 'Capture al menos 3 caracteres'}])
      return
    }else if(this.props.state.tipo!='' && this.props.state.tipo!='GENERAL'){
      //this.props.cargarComboConciliaciones(realInput, callback)
      this.props.cargarListadoEscenarioEnParametros(realInput, callback)
    }else{
      callback( [{value: 0, label: 'No aplica'}])
      return
    }
  };

  cambioListadoConciliacionSelect(newValue){
    if(newValue.value == 0 ){
      this.props.updateFormConciliacionParametros(null, null)
    }else{
      this.props.updateFormConciliacionParametros(newValue.value, newValue.label)
    }
  }

  cambioListadoEscenarioSelect(newValue){
    if(newValue.value == 0 ){
      this.props.updateFormEscenarioParametros(null, null)
    }else{
      this.props.updateFormEscenarioParametros(newValue.value, newValue.label)
    }
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
                      <h2>Detalles del Parámetro</h2>
                  </center>
                </div>
              </div>
            </header>
            <input id='id' ref='id' type='hidden' defaultValue={this.props.state.id}/>
            <If condition={this.props.state.tipo!='SISTEMA' && this.props.state.tipo!='SEGURIDAD'}>
              <div className="form-group">
                <label htmlFor='tipo'>* Tipo</label>
                <select id='tipo' value={this.props.state.tipo} className='form-control form-control-lg' onChange={this.handleInput.bind(this)}>
                  <option value=''>Seleccione uno</option>
                  <option value='GENERAL'>GENERAL</option>
                  <option value='SISTEMA'>PARAMETROS SISTEMA</option>
                  <option value='SEGURIDAD'>PARAMETROS SEGURIDAD</option>
                  <option value='CONCILIACION'>CONCILIACION</option>
                  <option value='ESCENARIO'>ESCENARIO</option>
                </select>
                <small id="tipoHelp" className="form-text text-muted">Clasifique el tipo de parámetro</small>
              </div>
              <div className="form-group">
                {
                  this.props.state.tipo!='' && this.props.state.tipo!='GENERAL' && this.props.state.tipo!='SISTEMA' && this.props.state.tipo!='SEGURIDAD' ?
                  <label htmlFor='escenario'>* Listado</label> :
                  <label htmlFor='escenario'>Listado</label>
                }
                <Choose>
                  <When condition={this.props.state.tipo == 'ESCENARIO'} >
                    <AsyncSelect
                      cacheOptions
                      loadOptions={this.loadOptionsEscenarios.bind(this)}
                      defaultOptions
                      onInputChange={this.handleInputChange}
                      value={{value: this.props.state.escenario, label: this.props.state.nombreEscenario }}
                      onChange={this.cambioListadoEscenarioSelect.bind(this)}
                    />
                  </When>
                  <When condition={this.props.state.tipo == 'CONCILIACION'}>
                    <AsyncSelect
                      cacheOptions
                      loadOptions={this.loadOptionsConciliaciones.bind(this)}
                      defaultOptions
                      onInputChange={this.handleInputChange}
                      value={{value: this.props.state.conciliacion, label: this.props.state.nombreConciliacion }}
                      onChange={this.cambioListadoConciliacionSelect.bind(this)}
                    />
                  </When>
                  <Otherwise>
                    <select id='escenario' className='form-control' value={this.props.state.escenario}>
                      <option value='0'>No aplica</option>
                    </select>
                  </Otherwise>
                </Choose>
                {/*
                  this.props.state.tipo!='' && this.props.state.tipo!='GENERAL' && this.props.state.tipo!='SISTEMA' && this.props.state.tipo!='SEGURIDAD' ?
                  <select id='escenario' className='form-control' value={this.props.state.escenario} onChange={this.handleInput.bind(this)}>
                    <option value="">Seleccione uno</option>
                    {this.props.state.escenarios.map(function(currentValue,index,array){
                      return(
                        <option key={currentValue.id} value={currentValue.id}>{currentValue.nombre}</option>
                      );
                    })}
                  </select> :
                  <select id='escenario' className='form-control' value={this.props.state.escenario}>
                    <option value='0'>No aplica</option>
                  </select>
                  */}
              </div>
            </If>
            <If condition={this.props.state.tipo!='SISTEMA' && this.props.state.tipo!='SEGURIDAD'}>
              <div className="form-group">
                <label htmlFor='parametro'>* Parámetro - Se colocará el prefijo V_ automaticamente</label>
                <input id='parametro' type='text' className='form-control form-control-lg' value={this.props.state.parametro} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre del parámetro' autoComplete='off' maxLength='100'/>
                <small id="parametroHelp" className="form-text text-muted">Nombre del parámetro</small>
              </div>
            </If>
            <If condition={this.props.state.tipo=='SISTEMA' || this.props.state.tipo=='SEGURIDAD'}>
              <div className="form-group">
                <label htmlFor='parametro'>* Parámetro - Se colocará el prefijo V_ automaticamente</label>
                <input id='parametro' type='text' className='form-control form-control-lg' value={this.props.state.parametro} placeholder='Digite el nombre del parámetro' autoComplete='off' maxLength='100' readOnly/>
                <small id="parametroHelp" className="form-text text-muted">Nombre del parámetro</small>
              </div>
            </If>
            <div className="form-group">
              <label htmlFor='valor'>* Valor</label>
              <textarea id='valor' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.valor} onChange={this.handleInput.bind(this)} placeholder='Qué valor posee el parámetro' maxLength='1000' autoComplete='off'/>
              <small id="valorHelp" className="form-text text-muted">Dé un valor al parámetro</small>
            </div>
            <If condition={this.props.state.tipo!='SISTEMA' && this.props.state.tipo!='SEGURIDAD'}>
              <div className="form-group">
                <label htmlFor='descripcion'>* Descripción</label>
                <textarea id='descripcion' type='text' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Descripción' autoComplete='off' maxLength='200'/>
                <small id="descripcionHelp" className="form-text text-muted">Describa de forma detallada</small>
              </div>
            </If>
            <If condition={this.props.state.tipo=='SISTEMA' || this.props.state.tipo=='SEGURIDAD'}>
              <div className="form-group">
                <label htmlFor='descripcion'>* Descripción</label>
                <textarea id='descripcion' type='text' className='form-control form-control-lg' value={this.props.state.descripcion} placeholder='Descripción' autoComplete='off' maxLength='200' readOnly/>
                <small id="descripcionHelp" className="form-text text-muted">Describa de forma detallada</small>
              </div>
            </If>
            <div className="modal-footer">
              (*) Obligatorio
              <hr/>
              <Link to={"/parametros"} onClick={this.props.limpiarFormParametro.bind(this)} className="btn btn-warning">Regresar</Link>&nbsp;&nbsp;&nbsp;
              <If condition={this.props.state.tipo != 'CONCILIACION'}>
                {
                  this.props.state.parametro!="" && this.props.state.valor!="" ?
                  <button onClick={this.grabarParametro.bind(this)} className="btn btn-primary">Grabar</button> :
                  <button className="btn btn-primary"  disabled>Formulario incompleto</button>
                }
              </If>
              <If condition={this.props.state.tipo == 'CONCILIACION'}>
                {
                  this.props.state.conciliacion!=undefined && this.props.state.conciliacion!="" && this.props.state.conciliacion!=0 && this.props.state.parametro!="" && this.props.state.valor!="" ?
                  <button onClick={this.grabarParametro.bind(this)} className="btn btn-primary">Grabar</button> :
                  <button className="btn btn-primary"  disabled>Formulario incompleto</button>
                }
              </If>
            </div>
          </div>
        </When>
        <Otherwise>
          <div className="modal fade" id="modalAdd" role="dialog" aria-labelledby="modalAddParametroTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalAddParametroTitle">Adicionar Parámetro</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Cerrar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <input id='id' ref='id' type='hidden' onChange={this.handleInput.bind(this)} defaultValue={this.props.state.id}/>
                    <div className="form-group">
                      <label htmlFor='tipo'>* Tipo</label>
                      <select id='tipo' name='tipo' className='form-control form-control-lg' onChange={this.handleInput.bind(this)}>
                        <option value=''>Seleccione uno</option>
                        <option value='GENERAL'>GENERAL</option>
                        <option value='SISTEMA'>PARAMETROS SISTEMA</option>
                        <option value='SEGURIDAD'>PARAMETROS SEGURIDAD</option>
                        <option value='CONCILIACION'>CONCILIACION</option>
                        <option value='ESCENARIO'>ESCENARIO</option>
                      </select>
                      <small id="tipoHelp" className="form-text text-muted">Clasifique el tipo de parámetro</small>
                    </div>
                    <div className="form-group">
                      {
                        this.props.state.tipo!='' && this.props.state.tipo!='GENERAL' && this.props.state.tipo!='SISTEMA' && this.props.state.tipo!='SEGURIDAD' ?
                        <label htmlFor='escenario'>* Listado</label> :
                        <label htmlFor='escenario'>Listado</label>
                      }

                      <Choose>
                        <When condition={this.props.state.tipo == 'ESCENARIO'} >
                          <AsyncSelect
                            cacheOptions
                            loadOptions={this.loadOptionsEscenarios.bind(this)}
                            defaultOptions
                            onInputChange={this.handleInputChange}
                            value={{value: this.props.state.escenario, label: this.props.state.nombreEscenario }}
                            onChange={this.cambioListadoEscenarioSelect.bind(this)}
                          />
                        </When>
                        <When condition={this.props.state.tipo == 'CONCILIACION'}>
                          <AsyncSelect
                            cacheOptions
                            loadOptions={this.loadOptionsConciliaciones.bind(this)}
                            defaultOptions
                            onInputChange={this.handleInputChange}
                            value={{value: this.props.state.conciliacion, label: this.props.state.nombreConciliacion }}
                            onChange={this.cambioListadoConciliacionSelect.bind(this)}
                          />
                        </When>
                        <Otherwise>
                          <select id='escenario' className='form-control' value={this.props.state.escenario}>
                            <option value='0'>No aplica</option>
                          </select>
                        </Otherwise>
                      </Choose>

                      {/*
                        this.props.state.tipo!='' && this.props.state.tipo!='GENERAL' && this.props.state.tipo!='SISTEMA' && this.props.state.tipo!='SEGURIDAD' ?
                        <AsyncSelect
                          cacheOptions
                          loadOptions={this.loadOptions.bind(this)}
                          defaultOptions
                          onInputChange={this.handleInputChange}
                          value={{value: this.props.state.escenario, label: this.props.state.nombreConciliacion }}
                          onChange={this.cambioListadoSelect.bind(this)}
                        /> :
                        <select id='escenario' className='form-control' value={this.props.state.escenario}>
                          <option value='0'>No aplica</option>
                        </select>
                      */}


                    </div>
                    <div className="form-group">
                      <label htmlFor='parametro'>* Parámetro - Se colocará el prefijo V_ automaticamente</label>
                      <input id='parametro' type='text' className='form-control form-control-lg' value={this.props.state.parametro} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre del parámetro' autoComplete='off' maxLength='100'/>
                      <small id="parametroHelp" className="form-text text-muted">nombre del parámetro</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='valor'>* Valor</label>
                      <input id='valor' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.valor} onChange={this.handleInput.bind(this)} placeholder='Qué valor tendrá el parámetro' maxLength='200' autoComplete='off'/>
                      <small id="valorHelp" className="form-text text-muted">Defina un valor para el parámetro</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='descripcion'>Descripción</label>
                      <textarea id='descripcion' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Descripción' autoComplete='off' maxLength='200'/>
                      <small id="descripcionHelp" className="form-text text-muted">Describa de forma detallada</small>
                    </div>
                    <div className="modal-footer">
                      (*) Obligatorio
                      <hr/>
                      <button onClick={this.limpiarParametro.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                      <If condition={this.props.state.tipo != 'CONCILIACION'}>
                        {
                          this.props.state.parametro!="" && this.props.state.valor!="" ?
                          <button onClick={this.grabarParametro.bind(this)} className="btn btn-primary">Grabar</button> :
                          <button className="btn btn-primary"  disabled>Formulario incompleto</button>
                        }
                      </If>
                      <If condition={this.props.state.tipo == 'CONCILIACION'}>
                        {
                          (this.props.state.escenario!=0 || this.props.state.conciliacion!=0) && this.props.state.parametro!="" && this.props.state.valor!="" ?
                          <button onClick={this.grabarParametro.bind(this)} className="btn btn-primary">Grabar</button> :
                          <button className="btn btn-primary"  disabled>Formulario incompleto</button>
                        }
                      </If>
                    </div>
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
      id : state.parametroFormReducer.id,
      parametro : state.parametroFormReducer.parametro,
      valor : state.parametroFormReducer.valor,
      descripcion : state.parametroFormReducer.descripcion,
      tipo : state.parametroFormReducer.tipo,

      escenarios : state.parametroFormReducer.escenarios,
      escenario : state.parametroFormReducer.escenario,
      nombreEscenario: state.parametroFormReducer.escenarioDescripcion,
      
      conciliaciones : state.parametroFormReducer.conciliaciones,
      conciliacion: state.parametroFormReducer.conciliacion,
      nombreConciliacion: state.parametroFormReducer.conciliacionDescripcion,
    }
  }
}
export default connect (mapStateToProps,{
  updateFormParametros, saveParametro, cargarParametro, limpiarFormParametro, updateFormConciliacionParametros, cargarListadoEscenarioEnParametros, refreshListParametro, cargarListadoConciliacionEnParametros, updateFormEscenarioParametros
})(IParametroForm)
