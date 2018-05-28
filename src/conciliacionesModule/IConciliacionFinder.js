import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { updateTextFindConciliacion, findTextConciliacion } from '../actions/Actions';


class IConciliacionFinder extends React.Component{
  constructor(){
    super(...arguments)
  }

  // cuando acabe de montarse el componente que busque id si lo hay
  componentDidMount(){
    if(this.props.registro){
      this.props.findTextConciliacion()
    }
  }

  //Seccion de listar Conciliacions
  findTextConciliacion(e){
    this.props.findTextConciliacion()
  }

  //Detecta cambios de estado
  handleInput(e){
    this.props.updateTextFindConciliacion(e.target.name, e.target.value)
  }

  //Funcion que ejecuta el buscador con enter
  onKeyPress(e){
    if(e.key === 'Enter'){
      this.props.findTextConciliacion()
    }
  }

  render(){
    return(
      <div className="input-group row">
        <input type="text" value={this.props.textoBuscar}
          placeholder="Digite un texto para buscar"
          name="textoBuscar"
          id="textoBuscar"
          onChange={this.handleInput.bind(this)}
          onKeyPress={this.onKeyPress.bind(this)}
          className='form-control form-control-sm'/>
          <span className="input-group-addon">
            <button className="btn btn-info" onClick={this.findTextConciliacion.bind(this)}><i className="fa fa-search"/></button>
          </span>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      textoBuscar: state.conciliacionReducer.textoBuscar,
    }
  }
}
export default connect (mapStateToProps,{
  updateTextFindConciliacion, findTextConciliacion
})(IConciliacionFinder)
