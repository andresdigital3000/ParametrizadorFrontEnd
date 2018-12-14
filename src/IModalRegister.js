import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from './utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { mostrarModal, ocultarModal, updateFormUsuarios, limpiarFormUsuario, saveUsuario } from './actions/Actions';

class IModalRegister extends React.Component{
  constructor(){
    super(...arguments)
  }

  mostrarModal(){
    this.props.mostrarModalRegister()
  }

  ocultarModal(){
    this.props.ocultarModalRegister()
  }

  //Detecta cambios de estado
  handleInput(e){
    this.props.updateFormUsuarios(e.target.id, e.target.value)
  }

  //Salvar el nuevo registro
  saveUsuario(e){
    this.props.saveUsuario()
  }

  //Limpiar el formulario
  limpiarFormUsuario(e){
    this.props.limpiarFormUsuario()
  }

  render(){
    return(
      <div className="modal fade" id="modalRegisterUser" role="dialog" aria-labelledby="modalAddUsuarioTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalAddUsuarioTitle">Registrar Nuevo Usuario, Ingreso por Primera Vez.</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Cerrar">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor='email'>* Email</label>
                  <input id='email' type="email" className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.email} onChange={this.handleInput.bind(this)} placeholder='Digite email valido del Usuario' autoComplete='off' maxLength='254'/>
                </div>
                <div className="form-group">
                  <label htmlFor='nombreUsuario'>* Nombre de Usuario</label>
                  <input id='nombreUsuario' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.nombreUsuario} onChange={this.handleInput.bind(this)} placeholder='Digite nombre completo del Usuario' autoComplete='off'  maxLength='200'/>
                </div>
              </div>
              <div className="modal-footer">
                (*) Obligatorio
                <hr/>
                <button onClick={this.props.limpiarFormUsuario.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                {
                  this.props.state.email!="" && this.props.state.nombreUsuario!="" ?
                  <button onClick={this.props.saveUsuario.bind(this)}  className="btn btn-primary">Registrar</button> :
                  <button className="btn btn-primary"  disabled>Formulario incompleto</button>
                }
              </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      email : state.usuarioFormReducer.email,
      nombreUsuario : state.usuarioFormReducer.nombreUsuario,
    }
  }
}

export default connect (mapStateToProps,{
  mostrarModal, ocultarModal, updateFormUsuarios, limpiarFormUsuario, saveUsuario
})(IModalRegister)
