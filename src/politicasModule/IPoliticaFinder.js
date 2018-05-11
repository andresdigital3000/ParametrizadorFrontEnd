import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { updateTextFindPolitica, findTextPolitica } from '../actions/Actions';


class IPoliticaFinder extends React.Component{
  constructor(){
    super(...arguments)
  }

  //Seccion de listar politicas
  findTextPolitica(e){
    this.props.findTextPolitica()
  }

  //Detecta cambios de estado
  handleInput(e){
    this.props.updateTextFindPolitica(e.target.name, e.target.value)
  }

  render(){
    return(
        <div className="input-group row">
          <input type="text" value={this.props.textoBuscar}
            placeholder="Digite un texto para buscar"
            name="textoBuscar"
            id="textoBuscar"
            onChange={this.handleInput.bind(this)}
            className='form-control form-control-sm'/>
            <span className="input-group-addon">
              <button className="btn btn-info" onClick={this.findTextPolitica.bind(this)}><i className="fa fa-search"/></button>
            </span>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      textoBuscar: state.politicaReducer.textoBuscar,
    }
  }
}
export default connect (mapStateToProps,{
  updateTextFindPolitica, findTextPolitica
})(IPoliticaFinder)
