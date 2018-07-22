import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormIndicadores, saveIndicador, cargarIndicador, limpiarFormIndicador, cargarComboEscenarios, updEscenario, refreshListIndicador, cargarComboResultados, updResultadoReducerIndicadores, updFormula } from '../actions/Actions';

class IIndicadorForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    //Cargar el combo de politicas
    this.props.cargarComboEscenarios()
  }

  componentDidMount(){
    console.log("PROPS en EditarIndicadores ==>>")
    console.log(this.props)
    if(this.props.registro!=undefined){
      this.props.cargarIndicador(this.props.registro.idindicador)
    }else{
      this.props.limpiarFormIndicador()
    }
  }

  //Detecta cambios de estado en textbox
  handleInput(e){
      this.props.updateFormIndicadores(e.target.id, e.target.value)
  }

  //Detecta cambio en el combo de Conciliaciones
  cambioEscenarios(e){
    let idesc=JSON.parse(e.target.value)
    this.props.updEscenario(idesc.id)
    this.props.cargarComboResultados(idesc.id)
    this.props.refreshListIndicador()
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
        <When condition={this.props.registro}>
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
              <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre del indicador' autoComplete='off'/>
              <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo</small>
            </div>
            <div className="form-group">
              <label htmlFor='descripcion'>* Descripcion</label>
              <textarea id='descripcion' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite la descripción del indicador' />
              <small id="descripcionHelp" className="form-text text-muted">Defina para éste indicador</small>
            </div>
            <div className="form-group">
              <label htmlFor='escenario'>* Escenario</label>
              <select id="escenario" name="escenario" className='form-control' value={this.props.state.escenario} onChange={this.cambioEscenarios.bind(this)}>
                <option value={JSON.stringify({"id" : this.props.state.idEscenario, "nombre" : this.props.state.nombreEscenario})}>{this.props.state.nombreEscenario}</option>
                {this.props.state.escenarios.map(function(currentValue,index,array){
                  return(
                    <option key={currentValue.id} value={JSON.stringify(currentValue)}>{currentValue.nombre}</option>
                  );
                })}
              </select>
              <small id="nombreHelp" className="form-text text-muted">Escenario al que se le creará el indicador</small>
            </div>
            <div className="form-group">
              <label htmlFor='resultado'>Parámetros</label>
              <select id="resultado" name="resultado" className='form-control' value={this.props.state.resultado} onChange={this.cambioResultados.bind(this)} >
                <option value='{"id":0,"nombre":"Ninguna","resultados":[{"variables":""}]}'>Seleccione uno</option>
                {this.props.state.resultados.map(function(currentValue,index,array){
                  return(
                    <option key={currentValue.id} value={JSON.stringify(currentValue)}>{currentValue.nombre}</option>
                  );
                })}
              </select>
              <small id="nombreHelp" className="form-text text-muted">de las ejecuciones del Escenario seleccionado</small>
            </div>
            <div className="form-group">
              <label htmlFor='variables'>Variables</label>
              <select id="variables" name="variables" className='form-control' multiple value={this.props.state.variables} onChange={this.anadirVariable.bind(this)}>
                  {JSON.parse(this.props.state.resultado).resultados[0].variables.split(";").map(function(currentValue,index,array){
                    return(
                      <option key={currentValue} value={currentValue}>{currentValue}</option>
                    );
                  })}
              </select>
              <small id="variablesHelp" className="form-text text-muted">Haga click en una variable para añadirla a la fórmula</small>
            </div>
            <div className="form-group">
              <label htmlFor='formula'>* Fórmula</label>
              <textarea id='formula' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.formula} onChange={this.handleInput.bind(this)} placeholder='Digite la fórmula' />
              <small id="formulaHelp" className="form-text text-muted">Escriba la fórmula</small>
            </div>
            <div className="modal-footer">
              (*) Obligatorio
              <hr/>
              <Link to={"/indicadores"} onClick={this.props.limpiarFormIndicador.bind(this)} className="btn btn-warning">Regresar</Link>&nbsp;&nbsp;&nbsp;
              {
                this.props.state.escenario!='{"id":0,"nombre":"Ninguna"}' && this.props.state.nombre!="" && this.props.state.descripcion!="" && this.props.state.formula!="" ?
                <button onClick={this.grabarIndicador.bind(this)} className="btn btn-primary">Grabar</button> :
                <button className="btn btn-primary"  disabled>Formulario incompleto</button>
              }
            </div>
          </div>
        </When>
        <Otherwise>
          <div className="modal fade" id="modalAdd" role="dialog" aria-labelledby="modalAddIndicadorTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
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
                      <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre del indicador' autoComplete='off'/>
                      <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='descripcion'>* Descripcion</label>
                      <textarea id='descripcion' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.descripcion} onChange={this.handleInput.bind(this)} placeholder='Digite la descripción del indicador' />
                      <small id="descripcionHelp" className="form-text text-muted">Defina para éste indicador</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='escenario'>* Escenario</label>
                      <select id="escenario" name="escenario" className='form-control' value={this.props.state.escenario} onChange={this.cambioEscenarios.bind(this)}>
                        <option value='{"id":0,"nombre":"Ninguna"}'>Seleccione uno</option>
                        {this.props.state.escenarios.map(function(currentValue,index,array){
                          return(
                            <option key={currentValue.id} value={JSON.stringify(currentValue)}>{currentValue.nombre}</option>
                          );
                        })}
                      </select>
                      <small id="nombreHelp" className="form-text text-muted">Escenario al que se le creará el indicador</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='resultado'>Parámetros</label>
                      <select id="resultado" name="resultado" className='form-control' value={this.props.state.resultado} onChange={this.cambioResultados.bind(this)} >
                        <option value='{"id":0,"nombre":"Ninguna","resultados":[{"variables":""}]}'>Seleccione uno</option>
                        {this.props.state.resultados.map(function(currentValue,index,array){
                          return(
                            <option key={currentValue.id} value={JSON.stringify(currentValue)}>{currentValue.nombre}</option>
                          );
                        })}
                      </select>
                      <small id="nombreHelp" className="form-text text-muted">de las ejecuciones del Escenario seleccionado</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='variables'>Variables</label>
                      <select id="variables" name="variables" className='form-control' multiple value={this.props.state.variables} onChange={this.anadirVariable.bind(this)}>
                          {JSON.parse(this.props.state.resultado).resultados[0].variables.split(";").map(function(currentValue,index,array){
                            return(
                              <option key={currentValue} value={currentValue}>{currentValue}</option>
                            );
                          })}
                      </select>
                      <small id="variablesHelp" className="form-text text-muted">Haga click en una variable para añadirla a la fórmula</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='formula'>* Fórmula</label>
                      <textarea id='formula' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.formula} onChange={this.handleInput.bind(this)} placeholder='Digite la fórmula' />
                      <small id="formulaHelp" className="form-text text-muted">Escriba la fórmula</small>
                    </div>
                    <div className="modal-footer">
                      (*) Obligatorio
                      <hr/>
                      <button onClick={this.limpiarIndicador.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                      {
                        this.props.state.escenario!='{"id":0,"nombre":"Ninguna"}' && this.props.state.nombre!="" && this.props.state.descripcion!="" && this.props.state.formula!="" ?
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
      escenario : JSON.stringify(state.indicadorReducer.escenario),
      escenarios : state.indicadorReducer.escenarios,
      resultado : JSON.stringify(state.indicadorReducer.resultado),
      resultados : state.indicadorReducer.resultados,
      variables : state.indicadorReducer.variables
    }
  }
}
export default connect (mapStateToProps,{
  updateFormIndicadores, saveIndicador, cargarIndicador, limpiarFormIndicador, updEscenario, cargarComboEscenarios, refreshListIndicador, cargarComboResultados, updResultadoReducerIndicadores, updFormula
})(IIndicadorForm)
