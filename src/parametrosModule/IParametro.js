import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListParametro, updTipoParametros } from '../actions/Actions';
import IParametroForm from './IParametroForm'
import ReactTable from "react-table";
import {Link} from 'react-router'

class IParametro extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    if(this.props.params.idparametro){
      this.props.refreshListParametro(this.props.params.idparametro)
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
          <IParametroForm/>
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
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                </div>
              </div>
              <div className="row-fluid">
                <ReactTable
                  data={this.props.state.items}
                  previousText= {'Anterior'}
                  nextText= {'Siguiente'}
                  loadingText= {'Cargando...'}
                  noDataText= {'Sin registros'}
                  pageText= {'Página'}
                  ofText= {'de'}
                  rowsText= {'Registros'}
                  filterable
                  defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                  defaultSorted={[{id: "registDate", desc: true }]}
                  columns={[
                      {
                          Header: "PARÁMETROS",
                          accessor: "parametro",
                          filterMethod: (filter, row) =>
                              row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                      },
                      {
                          Header: "NOMBRE",
                          accessor: "valor",
                          filterMethod: (filter, row) =>
                              row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                      },
                      {
                        Header: "POLÍTICA",
                        accessor: "descripcion",
                        filterMethod: (filter, row) =>
                            row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                      },
                      {
                        Header: "REQUIERE APROBACIÓN",
                        accessor: 'tipo',
                        filterMethod: (filter, row) =>
                            row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                      },
                      {
                        Header: "REQUIERE APROBACIÓN",
                        accessor: 'tipo',
                        filterable: false,
                        Cell: row => (
                          <div style={{textAlign: 'center'}}>
                            <Link to={"/parametros/edit/"+row.row._original.id} className="btn btn-info" style={{marginRight: '10px'}}><i className="fa fa-pencil"/></Link>
                            <If condition={row.value=="SISTEMA" || row.value=="SEGURIDAD"}>
                              &nbsp;
                            </If>
                            <If condition={row.value!="SISTEMA" && row.value!="SEGURIDAD"}>
                              <Link to={"/parametros/delete/"+row.row._original.id} className="btn btn-danger"><i className="fa fa-trash-o"/></Link>
                            </If>
                          </div>
                        )
                      }
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              </div>
              <div className="row">
                <div className="col-sm-1">
                </div>
                <div className="col-sm-4">
                  <center>
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
      conciliacion: state.escenarioReducer.conciliacion,
      items: state.parametroReducer.parametros
    }
  }
}

export default connect (mapStateToProps,{
  refreshListParametro, updTipoParametros
})(IParametro)
