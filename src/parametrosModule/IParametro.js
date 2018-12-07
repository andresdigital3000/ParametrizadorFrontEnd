import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IParametroList from './IParametroList'
import IParametroFinder from './IParametroFinder'
import IParametroPaginador from './IParametroPaginador'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListParametro, updTipoParametros } from '../actions/Actions';

class IParametro extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    if(this.props.idescenario != undefined){
      this.props.refreshListParametro(this.props.idescenario)
    }else{
      this.props.refreshListParametro()
    }
  }

  cambioTipossQuery(e){
    this.props.updTipoParametros(e.target.value);
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
                      <button className="btn btn-primary" data-toggle="modal" data-target="#modalAdd"><i className="fa fa-plus-circle"/> Adicionar</button>
                  </If>
                </div>
                <div className="col-sm-4">
                  <center>
                    <h2>Parámetros</h2>
                  </center>
                </div>
                <div className="col-sm-4">
                  <IParametroFinder/>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <label htmlFor='tipo'>Tipo</label>
                  <select id='tipo' value={this.props.state.tipo} className='form-control form-control-lg' onChange={this.cambioTipossQuery.bind(this)}>
                  <option value=''>Seleccione uno</option>
                  <option value='GENERAL'>GENERAL</option>
                  <option value='SISTEMA'>PARAMETROS SISTEMA</option>
                  <option value='CONCILIACION'>CONCILIACION</option>
                  <option value='ESCENARIO'>ESCENARIO</option>
                </select>
                </div>
              </div>
              <hr/>
              <div className="row-fluid">
                <IParametroList registro={this.props.registro} idescenario={this.props.idescenario}/>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-1">
                </div>
                <div className="col-sm-4">
                  <center>
                    <IParametroPaginador/>
                  </center>
                </div>
                <div className="col-sm-1">
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
      conciliacion: state.escenarioReducer.conciliacion
    }
  }
}

export default connect (mapStateToProps,{
  refreshListParametro, updTipoParametros
})(IParametro)
