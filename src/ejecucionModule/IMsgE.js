import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { doEjecutarEscenario, doCancelarEscenario } from '../actions/Actions';

class IMsgE extends React.Component{
  constructor(){
    super(...arguments)
  }

  doEscenario(){
    this.props.doEjecutarEscenario()
  }

  doCancelar(){
    this.props.doCancelarEscenario()
  }

  render(){
    return(
      <div>
        <b>{this.props.mensaje}</b>
        <div>
          <div className="button-wrap">
            <If condition={this.props.mensaje=='Está seguro de ejecutar el escenario?'}>
              <button className="btn btn-danger" onClick={this.doEscenario.bind(this)}>Si</button>&nbsp;&nbsp;&nbsp;
            </If>
            <If condition={this.props.mensaje=='Está seguro de detener la ejecución del escenario?'}>
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
  doEjecutarEscenario, doCancelarEscenario
})(IMsgE)
