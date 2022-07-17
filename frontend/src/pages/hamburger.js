import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link } from 'react-router-dom';
import './hamburger.css';

function Hamburger(){
  return (
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
export default Hamburger;