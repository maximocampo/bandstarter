import React, {Component} from 'react';
import '../../stylesheets/signup.css';
import * as auth from '../../services/authService';
import {IndexNav} from '../IndexNav';

const styles = {
  card:{
    marginTop:'30px',
    width:'450px',
    height:'550px',
    boxShadow:'none',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding:'20px 0 20px 0',
  }
};

class Signup extends Component {
  state={
    newUser:{}
  };
  submitForm = e => {
    e.preventDefault();
    auth.signup(this.state.newUser)
      .then(user=>{
        this.props.history.push('/');
      })
      .catch(e=>console.log(e));
  };

  formChange = e => {
    const newUser = this.state.newUser;
    newUser[e.target.name] = e.target.value;
    this.setState({newUser});
  };

  componentWillMount(){
    if(localStorage.getItem('user')){
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div style={{height: '100vh',overflow: 'hidden'}}>
        <div style={{height:'100%',overflow:'hidden',position:'absolute',zIndex:'-1'}}>
          <img style={{width:'120%'}} src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/landing-fondo1.png?alt=media&token=3faceaaf-058f-4723-95fb-a20458119a5b"/>
        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
        <div style={styles.card}>
          <ul>
            <li>
              <label htmlFor="name">username</label><br/>
              <input onChange={this.formChange} name="name" type="text"/>
            </li>
            <li>
              <label htmlFor="email">email</label><br/>
              <input onChange={this.formChange} name="email" type="email"/>
            </li>
            <li>
              <label htmlFor="password">password</label><br/>
              <input onChange={this.formChange} name="password" type="password"/>
            </li>
            <li>
              <button className='submit' onClick={this.submitForm}>SIGN UP</button>
            </li>
          </ul>
        </div>
        </div>
      </div>
    );
  }
};

export default Signup;