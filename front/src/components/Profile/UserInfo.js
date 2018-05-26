import React from 'react';
import Avatar from '@material-ui/core/Avatar';

export const UserInfo = ({user,edit}) => {
  return (
    <div className='info'>
      <Avatar onClick={edit} src={user.profilePic} alt="Profile Picture" style={{width:'150px',height:'150px',borderStyle:'solid'}} />
      <h1>{user.username}</h1>
      <div>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};
