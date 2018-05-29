import React,{ Component } from 'react';
import Chip from '@material-ui/core/Chip';
import blueGrey from '@material-ui/core/colors/blueGrey';

class UserInfo extends Component{

  render(){
    const user = this.props.user;
    const handleDelete = this.props.handleDelete
    return(
      <div className='info'>
      <img src={user.profilePic} alt="Profile Picture" style={{width:'100%',padding:'0'}} />
      <div style={{padding:'20px'}}>
      <h3 style={{marginTop:'0',fontSize:'14px',textAlign:'left'}}>INSTRUMENTS</h3>
      {user.instruments ? user.instruments.map(instrument=><p style={{textAlign:'left'}}>{instrument}</p>) : <p>Add Instruments!</p>}
      <hr style={{margin:'10px'}}/>
      <h3 style={{marginTop:'0',fontSize:'14px',textAlign:'left'}}>GENRES</h3>
      {user.genres ?
        user.genres.map((genre,i)=>{
          return (
          <Chip
            style={{backgroundColor:blueGrey[300],margin:'5px'}}
            key={genre.i}
            label={genre}
            onDelete={()=>handleDelete(genre,'genres')}
          />
          )
        })
        :
        <p>Add genres!</p>}
      <hr style={{margin:'10px'}}/>
      <h3 style={{marginTop:'0',fontSize:'14px',textAlign:'left'}}>INFLUENCES</h3>
      {user.influences ? user.influences.map(influence=><p style={{textAlign:'left'}}>{influence}</p>) : <p>Add Influences!</p>}
      <hr style={{margin:'10px'}}/>

      </div>
      </div>
    )
    }
}


export default UserInfo;