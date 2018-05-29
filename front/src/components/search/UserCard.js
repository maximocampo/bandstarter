import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import '../../stylesheets/search.css'

export const UserCard = ({user}) => {
  return (
    <div className='card__container'>
      <h3>{user.name}</h3>
      <Link to={`profile/${user._id}`}>Go to Profile</Link>
    </div>
  );
};
