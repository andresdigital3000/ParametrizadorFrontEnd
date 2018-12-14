import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IUsuarioList from './IUsuarioList'
import IUsuarioFinder from './IUsuarioFinder'
import IUsuarioPaginador from './IUsuarioPaginador'
import { Router, Route, browserHistory, IndexRoute } from "react-router";

class IUsuario extends React.Component{
  constructor(){
    super(...arguments)
  }

  render(){
    return(
        <div className="container">
            <header className="head-table">
              <div className="row">
                  <br/>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <center>
                    <h2>Usuarios</h2>
                  </center>
                </div>
                <div className="col-sm-4">
                  <IUsuarioFinder/>
                </div>
              </div>
              <hr/>
              <div className="row-fluid">
                <IUsuarioList registro={this.props.registro}/>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-1">
                </div>
                <div className="col-sm-4">
                  <center>
                    <IUsuarioPaginador/>
                  </center>
                </div>
                <div className="col-sm-1">
                </div>
              </div>
            </header>
        </div>
    )
  }
}

export default IUsuario
