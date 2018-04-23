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
    if(this.props.registro == undefined){
      this.props.refreshListEscenario()
    }else{
      this.props.refreshListEscenario(this.props.registro)
    }
  }
  //Fin seccion Escenarios

  editarRegistro(e){
    this.props.editarRegistro(e.target.name)
  }

  render(){
    return(
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
                <If condition={JSON.stringify(this.props.state.escenarios)!='{}' && Object.entries(this.props.state.escenarios).length > 0}>
                  <IEscenarioItem items={this.props.state.escenarios} registro={this.props.registro}/>
                </If>
                <If condition={JSON.stringify(this.props.state.escenarios)=='{}' && Object.entries(this.props.state.escenarios).length == 1}>
                  <div className="alert alert-warning">No hay registros</div>
                </If>
            </table>
          </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      escenarios: state.escenarioReducer.escenarios
    }
  }
}
export default connect (mapStateToProps,{
  refreshListEscenario
})(IEscenarioList)
