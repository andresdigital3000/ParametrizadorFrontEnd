import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IEscenarioItem from './IEscenarioItem'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { updConciliacion, refreshListEscenario, cargarComboConciliaciones, calculaPaginadorEscenarios } from '../actions/Actions';


class IEscenarioList extends React.Component{
  constructor(){
    super(...arguments)
  }

  editarRegistro(e){
    this.props.editarRegistro(e.target.name)
  }

  componentDidMount(){
    this.props.cargarComboConciliaciones()
    this.props.calculaPaginadorEscenarios()
  }

  componentWillMount(){
    //console.log("ESCENARIO LISTA PROPS =====>")
    //console.log(this.props)
  }

  render(){
    return(
      <div className="row">
        <If condition={Object.entries(this.props.state.escenarios).length > 0}>
          <div className="table-container">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                      <th>
                        NOMBRE
                      </th>
                      <th>
                        IMPACTO
                      </th>
                      <th>
                        CONCILIACIÓN
                      </th>
                      <th>
                        QUERY
                      </th>
                      <th>
                        PARÁMETROS
                      </th>
                      <th>
                        ACCIONES
                      </th>
                  </tr>
                </thead>
                  <If condition={this.props.conciliacion!=0 && this.props.conciliacion!=undefined}>
                    <IEscenarioItem conciliacion={this.props.conciliacion}/>
                  </If>
                  <If condition={this.props.conciliacion==0}>
                    <IEscenarioItem/>
                  </If>
              </table>
            </div>
          </div>
        </If>
        <If condition={Object.entries(this.props.state.escenarios).length == 0}>
          <div className="alert alert-warning col-sm-12">No hay registros</div>
        </If>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      escenarios: state.escenarioReducer.escenarios,
      conciliacion: state.escenarioReducer.conciliacion
    }
  }
}

export default connect (mapStateToProps,{
  updConciliacion, refreshListEscenario, cargarComboConciliaciones, calculaPaginadorEscenarios
})(IEscenarioList)
