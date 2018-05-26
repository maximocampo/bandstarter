import React, {Component} from 'react';
import '../../stylesheets/signup.css';
import * as auth from '../../services/authService';
import {IndexNav} from '../IndexNav';

const styles = {
  card:{
    marginTop:'30px',
    width:'450px',
    height:'550px',
    borderStyle:'solid',
    borderWidth:'.5px',
    boxShadow:'none',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding:'20px 0 20px 0'
  }
}

class Login extends Component {
  state={
    user:{}
  };
  submitForm = e => {
    e.preventDefault();
    auth.login(this.state.user)
      .then(user=>{
        this.props.history.push('/');
      })
      .catch(e=>console.log(e));
  };

  formChange = e => {
    const user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({user})
  };

  componentWillMount(){
    if(localStorage.getItem('user')){
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <IndexNav/>
        <div className='container-form' style={{display:'flex',justifyContent:'center'}}>
        <div style={styles.card}>
          <ul>
            <li>
              <label htmlFor="email">EMAIL</label><br/>
              <input onChange={this.formChange} name="email" type="email"/>
            </li>
            <li>
              <label htmlFor="password">PASSWORD</label><br/>
              <input onChange={this.formChange} name="password" type="password"/>
            </li>
            <li>
              <button className='submit' onClick={this.submitForm}>LOG IN</button>
            </li>

          </ul>
        </div>
        </div>
      </div>
    );
  }
};

export default Login;