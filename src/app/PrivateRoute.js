import React from 'react';
import { Route, Redirect, useLocation  } from 'react-router-dom';
import Login from './login.js';
import Private from './private.js';

function PrivateRoute (props) {
    const token = window.localStorage.getItem('token');
    //console.log("SITAS: ", token);
    //console.log(props);
    if (token) {
        return <Route {...props} /> //perduoda visus atributus is index.js
    }
    return <Redirect to="/login" />;
    //return <Redirect to={{ pathname: "/login", state: { referrer: location } }} />; //sitam bus nauda kai bus gatavas filmo puslapis
    //pvz bandziau i url patekti neisilogines, mane numeta i logina, prisiloginu ir tada mane numes i home.
    //kad taip nebutu, state issaugoma lokacija, i kuria galima bus nukreipti prisiloginus. iskart paklius i reikiama filma
}

export default PrivateRoute;

