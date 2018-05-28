import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import '../stylesheets/navbar.css'

const styles = {
  card: {
    width:'300px',
    height:'500px',
    borderStyle:'solid',
    borderWidth:'.5px',
    boxShadow:'none',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding:'20px 0 20px 0'
  }
};

export const IndexNav = ({logged,openMenu,menu,logout,profile,color,landing,inputChange}) => {

  return (
    <div>
      <nav className={landing ? '':'bottom-shadow'}>
          {logged ? <div><input type='text' onChange={inputChange}/></div> : <div><Link to="#" className='explore-a' style={{color:color}}>Explore</Link></div>}
        <Link to="/" className='logo' style={{color:color}}>bandstarter</Link>
        {logged ? <div onClick={openMenu}  className='avatar-div'><Avatar style={{cursor:'pointer'}} src='https://www.w3schools.com/w3css/img_lights.jpg'/></div> : <div><Link to="/login" className='login-a' style={{color:color}}>Log In</Link> <Link to="/signup" className='register-a' style={{color:color}}>Register</Link></div>}
        <Popover
          open={menu}
          onClose={openMenu}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 620, left: 1350 }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <div style={styles.card}>
            <ul>
              <li><Link to="/profile">Profile</Link></li>
              <li><a href="#">Your Tracks</a></li>
              <li><a href="#">Friends</a></li>
              <li><a href='/logout' onClick={logout}>Logout</a></li>
            </ul>
          </div>
        </Popover>
        </nav>
    </div>
  );
};
