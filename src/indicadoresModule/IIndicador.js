import React from 'react'
import IIndicadorForm from './IIndicadorForm'
import ReactTable from "react-table"
import {connect} from 'react-redux'
import {Link} from 'react-router'
import { refreshListIndicador } from '../actions/Actions';

class IIndicador extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    this.props.refreshListIndicador()
  }

  render(){
    return(
        <div className="container">
          <IIndicadorForm/>
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
                    <h2>Indicadores</h2>
                  </center>
                </div>
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
                          Header: "NOMBRE",
                          accessor: "nombreFormula",
                          filterMethod: (filter, row) =>
                              row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                      },
                      {
                        Header: "DESCRIPCIÓN",
                        accessor: "descripcion",
                        filterMethod: (filter, row) =>
                            row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                      },
                      {
                        Header: "FÓRMULA",
                        accessor: "textoFormula",
                        filterMethod: (filter, row) =>
                            row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                      },
                      {
                        Header: "ESCENARIO",
                        accessor: "nombreEscenario",
                        Cell: row => (
                          <div>
                            <If condition={row.row._original.idEscenario!=0}>
                              <Link to={"/escenarios/list/"+row.row._original.idEscenario}>{row.value}</Link>
                            </If>
                            <If condition={row.row._original.idEscenario==0}>
                                No tiene
                            </If>
                          </div>
                          
                        ),
                        filterMethod: (filter, row) =>
                            row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                      },
                      {
                        Header: "ACCIONES",
                        accessor: 'id',
                        filterable: false,
                        sortable: false,
                        Cell: row => (
                            <div style={{textAlign: 'center'}}>
                              <Link to={"/indicadores/edit/"+row.value} className="btn btn-info" style={{marginRight: '10px'}}><i className="fa fa-pencil"/></Link>
                              <Link to={"/indicadores/delete/"+row.value} className="btn btn-danger"><i className="fa fa-trash-o"/></Link>
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
      items: state.indicadorReducer.indicadores
    }
  }
}

export default connect(mapStateToProps, {refreshListIndicador})(IIndicador)
