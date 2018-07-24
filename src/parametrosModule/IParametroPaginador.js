import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { moverPaginaParametros } from '../actions/Actions';

class IParametroPaginador extends React.Component{
  constructor(){
    super(...arguments)
  }

  render(){
    let pgAct = this.props.state.paginaActual
    let limit = this.props.state.registrosPorPagina
    return(
        <nav aria-label="Paginar">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" onClick={() => this.props.moverPaginaParametros(this.props.state.paginaActual-1)} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              {this.props.state.paginador.map(function(currentValue,index,array){
                let classBoton = "page-item"
                let strAdicional = ''
                if(pgAct==currentValue.id){
                  classBoton="page-item active"
                }
                return(
                    <li key={currentValue.id} className={classBoton}>
                      <a className="page-link" onClick={() => this.props.moverPaginaParametros(currentValue.id)}>
                        {currentValue.id}
                        <If condition={pgAct==currentValue.id}>
                          <span className="sr-only">(current)</span>
                        </If>
                      </a>
                    </li>
                )
              },this)}
              <li className="page-item">
                <a className="page-link" onClick={() => this.props.moverPaginaParametros(this.props.state.paginaActual+1)} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
        </nav>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      paginador : state.parametroReducer.paginador,
      paginaActual: state.parametroReducer.paginaActual,
      registrosPorPagina: state.parametroReducer.registrosPorPagina
    }
  }
}
export default connect (mapStateToProps,{
  moverPaginaParametros
})(IParametroPaginador)
