//import React from 'react';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
//import logo from './logo.svg';
//import './App.css';
import './index.scss';
import header from './images/header.png';
import F from './images/F.png';
import Image from './components/Image';
import Button from './components/Button';
import Item from './components/Item';
import Private from './private.js';
import { connect } from 'react-redux';



const Login = ({ setToken, token }) => {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let history = useHistory();

  const login = async (e) => { //useCallback nebutinas jeigu nenaudoji useEffect. useEffect jei nori kazkokia funkcija palaikyti atskirai
    e.preventDefault();
    try {
        let response = await fetch(`https://academy-video-api.herokuapp.com/auth/login`, {
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log(response);
        const json = await response.json();
        console.log(json.token);
        localStorage.setItem('token', json.token);
        setToken(json.token);
        history.replace('/private'); //replace naudoti tik su jautriais duomenimis, tipo login, forgot password ir pan.
        //kitu naudoti push, nes issisaugo nauji keliai istorijoje ir gali back ir forward daryti.
    } catch (e) {
        console.log(e);
    }
  }

  const getUsername = (event) => {
      setUsername(event.target.value);
      console.log(event.target.value);
  } 

  const getPassword = (event) => {
      setPassword(event.target.value);
      console.log(event.target.value);
  } 


  // const Input = () => {
  //   const inputRef = useRef();

  //   useEffect(() => {
  //     inputRef.current.event.target.value;
  //   })

  //   return <input ref={inputRef} type="text" />
  // }

  return (
    <div className="App">
        <nav className="nav">
          <Image src={F} alt="logo" />
          <Button>Sign In</Button>
        </nav>
       
        <div className="login-wr">
            <form onSubmit={ login } className="login">
                Username<br/>
                <input onChange={ getUsername } id="username" type="text" /><br/>
                {/* <Input /> */}
                Password<br/>
                <input onChange={ getPassword } id="password" type="password" /><br/>
      
                <input type="submit" />
            </form>
        </div>

        

        
        <footer className="footer">

          <a>We care about your entertainment. Copyright © 2019–2020 felix.com</a>
          <div>
            cards
          </div>
        </footer>
      </div>

  )


}

//export default Login;

function mapStateToProps({ token }) {
  //console.log(favorites);
  return {
    token: token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      setToken: token => dispatch({ type: "SET_TOKEN", token })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

