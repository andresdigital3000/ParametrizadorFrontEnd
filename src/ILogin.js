import React from 'react'
import update from 'react-addons-update'
import APIInvoker from './utils/APIInvoker'
import IModalRegister from './IModalRegister'
import IModal from './IModal'
import { ToastContainer, toast } from 'react-toastify';
import '!style-loader!css-loader!react-toastify/../../resources/css/ReactToastify.css';
import { link, Router } from 'react-router';
import { connect } from 'react-redux'
import { updateLoginForm, loginRequest } from './actions/Actions'

class ILogin extends React.Component{
  constructor(){
    super(...arguments)
  }

  handleInput(e){
      this.props.updateLoginForm(e.target.name, e.target.value)
  }

  login(e){
    e.preventDefault()
    this.props.loginRequest()
  }

  render(){
    return(
      <div className="LoginWrapper d-flex align-items-center justify-content-center clearfix">
        <div className="container">
        <ToastContainer modal={true} zIndex={9999} hideProgressBar={true} autoClose={5000}/>
        <IModal/>
        <IModalRegister/>
          <div className="row">
            <div className="col-xs-12">
            </div>
          </div>
          <div className="row-fluid">
            <div className="loginBox container-fluid">
              <img src="../resources/img/LogoClaro2017.png" width='80px'/>
						  <div className="title-login">Parametrizador</div>
              <form onSubmit={this.login.bind(this)}>
                <div className="row">
                  <div className="input-group">
                    <input type="text" value={this.props.username}
                      placeholder="Usuario"
                      name="username"
                      id="username"
                      autoComplete='off'
                      require="true"
                      autoFocus
                      onChange={this.handleInput.bind(this)} />
                    <label ref="usernameLabel" id="usernameLabel" htmlFor="username"></label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-group">
                    <input type="password" id="passwordLabel"
                      value={this.props.password}
                      placeholder="Contraseña"
                      name="password"
                      autoComplete='off'
                      require="true"
                      onChange={this.handleInput.bind(this)}/>
                    <label ref="passwordLabel" htmlFor="passwordLabel"></label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-group">
                    <select className="custom-select" id="dominio" name="dominio" onChange={this.handleInput.bind(this)}>
                      <option value="Claro">Claro</option>
                      <option value="Telmex">Telmex</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="input-group">
                    <button className="btn btn-danger" id="submitBtn" onClick={this.login.bind(this)}>Ingreso</button>
                  </div>
                </div>
                <div className="row">
                  <If condition={this.props.state.loginError}>
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <strong>{this.props.state.loginMessage}</strong>
                    </div>
                  </If>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    state: {
      username: state.loginFormReducer.username,
      password: state.loginFormReducer.password,
      loginError: state.loginFormReducer.loginError,
      loginMessage: state.loginFormReducer.loginMessage,
      dominio: state.loginFormReducer.dominio
    }
  }
}
export default connect (mapStateToProps,{
  updateLoginForm, loginRequest
})(ILogin)
