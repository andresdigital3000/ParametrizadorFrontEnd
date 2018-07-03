import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getStatusEjecucionConciliacion } from '../actions/Actions'

class IMsg extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    console.log("IMsg props....")
    console.log(this.props)
  }

  doConciliacion(){
    this.props.getStatusEjecucionConciliacion(this.props.accion)
  }

  render(){
    return(
      <div>
        <b>{this.props.mensaje}</b>
        <div>
          <div className="button-wrap">
            <button className="btn btn-danger" onClick={this.doConciliacion.bind(this)}>Si</button>&nbsp;&nbsp;&nbsp;
            <button className="btn btn-default">No</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      
    }
  }
}

export default connect (mapStateToProps,{
  getStatusEjecucionConciliacion
})(IMsg)
