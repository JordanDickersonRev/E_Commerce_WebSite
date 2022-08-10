import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link } from 'react-router-dom';
import { setGlobalState, useGlobalState } from '../global/globalStates';
import './hamburger.css';

function Hamburger(){
  const [username] = useGlobalState("username");

  function signOut(){
    setGlobalState("username", '');
  }
  if(username === 'Administrator'){
    return (
      <Menu>
        <label>{username}</label>
        <Link to='/favorites' className='menu-item'>
          Favorites
        </Link>
        <Link to='/' onClick={e => signOut()} className="menu-item">
          Sign Out
        </Link>
        <Link to='/upload' className='menu-item'>
          Upload
        </Link>
        <Link to='/update' className='menu-item'>
          Update
        </Link>
      </Menu>
    );
  }
  else if(username !== ''){
    return (
      <Menu>
        <label>{username}</label>
        <Link to='/favorites' className='menu-item'>
          Favorites
        </Link>
        <Link to='/' onClick={e => signOut()} className="menu-item">
          Sign Out
        </Link>
      </Menu>
    );
  }
  else{
    return(
      <Menu>
        <Link to='/signup' className="menu-item">
          Sign Up
        </Link>
        <Link to='/login' className="menu-item">
          Log In
        </Link>
      </Menu>
    );
  }
}
export default Hamburger;