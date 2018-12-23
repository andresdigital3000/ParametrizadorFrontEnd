import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { cargarUsuario,borrarUsuario,limpiarFormUsuario } from '../actions/Actions';


class IUsuarioDelete extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    if(this.props.params && this.props.params.idusuario){
      this.props.cargarUsuario(this.props.params.idusuario)
    }
  }

  borrarUsuario(e){
    this.props.borrarUsuario()
  }

  limpiarFormUsuario(e){
    this.props.limpiarFormUsuario()
  }

  render(){
    return(
        <div className="container">
          <div className="form-wrapper">
            <header className="head-table">
              <div className="form-group">
                <div className="col-sm-12">
                  <center>
                      <h2>Eliminando Usuario</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="row">
              <div className="col-sm-12">
                  <center>
                    Está seguro de eliminar el Usuario?
                  </center>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Choose>
                  <When condition={this.props.params}>
                      <input id='id' ref='id' type='hidden' value={this.props.state.id}/>
                      <div className="form-group">
                        <label htmlFor='nombre'>Usuario</label>
                        <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.usuario} disabled />
                      </div>
                      <div className="form-group">
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='text' className='form-control form-control-lg' value={this.props.state.email} disabled />
                      </div>
                      <div className="form-group">
                        <label htmlFor='nombreUsuario'>Nombre de Usuario</label>
                        <input id='nombreUsuario' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.nombreUsuario} disabled/>
                      </div>
                      <div className="form-group">
                        <label htmlFor='rol'>Rol de Usuario</label>
                        <select className="custom-select" id="rol" name="rol" value={this.props.state.rol} disabled>
                          <option value="0">Sin Rol</option>
                          <option value="1">Consultor</option>
                          <option value="2">Ejecutor</option>
                          <option value="3">Administrador</option>
                        </select>
                      </div>
                  </When>
                  <Otherwise>
                    <div>No se encuentra la información del registro</div>
                  </Otherwise>
                </Choose>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-3">
                  <center>
                    <Link to={"/usuarios"} onClick={this.props.limpiarFormUsuario.bind(this)} className="btn btn-success">&nbsp;&nbsp;&nbsp;No&nbsp;&nbsp;&nbsp;</Link>&nbsp;&nbsp;&nbsp;
                  </center>
              </div>
              <div className="col-sm-3">
                  <center>
                    <button onClick={this.props.borrarUsuario.bind(this)} className="btn btn-danger">&nbsp;&nbsp;&nbsp;Sí&nbsp;&nbsp;&nbsp;</button>
                  </center>
              </div>
              <div className="col-sm-3"></div>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      id : state.usuarioFormReducer.id,
      usuario : state.usuarioFormReducer.usuario,
      email : state.usuarioFormReducer.email,
      nombreUsuario : state.usuarioFormReducer.nombreUsuario,
      rol : state.usuarioFormReducer.rol
    }
  }
}
export default connect (mapStateToProps,{
  cargarUsuario, borrarUsuario, limpiarFormUsuario
})(IUsuarioDelete)
