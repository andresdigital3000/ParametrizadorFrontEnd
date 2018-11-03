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
    if(this.props.registro == undefined){
      this.props.refreshListPolitica()
    }else{
      this.props.refreshListPolitica(this.props.registro)
    }
  }

  render(){
    return(
        <div className="row">
          <If condition={Object.entries(this.props.state.politicas).length > 0}>
            <div className="table-container">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                        <th>
                          CÓDIGO
                        </th>
                        <th>
                          NOMBRE
                        </th>
                        <th>
                          DESCRIPCIÓN
                        </th>
                        <th>
                          CONCILIACIÓN
                        </th>
                        <th>
                          ACCIONES
                        </th>
                    </tr>
                  </thead>
                  <IPoliticaItem/>
                </table>
              </div>
          </div>
        </If>
        <If condition={Object.entries(this.props.state.politicas).length == 0}>
            <div className="alert alert-warning col-sm-12">No hay registros</div>
        </If>
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
