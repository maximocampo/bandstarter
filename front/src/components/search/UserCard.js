import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import '../../stylesheets/search.css'

export const UserCard = ({user}) => {
  return (
    <Link className='card__container' to={`profile/${user._id}`}>
      <div>
        <div style={{height:'200px',overflow:'hidden',backgroundColor:'black'}}>
          <img style={{width:'100%'}} src={user.profilePic}/>
        </div>
        <div style={{padding:'10px'}}>
          <h3 style={{marginTop:'3px'}}>{user.name}</h3>
          <h4 style={{fontSize:'12px',textAlign:'left'}}>GENRES:</h4>
          <div style={{display:'flex',flexWrap:'wrap',alignItems:'center'}}>
          {user.genres[0] &&
              <div>
                <div className='chip'>
                  <span style={{fontSize:'12px'}}>{user.genres[0]}</span>
                </div>
              </div>
          }
            {user.genres[1] &&
            <div>
              <div className='chip'>
                <span style={{fontSize:'12px'}}>{user.genres[1]}</span>
              </div>
            </div>
            }
        </div>
        </div>
      </div>
    </Link>
  );
};
