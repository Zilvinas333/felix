//import React from 'react';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
//import logo from './logo.svg';
//import './App.css';
import './index.scss';
import header from './images/header.png';
import F from './images/F.png';
import Image from './components/Image';
import Button from './components/Button';
import Item from './components/Item';
import Home from './home.js';
import Login from './login.js';
import Private from './private.js';
import PrivateRoute from './PrivateRoute.js';

// var Router = require("react-router").Router;
// var Route = require("react-router").Route;
// var Switch = require("react-router").Switch;

function App() {
    //prie route exact naudoti kad eitu tiksliai ir nesimaisytu su kitais. jei nuimti tai pvz path="/" tada galioja visiems,
    //todel /login bus susimaise / ir /login. exact siaip reiktu naudoti by default
    console.log("render", window.location.pathname);
    return (
      <Router>
        <div className="App">
        <Switch>
          
          <Route exact path="/">
            <Home />
            <div>
              ferfferr
            </div>
          </Route>
           <Route exact path="/login"> 
            <Login />
          </Route>
          <PrivateRoute exact path="/private">
              <Private /> 
            
          </PrivateRoute> 
            
          
        </Switch>
        </div>
      </Router>

    )

}

export default App;
