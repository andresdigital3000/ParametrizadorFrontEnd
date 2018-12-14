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
    let userrol = window.localStorage.getItem("userrol")
    let userrolname = window.localStorage.getItem("userrolname")

    return(
      <nav className="navbar navigation navbar-expand-lg">
          <a className="logo" href="#">Claro</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="main--menu navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav navigation-nav mr-auto">
<<<<<<< HEAD

            {(() => {
              switch(userrol) {
                case "1":
                  return <ConsultaMenu linkRes={linkRes}/>;
                case "2":
                  return <EjecutorMenu />;
                case "3":
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

=======
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Administrativo
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link onClick={this.forceUpdate} to="/politicas" className="dropdown-item">Políticas</Link>
                  <Link onClick={this.forceUpdate} to="/conciliaciones" className="dropdown-item">Conciliaciones</Link>
                  <Link onClick={this.forceUpdate} to="/escenarios" className="dropdown-item">Escenarios</Link>
                  <Link onClick={this.forceUpdate} to="/parametros" className="dropdown-item">Parámetros</Link>
                  <Link onClick={this.forceUpdate} to="/querys" className="dropdown-item">Queries</Link>
                  <Link onClick={this.forceUpdate} to="/uc" className="dropdown-item">Usuarios</Link>
                  <Link onClick={this.forceUpdate} to="/uc" className="dropdown-item">Roles</Link>
                  <Link onClick={this.forceUpdate} to="/uc" className="dropdown-item">Accesos</Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Ejecución
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
                  <Link onClick={this.forceUpdate} to="/ejecucion" className="dropdown-item">Conciliaciones</Link>
                  <Link onClick={this.forceUpdate} to="/resultados" className="dropdown-item">Aprobación de resultados</Link>

                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Consulta
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown3">
                  {
                    React.createElement('a',{href:linkRes,className:'dropdown-item'},'Resultados')
                  }
                  <Link onClick={this.forceUpdate} to="/indicadores" className="dropdown-item">Indicadores</Link>
                </div>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link"  onClick={this.logout.bind(this)}>
                    <i className="fa fa-power-off"/>
                </a>
              </li>
>>>>>>> origin/master
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
