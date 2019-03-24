import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormIndicadores, saveIndicador, cargarIndicador, limpiarFormIndicador, cargarComboEscenarios, updEscenario, refreshListIndicador, cargarComboParametros, updResultadoReducerIndicadores, updFormula } from '../actions/Actions';
import AsyncSelect from 'react-select/lib/Async'
class IIndicadorForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    //Cargar el combo de politicas
   // this.props.cargarComboEscenarios()
  }

  componentDidMount(){
    //console.log("PROPS en EditarIndicadores ==>>")
    //console.log(this.props)
    if(this.props.params && this.props.params.idindicador){
      this.props.cargarIndicador(this.props.params.idindicador)
    }else{
      this.props.limpiarFormIndicador()
    }
  }

  loadOptions(inputValue, callback) {
    let realInput = inputValue || ''
    if(realInput.length < 3) {
      callback( [{value: 0, label: 'Capture al menos 3 caracteres'}])
      return
    }else{
      this.props.cargarComboEscenarios(realInput, callback)
    }
  };

  //Detecta cambios de estado en textbox
  handleInput(e){
      this.props.updateFormIndicadores(e.target.id, e.target.value)
  }

  //Detecta cambio en el combo de Conciliaciones
  cambioEscenarios(e){
    this.props.updEscenario(e.target.value)
    this.props.cargarComboParametros(e.target.value)
    //this.props.refreshListIndicador()
  }

  //Accion a realizar cuando se cambie el combo de resultados
  cambioResultados(e){
    let resul=JSON.parse(e.target.value)
    this.props.updResultadoReducerIndicadores(resul)
  }

  //Salvar el nuevo registro
  grabarIndicador(e){
    this.props.saveIndicador()
    //this.props.refreshListEscenario()
    //this.props.updConciliacion(0)
  }

  cambioEscenarioSelect(newValue){
    if(newValue.value == 0 ){
      this.props.updEscenario(null, null)
    }else{
      this.props.updEscenario(newValue.value, newValue.label)
    }
    this.props.cargarComboParametros(newValue.value)
  }

  //Limpiar el formulario
  limpiarIndicador(e){
    this.props.limpiarFormIndicador()
    this.props.updEscenario(0)
  }

  //Ejecuta la Accion de añadir la variable a la cadena de formula
  anadirVariable(e){
    console.log("Se hizo click "+e.target.value)
    this.props.updFormula(e.target.value)
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
                      <h2>Detalles del Indicador</h2>
                  </center>
                </div>
              </div>
            </header>
            <input id='id' ref='id' type='hidden' defaultValue={this.props.state.id}/>
            <div className="form-group">
              <label htmlFor='nombre'>* Nombre</label>
              <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre del indicador' autoComplete='off' maxLength='100'/>
              <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo</small>
            </div>
            <div className="form-group">
              <label htmlFor='descripcion'>* Descripción</label>
              <textarea id='descripcion' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite la descripción del indicador' maxLength='200' autoComplete='off'/>
              <small id="descripcionHelp" className="form-text text-muted">Defina para éste indicador</small>
            </div>
            <div className="form-group">
              <label htmlFor='escenario'>* Escenario</label>
              <AsyncSelect
                noOptionsMessage = {() => "No hay resultados"}
                cacheOptions
                loadOptions={this.loadOptions.bind(this)}
                defaultOptions
                onInputChange={this.handleInputChange}
                value={{value: this.props.state.idEscenario, label: this.props.state.nombreEscenario }}
                onChange={this.cambioEscenarioSelect.bind(this)}
              />

              <small id="nombreHelp" className="form-text text-muted">Escenario al que se le creará el indicador</small>
            </div>
            <div className="form-group">
              <label htmlFor='parametro'>Parámetros</label>
              <select id="parametro" name="parametro" className='form-control' multiple value={this.props.state.parametro} onChange={this.anadirVariable.bind(this)}>
                {this.props.state.parametros.map(function(currentValue,index,array){
                  if (currentValue.tipo == "GENERAL"){
                  return(
                    <option style={{ backgroundColor: 'white', color: 'blue' }} key={currentValue.parametro} value={currentValue.parametro}>{currentValue.parametro} : {currentValue.valor}</option>
                  );
                  } else{
                    return(
                      <option key={currentValue.parametro} value={currentValue.parametro}>{currentValue.parametro} : {currentValue.valor}</option>
                    );
                  }
                })}
              </select>
              <small id="nombreHelp" className="form-text text-muted">Parametros o variables, haga click para añadir al final de la fórmula, en azul los parámetros generales</small>
            </div>
            <div className="form-group">
              <label htmlFor='formula'>* Fórmula</label>
              <textarea id='formula' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.formula} onChange={this.handleInput.bind(this)} placeholder='Digite la fórmula' maxLength='800' autoComplete='off'/>
              <small id="formulaHelp" className="form-text text-muted">Escriba la fórmula</small>
            </div>
            <div className="modal-footer">
              (*) Obligatorio
              <hr/>
              <Link to={"/indicadores"} onClick={this.props.limpiarFormIndicador.bind(this)} className="btn btn-warning">Regresar</Link>&nbsp;&nbsp;&nbsp;
              {
                this.props.state.idEscenario!='0' && this.props.state.nombre!="" && this.props.state.descripcion!="" && this.props.state.formula!="" ?
                <button onClick={this.grabarIndicador.bind(this)} className="btn btn-primary">Grabar</button> :
                <button className="btn btn-primary"  disabled>Formulario incompleto</button>
              }
            </div>
          </div>
        </When>
        <Otherwise>
          <div className="modal fade" id="modalAdd" role="dialog" aria-labelledby="modalAddIndicadorTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalAddIndicadorTitle">Adicionar Indicador</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Cerrar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <input id='id' ref='id' type='hidden' onChange={this.handleInput.bind(this)} defaultValue={this.props.state.id}/>
                    <div className="form-group">
                      <label htmlFor='nombre'>* Nombre</label>
                      <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre del indicador' autoComplete='off' maxLength='100'/>
                      <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='descripcion'>* Descripción</label>
                      <textarea id='descripcion' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite la descripción del indicador' maxLength='200' autoComplete='off'/>
                      <small id="descripcionHelp" className="form-text text-muted">Defina para éste indicador</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='escenario'>* Escenario</label>
                      <AsyncSelect
                noOptionsMessage = {() => "No hay resultados"}
                cacheOptions
                loadOptions={this.loadOptions.bind(this)}
                defaultOptions
                onInputChange={this.handleInputChange}
                value={{value: this.props.state.idEscenario, label: this.props.state.nombreEscenario }}
                onChange={this.cambioEscenarioSelect.bind(this)}
              />
                      <small id="nombreHelp" className="form-text text-muted">Escenario al que se le creará el indicador</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='parametro'>Parámetros</label>
                      <select id="parametro" name="parametro" className='form-control' multiple value={this.props.state.parametro} onChange={this.anadirVariable.bind(this)}>
                        {this.props.state.parametros.map(function(currentValue,index,array){
                           if (currentValue.tipo == "GENERAL"){
                            return(
                              <option style={{ backgroundColor: 'white', color: 'blue' }} key={currentValue.parametro} value={currentValue.parametro}>{currentValue.parametro} : {currentValue.valor}</option>
                            );
                            } else{
                              return(
                                <option key={currentValue.parametro} value={currentValue.parametro}>{currentValue.parametro} : {currentValue.valor}</option>
                              );
                            }
                        })}
                      </select>
                      <small id="nombreHelp" className="form-text text-muted">Parámetros o variables, haga click para añadir al final de la fórmula</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='formula'>* Fórmula</label>
                      <textarea id='formula' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.formula} onChange={this.handleInput.bind(this)} placeholder='Digite la fórmula' maxLength='800' autoComplete='off'/>
                      <small id="formulaHelp" className="form-text text-muted">Escriba la fórmula</small>
                    </div>
                    <div className="modal-footer">
                      (*) Obligatorio
                      <hr/>
                      <button onClick={this.limpiarIndicador.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                      {
                        this.props.state.idEscenario!='0' && this.props.state.nombre!="" && this.props.state.descripcion!="" && this.props.state.formula!="" ?
                        <button onClick={this.grabarIndicador.bind(this)} className="btn btn-primary">Grabar</button> :
                        <button className="btn btn-primary"  disabled>Formulario incompleto</button>
                      }
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
      id : state.indicadorFormReducer.id,
      nombre : state.indicadorFormReducer.nombre,
      descripcion : state.indicadorFormReducer.descripcion,
      formula : state.indicadorFormReducer.formula,
      idEscenario : state.indicadorFormReducer.idEscenario,
      nombreEscenario : state.indicadorFormReducer.nombreEscenario,
      escenario : JSON.stringify(state.indicadorFormReducer.escenario),
      escenarios : state.indicadorReducer.escenarios,
      parametro : state.indicadorFormReducer.parametro,
      parametros : state.indicadorFormReducer.parametros
    }
  }
}
export default connect (mapStateToProps,{
  updateFormIndicadores, saveIndicador, cargarIndicador, limpiarFormIndicador, updEscenario, cargarComboEscenarios, refreshListIndicador, cargarComboParametros, updResultadoReducerIndicadores, updFormula
})(IIndicadorForm)
