import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IPoliticaItem from './IPoliticaItem'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListPolitica } from '../actions/Actions';


class IPoliticaList extends React.Component{
  constructor(){
    super(...arguments)
  }

  //Seccion de listar politicas
  componentWillMount(){
    this.props.refreshListPolitica()
  }
  //Fin seccion Politicas

  editarRegistro(e){
    this.props.editarRegistro(e.target.name)
  }

  render(){
    return(
          <div className="table-continer">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                    <th>
                      NOMBRE
                    </th>
                    <th>
                      DESCRIPCION
                    </th>
                    <th>
                      OBJETIVO
                    </th>
                    <th>
                      CONCILIACION
                    </th>
                    <th>
                      ACCIONES
                    </th>
                </tr>
              </thead>
              <IPoliticaItem items={this.props.state.politicas}/>
            </table>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      politicas: state.politicaReducer.politicas
    }
  }
}
export default connect (mapStateToProps,{
  refreshListPolitica
})(IPoliticaList)
