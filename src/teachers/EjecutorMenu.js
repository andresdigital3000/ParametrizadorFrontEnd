import React from 'react'
import { browserHistory,Link } from 'react-router'
import { connect } from 'react-redux'
import { logout, getLinkResultados } from '../actions/Actions'


class EjecutorMenu extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            &nbsp;&nbsp;Ejecución&nbsp;&nbsp;
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
            <Link to="/ejecucion" className="dropdown-item">Conciliaciones</Link>
            <Link to="/resultados" className="dropdown-item">Aprobación de resultados</Link>
          </div>
        </li>
    )
  }
}

export default EjecutorMenu;
