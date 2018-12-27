import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { cargarConciliacion, borrarConciliacion, limpiarFormConciliacion, refreshListConciliacion } from '../actions/Actions';


class IConciliacionDelete extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    if(this.props.params && this.props.params.idconciliaciondelete){
      this.props.cargarConciliacion(this.props.params.idconciliaciondelete)
    }
  }

  borrarConciliacion(e){
    this.props.borrarConciliacion()
    this.props.refreshListConciliacion()
  }

  //Limpiar el formulario
  limpiarFormConciliacion(e){
    this.props.limpiarFormConciliacion()
  }

  render(){
    return(
        <div className="container">
          <Choose>
            <When condition={this.props.state.id}>
              <div className="form-wrapper">
                <header className="head-table">
                  <div className="form-group">
                    <div className="col-sm-12">
                      <center>
                          <h2>Eliminando Conciliación</h2>
                      </center>
                    </div>
                  </div>
                </header>
                <div className="row">
                  <div className="col-sm-12">
                      <center>
                        Está seguro de eliminar la conciliación?
                      </center>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    
                          <input id='id' ref='id' type='hidden' value={this.props.state.id} />
                          <div className="form-group">
                            <label htmlFor='nombre'>Nombre</label>
                            <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} disabled />
                          </div>
                          <div className="form-group">
                            <label htmlFor='descripcion'>Descripción</label>
                            <input id='descripcion' type='text' className='form-control form-control-lg' value={this.props.state.descripcion} disabled />
                          </div>
                      
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-3">
                      <center>
                        <Link to={"/conciliaciones"} onClick={this.props.limpiarFormConciliacion.bind(this)} className="btn btn-success">&nbsp;&nbsp;&nbsp;No&nbsp;&nbsp;&nbsp;</Link>&nbsp;&nbsp;&nbsp;
                      </center>
                  </div>
                  <div className="col-sm-3">
                      <center>
                        <button onClick={this.props.borrarConciliacion.bind(this)} className="btn btn-danger">&nbsp;&nbsp;&nbsp;Sí&nbsp;&nbsp;&nbsp;</button>
                      </center>
                  </div>
                  <div className="col-sm-3"></div>
                </div>
              </div>
            </When>
            <Otherwise>
              <div>No se encuentra la información del registro</div>
            </Otherwise>
          </Choose>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      id : state.conciliacionFormReducer.id,
      nombre : state.conciliacionFormReducer.nombre,
      descripcion : state.conciliacionFormReducer.descripcion
    }
  }
}
export default connect (mapStateToProps,{
  cargarConciliacion, borrarConciliacion, limpiarFormConciliacion, refreshListConciliacion
})(IConciliacionDelete)
