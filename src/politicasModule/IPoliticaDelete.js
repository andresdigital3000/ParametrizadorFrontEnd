import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { cargarPolitica,borrarPolitica,limpiarFormPolitica } from '../actions/Actions';


class IPoliticaDelete extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    if(this.props.registro){
      this.props.cargarPolitica(this.props.registro.idpoliticadelete)
    }
  }

  borrarPolitica(e){
    this.props.borrarPolitica()
  }

  limpiarFormPolitica(e){
    this.props.limpiarFormPolitica()
  }

  render(){
    return(
        <div className="container">
          <div className="form-wrapper">
            <header className="head-table">
              <div className="form-group">
                <div className="col-sm-12">
                  <center>
                      <h2>Eliminando Política</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="row">
              <div className="col-sm-12">
                  <center>
                    Está seguro de eliminar la política?
                  </center>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Choose>
                  <When condition={this.props.registro}>
                      <input id='id' ref='id' type='hidden' value={this.props.state.id}/>
                      <div className="form-group">
                        <label htmlFor='nombre'>Nombre</label>
                        <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} disabled />
                      </div>
                      <div className="form-group">
                        <label htmlFor='descripcion'>Descripción</label>
                        <input id='descripcion' type='text' className='form-control form-control-lg' value={this.props.state.descripcion} disabled />
                      </div>
                      <div className="form-group">
                        <label htmlFor='objetivo'>Objetivo</label>
                        <input id='objetivo' type='text' className='form-control form-control-lg' className='form-control form-control-lg' value={this.props.state.objetivo} disabled/>
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
                    <Link to={"/politicas"} onClick={this.props.limpiarFormPolitica.bind(this)} className="btn btn-success">&nbsp;&nbsp;&nbsp;No&nbsp;&nbsp;&nbsp;</Link>&nbsp;&nbsp;&nbsp;
                  </center>
              </div>
              <div className="col-sm-3">
                  <center>
                    <button onClick={this.props.borrarPolitica.bind(this)} className="btn btn-danger">&nbsp;&nbsp;&nbsp;Sí&nbsp;&nbsp;&nbsp;</button>
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
      id : state.politicaFormReducer.id,
      nombre : state.politicaFormReducer.nombre,
      descripcion : state.politicaFormReducer.descripcion,
      objetivo : state.politicaFormReducer.objetivo
    }
  }
}
export default connect (mapStateToProps,{
  cargarPolitica, borrarPolitica, limpiarFormPolitica
})(IPoliticaDelete)
