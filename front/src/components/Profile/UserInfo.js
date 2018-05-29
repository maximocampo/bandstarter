import React from 'react';
import Avatar from '@material-ui/core/Avatar';

export const UserInfo = ({user}) => {
  return (
    <div className='info'>
      <img src={user.profilePic} alt="Profile Picture" style={{width:'100%',padding:'0'}} />
      <div style={{padding:'20px'}}>
        <h3 style={{marginTop:'0',fontSize:'14px',textAlign:'left'}}>INSTRUMENTS</h3>
        {user.instruments ? user.instruments.map(instrument=><p style={{textAlign:'left'}}>{instrument}</p>) : <p>Add Instruments!</p>}
        <hr style={{margin:'10px'}}/>
        <h3 style={{marginTop:'0',fontSize:'14px',textAlign:'left'}}>GENRES</h3>
        {user.genres ? user.genres.map(genre=><p style={{textAlign:'left'}}>{genre}</p>) : <p>Add genres!</p>}
        <hr style={{margin:'10px'}}/>
        <h3 style={{marginTop:'0',fontSize:'14px',textAlign:'left'}}>INFLUENCES</h3>
        {user.influences ? user.influences.map(influence=><p style={{textAlign:'left'}}>{influence}</p>) : <p>Add Influences!</p>}
        <hr style={{margin:'10px'}}/>

      </div>
    </div>
  );
};
