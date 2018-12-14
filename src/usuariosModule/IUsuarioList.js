import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IUsuarioItem from './IUsuarioItem'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListUsuario } from '../actions/Actions';


class IUsuarioList extends React.Component{
  constructor(){
    super(...arguments)
  }

  //Seccion de listar usuarios
  componentWillMount(){
    if(this.props.registro == undefined){
      this.props.refreshListUsuario()
    }else{
      this.props.refreshListUsuario(this.props.registro)
    }
  }

  render(){
    return(
        <div className="row">
          <If condition={Object.entries(this.props.state.usuarios).length > 0}>
            <div className="table-container">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                        <th>
                          USUARIO
                        </th>
                        <th>
                          EMAIL
                        </th>
                        <th>
                          NOMBRE COMPLETO
                        </th>
                        <th>
                          ROL
                        </th>
                        <th>
                          ACCIONES
                        </th>
                    </tr>
                  </thead>
                  <IUsuarioItem/>
                </table>
              </div>
          </div>
        </If>
        <If condition={Object.entries(this.props.state.usuarios).length == 0}>
            <div className="alert alert-warning col-sm-12">No hay registros</div>
        </If>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      usuarios: state.usuarioReducer.usuarios
    }
  }
}
export default connect (mapStateToProps,{
  refreshListUsuario
})(IUsuarioList)
