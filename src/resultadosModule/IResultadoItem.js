import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router';
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListResultado, cargarComboConciliaciones, calculaPaginadorResultados, aprobarRenglonResultado, rechazarRenglonResultado } from '../actions/Actions';

class IResultadoItem extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentDidMount(){
    this.props.calculaPaginadorResultados()
  }

  aprobarRenglon(id){
    console.log("SE APRUEBA ==>"+id)
    this.props.aprobarRenglonResultado(id)
  }

  rechazarRenglon(id){
    console.log("SE RECHAZA ==>"+id)
    this.props.rechazarRenglonResultado(id)
  }

  renderItem(){
    return (
    this.props.state.items.map((item,i) =>
    <tr key={i}>
      <td title={"ID : "+item.id}>
        {item.codConciliacion}
      </td>
      <td>
        {item.codEscenario}
      </td>
      <td>
        {item.estado}
      </td>
      <td>
        {item.fecInicio}
      </td>
      <td>
        {item.fecFin}
      </td>
      <td>
        {item.valBeneficio}
      </td>
      <td>
        {item.valInconsistencias}
      </td>
      <td>
        {item.valInconsistenciasMesAnt}
      </td>
      <td>
        {item.valPqr}
      </td>
      <td>
        {item.valReincidencias}
      </td>
      <td>
        <div className="button-wrap" title="Aprobar">
          <a href="#" onClick={this.aprobarRenglon.bind(this,item.id)} className="btn btn-info"><i className="fa fa-check"/></a>
        </div>
        <div className="button-wrap" title="Rechazar">
          <a href="#" onClick={this.rechazarRenglon.bind(this,item.id)} className="btn btn-danger"><i className="fa fa-close"/></a>
        </div>
      </td>
    </tr>))
  }

  render(){
    return(
        <tbody>
            {this.renderItem()}
        </tbody>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      items: state.resultadoReducer.resultados
    }
  }
}

export default connect (mapStateToProps,{
  refreshListResultado, cargarComboConciliaciones, calculaPaginadorResultados, aprobarRenglonResultado, rechazarRenglonResultado
})(IResultadoItem)
