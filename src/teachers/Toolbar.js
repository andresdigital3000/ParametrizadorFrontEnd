import React from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'
import { logout, getLinkResultados } from '../actions/Actions'
import AdministracionMenu from './AdministracionMenu'
import EjecutorMenu from './EjecutorMenu'
import ConsultaMenu from './ConsultaMenu'

class Toolbar extends React.Component{
  constructor(props){
    super(props)
  }

  logout(e){
    e.preventDefault()
    //this.props.logout()
    localStorage.clear();
    browserHistory.push('/');
  }

  componentWillMount(){
    this.props.getLinkResultados();
  }

  render(){
    let linkRes = this.props.urlresultados
    let username = window.localStorage.getItem("nombreUsuario")
    let userrolname = window.localStorage.getItem("userrolname")

    return(
      <nav className="navbar navigation navbar-expand-lg">
          <a className="logo" href="#">Claro</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="main--menu navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav navigation-nav mr-auto">
              {(() => {
                switch(userrolname) {
                  case "Consultor":
                    return <ConsultaMenu linkRes={linkRes}/>;
                  case "Ejecutor":
                    return <EjecutorMenu />;
                  case "Administrador":
                    return <div> <AdministracionMenu /> <EjecutorMenu /> <ConsultaMenu linkRes={linkRes}/> </div>;
                  default:
                    return null;
                }
              })()}

              <li className="nav-item">
                <a href="#" className="nav-link"  onClick={this.logout.bind(this)}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-power-off"/>
                </a>
              </li>
            </ul>
          </div>

          <div className="user-tittle hide" >
            <p>{(userrolname === "null") ? "Sin Rol Asignado" : userrolname} &nbsp;&nbsp; {username}</p>
          </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      profile: state.loginReducer.profile,
      urlresultados: state.loginReducer.urlResultados
    }
}

export default connect(mapStateToProps, {
  logout, getLinkResultados
})(Toolbar)
