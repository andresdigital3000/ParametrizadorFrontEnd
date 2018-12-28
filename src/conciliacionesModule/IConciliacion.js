import React from 'react'
import { connect } from 'react-redux'
import { updPolitica,calculaPaginadorConciliaciones,limpiarFormConciliacion, refreshListConciliacion } from '../actions/Actions';
import IConciliacionForm from './IConciliacionForm';
import ReactTable from "react-table";
import {Link} from 'react-router'

class IConciliacion extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){

    if(this.props.params.idconciliacion){
      this.props.refreshListConciliacion(this.props.params.idconciliacion)
    }else{
      this.props.refreshListConciliacion()
    }
  }

  limpiarForm(){
    this.props.limpiarFormConciliacion();
  }

  componentDidMount(){
    //this.props.calculaPaginadorConciliaciones()
    this.props.limpiarFormConciliacion();
  }

  clearFilters(){
    window.location = '/conciliaciones';  
  }

  render(){
    return(
        <div className="container">
        <IConciliacionForm/>
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
                  <h2>Conciliaciones</h2>
                </center>
              </div>
              <div className="col-sm-4">
                <If condition={this.props.params.idconciliacion} >
                  <div style={{textAlign: 'right'}}>
                  <button className="btn btn-primary" data-toggle="modal" onClick={() => this.clearFilters()}><i className="fa fa-eraser"/> Limpiar filtros</button>
                  </div>
                </If>
              </div>
            </div>
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
                        Header: "POLÍTICA",
                        accessor: "nombrePolitica",
                        Cell: row => (
                          <div>
                            <If condition={row.row._original.idPolitica != 0}>
                              <Link to={"/politicas/"+row.row._original.idPolitica}>{row.value}</Link>
                            </If>
                            <If condition={row.row._original.idPolitica == 0}>
                              No tiene
                            </If>
                          </div>
                          ),
                        filterMethod: (filter, row) =>
                            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                      },
                      {
                          Header: "ESCENARIO",
                          accessor: 'id',
                          filterable: false,
                          Cell: row => (
                            <center>
                              <Link to={"/escenarios/"+row.value}><i className="fa fa-2x fa-tasks"/></Link>
                            </center>
                          ),
                          filterMethod: (filter, row) =>
                              row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                      },
                      {
                        Header: "REQ. APROV. RESULTADO",
                        accessor: 'requiereAprobacion',
                        Cell: row => (
                          <center>{row.value}</center>
                        ),
                        filterMethod: (filter, row) =>
                            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                      },
                      {
                        Header: "ACCIONES",
                        accessor: 'requiereAprobacion',
                        filterable: false,
                        sortable: false,
                        Cell: row => (
                          <div style={{textAlign: 'left'}}>
                            <Link to={"/conciliaciones/edit/"+row.row._original.id} className="btn btn-info" style={{marginRight: '10px'}}><i className="fa fa-pencil"/></Link>
                            <Link to={"/conciliaciones/delete/"+row.row._original.id} className="btn btn-danger" style={{marginRight: '10px'}}><i className="fa fa-trash-o"/></Link>
                            <If condition={row.value == 'SI'} >
                              <Link title="Aprobar Queries" to={"/conciliaciones/aprobar/"+row.row._original.id} className="btn btn-success" ><i className="fa fa-check"/></Link>
                            </If>
                          </div>
                        )
                      }
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
            
          </header>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      politica: state.conciliacionReducer.politica,
      items: state.conciliacionReducer.conciliaciones
    }
  }
}

export default connect (mapStateToProps,{
  updPolitica, calculaPaginadorConciliaciones, limpiarFormConciliacion, refreshListConciliacion
})(IConciliacion)
