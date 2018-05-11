import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IEscenarioItem from './IEscenarioItem'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListEscenario } from '../actions/Actions';


class IEscenarioList extends React.Component{
  constructor(){
    super(...arguments)
  }

  //Seccion de listar Escenarios
  componentWillMount(){
    //console.log("IEscenarioList props ===>>>>")
    //console.log(this.props)
    if(this.props.registro!=undefined && this.props.registro != 0){
      this.props.refreshListEscenario(this.props.registro)
    }else if(this.props.conciliacion!=undefined && this.props.conciliacion!=0){
      this.props.refreshListEscenario(this.props.conciliacion)
    }else{
      this.props.refreshListEscenario()
    }
  }
  //Fin seccion Escenarios

  editarRegistro(e){
    this.props.editarRegistro(e.target.name)
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
                        QUERY DINAMICO
                      </th>
                      <th>
                        PARAMETROS
                      </th>
                      <th>
                        ACCIONES
                      </th>
                  </tr>
                </thead>
                <If condition={Object.entries(this.props.state.escenarios).length > 0}>
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
  refreshListEscenario
})(IEscenarioList)
