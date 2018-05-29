import React from 'react';
import { Link } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import '../stylesheets/navbar.css'


export const IndexNav = ({logged,openMenu,menu,logout,profile,color,landing,inputChange}) => {
  return (
    <nav>
      <Link to='/'><img className='logo' src="https://firebasestorage.googleapis.com/v0/b/bandstarter-e4143.appspot.com/o/logoblanco.png?alt=media&token=1b795e35-39b1-49f6-af30-40c2cc11b364"/></Link>
    </nav>
  );
};
