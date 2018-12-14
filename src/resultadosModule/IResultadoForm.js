import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormResultados, saveResultado, cargarResultado, limpiarFormResultado, cargarComboConciliaciones, updConciliacionResultado, refreshListResultado } from '../actions/Actions';

class IResultadoForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    if(this.props.registro!=undefined){
      this.props.cargarResultado(this.props.registro.idresultado)
    }else{
      this.props.limpiarFormResultado()
    }
  }

  //Detecta cambios de estado en textbox
  handleInput(e){
      this.props.updateFormResultados(e.target.id, e.target.value)
  }

  //Detecta cambio en el combo de Conciliaciones
  cambioConciliaciones(e){
    this.props.updConciliacionResultado(e.target.value)
    this.props.refreshListResultado()
  }

  //Salvar el nuevo registro
  grabarResultado(e){
    this.props.saveResultado()
  }

  //Limpiar el formulario
  limpiarResultado(e){
    this.props.limpiarFormResultado()
    this.props.updConciliacionResultado(0)
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
                      <h2>Detalles del Resultado</h2>
                  </center>
                </div>
              </div>
            </header>
            <h1>No tengo ejemplos...</h1>
          </div>
        </When>
      </Choose>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      id : state.resultadoFormReducer.id
    }
  }
}
export default connect (mapStateToProps,{
  updateFormResultados, saveResultado, cargarResultado, limpiarFormResultado, cargarComboConciliaciones, updConciliacionResultado, refreshListResultado
})(IResultadoForm)
