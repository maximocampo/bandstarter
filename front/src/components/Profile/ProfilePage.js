import React, { Component } from 'react';
import '../../stylesheets/profile.css'
import { IndexNav } from '../IndexNav'
import { UserInfo } from "./UserInfo";
import { addTrack } from '../../services/firebase'
import * as auth from "../../services/authService";
import { uploadFile } from "../../services/authService";
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';

class ProfilePage extends Component {
  state = {
    user:{},
    menu: false,
    logged: false,
    tab: '1',
    file: '',
    newBandModal:false
  };

  sendContact = to => {
    const body = {
      from:JSON.parse(localStorage.getItem('user'))._id,
      to,
      info:document.getElementById('info').value
    };
    auth.sendReply(body)
      .then(reply=>reply)
      .catch(e=>console.log(e));
    this.setState({newBandModal:false})
  };

  acceptRequest = id => {
    this.setState({newBandModal:true})
  };

  ignoreRequest = id => {
    auth.ignoreRequest(id)
      .then(request=>request)
      .catch(e=>console.log(e));
    window.location.reload()
  };

  playRequest = i => {
    console.log(i)
    let trackContainer = document.getElementById(`tracks-container-${i}`);
    let track1 = trackContainer.childNodes[0];
    let track2 = trackContainer.childNodes[2];
    track1.play();
    track2.play()
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
      return console.log('not logged')
    }
    auth.findUser(JSON.parse(localStorage.getItem('user'))._id)
      .then(user=>{
        return this.setState({user,logged:true});
      })
      .catch(e=>console.log(e));
  }

  render() {
    const {user} = this.state;
    console.log(this.state.user);
    return (
      <div>
        <IndexNav
          logged={this.state.logged}
          openMenu={this.openMenu}
          menu={this.state.menu}
          logout={this.logout}
          profile={true}/>
        <UserInfo user={this.state.user}/>
        <div style={{width:'100%',height:'300px',overflow:'hidden',margin:'0'}}>
          <img width='100%' src="https://i.ytimg.com/vi/tsjd7xdgfjA/maxresdefault.jpg" alt="Cover Image"/>
          <div className='header__name'>
            <h1>{user.name}</h1>
            <h3>{user.location}</h3>
          </div>
        </div>
        <div className='profile-container'>
          <div>
            {this.state.user.snippets ?
              <div className='track-card'>
                {this.state.user.snippets.map(snippet=>{
                  return (<div>
                      <audio key={snippet._id} controls><source src={snippet}/></audio>
                    </div>
                  )
                })}
              </div>
              :
              <div>No tracks</div>
            }
          </div>
            {this.state.tab === '3' &&
            <div>
            {this.state.user.requests ?
              <div style={{display:'flex',justifyContent:'center'}}>
                {this.state.user.requests.map((request,i)=>{
                  return (
                    <div>
                    <div className='request__container' style={{display:'flex',alignItems:'space-between'}}>
                    <h1 className='request__h1'>From: {request.from.name}</h1>
                    <div id={`tracks-container-${i}`}>
                    <audio controls><source src={request.snippet1}/></audio>
                      <br/>
                    <audio controls><source src={request.snippet2}/></audio>
                    </div>
                    <div>
                      <button className='request__button' onClick={()=>this.playRequest(i)}>PLAY</button>
                    </div>
                  </div>
                    <div>
                      <button className='request__button' onClick={()=>this.acceptRequest(request._id)}>ACCEPT</button>
                      <button className='request__button' onClick={()=>this.ignoreRequest(request._id)}>IGNORE</button>
                    </div>
                      <Modal
                        open={this.state.newBandModal}
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
                          <div>
                            <h1 className='modal__h1'>SEND {request.from.name} A MESSAGE WITH YOU CONTACT INFORMATION SO YOU CAN JAM!</h1>
                            <textarea type="text" id='info' className='modal__textarea'/>
                          </div>
                          <div className='modal__buttonsdiv'>
                            <button
                              className='modal__button--accept'
                              onClick={()=>this.setState({newBandModal:false})}
                            >
                              CANCEL
                            </button>
                            <button
                              className='modal__button--accept'
                              onClick={()=>this.sendContact(request.from._id)}
                            >
                              SEND CONTACT INFO
                            </button>
                          </div>

                        </Paper>
                      </Modal>
                  </div>
                  )
                })}
              </div>
              :
              <div>No requests</div>
            }
          </div>
            }
            {this.state.tab === '4' &&
            <div>
              {this.state.user.replies ?
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                  {this.state.user.replies.map((reply)=> {
                    return (
                      <div key={reply._id} className='reply__container'>
                        <h1 className='reply__h1'>From:{reply.from.name}</h1>
                        <p className='reply__p'>Message: {reply.info}</p>
                      </div>
                    )
                  })}
                </div>
                :
                <div>
                  No Replies
                </div>
              }
            </div>
            }

          </div>
      </div>
    );
  };
}
export default ProfilePage;