import React from 'react';
import { Route, Redirect, useLocation, withRouter  } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './login.js';
import Private from './private.js';
import content from "../content";
import { compose, bindActionCreators } from "redux";

function PrivateRoute ( { isAuthenticated, ...props } ) { //pasirodo, jeigu salia propsu noriu pasiimti kazkoki dar parametra,
  //tai juos visus reikia deti i figurinius skliaustus kaip viena objekta, nes priesingu atveju reactas kazkodel galvoja
  //kad pirmas parametras yra propsai, ir kol cia nebuvo figuriniu skliaustu, antras ...props tiesiog buvo tuscias
    //const token = window.localStorage.getItem('token');
    //console.log("SITAS: ", token);
    //console.log(props);
    
    if (isAuthenticated) {
      //console.log("private route?", isAuthenticated);
        return <Route {...props} /> //perduoda visus atributus is index.js
    }
    return <Redirect to="/login" />;
    //return <Redirect to={{ pathname: "/login", state: { referrer: location } }} />; //sitam bus nauda kai bus gatavas filmo puslapis
    //pvz bandziau i url patekti neisilogines, mane numeta i logina, prisiloginu ir tada mane numes i home.
    //kad taip nebutu, state issaugoma lokacija, i kuria galima bus nukreipti prisiloginus. iskart paklius i reikiama filma
}

const enhance = compose (
  withRouter,
  connect((state) => {

    return {
      isAuthenticated: !!content.selectors.tokenFromSelectors(state),
    };
  })
);


//export default PrivateRoute;
export default enhance(PrivateRoute);


