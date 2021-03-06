import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { cargarParametro,borrarParametro,limpiarFormParametro } from '../actions/Actions';


class IParametroDelete extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    if(this.props.params && this.props.params.idparametro){
      this.props.cargarParametro(this.props.params.idparametro)
    }
  }

  borrarParametro(e){
    this.props.borrarParametro()
  }

  limpiarFormParametro(e){
    this.props.limpiarFormParametro()
  }

  render(){
    return(
        <div className="container">
          <div className="form-wrapper">
            <header className="head-table">
              <div className="form-group">
                <div className="col-sm-12">
                  <center>
                      <h2>Eliminando Parámetro</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="row">
              <div className="col-sm-12">
                  <center>
                    Está seguro de eliminar el parámetro?
                  </center>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Choose>
                  <When condition={this.props.params}>
                      <input id='id' ref='id' type='hidden' value={this.props.state.id}/>
                      <div className="form-group">
                        <label htmlFor='nombre'>Parametro</label>
                        <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.parametro} disabled />
                      </div>
                      <div className="form-group">
                        <label htmlFor='descripcion'>Valor</label>
                        <input id='descripcion' type='text' className='form-control form-control-lg' value={this.props.state.valor} disabled />
                      </div>
                      <div className="form-group">
                        <label htmlFor='descripcion'>Descripción</label>
                        <input id='descripcion' type='text' className='form-control form-control-lg' value={this.props.state.descripcion} disabled />
                      </div>
                      <div className="form-group">
                        <label htmlFor='objetivo'>Tipo</label>
                        <input id='objetivo' type='text' className='form-control form-control-lg' value={this.props.state.tipo} disabled/>
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
                    <Link to={"/parametros"} onClick={this.props.limpiarFormParametro.bind(this)} className="btn btn-success">&nbsp;&nbsp;&nbsp;No&nbsp;&nbsp;&nbsp;</Link>&nbsp;&nbsp;&nbsp;
                  </center>
              </div>
              <div className="col-sm-3">
                  <center>
                    <button onClick={this.props.borrarParametro.bind(this)} className="btn btn-danger">&nbsp;&nbsp;&nbsp;Sí&nbsp;&nbsp;&nbsp;</button>
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
      id : state.parametroFormReducer.id,
      parametro : state.parametroFormReducer.parametro,
      valor : state.parametroFormReducer.valor,
      descripcion : state.parametroFormReducer.descripcion,
      tipo : state.parametroFormReducer.tipo
    }
  }
}
export default connect (mapStateToProps,{
  cargarParametro, borrarParametro, limpiarFormParametro
})(IParametroDelete)
