import React from 'react'
import Menu from './Menu'
import Toolbar from './Toolbar'
import IPolitica from '../politicasModule/IPolitica'
import IPoliticaForm from '../politicasModule/IPoliticaForm'
import IPoliticaDelete from '../politicasModule/IPoliticaDelete'
import IConciliacion from '../conciliacionesModule/IConciliacion'
import IConciliacionForm from '../conciliacionesModule/IConciliacionForm'
import IConciliacionDelete from '../conciliacionesModule/IConciliacionDelete'
import IEscenario from '../escenariosModule/IEscenario'
import IEscenarioForm from '../escenariosModule/IEscenarioForm'
import IEscenarioDelete from '../escenariosModule/IEscenarioDelete'
import Loading from '../politicasModule/Loading.js'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { relogin } from '../actions/Actions'

class AdminThemplete extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.relogin()
  }

  render(){
    console.log("Params ==>>>")
    console.log(this.props.params)
    return(
      <div data-reactroot="" className="container-fluid">
          <Choose>
            <When condition={this.props.load}>
                <Toolbar/>
                <If condition={this.props.location.pathname.substr(1,9) == 'politicas'}>
                  <Choose>
                    <When condition={this.props.params.idpolitica}>
                      <IPoliticaForm registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idpoliticadelete}>
                      <IPoliticaDelete registro={this.props.params}/>
                    </When>
                    <Otherwise>
                      <IPoliticaForm/>
                      <IPolitica/>
                    </Otherwise>
                  </Choose>
                </If>
                <If condition={this.props.location.pathname.substr(1,14) == 'conciliaciones'}>
                  <Choose>
                    <When condition={this.props.params.idconciliacion}>
                      <IConciliacionForm registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idconciliaciondelete}>
                      <IConciliacionDelete registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idpolitica}>
                      <IConciliacion registro={this.props.params.idpolitica}/>
                    </When>
                    <Otherwise>
                      <IConciliacionForm/>
                      <IConciliacion/>
                    </Otherwise>
                  </Choose>
                </If>
                <If condition={this.props.location.pathname.substr(1,10) == 'escenarios'}>
                  <Choose>
                    <When condition={this.props.params.idescenario}>
                      <IEscenarioForm registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idescenariodelete}>
                      <IEscenarioDelete registro={this.props.params}/>
                    </When>
                    <When condition={this.props.params.idescenario}>
                      <IEscenario registro={this.props.params.idescenario}/>
                    </When>
                    <Otherwise>
                      <IEscenarioForm/>
                      <IEscenario/>
                    </Otherwise>
                  </Choose>
                </If>
            </When>
            <Otherwise>
              <Loading/>
            </Otherwise>
          </Choose>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    load : state.loginReducer.load,
    profile : state.loginReducer.profile
  }
}

export default connect(mapStateToProps,{ relogin })(AdminThemplete);
