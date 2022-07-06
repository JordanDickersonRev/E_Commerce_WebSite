import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './hamburger.css';

export default props => {
  return (
    <Menu>
      <a className="menu-item">
        Log In
      </a>
      <a className="menu-item">
        Sign Up
      </a>
    </Menu>
  );
};