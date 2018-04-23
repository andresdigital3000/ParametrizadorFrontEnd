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
                  <center>
                    <button className="btn btn-primary" data-toggle="modal" data-target="#modalAdd">+ Adicionar</button>
                  </center>
                </div>
                <div className="col-sm-4">
                  <center>
                    <h2>Políticas</h2>
                  </center>
                </div>
                <div className="col-sm-4">
                    <center>
                      <IPoliticaFinder ref="buscador"/>
                    </center>
                </div>
              </div>
              <hr/>
              <div className="row-fluid">
                <div className="table-container">
                  <IPoliticaList/>
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
