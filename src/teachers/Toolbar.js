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

  render(){
    return(
      <nav className="navigation">
        <div className="container">
          <a className="logo" href="#">Claro</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="main--menu" id="navbarNavDropdown">
            <ul className="navigation-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  <i className="fa fa-home"/>
                  <span className="sr-only">
                    (current)
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <Link to="/politicas" className="nav-link">Políticas</Link>
              </li>
              <li className="nav-item">
                <Link to="/conciliaciones" className="nav-link">Conciliaciones</Link>
              </li>
              <li className="nav-item">
                <Link to="/escenarios" className="nav-link">Escenarios</Link>
              </li>
              <li className="nav-item">
                <Link to="/ejecucion" className="nav-link">Ejecución</Link>
              </li>
              <li className="nav-item">
                <Link to="/resultados" className="nav-link">Resultados</Link>
              </li>
              <li className="nav-item">
                <Link to="/indicadores" className="nav-link">Indicadores</Link>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link"  onClick={this.logout.bind(this)}>
                    <i className="fa fa-power-off"/>
                </a>
              </li>
            </ul>
          </div>
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
