import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormParametros, saveParametro, cargarParametro, limpiarFormParametro, refreshListParametro } from '../actions/Actions';

class IParametroForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    console.log("PROPS en EditarParametros ==>>")
    console.log(this.props)
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
            <div className="form-group">
              <label htmlFor='parametro'>* Parámetro</label>
              <input id='paramtro' type='text' className='form-control form-control-lg' value={this.props.state.parametro} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre del parámetro' autoComplete='off'/>
              <small id="parametroHelp" className="form-text text-muted">Nombre del parámetro</small>
            </div>
            <div className="form-group">
              <label htmlFor='valor'>* Valor</label>
              <textarea id='valor' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.valor} onChange={this.handleInput.bind(this)} placeholder='Qué valor posee el parámetro' />
              <small id="valorHelp" className="form-text text-muted">Dé un valor al parámetro</small>
            </div>
            <div className="modal-footer">
              (*) Obligatorio
              <hr/>
              <Link to={"/parametros"} onClick={this.props.limpiarFormParametro.bind(this)} className="btn btn-warning">Regresar</Link>&nbsp;&nbsp;&nbsp;
              {
                this.props.state.parametro!="" && this.props.state.valor!="" ?
                <button onClick={this.grabarParametro.bind(this)} className="btn btn-primary">Grabar</button> :
                <button className="btn btn-primary"  disabled>Formulario incompleto</button>
              }
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
                      <label htmlFor='parametro'>* Parámetro</label>
                      <input id='parametro' type='text' className='form-control form-control-lg' value={this.props.state.parametro} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre del parámetro' autoComplete='off'/>
                      <small id="parametroHelp" className="form-text text-muted">nombre del parámetro</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor='valor'>* Valor</label>
                      <textarea id='valor' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.valor} onChange={this.handleInput.bind(this)} placeholder='Qué valor tendrá el parámetro' />
                      <small id="valorHelp" className="form-text text-muted">Defina un valor para el parámetro</small>
                    </div>
                    <div className="modal-footer">
                      (*) Obligatorio
                      <hr/>
                      <button onClick={this.limpiarParametro.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                      {
                        this.props.state.parametro!="" && this.props.state.valor!="" ?
                        <button onClick={this.grabarParametro.bind(this)} className="btn btn-primary">Grabar</button> :
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
      id : state.parametroFormReducer.id,
      parametro : state.parametroFormReducer.parametro,
      valor : state.parametroFormReducer.valor
    }
  }
}
export default connect (mapStateToProps,{
  updateFormParametros, saveParametro, cargarParametro, limpiarFormParametro, refreshListParametro
})(IParametroForm)
