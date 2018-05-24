import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';

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

export const IndexNav = ({logged,openMenu,menu,logout}) => {


  return (
    <div>
      <nav>
      <div>
        <Link to="#" className='explore-a'>Explore</Link>
        <Link to="#" className='register-a'>Form a Band</Link>
      </div>
        <Link to="/" className='logo'>bandstarter</Link>
        {logged ? <div onClick={openMenu}  className='avatar-div'><Avatar style={{cursor:'pointer'}} src='https://www.w3schools.com/w3css/img_lights.jpg'/></div> : <div><Link to="/login" className='login-a'>Log In</Link> <Link to="/signup" className='register-a'>Register</Link></div>}
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
              <li><a href="#">Profile</a></li>
              <li><a href="#">Your Tracks</a></li>
              <li><a href="#">Friends</a></li>
              <li><a href='/logout' onClick={logout}>Logout</a></li>
            </ul>
          </div>
        </Popover>

        </nav>
      <hr/>
    </div>
  );
};
