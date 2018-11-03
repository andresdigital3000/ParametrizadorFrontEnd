import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { refreshListIndicador } from '../actions/Actions';

class IIndicadorItem extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    //console.log("PROPS IIndicadorItem...")
    //console.log(this.props)
  }

  render(){
    return(
          <tbody>
              {this.props.state.items.map(function(currentValue,index,array){
                return (
                  <tr key={currentValue.id}>
                    <td title={"ID : "+currentValue.id}>
                      {currentValue.nombreFormula}
                    </td>
                    <td>
                      {currentValue.descripcion}
                    </td>
                    <td>
                      {currentValue.textoFormula}
                    </td>
                    <td>
                      <If condition={currentValue.idEscenario!=0}>
                          <Link to={"/escenarios/list/"+currentValue.idEscenario}>{currentValue.nombreEscenario}</Link>
                      </If>
                      <If condition={currentValue.idEscenario==0}>
                          No tiene
                      </If>
                    </td>
                    <td>
                      <div className="button-wrap">
                        <Link to={"/indicadores/edit/"+currentValue.id} className="btn btn-info"><i className="fa fa-list"/></Link>
                      </div>
                      <div className="button-wrap">
                        <Link to={"/indicadores/delete/"+currentValue.id} className="btn btn-danger"><i className="fa fa-trash-o"/></Link>
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
      items: state.indicadorReducer.indicadores
    }
  }
}

export default connect (mapStateToProps,{
  refreshListIndicador
})(IIndicadorItem)
