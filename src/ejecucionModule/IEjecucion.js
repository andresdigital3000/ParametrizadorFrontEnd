import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { cargarComboConciliaciones, updateEjecucion } from '../actions/Actions';
import tinysoap from 'tinysoap'

class IEjecucion extends React.Component{
  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    this.props.cargarComboConciliaciones()
  }
  //Detecta cambios de estado
  handleInput(e){
    this.props.updateEjecucion(e.target.id, e.target.value)
  }

  //Ejecuta llamado a web service SOAP
  onClick(e){
    console.log("Se oprime el botón de ejecutar...")
  }

  callWebservice(){
    var xmlhttp = new XMLHttpRequest();
    //Construir peticion SOAP
    var sr = '<?xml version="1.0" encoding="utf-8"?>'+
              '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:odi="xmlns.oracle.com/odi/OdiInvoke/">'+
               '<soapenv:Header/>'+
               '<soapenv:Body>'+
                  '<odi:OdiStartLoadPlanRequest>'+
                     '<!--You may enter the following 2 items in any order-->'+
                     '<Credentials>'+
                        '<!--You may enter the following 3 items in any order-->'+
                        '<!--Optional:-->'+
                        '<OdiUser>TEST</OdiUser>'+
                        '<!--Optional:-->'+
                        '<OdiPassword>TEST</OdiPassword>'+
                        '<WorkRepository></WorkRepository>'+
                     '</Credentials>'+
                     '<StartLoadPlanRequest>'+
                        '<LoadPlanName>1</LoadPlanName>'+
                        '<Context>1</Context>'+
                        '<!--Optional:-->'+
                        '<Keywords></Keywords>'+
                        '<!--Optional:-->'+
                        '<LogLevel>6</LogLevel>'+
                        '<!--Zero or more repetitions:-->'+
                        '<LoadPlanStartupParameters>'+
                           '<!--You may enter the following 2 items in any order-->'+
                           '<Name></Name>'+
                           '<Value></Value>'+
                        '</LoadPlanStartupParameters>'+
                     '</StartLoadPlanRequest>'+
                  '</odi:OdiStartLoadPlanRequest>'+
               '</soapenv:Body>'+
            '</soapenv:Envelope>';
    if(xmlhttp){
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
          if(xmlhttp.status == 200) {
            alert('Response : '+xmlhttp.response);
            result : xmlhttp.response.text;
          }
        }
      }
      xmlhttp.open('POST','http://localhost:83/odiMockup',true);
      //xmlhttp.setRequestHeader('Content-Type','text/html');
      xmlhttp.send(sr);
    }else{
      alert('no existe el objeto xmlhttp');
    }
  }

  render(){
    return(
      <div className="container">
          <div className="form-wrapper">
            <header className="head-table">
              <div className="form-group">
                <div className="col-sm-12">
                  <center>
                      <h2>Ejecución</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="form-group">
              <label htmlFor='conciliacion'>Conciliación</label>
              <select id='conciliacion' className='form-control form-control-lg' value={JSON.stringify(this.props.state.conciliacion)} onChange={this.handleInput.bind(this)}>
                <option value=''>Seleccione una</option>
                {this.props.state.conciliaciones.map(function(currentValue,index,array){
                  return(
                    <option key={currentValue.id} value={JSON.stringify(currentValue)}>{currentValue.nombre}</option>
                  );
                })}
              </select>
              <small id="conciliacionHelp" className="form-text text-muted">conciliación para realizar el proceso</small>
            </div>
            <div className="form-group">
              <button id='ejecutar' className='btn btn-primary' onClick={this.callWebservice.bind(this)}>Ejecutar</button>&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/ejecucion/programar" className='btn btn-primary'>Programar Ejecución</Link>
            </div>
            <div className="form-group">
              <button id='cancelar' className='btn btn-primary'>Cancelar Proceso</button>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      conciliaciones : state.ejecucionReducer.conciliaciones,
      conciliacion : state.ejecucionReducer.conciliacion
    }
  }
}

export default connect (mapStateToProps,{
  cargarComboConciliaciones, updateEjecucion
})(IEjecucion)
