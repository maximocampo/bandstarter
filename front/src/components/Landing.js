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

  inputChange = e => {
    this.setState({query:e.target.value});
    auth.searchQuery({query:this.state.query})
      .then(searchResults=>{
        return this.setState({searchResults});
      })
      .catch(e=>console.log(e));
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
          <IndexNav
            logged={this.state.logged}
            openMenu={this.openMenu}
            menu={this.state.menu}
            logout={this.logout}
            color='black'
            inputChange={this.inputChange}/>
          :
          <IndexNav
            logged={this.state.logged}
            openMenu={this.openMenu}
            menu={this.state.menu}
            logout={this.logout}
            color='white'
            landing={true}/>
        }
        {!this.state.logged &&
        <div>
          <img className='cover-image' src="http://res.cloudinary.com/maximo/image/upload/v1527286515/image8.jpg" alt="google maps image"/>
          <div className='header'>
            <h1>FIND MUSICIANS.<br/> MAKE A BAND.</h1>
          </div>
        </div>}
        {this.state.query === '' ?
          <section className='like-you'>
            <h1>MUSICIANS LIKE YOU<br/>ALL AROUND THE GLOBE</h1>
          </section>
          :
          <section>
            {this.state.searchResults.map((result,i)=>{
              return (
                <div key={i}>
                  <h1>{result.name}</h1>
                  <Link to={`profile/${result._id}`}>Go to Profile</Link>
                </div>
              )
            })}
          </section>

        }

      </div>
    )
  }
};

export default Landing;