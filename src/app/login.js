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
import { compose, bindActionCreators } from "redux";

import content from "../content";


const Login = ({ setToken, token, login, isAuthenticated }) => {
  // let [username, setUsername] = useState('');
  // let [password, setPassword] = useState('');
  let history = useHistory();
  let usernameInput = React.createRef();
  let passwordInput = React.createRef();

  // const login = async (e) => { //useCallback nebutinas jeigu nenaudoji useEffect. useEffect jei nori kazkokia funkcija palaikyti atskirai
  //   e.preventDefault();
  //   try {
  //       let response = await fetch(`https://academy-video-api.herokuapp.com/auth/login`, {
  //           method: "POST",
  //           body: JSON.stringify({ username: username, password: password }),
  //           headers: {
  //               'Content-Type': 'application/json',
  //           }
  //       })
  //       console.log(response);
  //       const json = await response.json();
  //       console.log(json.token);
  //       localStorage.setItem('token', json.token);
  //       setToken(json.token);
  //       history.replace('/private'); //replace naudoti tik su jautriais duomenimis, tipo login, forgot password ir pan.
  //       //kitu naudoti push, nes issisaugo nauji keliai istorijoje ir gali back ir forward daryti.
  //   } catch (e) {
  //       console.log(e);
  //   }
  // }

  //const signIn = () => login(usernameInput.value, passwordInput.value);
  const signIn = (event) => {
    event.preventDefault();
    //login(username, password)
    login(usernameInput.value, passwordInput.value)
  };

  // const getUsername = (event) => {
  //     setUsername(event.target.value);
  //     console.log(event.target.value);
  // } 

  // const getPassword = (event) => {
  //     setPassword(event.target.value);
  //     console.log(event.target.value);
  // } 


  useEffect(() => {
    if (isAuthenticated) {
      history.replace("/private");
    } else {
      //console.log("nesuveike redirectas", isAuthenticated);
    }
  }, [usernameInput, history, isAuthenticated, token]);

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
            <form onSubmit={ signIn } className="login"> 
            {/* jeigu butu signIn() tai ji issikviecia iskarto, o cia buti buti ant submito */}
                Username<br/>
                {/* <input onChange={ getUsername } id="username" type="text" /><br/> */}
                <input ref={ (input) => usernameInput = input } id="username" type="text" /><br/>
                {/* <Input /> */}
                Password<br/>
                {/* <input onChange={ getPassword } id="password" type="password" /><br/> */}
                <input ref={ (input) => passwordInput = input } id="password" type="password" /><br/>
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

const enhance = compose(
  withRouter,
  connect(
    (state) => {
      return {
        //token: token,
        //token: content.selectors.tokenFromSelectors(state, token),
        token: content.selectors.tokenFromSelectors(state),
        isAuthenticated: !!content.selectors.tokenFromSelectors(state), //objekta (0, null, undefined, etc) pavercia booleanu
      };
    },
    (dispatch) => {
      return {
          login: bindActionCreators(content.actions.login, dispatch),
      };
    }
  )
);

export default enhance(Login);

// function mapStateToProps({ token }) {
//   //console.log(favorites);
//   return {
//     token: token,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//       setToken: token => dispatch({ type: "SET_TOKEN", token })
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

