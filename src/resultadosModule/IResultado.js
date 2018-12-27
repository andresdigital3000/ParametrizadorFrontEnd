import React from 'react'
import { connect } from 'react-redux'
import { aprobarRenglonResultado, rechazarRenglonResultado,refreshListResultado,cargarComboConciliaciones, cambioConciliacionesResultado, cargarConciliacionesResultado } from '../actions/Actions';
import ReactTable from "react-table"

class IResultado extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    this.props.refreshListResultado()
  }

  aprobarRenglon(id){
    this.props.aprobarRenglonResultado(id)
  }

  rechazarRenglon(id){
    this.props.rechazarRenglonResultado(id)
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
                &nbsp;
              </div>
              <div className="col-sm-4">
                <center>
                  <h2>Resultados</h2>
                </center>
              </div>
              <div className="col-sm-4">
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
                      Header: "CONCILIACIÓN",
                      accessor: "codConciliacion",
                      filterMethod: (filter, row) =>
                          row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                  },
                  {
                    Header: "ESCENARIO",
                    accessor: "codEscenario",
                    filterMethod: (filter, row) =>
                        row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                  },
                  {
                    Header: "ESTADO",
                    accessor: "estado",
                    filterMethod: (filter, row) =>
                        row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                  },
                  {
                    Header: "FECHA INICIO",
                    accessor: "fecInicio",
                    filterMethod: (filter, row) =>
                        row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                  },
                  {
                    Header: "FECHA FIN",
                    accessor: "fecFin",
                    filterMethod: (filter, row) =>
                        row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
                  },
                  {
                    Header: "VALOR BENEFICIO",
                    accessor: "valBeneficio",
                    filterMethod: (filter, row) =>
                      new String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())
                  },
                  {
                    Header: "VALOR INCONSISTENCIAS",
                    accessor: "valInconsistencias",
                    filterMethod: (filter, row) =>
                      new String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())
                  },
                  {
                    Header: "VALOR INCONSISTENCIAS MES ANTERIOR",
                    accessor: "valInconsistenciasMesAnt",
                    filterMethod: (filter, row) =>
                      new String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())
                  },
                  {
                    Header: "VALOR PQR",
                    accessor: "valPqr",
                    filterMethod: (filter, row) =>
                      new String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())
                  },
                  {
                    Header: "VALOR REINCIDENCIAS",
                    accessor: "valReincidencias",
                    filterMethod: (filter, row) =>
                        new String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())
                  },
                  {
                    Header: "ACCIONES",
                    accessor: 'id',
                    filterable: false,
                    sortable: false,
                    Cell: row => (
                        <div style={{textAlign: 'center'}}>
                          <a title="Aprobar" href="#" onClick={this.aprobarRenglon.bind(this,row.value)} className="btn btn-info" style={{marginRight: '10px'}}><i className="fa fa-check"/></a>
                          <a title="Rechazar" href="#" onClick={this.rechazarRenglon.bind(this,row.value)} className="btn btn-danger"><i className="fa fa-close"/></a>
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
      conciliacion: state.resultadoReducer.conciliacion,
      conciliaciones: state.resultadoReducer.conciliaciones,
      items: state.resultadoReducer.resultados
    }
  }
}

export default connect (mapStateToProps,{
  aprobarRenglonResultado, rechazarRenglonResultado, refreshListResultado, cambioConciliacionesResultado, cargarConciliacionesResultado
})(IResultado)
