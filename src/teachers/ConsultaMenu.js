import React from 'react'
import { browserHistory,Link } from 'react-router'
import { connect } from 'react-redux'
import { logout, getLinkResultados } from '../actions/Actions'


class ConsultaMenu extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            &nbsp;&nbsp;Consulta&nbsp;&nbsp;
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown3">
            {
              React.createElement('a',{href:this.props.linkRes,className:'dropdown-item'},'Resultados')
            }
            <Link to="/indicadores" className="dropdown-item">Indicadores</Link>
          </div>
        </li>
    )
  }
}

export default ConsultaMenu;
