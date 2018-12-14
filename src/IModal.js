import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from './utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { mostrarModal, ocultarModal } from './actions/Actions';

class IModal extends React.Component{
  constructor(){
    super(...arguments)
  }

  mostrarModal(){
    this.props.mostrarModal()
  }

  ocultarModal(){
    this.props.ocultarModal()
  }

  render(){
    return(
      <div className="modal fade" id="modalMsg" role="dialog" aria-labelledby="modalMsg" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
              <div className="modal-header">
              <h5 className="modal-title" id="modalMsg">Transacción exitosa</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Cerrar" onClick={this.ocultarModal.bind(this)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  {this.props.state.mensaje}
                </p>
              </div>
              <div className="modal-footer">
                <button onClick={this.ocultarModal.bind(this)} data-dismiss="modal">Cerrar</button>
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
      showmodal : state.loginReducer.showmodal,
      tipomensaje : state.loginReducer.tipomensaje,
      mensaje : state.loginReducer.mensaje
    }
  }
}

export default connect (mapStateToProps,{
  mostrarModal, ocultarModal
})(IModal)
