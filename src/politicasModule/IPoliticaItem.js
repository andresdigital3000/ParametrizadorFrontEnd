import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router';
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { refreshListPolitica } from '../actions/Actions';

class IPoliticaItem extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    console.log("PROPS IPoliticaItem...")
    console.log(this.props)
  }
  render(){
    return(
          <tbody>
              {this.props.state.items.map(function(currentValue,index,array){
                let id_conciliacion=0
                let nom_conciliacion="Ninguna"
                if(currentValue.conciliaciones[0]!=undefined){
                    id_conciliacion=currentValue.conciliaciones[0].id
                    nom_conciliacion=currentValue.conciliaciones[0].nombre
                }
                return (
                  <tr key={currentValue.id}>
                    <td title={"ID : "+currentValue.id}>
                      {currentValue.nombre}
                    </td>
                    <td>
                      {currentValue.descripcion}
                    </td>
                    <td>
                      {currentValue.objetivo}
                    </td>
                    <td>
                      <If condition={id_conciliacion!=0}>
                          <Link to={"/conciliaciones/"+id_conciliacion}>{nom_conciliacion}</Link>
                      </If>
                      <If condition={id_conciliacion==0}>
                          No tiene
                      </If>
                    </td>
                    <td>
                      <div className="button-wrap">
                        <Link to={"/politicas/edit/"+currentValue.id} className="btn btn-info"><i className="fa fa-list"/></Link>
                      </div>
                      <div className="button-wrap">
                        <Link to={"/politicas/delete/"+currentValue.id} className="btn btn-danger"><i className="fa fa-trash-o"/></Link>
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
      items: state.politicaReducer.politicas
    }
  }
}

export default connect (mapStateToProps,{
  refreshListPolitica
})(IPoliticaItem)
