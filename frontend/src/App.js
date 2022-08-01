import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import { useGlobalState } from './global/globalStates';
import useLocalStorage from 'use-local-storage';
import Header from './pages/header';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Store from './pages/store';
import Favorites from './pages/favorites';
import MyBag from './pages/mybag';
import Upload from './pages/upload';
import Update from './pages/update';

function App() {
  const [username] = useGlobalState("username");

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  function switchTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  if(username === `Administrator`){
  return (
    <div className="App" data-theme={theme}>
      <label id="username">{username}</label>
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
          <Route path='/store' element={<Store/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/mybag' element={<MyBag/>}/>
          <Route path='/upload' element={<Upload/>}/>
          <Route path='/update' element={<Update/>}/>
        </Routes>
      </Router>
    </div>
  );
  }
  else if(username === ''){
    return (
      <div className="App" data-theme={theme}>
        <label id="username">{username}</label>
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
          </Routes>
        </Router>
      </div>
    );
    }
  else {
    return (
      <div className="App" data-theme={theme}>
        <label id="username">{username}</label>
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
            <Route path='/store' element={<Store/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path='/mybag' element={<MyBag/>}/>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;