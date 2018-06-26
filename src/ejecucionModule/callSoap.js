import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { cargarComboConciliaciones, updateEjecucion } from '../actions/Actions';
//import tinysoap from 'tinysoap'

class callSoap extends React.Component{
    constructor(props){
      super(props)
      this.state = {result: ''}
      this.callWebservice = this.callWebservice.bind(this);
    }

    callWebservice(){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST','http://localhost:83/odiMockup',true);

      //Construir peticion SOAP
      var sr = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:odi="xmlns.oracle.com/odi/OdiInvoke/">'+
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
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
          if(xmlhttp.status == 200) {
            alert('Response : '+xmlhttp.response)
            result : xmlhttp.response.text
          }
        }
      }
      xmlhttp.setRequestHeader('Content-Type','text/html')
      xmlhttp.send(sr)
    }

    render(){
        return(
          <div className="container">
              <div className="form-wrapper">
                <input type="button" onClick={this.callWebservice} value="Iniciar Ejecución"/>
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
})(callSoap)
