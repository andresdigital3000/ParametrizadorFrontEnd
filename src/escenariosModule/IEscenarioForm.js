import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormEscenarios, saveEscenario, cargarEscenario, limpiarFormEscenario, cargarComboConciliaciones, updConciliacion, refreshListEscenario } from '../actions/Actions';

class IEscenarioForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    //Cargar el combo de conciliaciones
    //if(this.props.conciliacion==undefined){
    //  this.props.cargarComboConciliaciones()
    //}
  }

  componentDidMount(){
    //console.log("PROPS en foem ==>>")
    //console.log(this.props)
    if(this.props.registro!=undefined){
      this.props.cargarEscenario(this.props.registro.idescenario)
    }else{
      this.props.limpiarFormEscenario()
    }
  }

  //Detecta cambios de estado en textbox
  handleInput(e){
      this.props.updateFormEscenarios(e.target.id, e.target.value)
  }

  //Detecta cambio en el combo de Conciliaciones
  cambioConciliaciones(e){
    let idcon=JSON.parse(e.target.value)
    this.props.updConciliacion(idcon.id)
    this.props.refreshListEscenario()
  }

  //Salvar el nuevo registro
  grabarEscenario(e){
    this.props.saveEscenario()
    this.props.refreshListEscenario()
    this.props.updConciliacion(0)
  }

  //Limpiar el formulario
  limpiarEscenario(e){
    this.props.limpiarFormEscenario()
    this.props.updConciliacion(0)
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
                      <h2>Detalles del Escenario</h2>
                  </center>
                </div>
              </div>
            </header>
            <input id='id' ref='id' type='hidden' value={this.props.registro.idescenario}/>
            <div className="form-group">
              <label htmlFor='nombre'>* Nombre</label>
              <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite un nombre de conciiación' autoComplete='off'/>
              <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo pero breve</small>
            </div>
            <div className="form-group">
              <label htmlFor='impacto'>Impacto</label>
              <input id='impacto' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.impacto} onChange={this.handleInput.bind(this)} placeholder='Digite el impacto del escenario' autoComplete='off'/>
              <small id="impactoHelp" className="form-text text-muted">Defina impacto para el escenario</small>
            </div>
            <div className="form-group">
              <label htmlFor='conciliacion'>* Conciliación</label>
              <select id="conciliacion" name="conciliacion" className='form-control' value={this.props.state.conciliacion} onChange={this.cambioConciliaciones.bind(this)}>
                <option value={JSON.stringify({"id":this.props.state.idConciliacion,"nombre":this.props.state.nombreConciliacion})}>{this.props.state.nombreConciliacion}</option>
                {this.props.state.conciliaciones.map(function(currentValue,index,array){
                  return(
                    <option key={currentValue.id} value={JSON.stringify(currentValue)}>{currentValue.nombre}</option>
                  );
                })}
              </select>
              <small id="nombreHelp" className="form-text text-muted">Para crear escenario</small>
            </div>
            <div className="form-group">
              <small>(*) Obligatorio</small>
              <hr/>
              <Link to={"/escenarios"} onClick={this.props.limpiarFormEscenario.bind(this)} className="btn btn-warning">Regresar</Link>&nbsp;&nbsp;&nbsp;
              {
                this.props.state.nombre!="" ?
                <button onClick={this.props.saveEscenario.bind(this)} className="btn btn-primary" data-dismiss="modal">Grabar</button> :
                <button onClick={this.props.saveEscenario.bind(this)} className="btn btn-primary" data-dismiss="modal" disabled>Formulario incompleto</button>
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
                    <input id='id' ref='id' type='hidden' value={this.props.state.id}/>                    
                    <div className="form-group">
                      <label htmlFor='nombre'>* Nombre</label>
                      <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} onChange={this.handleInput.bind(this)} placeholder='Digite un nombre de escenario' autoComplete='off'/>
                      <small id="nombreHelp" className="form-text text-muted">Que sea descriptivo</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='impacto'>Impacto</label>
                      <input id='impacto' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.impacto} onChange={this.handleInput.bind(this)} placeholder='Digite impacto del escenario' autoComplete='off'/>
                      <small id="impactoHelp" className="form-text text-muted">Defina impacto para el escenario</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='conciliacion'>* Conciliación</label>
                      <select id="conciliacion" name="conciliacion" className='form-control' value={this.props.state.conciliacion} onChange={this.cambioConciliaciones.bind(this)}>
                        <option value='{"id":0,"nombre":"Ninguna"}'>Seleccione una</option>
                        {this.props.state.conciliaciones.map(function(currentValue,index,array){
                          return(
                            <option key={currentValue.id} value={JSON.stringify(currentValue)}>{currentValue.nombre}</option>
                          );
                        })}
                      </select>
                      <small id="nombreHelp" className="form-text text-muted">Para crear escenario</small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    (*) Obligatorio
                    <hr/>
                    <button onClick={this.limpiarEscenario.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    {
                      this.props.state.conciliacion.substr(1,7)!='"id":0,' && this.props.state.nombre!="" && this.props.state.conciliacion!='{"id":0,"nombre":"Ninguna"}' ?
                      <button onClick={this.grabarEscenario.bind(this)} className="btn btn-primary" data-dismiss="modal">Grabar</button> :
                      <button className="btn btn-primary" data-dismiss="modal" disabled>Formulario incompleto</button>
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
      conciliacion : JSON.stringify(state.escenarioReducer.conciliacion),
      conciliaciones: state.ejecucionReducer.conciliaciones,
      idConciliacion : state.escenarioFormReducer.idConciliacion,
      nombreConciliacion : state.escenarioFormReducer.nombreConciliacion
    }
  }
}
export default connect (mapStateToProps,{
  updateFormEscenarios, saveEscenario, cargarEscenario, limpiarFormEscenario, cargarComboConciliaciones, updConciliacion, refreshListEscenario
})(IEscenarioForm)
