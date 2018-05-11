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
      //console.log("Props en IPoliticaList registro undefined==>")
      //console.log(this.props)
      //Listado completo
      this.props.refreshListPolitica()
    }else{
      //console.log("Props en IPoliticaList registro existente ==>")
      //console.log(this.props)
      //Mostrar una politica que viniendo desde la pantalla de conciliaciones
      this.props.refreshListPolitica(this.props.registro)
    }
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
