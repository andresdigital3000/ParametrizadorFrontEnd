import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, browserHistory, IndexRoute } from "react-router"
import { Link } from 'react-router'
import { connect } from 'react-redux'

class IModal extends React.Component{

  ocultarModal(){
    $('#modalLoad').modal('hide')
  }

  render(){
    return(
      <div className="modal fade" id="modalLoad" name="modalLoad" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="modalloadTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="modalloadTitle">Esperando Respuesta del Servidor ...</h4>
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

export default IModal;
