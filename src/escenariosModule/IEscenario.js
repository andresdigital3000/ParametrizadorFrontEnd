import React from 'react'
import IEscenarioForm from './IEscenarioForm'
import { connect } from 'react-redux'
import { updConciliacion,findTextEscenario,refreshListEscenario,cargarComboConciliaciones,calculaPaginadorEscenarios, cambioConciliacionesEscenario, cargarConciliacionesEscenario, cargarImpactos } from '../actions/Actions';
import ReactTable from "react-table"
import {Link} from 'react-router'

class IEscenario extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    if(this.props.params.id){
      this.props.updConciliacion(this.props.params.id)
    }else if(this.props.params.idescenario){
      this.props.refreshListEscenario(this.props.params.idescenario)
    }else{
      this.props.refreshListEscenario()
    }
  }

  cambioConciliacionesEscenario(e){
    this.props.updConciliacion(e.target.value)
  }

  clearFilters(){
    window.location = '/escenarios';  
  }

  render(){
    return(
        <div className="container">
          <IEscenarioForm/>
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
                  <h2>Escenarios</h2>
                </center>
              </div>
              <div className="col-sm-4">
                <If condition={this.props.params.id} >
                  <div style={{textAlign: 'right'}}>
                  <button className="btn btn-primary" data-toggle="modal" onClick={() => this.clearFilters()}><i className="fa fa-eraser"/> Limpiar filtros</button>
                  </div>
                </If>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                
              </div>
            </div>

            <ReactTable
              data={this.props.state.escenarios}
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
                      Header: "IMPACTO",
                      accessor: 'impacto',
                      filterMethod: (filter, row) =>
                          row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                  },
                  {
                    Header: "CONCILIACIÓN",
                    accessor: 'nombreConciliacion',
                    Cell: row => (
                      <div>
                        <If condition={row.row._original.idConciliacion!=undefined}>
                          <Link to={"/conciliaciones/"+row.row._original.idConciliacion}>{row.value}</Link>
                        </If>
                        <If condition={row.row._original.idConciliacion==undefined}>
                          No tiene
                        </If>
                      </div>
                    ),
                    filterMethod: (filter, row) =>
                        row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                  },
                  {
                    Header: "QUERY",
                    filterable: false,
                    sortable: false,
                    accessor: 'id',
                    Cell: row => (
                      <div>
                        <center>
                          <Link to={"/querys/escenario/"+row.value}><i className="fa fa-2x fa-file-text-o"/></Link>
                        </center>
                      </div>
                    ),
                    filterMethod: (filter, row) =>
                        row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                  },
                  {
                    Header: "PARÁMETROS",
                    accessor: 'id',
                    filterable: false,
                    sortable: false,
                    Cell: row => (
                      <div>
                        <center>
                          <Link to={"/parametros/"+row.value}><i className="fa fa-2x fa-pencil-square-o"/></Link>
                        </center>
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
                          <Link to={"/escenarios/edit/"+row.value} className="btn btn-info"  style={{marginRight: '10px'}}><i className="fa fa-pencil"/></Link>
                          <Link to={"/escenarios/delete/"+row.value} className="btn btn-danger"><i className="fa fa-trash-o"/></Link>
                        </div>
                    )
                  }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
            <div className="row">
              <div className="col-sm-1">
              </div>
              <div className="col-sm-4">
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
      conciliaciones: state.escenarioReducer.conciliaciones,
      escenarios: state.escenarioReducer.escenarios
    }
  }
}

export default connect (mapStateToProps,{
  updConciliacion, findTextEscenario, refreshListEscenario, cargarComboConciliaciones, calculaPaginadorEscenarios, cambioConciliacionesEscenario, cargarConciliacionesEscenario, cargarImpactos
})(IEscenario)
