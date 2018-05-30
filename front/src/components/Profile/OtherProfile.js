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
    user: {},
    menu: false,
    tab: '1',
    modalOpen: false,
    requestTrack: '',
    file: '',
    fileurl: ''
  };

  mergeTracks = () => {
    let track1 = document.getElementById('track1');
    let track2 = document.getElementById('track2');

    track1.play();
    track2.play()
  };

  fileUpload = (whatfile) => {
    const fileurl = 'https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/snippets%2F' + this.state.file.name + '?alt=media&token=5ee0d32d-41e3-44c5-9131-d03fae9dcace';
    addTrack(this.state.file, 'snippets');
    setTimeout(() => this.setState({fileurl}), 5000)
  };

  fileSelect = e => {
    this.setState({file: e.target.files[0]});
  };

  openCloseModal = () => {
    this.setState({modalOpen: !this.state.modalOpen})
  };

  snippetCollabModal = snippet => {
    this.setState({fileurl: ''});
    this.setState({requestTrack: snippet});
    this.setState({modalOpen: !this.state.modalOpen})
  };

  noCollabModal = () => {
    this.setState({requestTrack: ''});
    this.setState({modalOpen: !this.state.modalOpen})
  };

  sendRequest = id => {
    const body = {
      from: JSON.parse(localStorage.getItem('user'))._id,
      snippet1: this.state.requestTrack,
      snippet2: this.state.fileurl,
      notes: document.getElementById('notes').value
    };
    console.log(body);
    auth.sendRequest(id, body)
      .then(user => {
        return console.log(user)
      })
      .catch(e => console.log(e));
    this.setState({modalOpen: !this.state.modalOpen})
  };

  tabChange = e => {
    this.setState({tab: e.target.id})
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

  componentDidMount() {
    auth.getUser(this.props.match.params.id)
      .then(user => this.setState({user}))
      .catch(e => console.log(e));
  }

  render() {
    const {user} = this.state;
    console.log(this.state.user);
    return (
      <div>
        <IndexNav
          place='profile'
          logout={this.logout}
        />
        <div className='background__container'>
          <img className='background__img'
               src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/bass.png?alt=media&token=ff89c22d-2e5c-45b2-96bf-d4b1acf59c4b"/>
        </div>
        <UserInfo
          user={this.state.user}
          other={true}
          handleAdd={this.handleAdd}
          handleDelete={this.handleDelete}
        />
        <div className='profile-container'>
          <div className='header__name'>
            <h1 style={{marginBottom: '5px', fontSize: '40px'}}>{user.name}</h1>
            <h3 style={{marginTop: '0'}}>{user.location}</h3>
            <div>
              <p style={{color: 'white', textAlign: 'left', width: '80%'}}>{this.state.user.bio}</p>
            </div>
            <hr style={{backgroundColor: 'white', width: '80%'}}/>
          </div>
          <div>
            <div style={{display: 'flex'}}>
              <h3 onClick={this.tabChange} className='tab tab-unselected' id='1'>Tracks</h3>
            </div>
          </div>
          <div>
            {this.state.tab === '1' &&
            <div>
              <div>
                {this.state.user.snippets ?
                  <div>
                    {this.state.user.snippets.map(snippet => {
                      return (
                        <div className='track-card'>
                          <audio style={{width: '70%'}} key={snippet._id} controls>
                            <source src={snippet}/>
                          </audio>
                          <button className='profile__button--request' onClick={()=>this.snippetCollabModal(snippet)}>SEND REQUEST</button>
                        </div>
                      )
                    })}
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
                  :
                  <div>No tracks!</div>
                }
              </div>
            </div>
            }
          </div>
        </div>

      </div>
    );
  };
}

export default OtherProfile;

