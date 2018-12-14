import React from 'react'
import PropTypes from 'prop-types'
import APIInvoker from '../utils/APIInvoker'
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { updateFormEjecutarConciliaciones, salvarProgramacion } from '../actions/Actions';

class IProgramar extends React.Component{
  constructor(){
    super(...arguments)
  }

  //Detecta cambios de estado en los textbox
  handleInput(e){
    this.props.updateFormEjecutarConciliaciones(e.target.id, e.target.value)
  }

  grabarProgramacion(){
    this.props.salvarProgramacion()
  }
  render(){
    return(
      <div className="container">
          <div className="form-wrapper">
            <header className="head-table">
              <div className="form-group">
                <div className="col-sm-12">
                  <center>
                      <h2>Programar ejecución</h2>
                  </center>
                </div>
              </div>
            </header>
            <div className="form-group">
              
              <div className='row'>
                <div className='col-sm-5'>
                <label htmlFor='fechainicia'>Hora</label><br/>
                </div>
                <div className='col-sm-2'>
                &nbsp;:&nbsp;
                </div>
                <div className='col-sm-5'>
                <label htmlFor='fechainicia'>Minuto</label><br/>
                </div>
                <div className='col-sm-3'></div>
              </div>
              <div className='row'>
                <div className='col-sm-5'>
                  <select className='form-control' id='hora' value={this.props.state.hora} onChange={this.handleInput.bind(this)}>
                    <option value='0'>00</option>
                    <option value='1'>01</option>
                    <option value='2'>02</option>
                    <option value='3'>03</option>
                    <option value='4'>04</option>
                    <option value='5'>05</option>
                    <option value='6'>06</option>
                    <option value='7'>07</option>
                    <option value='8'>08</option>
                    <option value='9'>09</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                    <option value='21'>21</option>
                    <option value='22'>22</option>
                    <option value='23'>23</option>
                  </select>
                </div>
                <div className='col-sm-2'>
                  &nbsp;:&nbsp;
                </div>
                <div className='col-sm-5'>
                  <select className='form-control' id='minuto' value = {this.props.state.minuto} onChange={this.handleInput.bind(this)}>
                    <option value='0'>00</option>
                    <option value='1'>01</option>
                    <option value='2'>02</option>
                    <option value='3'>03</option>
                    <option value='4'>04</option>
                    <option value='5'>05</option>
                    <option value='6'>06</option>
                    <option value='7'>07</option>
                    <option value='8'>08</option>
                    <option value='9'>09</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                    <option value='13'>13</option>
                    <option value='14'>14</option>
                    <option value='15'>15</option>
                    <option value='16'>16</option>
                    <option value='17'>17</option>
                    <option value='18'>18</option>
                    <option value='19'>19</option>
                    <option value='20'>20</option>
                    <option value='21'>21</option>
                    <option value='22'>22</option>
                    <option value='23'>23</option>
                    <option value='24'>24</option>
                    <option value='25'>25</option>
                    <option value='26'>26</option>
                    <option value='27'>27</option>
                    <option value='28'>28</option>
                    <option value='29'>29</option>
                    <option value='30'>30</option>
                    <option value='31'>31</option>
                    <option value='32'>32</option>
                    <option value='33'>33</option>
                    <option value='34'>34</option>
                    <option value='35'>35</option>
                    <option value='36'>36</option>
                    <option value='37'>37</option>
                    <option value='38'>38</option>
                    <option value='39'>39</option>
                    <option value='40'>40</option>
                    <option value='41'>41</option>
                    <option value='42'>42</option>
                    <option value='43'>43</option>
                    <option value='44'>44</option>
                    <option value='45'>45</option>
                    <option value='46'>46</option>
                    <option value='47'>47</option>
                    <option value='48'>48</option>
                    <option value='49'>49</option>
                    <option value='50'>50</option>
                    <option value='51'>51</option>
                    <option value='52'>52</option>
                    <option value='53'>53</option>
                    <option value='54'>54</option>
                    <option value='55'>55</option>
                    <option value='56'>56</option>
                    <option value='57'>57</option>
                    <option value='58'>58</option>
                    <option value='59'>59</option>
                  </select>
                </div>
                <div className='col-sm-3'></div>
              </div>
              <small id="fechainiciaHelp" className="form-text text-muted">Seleccione hora y minuto de ejecución</small>
            </div>
            <div className="form-group">
              <label htmlFor='fechainicia'>Fecha:</label><br/>
              <div className='row'>
                <div className='col-sm-12'>
                  <input className='form-control' type='date' id='fecha' value={this.props.state.fecha} onChange={this.handleInput.bind(this)} />
                </div>
                <div className='col-sm-3'></div>
              </div>
              <small id="fechainiciaHelp" className="form-text text-muted">Fecha de ejecución</small>
            </div>
            <div className="form-group">
              <Link to="/ejecucion" className='btn btn-warning'>Regresar</Link>&nbsp;&nbsp;&nbsp;
              {
                this.props.state.fecha!='' ?
                <button className="btn btn-primary" onClick={this.grabarProgramacion.bind(this)}>Salvar</button> :
                <button className="btn btn-primary" disabled>Salvar</button>
              }
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      hora : state.ejecucionReducer.hora,
      minuto : state.ejecucionReducer.minuto,
      fecha : state.ejecucionReducer.fecha
    }
  }
}

export default connect (mapStateToProps,{
  updateFormEjecutarConciliaciones, salvarProgramacion
})(IProgramar)
