import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router';
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListConciliacion, cargarComboPoliticas, calculaPaginadorConciliaciones } from '../actions/Actions';

class IConciliacionItem extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    this.props.cargarComboPoliticas()
    this.props.calculaPaginadorConciliaciones()
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
                    <If condition={currentValue.idPolitica != 0}>
                      <Link to={"/politicas/"+currentValue.idPolitica}>{currentValue.nombrePolitica}</Link>
                    </If>
                    <If condition={currentValue.idPolitica == 0}>
                      No tiene
                    </If>
                  </td>
                  <td>
                    <center>
                      <Link to={"/uc"}><i className="fa fa-table"/></Link>
                    </center>
                  </td>
                  <td>
                    <center>
                      <Link to={"/escenarios/"+currentValue.id}><i className="fa fa-tasks"/></Link>
                    </center>
                  </td>
                  <td>
                    <div className="button-wrap">
                      <Link to={"/conciliaciones/edit/"+currentValue.id} className="btn btn-info"><i className="fa fa-list"/></Link>
                    </div>
                    <div className="button-wrap">
                      <Link to={"/conciliaciones/delete/"+currentValue.id} className="btn btn-danger"><i className="fa fa-trash-o"/></Link>
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
      items: state.conciliacionReducer.conciliaciones
    }
  }
}

export default connect (mapStateToProps,{
  refreshListConciliacion, cargarComboPoliticas, calculaPaginadorConciliaciones
})(IConciliacionItem)
