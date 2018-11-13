import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IResultadoItem from './IResultadoItem'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListResultado, cargarComboConciliaciones, calculaPaginadorResultados } from '../actions/Actions';


class IResultadoList extends React.Component{
  constructor(){
    super(...arguments)
  }

  editarRegistro(e){
    this.props.editarRegistro(e.target.name)
  }

  componentDidMount(){
    this.props.calculaPaginadorResultados()
  }

  render(){
    return(
      <div className="row">
        <If condition={Object.entries(this.props.state.resultados).length > 0}>
          <div className="table-container">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                      <th>
                        CONCILIACIÓN
                      </th>
                      <th>
                        ESCENARIO
                      </th>
                      <th>
                        ESTADO
                      </th>
                      <th>
                        FECHA INICIO
                      </th>
                      <th>
                        FECHA FIN
                      </th>
                      <th>
                        VALOR BENEFICIO
                      </th>
                      <th>
                        VALOR INCONSISTENCIAS
                      </th>
                      <th>
                        VALOR INCONSISTENCIAS MES ANTERIOR
                      </th>
                      <th>
                        VALOR PQR
                      </th>
                      <th>
                        VALOR REINCIDENCIAS
                      </th>
                      <th>
                        ACCIONES
                      </th>
                  </tr>
                </thead>
                <IResultadoItem/>
              </table>
            </div>
          </div>
        </If>
        <If condition={Object.entries(this.props.state.resultados).length == 0}>
          <div className="alert alert-warning col-sm-12">No hay registros</div>
        </If>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      resultados: state.resultadoReducer.resultados,
      conciliacion: state.resultadoReducer.conciliacion
    }
  }
}

export default connect (mapStateToProps,{
   refreshListResultado, cargarComboConciliaciones, calculaPaginadorResultados
})(IResultadoList)
