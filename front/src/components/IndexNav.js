import React from 'react';
import { Link } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import '../stylesheets/navbar.css'

const styles = {
  card: {
    width:'300px',
    height:'200px',
    border:'solid black .5px',
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
        {logged ?
          <div className='navcontainer'>
            <div style={{display:'flex',alignItems:'center'}}>
              <Link to="/" className='logo' style={{textAlign:'left'}}><img width='200px' src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/bandmatelogo.png?alt=media&token=81c1076f-3972-46eb-a986-19081a3120c1" alt="bandmate logo"/></Link>
              <button onClick={openMenu} style={{backgroundColor:'black',width:'200px',marginLeft:'40px'}}>PROFILE</button>
              <Link to='/faq'><button style={{backgroundColor:'black',width:'200px'}}>FAQ</button></Link>
            </div>
            <div>
              <Link to='/search'><button style={{backgroundColor:'black'}}>FIND YOUR BANDMATE</button></Link>
            </div>
          </div>
          :
          <div>
            <div><Link to="/login" className='login-a' style={{color:color}}>Log In</Link> <Link to="/signup" className='register-a' style={{color:color}}>Register</Link></div>
          </div>
        }
        <Popover
          open={menu}
          onClose={openMenu}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 70, left: 170 }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div style={styles.card}>
            <ul>
              <li><Link to="/profile">View</Link></li>
              <li><a href='/logout' onClick={logout}>Logout</a></li>
            </ul>
          </div>
        </Popover>
        </nav>
    </div>
  );
};
