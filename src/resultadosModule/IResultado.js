import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IResultadoList from './IResultadoList'
import IResultadoFinder from './IResultadoFinder'
import IResultadoPaginador from './IResultadoPaginador'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListResultado,cargarComboConciliaciones,calculaPaginadorResultados, cambioConciliacionesResultado, cargarConciliacionesResultado } from '../actions/Actions';

class IResultado extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    this.props.refreshListResultado()
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
                &nbsp;
              </div>
              <div className="col-sm-4">
                <center>
                  <h2>Resultados</h2>
                </center>
              </div>
              <div className="col-sm-4">
                  <If condition={this.props.registro==undefined}>
                      <IResultadoFinder ref="buscador"/>
                  </If>
              </div>
            </div>
            <hr/>
            <Choose>
            <When condition={this.props.registro != undefined}>
              <IResultadoList conciliacion={this.props.registro}/>
            </When>
            <When condition={this.props.conciliacion != undefined}>
              <IResultadoList conciliacion={this.props.conciliacion}/>
            </When>
            <Otherwise>
              <IResultadoList conciliacion={0}/>
            </Otherwise>
            </Choose>
            <hr/>
            <div className="row">
              <div className="col-sm-1">
              </div>
              <div className="col-sm-4">
                <center>
                  <IResultadoPaginador/>
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

const mapStateToProps = (state) =>{
  return{
    state: {
      conciliacion: state.resultadoReducer.conciliacion,
      conciliaciones: state.resultadoReducer.conciliaciones
    }
  }
}

export default connect (mapStateToProps,{
  refreshListResultado, cargarComboConciliaciones, calculaPaginadorResultados, cambioConciliacionesResultado, cargarConciliacionesResultado
})(IResultado)
