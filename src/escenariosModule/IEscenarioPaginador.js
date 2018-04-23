import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListEscenario } from '../actions/Actions';


class IEscenarioPaginador extends React.Component{
  constructor(){
    super(...arguments)
  }
  //<li className="page-item"><a className="page-link" href="#">2</a></li>
  //<li className="page-item"><a className="page-link" href="#">3</a></li>


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
            <li className="page-item active"><a className="page-link" href="#">1<span className="sr-only">(current)</span></a></li>
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
      escenarios: state.escenarioReducer.escenarios,
    }
  }
}
export default connect (mapStateToProps,{
  refreshListEscenario
})(IEscenarioPaginador)
