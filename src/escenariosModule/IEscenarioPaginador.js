import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { moverPaginaEscenarios } from '../actions/Actions';

class IEscenarioPaginador extends React.Component{
  constructor(){
    super(...arguments)
  }

  render(){
    let pgAct = this.props.state.paginaActual
    let limit = this.props.state.registrosPorPagina
    let classBoton = "page-item"
    let strAdicional = ""
    let classBotonf = "page-item"
    if(pgAct==1)classBotonf = "page-item active"
    let classBotonl = "page-item"
    if(pgAct==this.props.state.paginador.length)classBotonl = "page-item active"
    let pgIni=2
    let pgFin=9
    return(
        <nav aria-label="Paginar">
          <If condition = {this.props.state.txtBuscar.trim()=='' && this.props.state.conciliacionActual==0}>
            <ul className="pagination">
              <If condition = {this.props.state.paginador.length <= 10}>
                <li className="page-item">
                  <a className="page-link" onClick={() => this.props.moverPaginaEscenarios(this.props.state.paginaActual-1)} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                {this.props.state.paginador.map(function(currentValue,index,array){
                  classBoton = "page-item"
                  strAdicional = ''
                  if(pgAct==currentValue.id){
                    classBoton="page-item active"
                  }
                  return(
                      <li key={currentValue.id} className={classBoton}>
                        <a className="page-link" onClick={() => this.props.moverPaginaEscenarios(currentValue.id)}>
                          {currentValue.id}
                          <If condition={pgAct==currentValue.id}>
                            <span className="sr-only">(current)</span>
                          </If>
                        </a>
                      </li>
                  )
                },this)}
                <li className="page-item">
                  <a className="page-link" onClick={() => this.props.moverPaginaEscenarios(this.props.state.paginaActual+1)} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </If>
              <If condition = {this.props.state.paginador.length > 10}>
                  <li key='1' className={classBotonf}>
                      <a className="page-link" onClick={() => this.props.moverPaginaEscenarios(1)}>
                        1&laquo;
                        <If condition={pgAct==1}>
                          <span className="sr-only">(current)</span>
                        </If>
                      </a>
                  </li>
                  {this.props.state.paginador.map(function(currentValue,index,array){
                    if(pgAct<=5){
                      pgIni=2
                      pgFin=pgAct+3
                    }else if(pgAct>5){
                      pgIni=pgAct-3
                      if(pgAct+3>this.props.state.paginador.length-1)pgFin=this.props.state.paginador.length-1
                      else pgFin=pgAct+3
                    }
                    classBoton = "page-item"
                    strAdicional = ""
                    if(pgAct==currentValue.id){
                      classBoton="page-item active"
                    }
                    if(currentValue.id>=pgIni && currentValue.id<=pgFin){
                      return(
                          <li key={currentValue.id} className={classBoton}>
                            <a className="page-link" onClick={() => this.props.moverPaginaEscenarios(currentValue.id)}>
                              {currentValue.id}
                              <If condition={pgAct==currentValue.id}>
                                <span className="sr-only">(current)</span>
                              </If>
                            </a>
                          </li>
                      )
                    }
                  },this)}
                  <li key={this.props.state.paginador.length} className={classBotonl}>
                      <a className="page-link" onClick={() => this.props.moverPaginaEscenarios(this.props.state.paginador.length)}>
                        &raquo;{this.props.state.paginador.length}
                        <If condition={pgAct==this.props.state.paginador.length}>
                          <span className="sr-only">(current)</span>
                        </If>
                      </a>
                  </li>
              </If>
            </ul>
          </If>
        </nav>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      paginador : state.escenarioReducer.paginador,
      paginaActual: state.escenarioReducer.paginaActual,
      registrosPorPagina: state.escenarioReducer.registrosPorPagina,
      txtBuscar: state.escenarioReducer.textoBuscar,
      conciliacionActual: state.escenarioReducer.conciliacion
    }
  }
}
export default connect (mapStateToProps,{
  moverPaginaEscenarios
})(IEscenarioPaginador)
