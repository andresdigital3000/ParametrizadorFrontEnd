import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { updateTextFindUsuario, findTextUsuario } from '../actions/Actions';


class IUsuarioFinder extends React.Component{
  constructor(){
    super(...arguments)
  }

  //Seccion de listar usuarios
  findTextUsuario(e){
    this.props.findTextUsuario()
  }

  //Detecta cambios de estado
  handleInput(e){
      this.props.updateTextFindUsuario(e.target.name, e.target.value)
  }

  //Funcion que ejecuta el buscador con enter
  onKeyPress(e){
    if(e.key === 'Enter'){
      this.props.findTextUsuario()
    }
  }

  //Volver a buscar despues de recargar
  componentDidMount(){
    this.props.findTextUsuario()
  }

  render(){
    return(
        <div className="input-group row">
          <input type="text" value={this.props.state.textoBuscarUsuarios}
            placeholder="Digite un texto para buscar"
            name="textoBuscarUsuarios"
            id="textoBuscarUsuarios"
            onChange={this.handleInput.bind(this)}
            onKeyPress={this.onKeyPress.bind(this)}
            className='form-control form-control-sm'/>
            <span className="input-group-addon">
              <button className="btn btn-info" onClick={this.findTextUsuario.bind(this)}><i className="fa fa-search"/></button>
            </span>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      textoBuscarUsuarios: state.usuarioReducer.textoBuscarUsuarios,
    }
  }
}
export default connect (mapStateToProps,{
  updateTextFindUsuario, findTextUsuario
})(IUsuarioFinder)
