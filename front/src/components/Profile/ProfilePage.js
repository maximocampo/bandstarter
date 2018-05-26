import React, { Component } from 'react';
import '../../stylesheets/profile.css'
import { IndexNav } from '../IndexNav'
import { UserInfo } from "./UserInfo";
import { addTrack } from '../../services/firebase'

import * as auth from "../../services/authService";

class ProfilePage extends Component {
  state = {
    user:{},
    menu: false,
    logged: false,
    tab: '1',
    file: ''
  };

  fileUpload = () => {
    addTrack(this.state.file)
  };

  fileSelect = e => {
    this.setState({file:e.target.files[0]});
  };

  tabChange = e => {
    this.setState({tab:e.target.id})
  };

  logout = e => {
    auth.logout()
      .then(() => {
        this.props.history.push('/');
      })
      .catch(e => console.log(e));
  };

  openMenu = () => {
    this.setState({menu: !this.state.menu});
  };

  componentWillMount() {
    if (localStorage.getItem('user')) {
      this.setState({user:JSON.parse(localStorage.getItem('user')),logged:true});
    }
  }

  render() {
    const {user} = this.state;
    return (
      <div>
        <IndexNav logged={this.state.logged} openMenu={this.openMenu} menu={this.state.menu} logout={this.logout} profile={true}/>
        <div className='profile-container'>
          <UserInfo edit={this.edit} user={user}/>
          <div className='tabs'>
            <ul className='tab-container'>
              <li onClick={this.tabChange} className='tab tab-unselected' id='1'>
                Tracks
                {this.state.tab === '1' && <hr style={{width:'100%'}}/>}
              </li>
              <li onClick={this.tabChange} className='tab tab-unselected' id='2'>
                Friends
                {this.state.tab === '2' && <hr style={{width:'100%'}}/>}
              </li>
            </ul>
          <div className='tab-content'>
          {this.state.tab === '1' &&<div>Item One</div>}
          {this.state.tab === '2' && <div>Item Two</div>}
          </div>
            <input type="file" onChange={this.fileSelect}/>
            <button style={{height:'100px',width:'100px'}} onClick={this.fileUpload}>submit</button>
          </div>
        </div>
      </div>
    );
  };
}
export default ProfilePage;