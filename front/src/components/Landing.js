import React, { Component } from 'react';
import '../stylesheets/landing.css'
import {IndexNav} from './IndexNav'
import * as auth from '../services/authService';


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
      <div style={{height:'100vh',backgroundColor: 'black' }}>
        <div>
          {this.state.logged ?
            <IndexNav
              logged={true}
              openMenu={this.openMenu}
              menu={this.state.menu}
              logout={this.logout}
              color='black'/>
            :
            <IndexNav
              logged={false}
              openMenu={this.openMenu}
              menu={this.state.menu}
              logout={this.logout}
              color='white'
              landing={true}/>
          }
        </div>
        <div>
          <img width='100%' src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/Feedcopy%202.png?alt=media&token=f086f691-8e7b-4ae7-a60d-fa59e931aaf1" alt=""/>
        </div>
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