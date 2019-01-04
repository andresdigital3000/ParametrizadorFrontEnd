import React from 'react'
import { Router, Route, browserHistory, IndexRoute, Link } from "react-router";
import { connect } from 'react-redux'
import { updConciliacionQuerys,calculaPaginadorQuerys, cambioConciliacionesQuery, cargarConciliacionesQuery, updEscenariosQuerys, updEscenarioQuerys } from '../actions/Actions';
import IQueryForm from './IQueryForm'
import ReactTable from "react-table"


class IQuery extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    this.props.cargarConciliacionesQuery() 
   
    if(this.props.params.idEscenario){
      this.props.updEscenarioQuerys(this.props.params.idEscenario)
    }else{
      this.props.updEscenarioQuerys()
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.location.pathname !== nextProps.location.pathname){
      if(nextProps.params.idEscenario){
        nextProps.updEscenarioQuerys(nextProps.params.idEscenario)
      }else{
        nextProps.updEscenarioQuerys()
      }
    }
  }



  cambioConciliacionesQuery(e){
    //let jsonConciliacion = JSON.parse(e.target.value)
    this.props.updConciliacionQuerys(e.target.value)
  }

  cambioEscenariosQuery(e){
    this.props.updEscenariosQuerys(e.target.value)
  }

  clearFilters(){
    window.location = '/querys';  
  }
  

  render(){
    return(
        <div className="container">
        <IQueryForm/>
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
                <If condition={this.props.params.idquery} >
                  <div style={{textAlign: 'right'}}>
                  <button className="btn btn-primary" data-toggle="modal" onClick={() => this.clearFilters()}><i className="fa fa-eraser"/> Limpiar filtros</button>
                  </div>
                </If>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
              </div>
              <div className="col-sm-4">
                
              </div>
              <div className="col-sm-4">
              </div>
            </div>
            <ReactTable
              data={this.props.state.querys}
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
                      accessor: "nombreQuery",
                      Cell: row => (<center>{row.value}</center>),
                      filterMethod: (filter, row) =>
                          row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                  },
                  {
                      Header: "QUERY",
                      accessor: "query",
                      filterMethod: (filter, row) =>
                          row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                  },
                  {
                    Header: "ORDEN",
                    accessor: "orden",
                    Cell: row => (<center>{row.value}</center>),
                    filterMethod: (filter, row) =>
                        new String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase()) 
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
                    Header: "ESCENARIO",
                    accessor: 'nombreEscenario',
                    filterMethod: (filter, row) =>
                        row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) ,
                    Cell: row => (
                      <div style={{textAlign: 'center'}}>
                        <If condition={row.row._original.idEscenario!=undefined}>
                          <Link to={"/escenarios/list/"+row.row._original.idEscenario}>{row.value}</Link>
                        </If>
                        <If condition={row.row._original.idEscenario==undefined}>
                          No tiene
                        </If>
                      </div>
                    )
                  },
                  {
                    Header: "ACCIONES",
                    accessor: 'id',
                    filterable: false,
                    sortable: false,
                    Cell: row => (
                      <div style={{textAlign: 'center'}}>
                        <Link to={"/querys/edit/"+row.value} className="btn btn-info" style={{marginRight: '10px'}}><i className="fa fa-pencil"/></Link>
                        <Link to={"/querys/delete/"+row.value} className="btn btn-danger"><i className="fa fa-trash-o"/></Link>
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
      conciliacion : state.queryReducer.conciliacion,
      escenario : state.queryReducer.escenario,
      conciliaciones : state.queryReducer.conciliaciones,
      escenarios : state.queryReducer.escenarios,
      querys : state.queryReducer.querys,
      estado : state.queryReducer.conciliacion.queryAprobaciones,
      
    }
  }
}

export default connect (mapStateToProps,{
  updConciliacionQuerys, calculaPaginadorQuerys, cambioConciliacionesQuery, cargarConciliacionesQuery, updEscenariosQuerys, updEscenarioQuerys
})(IQuery)
