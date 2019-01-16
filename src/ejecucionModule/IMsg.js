import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { doEjecutarConciliacion, doCancelarConciliacion } from '../actions/Actions';

class IMsg extends React.Component{
  constructor(){
    super(...arguments)
  }

  doConciliacion(){
    this.props.doEjecutarConciliacion()
  }

  doCancelar(){
    this.props.doCancelarConciliacion()
  }

  render(){
    return(
      <div>
        <b>{this.props.mensaje}</b>
        <div>
          <div className="button-wrap">
            <If condition={this.props.mensaje.startsWith('{Está seguro de ejecutar la conciliación')}>
              <button className="btn btn-danger" onClick={this.doConciliacion.bind(this)}>Si</button>&nbsp;&nbsp;&nbsp;
            </If>
            <If condition={this.props.mensaje.startsWith('¿Está seguro de detener la ejecución')}>
              <button className="btn btn-danger" onClick={this.doCancelar.bind(this)}>Si</button>&nbsp;&nbsp;&nbsp;
            </If>
            <button className="btn btn-default">No</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      prueba: 0
    }
  }
}

export default connect (mapStateToProps,{
  doEjecutarConciliacion, doCancelarConciliacion
})(IMsg)
