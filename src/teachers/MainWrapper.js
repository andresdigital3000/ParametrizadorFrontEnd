import React from 'react'

class MainWrapper extends React.Component{
  render(){
    return(
      <div id="content_wrapper">
        <section id="content">
          {this.props.children}
        </section>
      </div>
    )
  }
}
export default MainWrapper
