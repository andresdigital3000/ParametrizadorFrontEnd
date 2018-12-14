import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router';
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListQuery, cargarComboEscenariosEnQuerys, calculaPaginadorQuerys,cargarConciliacionesQuery  } from '../actions/Actions';

class IQueryItem extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    //this.props.cargarComboEscenariosEnQuerys()
    //this.props.cargarConciliacionesQuery()
    this.props.calculaPaginadorQuerys()
  }

  render(){
    return(
          <tbody>
            {this.props.state.items.map(function(currentValue,index,array){
              return (
                <tr key={currentValue.id}>
                  <td title={"ID : "+currentValue.id}>
                    {currentValue.nombreQuery}
                  </td>
                  <td>
                    {currentValue.query}
                  </td>
                  <td>
                    {currentValue.orden}
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
                    <If condition={currentValue.idEscenario!=undefined}>
                      <Link to={"/conciliaciones/"+currentValue.idEscenario}>{currentValue.nombreEscenario}</Link>
                    </If>
                    <If condition={currentValue.idEscenario==undefined}>
                      No tiene
                    </If>
                  </td>                
                  <td>
                    <div className="button-wrap">
                      <Link to={"/querys/edit/"+currentValue.id} className="btn btn-info"><i className="fa fa-list"/></Link>
                    </div>
                    <div className="button-wrap">
                      <Link to={"/querys/delete/"+currentValue.id} className="btn btn-danger"><i className="fa fa-trash-o"/></Link>
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
      items: state.queryReducer.querys
    }
  }
}

export default connect (mapStateToProps,{
  refreshListQuery, cargarComboEscenariosEnQuerys, calculaPaginadorQuerys, cargarConciliacionesQuery
})(IQueryItem)
