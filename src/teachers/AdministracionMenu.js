import React from 'react'
import { browserHistory,Link } from 'react-router'
import { connect } from 'react-redux'
import { logout, getLinkResultados } from '../actions/Actions'


class AdministracionMenu extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  &nbsp;&nbsp;Administrativo&nbsp;&nbsp;
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/politicas" className="dropdown-item">Políticas</Link>
                  <Link to="/conciliaciones" className="dropdown-item">Conciliaciones</Link>
                  <Link to="/escenarios" className="dropdown-item">Escenarios</Link>
                  <Link to="/parametros" className="dropdown-item">Parámetros</Link>
                  <Link to="/querys" className="dropdown-item">Queries</Link>
                  <Link to="/usuarios" className="dropdown-item">Usuarios</Link>
                </div>
              </li>
    )
  }
}

export default AdministracionMenu;
