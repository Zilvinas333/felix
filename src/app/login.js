//import React from 'react';
import React, { useState } from 'react';
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



class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        username: "",
        password: "",
  
      };

  }

  //username: tester, password: netflix

  getUsername = (event) => {
    this.setState(
        { 
            username: event.target.value,
        }
    )
    console.log(event.target.value);
  }

  getPassword = (event) => {
    this.setState(
        { 
            password: event.target.value,
        }
    )
    console.log(event.target.value);
  }
  //yra skirtumas ar tu cia apibrezi kaip metodus ( componentDidMount() ) ar kaip funkcijas. metodai atrodo turi savo atskira this,
  //todel ju atveju juos kazkaip reiktu bindint i konstruktoriu. arrow funkcija tuo tarpu neturi savo this, ji paveldi, todel
  //siuo atveju su ja paprasciau.
  login = async (e) => {
    e.preventDefault();
    console.log(this.props);
    try {
        console.log(this.state);
        let response = await fetch(`https://academy-video-api.herokuapp.com/auth/login`, {
            method: "POST",
            body: JSON.stringify({ username: this.state.username, password: this.state.password }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log(response);
        const json = await response.json();
        console.log(json.token);
        localStorage.setItem('token', json.token);
        //tokena isirasyti i localstoraga, ir nukreipti i kita url
        //this.props.history('/private');
        this.props.history.replace('/private');
    } catch (e) {
        console.log(e);
    }
  }
  //<Button onclick={ () => this.login() } >Sign In</Button> galimai i login-wor po inputais
  render () {
   

    return (

      <div className="App">
        <nav className="nav">
          <Image src={F} alt="logo" />
          <Button>Sign In</Button>
        </nav>
       
        <div className="login-wr">
            <form onSubmit={ this.login } className="login">
                Username<br/>
                <input onChange={ this.getUsername } id="username" type="text" /><br/>
                Password<br/>
                <input onChange={ this.getPassword } id="password" type="password" /><br/>
      
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
  };
}

//export default Login;
export default withRouter(Login);
