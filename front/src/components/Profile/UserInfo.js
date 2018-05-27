import React from 'react';
import Avatar from '@material-ui/core/Avatar';

export const UserInfo = ({user}) => {
  return (
    <div className='info'>
      <Avatar src={user.profilePic} alt="Profile Picture" style={{width:'150px',height:'150px',borderStyle:'solid'}} />
      <h1>{user.username}</h1>
      <div>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};
