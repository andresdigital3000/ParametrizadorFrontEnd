import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IPoliticaList from './IPoliticaList'
import IPoliticaFinder from './IPoliticaFinder'
import IPoliticaPaginador from './IPoliticaPaginador'
import { Router, Route, browserHistory, IndexRoute } from "react-router";

class IPolitica extends React.Component{
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
                    <h2>Políticas</h2>
                  </center>
                </div>
                <div className="col-sm-4">
                  <IPoliticaFinder ref="buscador"/>
                </div>
              </div>
              <hr/>
              <div className="row-fluid">
                <div className="table-container">
                  <IPoliticaList registro={this.props.registro}/>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-1">
                </div>
                <div className="col-sm-4">
                  <center>
                    <IPoliticaPaginador/>
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

export default IPolitica
