import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IIndicadorItem from './IIndicadorItem'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListIndicador } from '../actions/Actions';


class IIndicadorList extends React.Component{
  constructor(){
    super(...arguments)
  }

  //Seccion de listar indicadores
  componentWillMount(){
    if(this.props.registro == undefined){
      this.props.refreshListIndicador()
    }else{
      this.props.refreshListIndicador(this.props.registro)
    }
  }

  render(){
    return(
        <div className="row">
          <If condition={Object.entries(this.props.state.indicadores).length > 0}>
            <div className="table-container">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                        <th>
                          NOMBRE
                        </th>
                        <th>
                          DESCRIPCION
                        </th>
                        <th>
                          FORMULA
                        </th>
                        <th>
                          ESCENARIO
                        </th>                        
                        <th>
                          ACCIONES
                        </th>
                    </tr>
                  </thead>
                  <IIndicadorItem/>
                </table>
              </div>
          </div>
        </If>
        <If condition={Object.entries(this.props.state.indicadores).length == 0}>
            <div className="alert alert-warning col-sm-12">No hay registros</div>
        </If>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      indicadores: state.indicadorReducer.indicadores
    }
  }
}
export default connect (mapStateToProps,{
  refreshListIndicador
})(IIndicadorList)
