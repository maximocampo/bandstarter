import React from 'react';
import { Link } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import '../stylesheets/navbar.css'


export const IndexNav = ({place}) => {
  return (
    <nav>
      {place === 'auth' &&
        <div className='auth__container'>
          <Link to='/'>
            <img className='auth__logo' src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/logoblanco.png?alt=media&token=1b795e35-39b1-49f6-af30-40c2cc11b364"/>
          </Link>
        </div>
      }
      {place === 'home' &&
        <div className='home__container'>
            <div style={{width:'50%',display:'flex',alignItems:'center'}}>
              <Link to='/' style={{width:'40%'}}>
                <img className='home__logo' src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/logoblanco.png?alt=media&token=1b795e35-39b1-49f6-af30-40c2cc11b364"/>
              </Link>
              <Link to='/profile'>
                <h3>Profile</h3>
              </Link>
            </div>
            <Link to='/search'>
              <h3>Find your bandmate</h3>
            </Link>
        </div>
      }
      {place === 'search' &&
      <div className='home__container'>
        <div style={{width:'50%',display:'flex',alignItems:'center'}}>
          <Link to='/' style={{width:'40%'}}>
            <img className='home__logo' src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/logoblanco.png?alt=media&token=1b795e35-39b1-49f6-af30-40c2cc11b364"/>
          </Link>
          <Link to='/profile'>
            <h3>Profile</h3>
          </Link>
        </div>
      </div>
      }
      {place === 'profile' &&
      <div className='home__container'>
        <div style={{width:'50%',display:'flex',alignItems:'center'}}>
          <Link to='/' style={{width:'40%'}}>
            <img className='home__logo' src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/logoblanco.png?alt=media&token=1b795e35-39b1-49f6-af30-40c2cc11b364"/>
          </Link>
          <Link to='/profile'>
            <h3>Profile</h3>
          </Link>
        </div>
        <Link to='/search'>
          <h3>Find your bandmate</h3>
        </Link>
      </div>
      }
    </nav>
  );
};
