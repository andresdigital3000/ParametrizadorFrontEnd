import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IParametroItem from './IParametroItem'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListParametro } from '../actions/Actions';


class IParametroList extends React.Component{
  constructor(){
    super(...arguments)
  }

  //Seccion de listar parametros
  /*componentWillMount(){
    if(this.props.registro == undefined){
      this.props.refreshListParametro()
    }else{
      this.props.refreshListParametro(this.props.registro)
    }
  }*/

  render(){
    return(
        <div className="row">
          <If condition={Object.entries(this.props.state.parametros).length > 0}>
            <div className="table-container parameters-table">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                        <th>
                          PARÁMETRO
                        </th>
                        <th>
                          VALOR
                        </th>
                        <th>
                          DESCRIPCIÓN
                        </th>
                        <th>
                          TIPO
                        </th>
                        <th>
                          ACCIONES
                        </th>
                    </tr>
                  </thead>
                  <IParametroItem/>
                </table>
              </div>
          </div>
        </If>
        <If condition={Object.entries(this.props.state.parametros).length == 0}>
            <div className="alert alert-warning col-sm-12">No hay registros</div>
        </If>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      parametros: state.parametroReducer.parametros
    }
  }
}
export default connect (mapStateToProps,{
  refreshListParametro
})(IParametroList)
