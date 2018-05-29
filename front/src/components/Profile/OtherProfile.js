import React, { Component } from 'react';
import '../../stylesheets/profile.css'
import { IndexNav } from '../IndexNav'
import UserInfo from "./UserInfo";
import * as auth from "../../services/authService";
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import {addTrack} from "../../services/firebase";
import {uploadFile} from "../../services/authService";

class OtherProfile extends Component {
  state = {
    user:{},
    menu: false,
    tab: '0',
    modalOpen:false,
    requestTrack:'',
    file:'',
    fileurl:''
  };

  mergeTracks = () => {
    let track1 = document.getElementById('track1');
    let track2 = document.getElementById('track2');

    track1.play();
    track2.play()
  };

  fileUpload = (whatfile) => {
    const fileurl = 'https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/snippets%2F' + this.state.file.name + '?alt=media&token=5ee0d32d-41e3-44c5-9131-d03fae9dcace';
    addTrack(this.state.file,'snippets');
    setTimeout(()=>this.setState({fileurl}),5000)
  };

  fileSelect = e => {
    this.setState({file:e.target.files[0]});
  };

  openCloseModal = () => {
    this.setState({modalOpen:!this.state.modalOpen})
  };

  snippetCollabModal = snippet => {
    this.setState({fileurl:''});
    this.setState({requestTrack:snippet});
    this.setState({modalOpen:!this.state.modalOpen})
  };

  noCollabModal = () => {
    this.setState({requestTrack:''});
    this.setState({modalOpen:!this.state.modalOpen})
  };

  sendRequest = id => {
    const body = {
      from:JSON.parse(localStorage.getItem('user'))._id,
      snippet1:this.state.requestTrack,
      snippet2:this.state.fileurl,
      notes:document.getElementById('notes').value
    };
    console.log(body);
  auth.sendRequest(id,body)
    .then(user=>{
      return console.log(user)
    })
    .catch(e=>console.log(e));
    this.setState({modalOpen:!this.state.modalOpen})
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

  componentDidMount(){
    auth.getUser(this.props.match.params.id)
      .then(user=>this.setState({user}))
      .catch(e=>console.log(e));
  }

  render() {
    const {user} = this.state;
    return (
      <div>
        <IndexNav
          logged={true}
          openMenu={this.openMenu}
          menu={this.state.menu}
          logout={this.logout}
          profile={true}/>
        <div className='profile-container'>
          <UserInfo user={user}/>
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
            <button className='profile__button--request' onClick={this.noCollabModal}>SEND REQUEST (WITHOUT COLLABORATION)</button>
            <div className='tab-content'>
              {this.state.tab === '1' &&
              this.state.user.snippets.map((snippet,i)=>{
                return (
                  <div>
                    <audio controls><source key={i} src={snippet} type="audio/wav"/></audio>
                    <button className='profile__button--request' onClick={()=>this.snippetCollabModal(snippet)}>SEND REQUEST</button>
                  </div>
                )
              })}
              {this.state.tab === '2' && <div>Item Two</div>}
            </div>
          </div>
          <Modal
            open={this.state.modalOpen}
            style={{position:'absolute',
                    top:'0',
                    left:'0',
                    width:'100%',
                    height:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'}}
          >
            <Paper
              style={{padding:'20px'}}>
              {this.state.requestTrack !== '' &&
                <div>
                  <h1 className='modal__h1'>SNIPPET COLLABORATION:</h1>
                  <audio id='track1' controls><source src={this.state.requestTrack} type="audio/wav"/></audio>
                  {this.state.fileurl !== '' &&
                  <div style={{display:'inline'}}>
                  <audio id='track2' controls><source src={this.state.fileurl} type="audio/wav"/></audio>
                  <button className='modal__button' onClick={this.mergeTracks}>LISTEN MERGE</button>
                  </div>
                  }
                  <input type="file" onChange={this.fileSelect}/>
                  <button className='modal__button' onClick={()=>this.fileUpload('snippets')}>UPLOAD</button>

                </div>
              }
              <div>
                <h1 className='modal__h1'>NOTES:</h1>
                <textarea className='modal__textarea' type="text" id='notes'/>
              </div>
              <div className='modal__buttonsdiv'>
                <button
                  className='modal__button'
                  onClick={this.openCloseModal}>
                  CANCEL
                </button>
                <button
                  className='modal__button'
                  onClick={()=>this.sendRequest(this.state.user._id)}>
                  SEND
                </button>
              </div>

            </Paper>
          </Modal>
        </div>
      </div>
    );
  };
}
export default OtherProfile;