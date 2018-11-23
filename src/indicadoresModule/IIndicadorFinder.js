import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { updateTextFindIndicador, findTextIndicador } from '../actions/Actions';


class IIndicadorFinder extends React.Component{
  constructor(){
    super(...arguments)
  }

  //Seccion de listar indicadores
  findTextIndicador(e){
    this.props.findTextIndicador()
  }

  //Detecta cambios de estado
  handleInput(e){
      this.props.updateTextFindIndicador(e.target.name, e.target.value)
  }

  //Funcion que ejecuta el buscador con enter
  onKeyPress(e){
    if(e.key === 'Enter'){
      this.props.findTextIndicador()
    }
  }

  componentDidMount(){
    this.props.findTextIndicador()
  }

  render(){
    return(
        <div className="input-group row">
          <input type="text" value={this.props.state.textoBuscarIndicador}
            placeholder="Digite un texto para buscar"
            name="textoBuscarIndicador"
            id="textoBuscarIndicador"
            onChange={this.handleInput.bind(this)}
            onKeyPress={this.onKeyPress.bind(this)}
            className='form-control form-control-sm'/>
            <span className="input-group-addon">
              <button className="btn btn-info" onClick={this.findTextIndicador.bind(this)}><i className="fa fa-search"/></button>
            </span>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      textoBuscarIndicador: state.indicadorReducer.textoBuscarIndicador
    }
  }
}
export default connect (mapStateToProps,{
  updateTextFindIndicador, findTextIndicador
})(IIndicadorFinder)
