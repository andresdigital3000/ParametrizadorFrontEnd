import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { refreshListUsuario } from '../actions/Actions';

class IUsuarioItem extends React.Component{
  constructor(){
    super(...arguments)
  }

  render(){
    return(
          <tbody>
              {this.props.state.items.map(function(currentValue,index,array){
                return (
                  <tr key={currentValue.id}>
                    <td title={"ID : "+currentValue.id}>
                      {currentValue.usuario}
                    </td>
                    <td>
                      {currentValue.email}
                    </td>
                    <td>
                      {currentValue.nombreUsuario}
                    </td>
                    <td>
                      {(currentValue.roles.map(function(rol) { return rol.nombre; }).toString() === "" ) ? "Sin Rol" : currentValue.roles.map(function(rol) { return rol.nombre; }).toString()}
                    </td>
                    <td>
                      <div className="button-wrap">
                        <Link to={"/usuarios/edit/"+currentValue.id} className="btn btn-info"><i className="fa fa-list"/></Link>
                      </div>
                      <div className="button-wrap">
                        <Link to={"/usuarios/delete/"+currentValue.id} className="btn btn-danger"><i className="fa fa-trash-o"/></Link>
                      </div>
                    </td>
                </tr>
                );
              })}
          </tbody>
    )
  }
}


const mapStateToProps = (state) =>{
  return{
    state: {
      items: state.usuarioReducer.usuarios
    }
  }
}

export default connect (mapStateToProps,{
  refreshListUsuario
})(IUsuarioItem)
