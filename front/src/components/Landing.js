import React, { Component } from 'react';
import '../stylesheets/landing.css'
import {IndexNav} from './IndexNav'
import * as auth from '../services/authService';
import { Link } from 'react-router-dom'

class Landing extends Component {
 state = {
   menu: false,
   logged:false,
   query:'',
   searchResults:[]
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
      this.setState({logged:true})
    }
  }

  render() {
    return (
      <div>
        {this.state.logged ?
          <div>
            <IndexNav
              place='home'
              logout={this.logout}
            />
            <div className='background__container'>
              <img className='background__img' src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/landing-fondo1.png?alt=media&token=3faceaaf-058f-4723-95fb-a20458119a5b"/>
            </div>
            <div>
              <img src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/Feedcopy%202.png?alt=media&token=3357c49e-3c6f-4186-b113-c850111a5e5f" alt=""/>
            </div>
          </div>
          :
          <div>
            <div className='background__container'>
             <img className='background__img' src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/landing-fondo1.png?alt=media&token=3faceaaf-058f-4723-95fb-a20458119a5b"/>
            </div>
            <div className='landingtext__container'>
              <div style={{width:'50%',paddingTop:'5%'}}>
                <img style={{width:'100%'}} src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/logoblanco.png?alt=media&token=1b795e35-39b1-49f6-af30-40c2cc11b364"/>
                <h1 style={{color:'white', fontSize:'24px', margin:'0'}}>FIND MUSICIANS. MAKE A BAND.</h1>
              </div>
              <div style={{display:'flex',justifyContent:'space-around', width:'30%',paddingTop:'80px'}}>
                <Link to='/login'><h3 style={{color:'white', fontWeight:'270',fontSize:'18px', margin:'0'}}>Log In</h3></Link>
                <Link to='/signup'><h3 style={{color:'white', fontWeight:'270',fontSize:'18px', margin:'0'}}>Register</h3></Link>
              </div>
            </div>

          </div>
        }

      </div>
    )
  }
};

export default Landing;
