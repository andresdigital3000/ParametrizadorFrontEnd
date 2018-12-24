import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormEscenarios, cargarImpactos, updateConciliacion, saveEscenario, cargarEscenario, limpiarFormEscenario, cargarComboConciliaciones, updConciliacion, refreshListEscenario } from '../actions/Actions';
import AsyncSelect from 'react-select/lib/Async'

class IEscenarioForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    this.props.cargarImpactos()
  }

  componentDidMount(){
    if(this.props.params && this.props.params.idescenario){
      this.props.cargarEscenario(this.props.params.idescenario)
    }else{
      this.props.limpiarFormEscenario()
    }
  }

  //Detecta cambios de estado en textbox
  handleInput(e){
      this.props.updateFormEscenarios(e.target.id, e.target.value)
  }

  //Salvar el nuevo registro
  grabarEscenario(e){
    this.props.saveEscenario()
    //this.props.refreshListEscenario()
    //this.props.updConciliacion(0)
  }

  //Limpiar el formulario
  limpiarEscenario(e){
    this.props.limpiarFormEscenario()
    this.props.updConciliacion(0)
  }

  loadOptions(inputValue, callback) {
    let realInput = inputValue || ''
    if(realInput.length < 3) {
      callback( [{value: 0, label: 'Capture al menos 3 caracteres'}])
      return
    }else{
      this.props.cargarComboConciliaciones(realInput, callback)
    }
  };

  cambioConciliacionSelect(newValue){
    if(newValue.value == 0 ){
      this.props.updateConciliacion(null, null)
    }else{
      this.props.updateConciliacion(newValue.value, newValue.label)
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
                      <h2>Detalles del Escenario</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="form-group">
              <label htmlFor='nombre'>* Código</label>
              <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite el código' autoComplete='off' maxLength='100'/>
              <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo pero breve</small>
            </div>
            <div className="form-group">
              <label htmlFor='descripcion'>Nombre</label>
              <input id='descripcion' type='text' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre' autoComplete='off' maxLength='100'/>
              <small id="codigoHelp" className="form-text text-muted">Código del Escenario</small>
            </div>            <div className="form-group">
              <label htmlFor='impacto'>Impacto</label>
              <select id='impacto' className='form-control form-control-lg' value={this.props.state.impacto} onChange={this.handleInput.bind(this)}>
                {this.props.state.impactos.map(function(currentValue,index,array){
                  return(
                    <option key={index} value={currentValue}>{currentValue}</option>
                  );
                })}
              </select>
              <small id="impactoHelp" className="form-text text-muted">Defina impacto para el escenario</small>
            </div>

            <div className="form-group">
              <label htmlFor='conciliacion'>* Conciliación</label>
              <AsyncSelect
                cacheOptions
                loadOptions={this.loadOptions.bind(this)}
                defaultOptions
                onInputChange={this.handleInputChange}
                value={{value: this.props.state.idConciliacion, label: this.props.state.nombreConciliacion }}
                onChange={this.cambioConciliacionSelect.bind(this)}
              />
              <small id="nombreHelp" className="form-text text-muted">Para crear escenario</small>
            </div>
            <div className="form-group">
              <small>(*) Obligatorio</small>
              <hr/>
              <Link to={"/escenarios"} onClick={this.props.limpiarFormEscenario.bind(this)} className="btn btn-warning">Regresar</Link>&nbsp;&nbsp;&nbsp;
              {
                this.props.state.nombre!="" && this.props.state.conciliacion!="0" && this.props.state.descripcion!="" ?
                <button onClick={this.props.saveEscenario.bind(this)} className="btn btn-primary">Grabar</button> :
                <button className="btn btn-primary" disabled>Formulario incompleto</button>
              }
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
                    <div className="form-group">
                      <label htmlFor='nombre'>* Código</label>
                      <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite el código' autoComplete='off' maxLength='100'/>
                      <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='descripcion'>* Nombre</label>
                      <input id='descripcion' type='text' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre' autoComplete='off' maxLength='100'/>
                      <small id="codigoHelp" className="form-text text-muted">Código del Escenario</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='impacto'>Impacto</label>
                      <select id='impacto' className='form-control form-control-lg' value={this.props.state.impacto} onChange={this.handleInput.bind(this)}>
                        {this.props.state.impactos.map(function(currentValue,index,array){
                          return(
                            <option key={index} value={currentValue}>{currentValue}</option>
                          );
                        })}
                      </select>
                      <small id="impactoHelp" className="form-text text-muted">Defina impacto para el escenario</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='conciliacion'>* Conciliación</label>
                      <AsyncSelect
                        cacheOptions
                        loadOptions={this.loadOptions.bind(this)}
                        defaultOptions
                        onInputChange={this.handleInputChange}
                        //value={{value: this.props.state.idPolitica, label: this.props.state.nombrePolitica }}
                        onChange={this.cambioConciliacionSelect.bind(this)}
                      />
                      <small id="nombreHelp" className="form-text text-muted">Para crear escenario</small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    (*) Obligatorio
                    <hr/>
                    <button onClick={this.limpiarEscenario.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    {
                      this.props.state.conciliacion!='0' && this.props.state.nombre!="" && this.props.state.descripcion!="" ?
                      <button onClick={this.grabarEscenario.bind(this)} className="btn btn-primary">Grabar</button> :
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
      id : state.escenarioFormReducer.id,
      nombre : state.escenarioFormReducer.nombre,
      impacto : state.escenarioFormReducer.impacto,
      conciliacion : state.escenarioFormReducer.conciliacion,
      conciliaciones: state.ejecucionReducer.conciliaciones,
      idConciliacion : state.escenarioFormReducer.idConciliacion,
      nombreConciliacion : state.escenarioFormReducer.nombreConciliacion,
      descripcion : state.escenarioFormReducer.descripcion,
      impactos : state.escenarioReducer.impactos
    }
  }
}
export default connect (mapStateToProps,{
  updateFormEscenarios, saveEscenario,  cargarImpactos, cargarEscenario, limpiarFormEscenario, cargarComboConciliaciones, updConciliacion, refreshListEscenario, updateConciliacion
})(IEscenarioForm)
