import React, { Component } from 'react';
import '../../stylesheets/profile.css'
import { IndexNav } from '../IndexNav'
import { UserInfo } from "./UserInfo";
import { addTrack } from '../../services/firebase'
import * as auth from "../../services/authService";
import {uploadFile} from "../../services/authService";

class ProfilePage extends Component {
  state = {
    user:{},
    menu: false,
    logged: false,
    tab: '1',
    file: ''
  };

  fileUpload = (whatfile) => {
    const fileurl = {};
    fileurl[whatfile] = 'https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/' + whatfile + '%2F' + this.state.file.name + '?alt=media&token=5ee0d32d-41e3-44c5-9131-d03fae9dcace';
    uploadFile(fileurl,this.state.user._id,whatfile)
      .then(user=>{
        return this.setState({user})
      })
      .catch(e=>console.log(e));
    addTrack(this.state.file,whatfile)
  };

  fileSelect = e => {
    console.log(e.target.files[0])
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
    if (!localStorage.getItem('user')) {
      console.log('not logged')
    }
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({user,logged:true});
  }

  render() {
    const {user} = this.state;
    return (
      <div>
        <IndexNav
          logged={this.state.logged}
          openMenu={this.openMenu}
          menu={this.state.menu}
          logout={this.logout}
          profile={true}/>
        <div className='profile-container'>
          <UserInfo user={this.state.user}/>
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
            {this.state.tab === '1' &&
              <div>
            {user ?
              this.state.user.snippets.map((snippet)=>{
              return <div><audio controls><source src={snippet} type="audio/wav"/></audio></div>
            })
              :
              <div><h1>You have no tracks</h1></div>
              }
              </div>
            }
          {this.state.tab === '2' && <div>Item Two</div>}
          </div>
          </div>

        </div>
        <input type="file" onChange={this.fileSelect}/>
        <button style={{height:'100px',width:'100px'}} onClick={()=>this.fileUpload('snippets')}>submit</button>
        <input type="file" onChange={this.fileSelect}/>
        <button style={{height:'100px',width:'100px'}} onClick={()=>this.fileUpload('profilePic')}>submit</button>
      </div>
    );
  };
}
export default ProfilePage;