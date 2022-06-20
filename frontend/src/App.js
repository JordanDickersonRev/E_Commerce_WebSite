import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Header from './pages/header';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Store from './pages/store';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/store' element={<Store/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
