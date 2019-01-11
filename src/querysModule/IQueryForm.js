import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateEscenarioFormQuerys, updateFormQuerys, saveQuery, cargarQuery, limpiarFormQuery, cargarComboEscenariosEnQuerysByName, updConciliacionQuerys, refreshListQuery } from '../actions/Actions';
import AsyncSelect from 'react-select/lib/Async'

class IQueryForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    //this.props.cargarComboEscenariosEnQuerys()

    if(this.props.params && this.props.params.idquery){
      this.props.cargarQuery(this.props.params.idquery)
      
    }else{
      this.props.limpiarFormQuery()
    }
  }

  //Detecta cambios de estado en textbox
  handleInput(e){
      this.props.updateFormQuerys(e.target.id, e.target.value)
  }

  //Salvar el nuevo registro
  grabarQuery(e){
    this.props.saveQuery()
  }

  //Limpiar el formulario
  limpiarQuery(e){
    this.props.limpiarFormQuery()
    this.props.updConciliacionQuerys(0)
  }

  loadOptions(inputValue, callback) {
    let realInput = inputValue || ''
    if(realInput.length < 3) {
      callback( [{value: 0, label: 'Capture al menos 3 caracteres'}])
      return
    }else{
      this.props.cargarComboEscenariosEnQuerysByName(realInput, callback)
    }
  };
  
  cambioEscenarioSelect(newValue){
    if(newValue.value == 0 ){
      this.props.updateEscenarioFormQuerys(null, null)
    }else{
      this.props.updateEscenarioFormQuerys(newValue.value, newValue.label)
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
                      <h2>Detalles del Query</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="form-group">
              <label htmlFor='nombre'>* Nombre</label>
              <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite un nombre de query' autoComplete='off' maxLength='100'/>
              <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo</small>
            </div>
            <div className="form-group">
              <label htmlFor='query'>* Query</label>
              <textarea id='query' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.query} onChange={this.handleInput.bind(this)} placeholder='Digite el query' autoComplete='off' rows="5"  maxLength='5000'/>
              <small id="queryHelp" className="form-text text-muted">Escriba la instrucción query</small>
            </div>
            <div className="form-group">
              <label htmlFor='orden'>* Orden</label>
              <input id='orden' type='number' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.orden} onChange={this.handleInput.bind(this)} placeholder='Digite el orden' autoComplete='off'/>
              <small id="ordenHelp" className="form-text text-muted">Indique con un número entero</small>
            </div>
            <div className="form-group">
              <label htmlFor='escenario'>* Escenario</label>
              <AsyncSelect
                cacheOptions
                noOptionsMessage = {() => "No hay resultados"}
                loadOptions={this.loadOptions.bind(this)}
                defaultOptions
                onInputChange={this.handleInputChange}
                value={{value: this.props.state.idEscenario, label: this.props.state.nombreEscenario }}
                onChange={this.cambioEscenarioSelect.bind(this)}
              />
              <small id="nombreHelp" className="form-text text-muted">Para crear query</small>
            </div>
            <div className="form-group">
              <small>(*) Obligatorio</small>
              <hr/>
              <Link to={"/querys"} onClick={this.props.limpiarFormQuery.bind(this)} className="btn btn-warning">Regresar</Link>&nbsp;&nbsp;&nbsp;
              {
                this.props.state.nombre!="" && this.props.state.query!="" && this.props.state.orden!="" && this.props.state.idEscenario!=0 ?
                <button onClick={this.props.saveQuery.bind(this)} className="btn btn-primary">Grabar</button> :
                <button className="btn btn-primary" disabled>Formulario incompleto</button>
              }
            </div>
        </div>
        </When>
        <Otherwise>
          <div className="modal fade" id="modalAdd" role="dialog" aria-labelledby="modalAddQueryTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalAddQueryTitle">Adicionar Query</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Cerrar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor='nombre'>* Nombre</label>
                      <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite un nombre de query' autoComplete='off' maxLength='100'/>
                      <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='query'>* Query</label>
                      <textarea id='query' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.query} onChange={this.handleInput.bind(this)} placeholder='Digite el query' autoComplete='off' rows="5" maxLength='5000'/>
                      <small id="queryHelp" className="form-text text-muted">Escriba la instrucción query</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='orden'>* Orden</label>
                      <input id='orden' type='number' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.orden} onChange={this.handleInput.bind(this)} placeholder='Digite el orden' autoComplete='off'/>
                      <small id="ordenHelp" className="form-text text-muted">Indique con un número entero</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='escenario'>* Escenario</label>
                      <AsyncSelect
                        cacheOptions
                        noOptionsMessage = {() => "No hay resultados"}
                        loadOptions={this.loadOptions.bind(this)}
                        defaultOptions
                        onInputChange={this.handleInputChange}
                        //value={{value: this.props.state.politica.id, label: this.props.state.politica.nombre }}
                        onChange={this.cambioEscenarioSelect.bind(this)}
                      />
                      <small id="nombreHelp" className="form-text text-muted">Para crear query</small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    (*) Obligatorio
                    <hr/>
                    <button onClick={this.limpiarQuery.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    {
                      this.props.state.nombre!="" && this.props.state.query!="" && this.props.state.orden!="" && this.props.state.idEscenario!=0 ?
                      <button onClick={this.grabarQuery.bind(this)} className="btn btn-primary">Grabar</button> :
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
      id : state.queryFormReducer.id,
      nombre : state.queryFormReducer.nombre,
      query : state.queryFormReducer.query,
      orden : state.queryFormReducer.orden,
      estado : state.queryFormReducer.estado,
      idEscenario : state.queryFormReducer.idEscenario,
      nombreEscenario : state.queryFormReducer.nombreEscenario,
      idConciliacion : state.queryFormReducer.idConciliacion,
      nombreConciliacion : state.queryFormReducer.nombreConciliacion,
      escenarios : state.queryReducer.escenarios,
      conciliaciones : state.queryReducer.conciliaciones,
      conciliacion : JSON.stringify(state.queryReducer.conciliacion)
    }
  }
}
export default connect (mapStateToProps,{
  updateEscenarioFormQuerys, updateFormQuerys, saveQuery, cargarQuery, limpiarFormQuery, cargarComboEscenariosEnQuerysByName, updConciliacionQuerys, refreshListQuery
})(IQueryForm)
