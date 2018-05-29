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
      <div style={{height: '100vh',overflow: 'hidden'}}>
        {this.state.logged ?
          <div>
            <IndexNav
              logged={true}
              openMenu={this.openMenu}
              menu={this.state.menu}
              logout={this.logout}
              color='black'/>
            <div>
              <img width='100%' src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/Feedcopy%202.png?alt=media&token=f086f691-8e7b-4ae7-a60d-fa59e931aaf1" alt=""/>
            </div>
          </div>
          :
          <div>
            <div style={{height:'100%',overflow:'hidden',position:'absolute',zIndex:'-1'}}>
             <img style={{width:'120%'}} src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/landing-fondo1.png?alt=media&token=3faceaaf-058f-4723-95fb-a20458119a5b"/>
            </div>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',position:'absolute',height:'100vh',top: '0',left:'0'}}>
              <div style={{width:'50%',paddingTop:'190px'}}>
                <img style={{width:'100%'}} src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/logoblanco.png?alt=media&token=1b795e35-39b1-49f6-af30-40c2cc11b364"/>
                <h1 style={{color:'white', fontSize:'24px', margin:'0'}}>FIND MUSICIANS. MAKE A BAND.</h1>
              </div>
              <div style={{display:'flex',justifyContent:'center', width:'70%',paddingTop:'80px'}}>
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
//        <img src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/Feedcopy.png?alt=media&token=09b57b4a-70f5-4f18-8d0b-4ecaf598f603" width='100%'/>
//{this.state.logged ?
//  <IndexNav
//    logged={this.state.logged}
//    openMenu={this.openMenu}
//    menu={this.state.menu}
//    logout={this.logout}
//    color='black'/>
//  :
//  <IndexNav
//    logged={this.state.logged}
//    openMenu={this.openMenu}
//    menu={this.state.menu}
//    logout={this.logout}
//    color='white'
//    landing={true}/>
//}
//{!this.state.logged &&
//<div>
//  <img className='cover-image' src="http://res.cloudinary.com/maximo/image/upload/v1527286515/image8.jpg" alt="google maps image"/>
//  <div className='header'>
//    <h1>FIND MUSICIANS.<br/> MAKE A BAND.</h1>
//  </div>
//</div>
//}