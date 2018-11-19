import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router';
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { updConciliacion,refreshListEscenario, cargarComboConciliaciones, calculaPaginadorEscenarios  } from '../actions/Actions';

class IEscenarioItem extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    this.props.cargarComboConciliaciones()
    this.props.calculaPaginadorEscenarios()
  }

  render(){
    return(
          <tbody>
            {this.props.state.items.map(function(currentValue,index,array){
              return (
                <tr key={currentValue.id}>
                  <td title={"ID : "+currentValue.id}>
                    {currentValue.nombre}
                  </td>
                  <td>
                    {currentValue.descripcion}
                  </td>
                  <td>
                    {currentValue.impacto}
                  </td>
                  <td>
                    <If condition={currentValue.idConciliacion!=undefined}>
                      <Link to={"/conciliaciones/"+currentValue.idConciliacion}>{currentValue.nombreConciliacion}</Link>
                    </If>
                    <If condition={currentValue.idConciliacion==undefined}>
                      No tiene
                    </If>
                  </td>
                  <td>
                    <center>
                      <Link to={"/uc"}><i className="fa fa-file-text-o"/></Link>
                    </center>
                  </td>
                  <td>
                    <center>
                      <Link to={"/parametros/"+currentValue.id}><i className="fa fa-pencil-square-o"/></Link>
                    </center>
                  </td>
                  <td>
                    <div className="button-wrap">
                      <Link to={"/escenarios/edit/"+currentValue.id} className="btn btn-info"><i className="fa fa-list"/></Link>
                    </div>
                    <div className="button-wrap">
                      <Link to={"/escenarios/delete/"+currentValue.id} className="btn btn-danger"><i className="fa fa-trash-o"/></Link>
                    </div>
                  </td>
              </tr>
              );
            })}
        </tbody>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      items: state.escenarioReducer.escenarios
    }
  }
}

export default connect (mapStateToProps,{
  updConciliacion,refreshListEscenario, cargarComboConciliaciones, calculaPaginadorEscenarios
})(IEscenarioItem)
