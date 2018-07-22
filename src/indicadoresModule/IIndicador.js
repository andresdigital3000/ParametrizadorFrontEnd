import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IIndicadorList from './IIndicadorList'
import IIndicadorFinder from './IIndicadorFinder'
import IIndicadorPaginador from './IIndicadorPaginador'
import { Router, Route, browserHistory, IndexRoute } from "react-router";

class IIndicador extends React.Component{
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
                  <If condition={this.props.registro==undefined}>
                      <button className="btn btn-primary" data-toggle="modal" data-target="#modalAdd"><i className="fa fa-plus-circle"/> Adicionar</button>
                  </If>
                </div>
                <div className="col-sm-4">
                  <center>
                    <h2>Indicadores</h2>
                  </center>
                </div>
                <div className="col-sm-4">
                  <IIndicadorFinder ref="buscador"/>
                </div>
              </div>
              <hr/>
              <div className="row-fluid">
                <IIndicadorList registro={this.props.registro}/>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-1">
                </div>
                <div className="col-sm-4">
                  <center>
                    <IIndicadorPaginador/>
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

export default IIndicador
