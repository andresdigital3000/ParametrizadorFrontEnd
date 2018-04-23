import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { navigation } from '../actions/Actions'

class Menu extends React.Component{

  navigateTo(nextPage){
    this.props.navigation(nextPage)
  }

  render(){
    return(
    <aside id="sidebar_left" className="nano nano-light affix sidebar-default has-scrollbar">
        Mostrando el menú
    </aside>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav
  }
}

export default connect(mapStateToProps, {navigation})(Menu)
