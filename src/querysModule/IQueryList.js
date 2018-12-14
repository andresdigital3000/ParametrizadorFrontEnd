import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IQueryItem from './IQueryItem'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { updEscenarioEnQuerys, refreshListQuery, cargarComboEscenariosEnQuerys, calculaPaginadorQuerys } from '../actions/Actions';


class IQueryList extends React.Component{
  constructor(){
    super(...arguments)
  }

  editarRegistro(e){
    this.props.editarRegistro(e.target.name)
  }

  componentDidMount(){
    //this.props.cargarComboEscenariosEnQuerys()
    //this.props.calculaPaginadorQuerys()
  }

  render(){
    return(
      <div className="row">
        <If condition={Object.entries(this.props.state.querys).length > 0}>
          <div className="table-container">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                      <th>
                        NOMBRE
                      </th>
                      <th>
                        QUERY
                      </th>
                      <th>
                        ORDEN
                      </th>
                      <th>
                        CONCILIACIÓN
                      </th>
                      <th>
                        ESCENARIO
                      </th>
                      <th>
                        ACCIONES
                      </th>
                  </tr>
                </thead>
                  <If condition={this.props.conciliacion!=0 && this.props.conciliacion!=undefined}>
                    <IQueryItem conciliacion={this.props.conciliacion}/>
                  </If>
                  <If condition={this.props.conciliacion==0}>
                    <IQueryItem/>
                  </If>
              </table>
            </div>
          </div>
        </If>
        <If condition={Object.entries(this.props.state.querys).length == 0}>
          <div className="alert alert-warning col-sm-12">No hay registros</div>
        </If>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      querys: state.queryReducer.querys,
      escenario: state.queryReducer.escenario
    }
  }
}

export default connect (mapStateToProps,{
  updEscenarioEnQuerys, refreshListQuery, cargarComboEscenariosEnQuerys, calculaPaginadorQuerys
})(IQueryList)
