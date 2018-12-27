import React from 'react'
import IUsuarioForm from './IUsuarioForm'
import ReactTable from "react-table";
import {Link} from 'react-router'
import { refreshListUsuario } from '../actions/Actions';
import {connect} from 'react-redux'

class IUsuario extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    this.props.refreshListUsuario()
  }

  render(){
    return(
        <div className="container">
          <IUsuarioForm/>
            <header className="head-table">
              <div className="row">
                  <br/>
              </div>
              <div className="row">
                <div className="col-sm-4">
                </div>
                <div className="col-sm-4">
                  <center>
                    <h2>Usuarios</h2>
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
                          Header: "USUARIO",
                          accessor: "usuario",
                          filterMethod: (filter, row) =>
                              row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                      },
                      {
                          Header: "EMAIL",
                          accessor: "email",
                          filterMethod: (filter, row) =>
                              row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                      },
                      {
                        Header: "NOMBRE COMPLETO",
                        accessor: "nombreUsuario",
                        filterMethod: (filter, row) =>
                            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()) 
                      },
                      {
                        Header: "ROL",
                        accessor: 'roles',
                        filterable: false,
                        Cell: row => (<div>{(row.value.map(function(rol) { return rol.nombre; }).toString() === "" ) ? "Sin Rol" : row.value.map(function(rol) { return rol.nombre; }).toString()}</div>),
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
                            <Link to={"/usuarios/edit/"+row.value} className="btn btn-info" style={{marginRight: '10px'}}><i className="fa fa-pencil"/></Link>
                            <Link to={"/usuarios/delete/"+row.value} className="btn btn-danger"><i className="fa fa-trash-o"/></Link>
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
      items: state.usuarioReducer.usuarios
    }
  }
}

export default connect(mapStateToProps, {refreshListUsuario})(IUsuario)
