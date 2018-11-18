import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormParametros, saveParametro, cargarParametro, limpiarFormParametro, refreshListParametro, cargarListadoEnParametros } from '../actions/Actions';

//import Select from 'react-select';
//import 'react-select/dist/react-select.css';

class IParametroForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    //Cargar combo de esecenarios
    this.props.cargarListadoEnParametros()
  }

  componentDidMount(){
    if(this.props.registro!=undefined){
      this.props.cargarParametro(this.props.registro.idparametro)
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
                      <h2>Detalles del Parámetro</h2>
                  </center>
                </div>
              </div>
            </header>
            <input id='id' ref='id' type='hidden' defaultValue={this.props.state.id}/>
            <If condition={this.props.state.tipo!='SISTEMA'}>
              <div className="form-group">
                <label htmlFor='tipo'>* Tipo</label>
                <select id='tipo' value={this.props.state.tipo} className='form-control form-control-lg' onChange={this.handleInput.bind(this)}>
                  <option value=''>Seleccione uno</option>
                  <option value='GENERAL'>GENERAL</option>
                  <option value='CONCILIACION'>CONCILIACION</option>
                </select>
                <small id="tipoHelp" className="form-text text-muted">Clasifique el tipo de parámetro</small>
              </div>
              <div className="form-group">
                {
                  this.props.state.tipo!='' && this.props.state.tipo!='GENERAL' ?
                  <label htmlFor='escenario'>* Listado</label> :
                  <label htmlFor='escenario'>Listado</label>
                }
                {
                  this.props.state.tipo!='' && this.props.state.tipo!='GENERAL' ?
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
                }
              </div>
            </If>
            <If condition={this.props.state.tipo!='SISTEMA'}>
              <div className="form-group">
                <label htmlFor='parametro'>* Parámetro</label>
                <input id='parametro' type='text' className='form-control form-control-lg' value={this.props.state.parametro} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre del parámetro' autoComplete='off' maxLength='100'/>
                <small id="parametroHelp" className="form-text text-muted">Nombre del parámetro</small>
              </div>
            </If>
            <If condition={this.props.state.tipo=='SISTEMA'}>
              <div className="form-group">
                <label htmlFor='parametro'>* Parámetro</label>
                <input id='parametro' type='text' className='form-control form-control-lg' value={this.props.state.parametro} placeholder='Digite el nombre del parámetro' autoComplete='off' maxLength='100' readOnly/>
                <small id="parametroHelp" className="form-text text-muted">Nombre del parámetro</small>
              </div>
            </If>
            <div className="form-group">
              <label htmlFor='valor'>* Valor</label>
              <textarea id='valor' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.valor} onChange={this.handleInput.bind(this)} placeholder='Qué valor posee el parámetro' maxLength='1000'/>
              <small id="valorHelp" className="form-text text-muted">Dé un valor al parámetro</small>
            </div>
            <If condition={this.props.state.tipo!='SISTEMA'}>
              <div className="form-group">
                <label htmlFor='descripcion'>* Descripción</label>
                <textarea id='descripcion' type='text' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Descripción' autoComplete='off' maxLength='200'/>
                <small id="descripcionHelp" className="form-text text-muted">Describa de forma detallada</small>
              </div>
            </If>
            <If condition={this.props.state.tipo=='SISTEMA'}>
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
                  this.props.state.escenario!=undefined && this.props.state.escenario!="" && this.props.state.escenario!=0 && this.props.state.parametro!="" && this.props.state.valor!="" ?
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
                        <option value='CONCILIACION'>CONCILIACION</option>
                      </select>
                      <small id="tipoHelp" className="form-text text-muted">Clasifique el tipo de parámetro</small>
                    </div>
                    <div className="form-group">
                      {
                        this.props.state.tipo!='' && this.props.state.tipo!='GENERAL' ?
                        <label htmlFor='escenario'>* Listado</label> :
                        <label htmlFor='escenario'>Listado</label>
                      }
                      {
                        this.props.state.tipo!='' && this.props.state.tipo!='GENERAL' ?
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
                      }
                    </div>
                    <div className="form-group">
                      <label htmlFor='parametro'>* Parámetro</label>
                      <input id='parametro' type='text' className='form-control form-control-lg' value={this.props.state.parametro} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre del parámetro' autoComplete='off' maxLength='100'/>
                      <small id="parametroHelp" className="form-text text-muted">nombre del parámetro</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='valor'>* Valor</label>
                      <input id='valor' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.valor} onChange={this.handleInput.bind(this)} placeholder='Qué valor tendrá el parámetro' maxLength='200'/>
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
                          this.props.state.escenario!="" && this.props.state.escenario!=0 && this.props.state.parametro!="" && this.props.state.valor!="" ?
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
      escenario : state.parametroFormReducer.escenario,
      escenarios : state.parametroFormReducer.escenarios
    }
  }
}
export default connect (mapStateToProps,{
  updateFormParametros, saveParametro, cargarParametro, limpiarFormParametro, refreshListParametro, cargarListadoEnParametros
})(IParametroForm)
