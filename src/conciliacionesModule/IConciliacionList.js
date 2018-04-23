import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IConciliacionItem from './IConciliacionItem'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListConciliacion } from '../actions/Actions';


class IConciliacionList extends React.Component{
  constructor(){
    super(...arguments)
  }

  //Seccion de listar Conciliacions
  componentWillMount(){
    if(this.props.registro == undefined){
      this.props.refreshListConciliacion()
    }else{
      this.props.refreshListConciliacion(this.props.registro)
    }
  }
  //Fin seccion Conciliacions

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
                      DESCRIPCION
                    </th>
                    <th>
                      POLITICA
                    </th>
                    <th>
                      TABLA RESULTADOS
                    </th>
                    <th>
                      ESCENARIOS
                    </th>
                    <th>
                        ACCIONES
                    </th>
                </tr>
              </thead>
                <If condition={JSON.stringify(this.props.state.conciliaciones)!='{}' && Object.entries(this.props.state.conciliaciones).length > 0}>
                  <IConciliacionItem items={this.props.state.conciliaciones} registro={this.props.registro}/>
                </If>
                <If condition={JSON.stringify(this.props.state.conciliaciones)=='{}' && Object.entries(this.props.state.conciliaciones).length == 1}>
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
      conciliaciones: state.conciliacionReducer.conciliaciones
    }
  }
}
export default connect (mapStateToProps,{
  refreshListConciliacion
})(IConciliacionList)
