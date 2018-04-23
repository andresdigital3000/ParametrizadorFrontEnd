import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IConciliacionList from './IConciliacionList'
import IConciliacionFinder from './IConciliacionFinder'
import IConciliacionPaginador from './IConciliacionPaginador'
import { Router, Route, browserHistory, IndexRoute } from "react-router";

class IConciliacion extends React.Component{
  constructor(){
    super(...arguments)
  }

  /*componentWillMount(){
    console.log("IConciliacion recibe parametros =>>")
    console.log(this.props.registro)
  }*/


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
                <center>
                  <button className="btn btn-primary" data-toggle="modal" data-target="#modalAdd">+ Adicionar</button>
                </center>
                </If>
              </div>
              <div className="col-sm-4">
                <center>
                  <h2>Conciliaciones</h2>
                </center>
              </div>
              <div className="col-sm-4">
                  <If condition={this.props.registro==undefined}>
                    <center>
                      <IConciliacionFinder ref="buscador"/>
                    </center>
                  </If>
              </div>
            </div>
            <hr/>
            <div className="table-container">
              <IConciliacionList registro={this.props.registro}/>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-1">
              </div>
              <div className="col-sm-4">
                <center>
                  <IConciliacionPaginador/>
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

export default IConciliacion
