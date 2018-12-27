import 'babel-polyfill'
import React from 'react'
import Toolbar from './Toolbar'


import IModal from '../IModal'
import Loading from '../politicasModule/Loading.js'
import { connect } from 'react-redux'
import { relogin } from '../actions/Actions'
import { ToastContainer, toast } from 'react-toastify';
import '!style-loader!css-loader!react-toastify/../../resources/css/ReactToastify.css';

import { mostrarModal,ocultarModal } from '../actions/Actions';

// Valor en milisiegundos del intervalo de revisión para autoLogout
const CHECK_INTERVAL = 60000;
const STORE_KEY =  'lastAction';

class AdminThemplete extends React.Component{

  constructor(props){
    super(props)
    this.check();
    this.initListener();
    this.initInterval();
  }

  getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }

  setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    //document.body.addEventListener('mouseover',()=> this.reset());
    //document.body.addEventListener('mouseout',() => this.reset());
    document.body.addEventListener('keydown',() => this.reset());
    document.body.addEventListener('keyup',() => this.reset());
    document.body.addEventListener('keypress',() => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
    this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    // Valor límite en minutos para autoLogout
    const MINUTES_UNITL_AUTO_LOGOUT = parseInt(window.localStorage.getItem("tiempoexpirasesion"))-1
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;
    //console.log("LocalStore" + window.localStorage.getItem("tiempoexpirasesion"));
    //console.log("Minutos para Expirar " + MINUTES_UNITL_AUTO_LOGOUT);
    //console.log("timeleft " + timeleft);
    //console.log("Diferencia " + diff);
    //console.log("Booleano " + isTimeout);
    if (isTimeout) {

      // Call here logout function, expire session
      localStorage.clear();
      window.location = '/';
    }
  }

  componentWillMount(){
    this.props.relogin()
  }

  mostrarModal() {
    this.props.mostrarModal()
  }

  ocultarModal(){
    this.props.ocultarModal()
  }

  render(){
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { doSomething: this.doSomething })
    );

    return(
      <div data-reactroot="" className="container-fluid">
          <ToastContainer modal={true} zIndex={9999} hideProgressBar={true} autoClose={5000}/>
          <IModal/>
          <Choose>
            <When condition={this.props.load}>
                <Toolbar/>
                {childrenWithProps} 
            </When>
            <Otherwise>
              <Loading/>
            </Otherwise>
          </Choose>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    load : state.loginReducer.load,
    profile : state.loginReducer.profile,
    showmodal : state.loginReducer.showmodal
  }
}

export default connect(mapStateToProps,{
  relogin, mostrarModal, ocultarModal
})(AdminThemplete);
