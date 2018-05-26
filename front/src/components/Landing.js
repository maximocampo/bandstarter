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
        {this.state.logged ?
          <IndexNav logged={this.state.logged} openMenu={this.openMenu} menu={this.state.menu} logout={this.logout} color='black'/>
          :
          <IndexNav logged={this.state.logged} openMenu={this.openMenu} menu={this.state.menu} logout={this.logout} color='white' landing={true}/>
        }
        {!this.state.logged &&
        <div>
          <img className='cover-image' src="http://res.cloudinary.com/maximo/image/upload/v1527286515/image8.jpg" alt="google maps image"/>
          <div className='header'>
            <h1>FIND MUSICIANS.<br/> MAKE A BAND.</h1>
          </div>
        </div>}
        <section className='like-you'>
          <h1>MUSICIANS LIKE YOU<br/>ALL AROUND THE GLOBE</h1>
        </section>
      </div>
    )
  }
};

export default Landing;