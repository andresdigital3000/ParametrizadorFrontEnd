import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormUsuarios, saveUsuario, cargarUsuario, limpiarFormUsuario } from '../actions/Actions';
import AsyncSelect from 'react-select/lib/Async'

class IUsuarioForm extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    if(this.props.params && this.props.params.idusuario){
      this.props.cargarUsuario(this.props.params.idusuario)
    }
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
      <div className="container">
      <Choose>
        <When condition={this.props.params}>
          <div className="form-wrapper">
            <header className="head-table">
              <div className="form-group">
                <div className="col-sm-12">
                  <center>
                      <h2>Detalles del Usuario</h2>
                  </center>
                </div>
              </div>
            </header>
            <input id='id' ref='id' type='hidden' value={this.props.state.id}/>
            <div className="form-group">
              <label htmlFor='usuario'>* Usuario</label>
              <input id='usuario' type='text' className='form-control form-control-lg' value={this.props.state.usuario} onChange={this.handleInput.bind(this)} placeholder='Digite el usuario' autoComplete='off' maxLength='100'/>
            </div>
            <div className="form-group">
              <label htmlFor='email'>* Email</label>
              <input id='email' type='email' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.email} onChange={this.handleInput.bind(this)} placeholder='Digite el email del usuario' autoComplete='off' maxLength='254'/>
            </div>
            <div className="form-group">
              <label htmlFor='nombreUsuario'>* Nombre de Usuario</label>
              <input id='nombreUsuario' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.nombreUsuario} onChange={this.handleInput.bind(this)} placeholder='Digite el nombre completo del Usuario' autoComplete='off'  maxLength='200'/>
            </div>
            <div className="form-group">
              <label htmlFor='rol'>Rol de Usuario</label>
              <select className="custom-select" id="rol" name="rol" value={this.props.state.rol} onChange={this.handleInput.bind(this)}>
                <option value="0">Sin Rol</option>
                {
                  this.props.state.roles.map(function(rol) {
                    return <option value={rol.id.toString()}>{rol.nombre}</option>;
                  })
                }
              </select>
            </div>
            <div className="form-group">
              <small>(*) Obligatorio</small>
              <hr/>
              <Link to={"/usuarios"} onClick={this.props.limpiarFormUsuario.bind(this)} className="btn btn-warning">Regresar</Link>&nbsp;&nbsp;&nbsp;
              {
                this.props.state.usuario!="" && this.props.state.email!="" && this.props.state.nombreUsuario!="" ?
                <button onClick={this.props.saveUsuario.bind(this)} className="btn btn-primary">Grabar</button> :
                <button className="btn btn-primary" disabled>Formulario incompleto</button>
              }
            </div>
          </div>
        </When>
      </Choose>
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
      rol : state.usuarioFormReducer.rol,
      roles : state.usuarioReducer.roles
    }
  }
}
export default connect (mapStateToProps,{
  updateFormUsuarios, saveUsuario, cargarUsuario, limpiarFormUsuario
})(IUsuarioForm)
