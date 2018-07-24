import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { updateTextFindParametro, findTextParametro } from '../actions/Actions';


class IParametroFinder extends React.Component{
  constructor(){
    super(...arguments)
  }

  //Seccion de listar parametros
  findTextParametro(e){
    this.props.findTextParametro()
  }

  //Detecta cambios de estado
  handleInput(e){
      this.props.updateTextFindParametro(e.target.name, e.target.value)
  }

  //Funcion que ejecuta el buscador con enter
  onKeyPress(e){
    if(e.key === 'Enter'){
      this.props.findTextParametro()
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
              <button className="btn btn-info" onClick={this.findTextParametro.bind(this)}><i className="fa fa-search"/></button>
            </span>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      textoBuscar: state.parametroReducer.textoBuscar,
    }
  }
}
export default connect (mapStateToProps,{
  updateTextFindParametro, findTextParametro
})(IParametroFinder)
