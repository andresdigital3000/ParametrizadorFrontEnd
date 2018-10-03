import React from 'react'
import { browserHistory,Link } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../actions/Actions'


class Toolbar extends React.Component{
  constructor(props){
    super(props)
  }

  logout(e){
    e.preventDefault()
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("username")
    this.props.logout()
    window.location = '/login';
  }
//Usando Estilos de Camilo Linea 25, unicamente es cambiar la palabra navbar que es el estilo original de bootstrap por navigation que es el estilo creado por camilo
//<nav className="navigation navbar-expand-lg">
//Linea 30 y 31
//<div className="main--menu navigation-collapse" id="navbarSupportedContent"><ul className="navigation-nav mr-auto">
  render(){
    return(
      <nav className="navbar navigation navbar-expand-lg">
          <a className="logo" href="#">Claro</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="main--menu navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav navigation-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Administrativo
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/politicas" className="dropdown-item">Políticas</Link>
                  <Link to="/conciliaciones" className="dropdown-item">Conciliaciones</Link>
                  <Link to="/escenarios" className="dropdown-item">Escenarios</Link>
                  <Link to="/parametros" className="dropdown-item">Parámetros</Link>
                  <Link to="/querys" className="dropdown-item">Queries</Link>
                  <Link to="/uc" className="dropdown-item">Usuarios</Link>
                  <Link to="/uc" className="dropdown-item">Roles</Link>
                  <Link to="/uc" className="dropdown-item">Accesos</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Ejecución
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
                  <Link to="/ejecucion" className="dropdown-item">Conciliaciones</Link>
                  <Link to="/ejecucione" className="dropdown-item">Escenarios</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Consulta
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown3">
                  <Link to="/uc" className="dropdown-item">Resultados</Link>
                  <Link to="/indicadores" className="dropdown-item">Indicadores</Link>
                </div>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link"  onClick={this.logout.bind(this)}>
                    <i className="fa fa-power-off"/>
                </a>
              </li>
            </ul>
          </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      profile: state.loginReducer.profile
    }
}

export default connect(mapStateToProps, {
  logout
})(Toolbar)
