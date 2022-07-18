import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import useLocalStorage from 'use-local-storage';
import Header from './pages/header';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Store from './pages/store';
import MyBag from './pages/mybag';
import Upload from './pages/upload';
import Update from './pages/update';

function App() {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  function switchTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  return (
    <div className="App" data-theme={theme}>
      <label className="username"></label>
      <label className="message">FREE SHIPPING ON ORDERS OVER $99.99</label>
      <label className="switch">
        
        <input 
          onClick={switchTheme}
          type = "checkbox"/>
          <span className='slider_round'/>
      </label>
      <Router>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/store' element={<Store/>}/>
          <Route path='/mybag' element={<MyBag/>}/>
          <Route path='/upload' element={<Upload/>}/>
          <Route path='/update' element={<Update/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
