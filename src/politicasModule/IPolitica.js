import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import IPoliticaForm from './IPoliticaForm'
import ReactTable from "react-table"
import "react-table/react-table.css";
import { refreshListPolitica } from '../actions/Actions';
import {connect} from 'react-redux'
import  {Link} from 'react-router'

class IPolitica extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    if(this.props.params.idpolitica){
      this.props.refreshListPolitica(this.props.params.idpolitica)
    }else{
      this.props.refreshListPolitica()
    }
  }

  clearFilters(){
    window.location = '/politicas';  
  }

  render(){
    return(
        <div className="container">
        <IPoliticaForm/>
          <header className="head-table">
            <div className="row">
                <br/>
            </div>
            <div className="row">
              <div className="col-sm-4">
                  <button className="btn btn-primary" data-toggle="modal" data-target="#modalAdd"><i className="fa fa-plus-circle"/> Adicionar</button>
              </div>
              <div className="col-sm-4">
                <center>
                  <h2>Políticas</h2>
                </center>
              </div>
              <div className="col-sm-4">
                <If condition={this.props.params.idpolitica} >
                  <div style={{textAlign: 'right'}}>
                    <button className="btn btn-primary" data-toggle="modal" onClick={() => this.clearFilters()}><i className="fa fa-eraser"/> Limpiar filtros</button>
                  </div>
                </If>
              </div>
            </div>
            <div className="row-fluid">
              <ReactTable
                data={this.props.state.politicas}
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
                      Header: "CÓDIGO",
                      accessor: "nombre",
                      filterMethod: (filter, row) =>
                          row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                  },
                  {
                      Header: "NOMBRE",
                      accessor: "descripcion",
                      filterMethod: (filter, row) =>
                          row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                  },
                  {
                      Header: "DESCRIPCIÓN",
                      accessor: 'objetivo',
                      filterMethod: (filter, row) =>
                          row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                  },
                  {
                      Header: "CONCILIACIÓN",
                      accessor: 'objetivo',
                      filterable: false,
                      Cell: row => (
                        <div>
                          <Choose>
                            <When condition={row.row._original.conciliaciones.length > 0} >
                            <Link to={"/conciliaciones/"+row.row._original.conciliaciones[0].id}>{row.row._original.conciliaciones[0].nombre}</Link>
                            </When>
                            <Otherwise>
                              <p>No tiene</p>
                            </Otherwise>
                          </Choose>
                        </div>
                      ),
                  },
                  {
                      Header: "ACCIONES",
                      accessor: 'id',
                      filterable: false,
                      sortable: false,
                      Cell: row => (
                          <div style={{textAlign: 'center'}}>
                            <Link to={`/politicas/edit/${row.value}`} className="btn btn-info" style={{marginRight: '10px'}}><i className="fa fa-pencil"/></Link>
                            <Link to={`/politicas/delete/${row.value}`} className="btn btn-danger"><i className="fa fa-trash-o"/></Link>
                          </div>
                      )
                  }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </div>
          </header>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{ 
    state: {
      politicas: state.politicaReducer.politicas
    }
  }
}

export default connect(mapStateToProps, {refreshListPolitica})(IPolitica)
