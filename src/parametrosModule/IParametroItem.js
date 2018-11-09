import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { refreshListParametro } from '../actions/Actions';

class IParametroItem extends React.Component{
  constructor(){
    super(...arguments)
  }

  render(){
    return(
          <tbody>
              {this.props.state.items.map(function(currentValue,index,array){
                return (
                  <tr key={currentValue.id}>
                    <td title={"ID : "+currentValue.id}>
                      {currentValue.parametro}
                    </td>
                    <td>
                      {currentValue.valor}
                    </td>
                    <td>
                      {currentValue.descripcion}
                    </td>
                    <td>
                      {currentValue.tipo}
                    </td>
                    <td>
                      <div className="button-wrap">
                        <Link to={"/parametros/edit/"+currentValue.id} className="btn btn-info"><i className="fa fa-list"/></Link>
                      </div>
                      <div className="button-wrap">
                        <If condition={currentValue.tipo=="SISTEMA"}>
                          &nbsp;
                        </If>
                        <If condition={currentValue.tipo!="SISTEMA"}>
                          <Link to={"/parametros/delete/"+currentValue.id} className="btn btn-danger"><i className="fa fa-trash-o"/></Link>
                        </If>
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
      items: state.parametroReducer.parametros
    }
  }
}

export default connect (mapStateToProps,{
  refreshListParametro
})(IParametroItem)