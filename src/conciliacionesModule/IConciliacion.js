import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import IConciliacionList from './IConciliacionList'
import IConciliacionFinder from './IConciliacionFinder'
import IConciliacionPaginador from './IConciliacionPaginador'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { connect } from 'react-redux'
import { updPolitica,calculaPaginadorConciliaciones } from '../actions/Actions';

class IConciliacion extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    if(this.props.registro != undefined){
      this.props.updPolitica(this.props.registro)
    }else{
      this.props.updPolitica(0)
    }
  }

  componentDidMount(){
    this.props.calculaPaginadorConciliaciones()
  }

  render(){
    return(
        <div className="container">
          <header className="head-table">
            <div className="row">
                <br/>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <If condition={this.props.registro==undefined}>
                  <button className="btn btn-primary" data-toggle="modal" data-target="#modalAdd"><i className="fa fa-plus-circle"/> Adicionar</button>
                </If>
              </div>
              <div className="col-sm-4">
                <center>
                  <h2>Conciliaciones</h2>
                </center>
              </div>
              <div className="col-sm-4">
                  <If condition={this.props.registro==undefined}>
                      <IConciliacionFinder ref="buscador"/>
                  </If>
              </div>
            </div>
            <hr/>
            <IConciliacionList registro={this.props.registro}/>
            <hr/>
            <div className="row">
              <div className="col-sm-1">
              </div>
              <div className="col-sm-4">
                <center>
                  <IConciliacionPaginador/>
                </center>
              </div>
              <div className="col-sm-1">
              </div>
            </div>
          </header>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      politica: state.conciliacionReducer.politica
    }
  }
}

export default connect (mapStateToProps,{
  updPolitica, calculaPaginadorConciliaciones
})(IConciliacion)
