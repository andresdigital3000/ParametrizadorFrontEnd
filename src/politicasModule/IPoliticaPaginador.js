import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListPolitica } from '../actions/Actions';


class IPoliticaPaginador extends React.Component{
  constructor(){
    super(...arguments)
  }

  renderPaginas() {
    let totpaginas = Math.ceil(this.props.state.totalRegistros/this.props.state.registrosPorPagina)
    console.log('Paginas total : '+totpaginas)
    var numpag
    for (numpag = 1; numpag <= totpaginas; numpag++ ) {
      return(
          console.log('Invocando render de  pagina ==>>'+numpag),
          this.Pagina(numpag)
      )
    }
  }

  Pagina(pag){
    console.log("Pagina Actual y pag : "+this.props.state.paginaActual+" y "+pag)
    return (
      <p>
        <If condition={this.props.state.paginaActual==pag}>
          <li key={pag} className="page-item active">
            <a className="page-link" href="#">
              {pag}
              <span className="sr-only">
                (current)
              </span>
            </a>
          </li>
        </If>
        <If condition={this.props.state.paginaActual!=pag}>
          <li key={pag} className="page-item">
            <a className="page-link" href="#">
              {pag}
            </a>
          </li>
        </If>
      </p>
    );
  }

  render(){
    return(
        <nav aria-label="Paginar">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {this.renderPaginas()}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
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
      paginaActual : state.politicaReducer.paginaActual,
      registrosPorPagina : state.politicaReducer.registrosPorPagina,
      totalRegistros : state.politicaReducer.totalRegistros,
      politicas : state.politicaReducer.politicas,
    }
  }
}
export default connect (mapStateToProps,{
  refreshListPolitica
})(IPoliticaPaginador)
