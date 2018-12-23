import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { cargarQuery,borrarQuery,limpiarFormQuery } from '../actions/Actions';


class IQueryDelete extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    if(this.props.params && this.props.params.idquery){
      this.props.cargarQuery(this.props.params.idquery)
    }
  }

  //Limpiar el formulario
  limpiarFormQuery(e){
    this.props.limpiarFormQuery()
  }

  borrarQuery(e){
    this.props.borrarQuery()
  }

  render(){
    return(
        <div className="container">
          <div className="form-wrapper">
            <header className="head-table">
              <div className="form-group">
                <div className="col-sm-12">
                  <center>
                      <h2>Eliminando Query</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="row">
              <div className="col-sm-12">
                  <center>
                    Está seguro de eliminar el query?
                  </center>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Choose>
                  <When condition={this.props.params}>
                      <input id='id' ref='id' type='hidden' value={this.props.state.id}/>
                      <div className="form-group">
                        <label htmlFor='nombre'>Nombre</label>
                        <input id='nombre' type='text' className='form-control form-control-lg' value={this.props.state.nombre} disabled />
                      </div>
                      <div className="form-group">
                        <label htmlFor='query'>Query</label>
                        <input id='query' type='text' className='form-control form-control-lg' value={this.props.state.query} disabled />
                      </div>
                      <div className="form-group">
                        <label htmlFor='query'>Orden</label>
                        <input id='orden' type='text' className='form-control form-control-lg' value={this.props.state.orden} disabled />
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
                    <Link to={"/querys"} onClick={this.props.limpiarFormQuery.bind(this)} className="btn btn-success">&nbsp;&nbsp;&nbsp;No&nbsp;&nbsp;&nbsp;</Link>&nbsp;&nbsp;&nbsp;
                  </center>
              </div>
              <div className="col-sm-3">
                  <center>
                    <button onClick={this.props.borrarQuery.bind(this)} className="btn btn-danger">&nbsp;&nbsp;&nbsp;Sí&nbsp;&nbsp;&nbsp;</button>
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
      id : state.queryFormReducer.id,
      nombre : state.queryFormReducer.nombre,
      query : state.queryFormReducer.query,
      orden : state.queryFormReducer.orden
    }
  }
}
export default connect (mapStateToProps,{
  cargarQuery, borrarQuery, limpiarFormQuery
})(IQueryDelete)
