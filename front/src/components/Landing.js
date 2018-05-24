import React, { Component } from 'react';
import '../stylesheets/landing.css'
import {IndexNav} from './IndexNav'
import * as auth from '../services/authService';

class Landing extends Component {
 state = {
   menu: false,
   logged:false
 };

 logout = e => {
    auth.logout()
      .then(()=>{
        this.props.history.push('/');
      })
      .catch(e=>console.log(e));
  };

  openMenu = () => {
    this.setState({menu:!this.state.menu});
  };

  componentWillMount(){
    if(localStorage.getItem('user')){
      this.state.logged = true
    }
  }

  render() {
    return (
      <div>
        <IndexNav logged={this.state.logged} openMenu={this.openMenu} menu={this.state.menu} logout={this.logout}/>
      </div>
    )
  }
};

export default Landing;