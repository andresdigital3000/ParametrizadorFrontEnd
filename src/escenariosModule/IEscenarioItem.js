import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router';
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'

class IEscenarioItem extends React.Component{
  constructor(){
    super(...arguments)
  }

  render(){
    return(
          <tbody>
            {this.props.items.map(function(currentValue,index,array){
              return (
                <tr key={currentValue.id}>
                  <td title={"ID : "+currentValue.id}>
                    {currentValue.nombre}
                  </td>
                  <td>
                    {currentValue.descripcion}
                  </td>
                  <td>
                    {currentValue.id}
                  </td>
                  <td>
                    <Link to={"#"} className="btn btn-info">Link</Link>
                  </td>
                  <td>
                    <Link to={"#"} className="btn btn-info">Link</Link>
                  </td>
                  <td>
                    <div className="button-wrap">
                      <Link to={"/escenarios/edit/"+currentValue.id} className="btn btn-info">Editar</Link>
                    </div>
                    <div className="button-wrap">
                      <Link to={"/escenarios/delete/"+currentValue.id} className="btn btn-danger">Borrar</Link>
                    </div>
                  </td>
              </tr>
              );
            })}
        </tbody>
    )
  }
}

export default IEscenarioItem
