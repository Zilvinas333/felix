import { createAction } from "redux-api-middleware";

import * as types from "./types.js";
// import { useHistory } from "react-router-dom";
//import store from "../app/state";
import * as selectors from "./selectors";

//authorization: selectors.tokenFromSelectors(store.getState())

export const toggleFavorite = id => ({ type: types.TOGGLE_FAVORITE_CONST, id })

//export const setToken = token => ({ type: types.SET_TOKEN_CONST, token })

//let history = useHistory();
 
//sitas aprasytas su redux-api-middleware, kuris pajungtas kaip middlewaras state/index.js
export const login = (username, password) =>
  createAction({
    endpoint: "https://academy-video-api.herokuapp.com/auth/login",
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    //types: [types.SET_TOKEN_CONST],
    types: [types.LOGIN_REQ, types.LOGIN_SUCESS, types.LOGIN_FAILURE],
  });

// export const login = async (e, username, password) => { //useCallback nebutinas jeigu nenaudoji useEffect. useEffect jei nori kazkokia funkcija palaikyti atskirai
//     e.preventDefault();
    
//     try {
//         let response = await fetch(`https://academy-video-api.herokuapp.com/auth/login`, {
//             method: "POST",
//             body: JSON.stringify({ username: username, password: password }),
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//         console.log(response);
//         const json = await response.json();
//         console.log(json.token);
//         localStorage.setItem('token', json.token);
//         //setToken(json.token);
//         //history.replace('/private'); //replace naudoti tik su jautriais duomenimis, tipo login, forgot password ir pan.
//         //kitu naudoti push, nes issisaugo nauji keliai istorijoje ir gali back ir forward daryti.
//     } catch (e) {
//         console.log(e);
//     }
//   }

//redux-api-middleware
export const getMovies = (token) =>
  createAction({
    endpoint:  `https://academy-video-api.herokuapp.com/content/${token ? "" : "free-"}items`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token
    },
    types: [types.MOVIES_REQ, types.MOVIES_SUCESS, types.MOVIES_FAILURE], //visada turi buti butinai tokia seka
  });

//getMovies aprasytas su thunku, kuris kaip middlewaras nurodomas state/index.js. 
// export const getMovies = ({ free } = {}) => {
//     console.log(free);
//     //console.log(props);
//     return async (dispatch) => {
//       dispatch({ type: types.MOVIES_REQ });
  
//       const response = await fetch(
//         `https://academy-video-api.herokuapp.com/content/${free ? "free-" : ""}items`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             //authorization: selectors.tokenFromSelectors(store.getState())
//             //authorization: token
//           },
//         }
//       );
//       if (!response.ok) {
//         dispatch({
//           type: types.MOVIES_FAILURE,
//           payload: await response.json(),
//           error: "Oops, only free content",
//         });
//       } else {
//         dispatch({ type: types.MOVIES_SUCESS, payload: await response.json() });
//       }
//     };
//   };

// const getMovies = useCallback( 
  //   async () => {

  //   const response = await fetch(`https://academy-video-api.herokuapp.com/content/items`, {
  //     method: "GET",
  //     headers: { authorization: localStorage.getItem("token") }
  //   })
  //   if (response.ok) {
  //     setMovies(await response.json())
  //   }

  //   },
  //   [setMovies]
  // );


  export const getMovie = (token, id) =>
    createAction({
      endpoint:  `https://academy-video-api.herokuapp.com/content/items/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      types: [types.SINGLE_MOVIE_REQ, types.SINGLE_MOVIE_SUCESS, types.SINGLE_MOVIE_FAILURE],
    });

    export const signOut = (token) =>
    createAction({
      endpoint:  `https://academy-video-api.herokuapp.com/auth/logout`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
      types: [types.LOGOUT_REQ, types.LOGOUT_SUCESS, types.LOGOUT_FAILURE],
    });


    // const logout = async () => {
    //   try {
    
    //       let logout = await fetch(`https://academy-video-api.herokuapp.com/auth/logout`, {
    //           method: "POST",
    //           headers: {
    //               'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify({ token: localStorage.getItem("token") })
              
    //       })
    //       console.log(logout);
    //       //logout = await logout.json();
    //       localStorage.removeItem('token');
    //       setToken(token);
    //       history.replace('/');
    //   } catch (e) {
    //       console.log(e);
    //   }
    // }