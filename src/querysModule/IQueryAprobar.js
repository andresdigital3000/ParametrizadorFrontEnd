import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { cambioConciliacionesQuery, cargarConciliacionesQuery, rechazarConciliacion, aprobarConciliacion, updateFormAprobQuerys } from '../actions/Actions';
import update from 'react-addons-update'
import {  ToastContainer,  toast,  dismiss} from 'react-toastify';

class IQueryAprobar extends React.Component{
  constructor(){
    super(...arguments)
    this.state = {
      load: false,
      conciliacion: null,
      mensaje: ""
    }
  }

  componentWillMount(){
    APIInvoker.invokeGET(`/conciliaciones/${this.props.params.idconciliacion}`, response => {
      console.log("response", response)
      this.setState(update(this.state, {
        load: { $set: true},
        conciliacion: {$set: {
          id: response.id,
          name: response.nombrePolitica
        }}
      }))
    }, error => {
      toast.error("Error al cargar la página", {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
  }

  //Detecta cambios de estado en textbox
  handleInput(e){
    this.setState(update(this.state, {
      [e.target.name]: {$set: e.target.value}
    }))
  }

  cambioConciliacionesQuery(){
    this.props.cambioConciliacionesQuery()
  }

  aprobarRechazar(estado){

    let request = {
      idConciliacion: this.state.conciliacion.id,
      mensaje: this.state.mensaje,
      estadoAprobacion: estado,
      username: window.localStorage.getItem("nombreUsuario")
    }

    let message = estado == '0' ? 'rechazar' : 'aprobar'

    APIInvoker.invokePOST('/queryaprobacion', request, response => {
        if (response.nombreConciliacion != undefined) {
          toast.success(`Se ${message} los querys de la conciliación ${request.idConciliacion}` , {
            position: toast.POSITION.BOTTOM_RIGHT
          })
          browserHistory.push('/conciliaciones')
        } else {
            if (response.mensaje == "CTRAINT_UQ_TBL_GAI_QUERIES_ESCENARIOS_COD_ESCENARIO") {
                //console.log("Error :"+response.codigo+" "+response.mensaje+", "+response.descripcion)
                toast.error("Ya existe una aprobación igual", {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            } else {
                toast.error(`Error general al intentar ${message} queries de una conciliación`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        }
    }, error => {
        console.log(`No se ha podido crear el ${message} de queries para una conciliación`)
    })
  }

  render(){
    return(
      <div className="container">
        <div className="form-wrapper">
          <header className="head-table">
            <div className="form-group">
              <div className="col-sm-12">
                <center>
                    <h2>Aprobar Queries</h2>
                </center>
              </div>
            </div>
          </header>
          <div className="form-group">
            <label htmlFor='conciliacion'>Conciliación</label>
            <input type="text" className='form-control form-control-lg' disabled value={this.state.load ? `${this.state.conciliacion.id} : ${this.state.conciliacion.name}` : 'Cargando...'}/>
          </div>
          <div className="form-group">
            <label htmlFor='mensaje'>Mensaje</label>
            <div className="col-sm-12">
              <textarea id="mensaje" name="mensaje" rows="10" className='form-control form-control-lg' value={this.state.mensaje} onChange={this.handleInput.bind(this)}/>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-2">
                <Link to="/conciliaciones" className="btn btn-warning">Regresar</Link>
              </div>
              <div className="col-sm-6">
              </div>
              <div className="col-sm-2">
                <input type="button" className="btn btn-danger" value="No Aprobar" onClick={() => this.aprobarRechazar(0)}/>
              </div>
              <div className="col-sm-2">
                <input type="button" className="btn btn-success" value="Aprobar" onClick={() => this.aprobarRechazar(1)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      conciliacion : state.queryReducer.conciliacion,
      conciliaciones : state.queryReducer.conciliaciones,
      mensaje : state.queryReducer.mensaje
    }
  }
}
export default connect (mapStateToProps,{
  cambioConciliacionesQuery, cargarConciliacionesQuery, rechazarConciliacion, aprobarConciliacion, updateFormAprobQuerys
})(IQueryAprobar)
