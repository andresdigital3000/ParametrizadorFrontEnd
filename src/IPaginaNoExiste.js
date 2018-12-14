import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, browserHistory, IndexRoute } from "react-router";

class IPaginaNoExiste extends React.Component{
  constructor(){
    super(...arguments)
  }

  render(){
    return(
        <div  align="center" className="container">
          <div className="form-wrapper">
            <h3>Recurso No Encontrado!</h3>
            <img src="./resources/img/noFound2.gif" width="600px" height="500px"/>
          </div>
        </div>
    )
  }
}

export default IPaginaNoExiste
