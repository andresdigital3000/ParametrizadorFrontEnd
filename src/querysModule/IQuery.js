import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IQueryList from './IQueryList'
import IQueryFinder from './IQueryFinder'
import IQueryPaginador from './IQueryPaginador'
import { Router, Route, browserHistory, IndexRoute, Link } from "react-router";
import { connect } from 'react-redux'
import { updConciliacionQuerys,refreshListQuery,cargarComboEscenariosEnQuerys,calculaPaginadorQuerys, cambioConciliacionesQuery, cargarConciliacionesQuery } from '../actions/Actions';

class IQuery extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    this.props.cargarConciliacionesQuery()
    this.props.cargarComboEscenariosEnQuerys()
    if(this.props.conciliacion != undefined && this.props.conciliacion != 0){
      this.props.updConciliacionQuerys(this.props.conciliacion)
    }else if(this.props.registro != undefined && this.props.registro != 0){
      this.props.updConciliacionQuerys(this.props.registro)
    }else{
      this.props.updConciliacionQuerys(0)
    }
  }

  cambioConciliacionesQuery(e){
    //let jsonConciliacion = JSON.parse(e.target.value)
    this.props.updConciliacionQuerys(e.target.value)
  }

  render(){
    return(
        <div className="container">
          <header className="head-table">
            <div className="row">
                <br/>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <If condition={this.props.registro==undefined}>
                    <button className="btn btn-primary" id="buttonadd" data-toggle="modal" data-target="#modalAdd"><i className="fa fa-plus-circle"/> Adicionar</button>
                </If>
              </div>
              <div className="col-sm-4">
                <center>
                  <h2>Queries</h2>
                </center>
              </div>
              <div className="col-sm-4">
                  <If condition={this.props.registro==undefined}>
                      <IQueryFinder ref="buscador"/>
                  </If>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <label htmlFor='conciliacion'>Conciliación</label>
                <select id="conciliacion" name="conciliacion" className='form-control' value={this.props.state.conciliacion.id} onChange={this.cambioConciliacionesQuery.bind(this)}>
                  <option key="0" value="0">Todas</option>
                  {this.props.state.conciliaciones.map(function(currentValue,index,array){
                    return(
                      <option key={currentValue.id} value={currentValue.id}>{currentValue.nombre}</option>
                    );
                  })}
                </select>
              </div>
              <div className="col-sm-8">
                <label htmlFor='estado'>Estado</label>
                <p><b><If condition={this.props.state.estado.length > 0}>{this.props.state.estado[0].mensaje}</If>&nbsp;</b></p>
              </div>
            </div>
            <hr/>
            <Choose>
            <When condition={this.props.registro != undefined}>
              <IQueryList escenario={this.props.registro}/>
            </When>
            <When condition={this.props.conciliacion != undefined}>
              <IQueryList conciliacion={this.props.conciliacion}/>
            </When>
            <Otherwise>
              <IQueryList conciliacion={0}/>
            </Otherwise>
            </Choose>
            <hr/>
            <div className="row">
              <div className="col-sm-1">
              </div>
              <div className="col-sm-8">
                <center>
                  <IQueryPaginador/>
                </center>
              </div>
              <div className="col-sm-1">
                {
                  this.props.state.conciliacion.id!="0" && this.props.state.querys.length>0 ?
                  <Link to="/querys/aprobar/form" className="btn btn-primary">Aprobar Conciliación</Link> :
                  <p>&nbsp;</p>
                }
              </div>
              <div className="col-sm-2">
              </div>
            </div>
          </header>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      conciliacion : state.queryReducer.conciliacion,
      conciliaciones : state.queryReducer.conciliaciones,
      querys : state.queryReducer.querys,
      estado : state.queryReducer.conciliacion.queryAprobaciones
    }
  }
}

export default connect (mapStateToProps,{
  updConciliacionQuerys, refreshListQuery, cargarComboEscenariosEnQuerys, calculaPaginadorQuerys, cambioConciliacionesQuery, cargarConciliacionesQuery
})(IQuery)