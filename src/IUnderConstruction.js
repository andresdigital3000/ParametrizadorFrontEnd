import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, browserHistory, IndexRoute } from "react-router";

class IUnderConstruction extends React.Component{
  constructor(){
    super(...arguments)
  }

  render(){
    return(
        <div className="container">
          <div className="form-wrapper">
            <header className="head-table">
              <div className="row col-sm-6">
                <h3>En construcción!</h3>
                <img src="./resources/img/under.gif"/>
              </div>
            </header>
          </div>
        </div>
    )
  }
}

export default IUnderConstruction
