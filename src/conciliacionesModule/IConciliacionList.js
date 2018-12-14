import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IConciliacionItem from './IConciliacionItem'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListConciliacion,cargarComboPoliticas,calculaPaginadorConciliaciones } from '../actions/Actions';


class IConciliacionList extends React.Component{
  constructor(){
    super(...arguments)
  }

  editarRegistro(e){
    this.props.editarRegistro(e.target.name)
  }

  componentDidMount(){
    this.props.cargarComboPoliticas()
    this.props.calculaPaginadorConciliaciones()
  }

  componentWillMount(){
    if(this.props.registro == undefined){
      this.props.refreshListConciliacion()
    }else{
      this.props.refreshListConciliacion(this.props.registro)
    }
  }

  render(){
    return(
        <div className="row">
          <If condition={Object.entries(this.props.state.conciliaciones).length > 0}>
            <div className="table-container">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                        <th>
                          CÓDIGO
                        </th>
                        <th>
                          NOMBRE
                        </th>
                        <th>
                          POLÍTICA
                        </th>
                        <th>
                          ESCENARIOS
                        </th>
                        <th>
                          REQUIERE APROBACIÓN
                        </th>
                        <th>
                            ACCIONES
                        </th>
                    </tr>
                  </thead>
                      <IConciliacionItem/>
                </table>
              </div>
            </div>
          </If>
          <If condition={Object.entries(this.props.state.conciliaciones).length == 0}>
            <If condition={this.props.state.politica.id != 0}>
              <div className="alert alert-warning col-sm-12">No hay registros para {this.props.state.politica.nombre}</div>
            </If>
            <If condition={this.props.state.politica.id == 0}>
              <div className="alert alert-warning col-sm-12">No hay registros</div>
            </If>
          </If>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      conciliaciones: state.conciliacionReducer.conciliaciones,
      politica: state.conciliacionReducer.politica
    }
  }
}
export default connect (mapStateToProps,{
  refreshListConciliacion,cargarComboPoliticas,calculaPaginadorConciliaciones
})(IConciliacionList)
