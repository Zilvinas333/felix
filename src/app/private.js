//import React from 'react';
import React, { useState, useCallback, useEffect } from 'react';
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { compose, bindActionCreators } from "redux";
//import logo from './logo.svg';
//import './App.css';
import './index.scss';
import header from './images/header.png';
import F from './images/F.png';
import Image from './components/Image';
import FavoriteButton from './components/FavoriteButton';
import Button from './components/Button';
import Item from './components/Item';

import content from "../content";
import { isTokenNull } from '../content/selectors';

const Private = ({ movies, setMovies, setToken, token, getMovies, isTokenFalse, signOut  }) => {
  //let [movies, setMovies] = useState([]);
  //let [favorites, setFavorites] = useState([]);
  let history = useHistory();

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
    
  console.log("private", token);

  useEffect(() => {
    getMovies(token)
  },[getMovies])



  // const changeButton = id => {
  //   console.log(id);
  //   if (favorites.includes(id)) {
  //     console.log(id, favorites);
  //     setFavorites(favorites.filter(el => el != id));
  //     //favorites = favorites.filter(el => el != id); //cia bandymas stata tiesiogiai mutuoti, todel neveikia, nes jis nemutabilus
  //     //zodziu, esme tokia, kad viskas vyksta per funkcijas. nori kazka state pakeisti - kvieti funkcija, kuri ta pakeitima atlieka
  //   } else {
  //     setFavorites(favorites.concat(id));
  //     //favorites = favorites.concat(id);
  //   }
  // }  

    const logout = () => signOut(token);
  // const logout = async () => {
  //   try {
  //     signOut(token);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   localStorage.removeItem("token");
  //   history.replace("/");
    
  // }

  useEffect(() => {
    if (isTokenFalse === false) {
      localStorage.removeItem("token"); //cia defaultinis elgesys - tik istryne ir permeta by default i login. todel pamegint replace virs sitos eilutes iskelt?
      history.replace("/");
      //console.log("fiksuoja false");
    } else {
      //console.log("nesuveike redirectas", isAuthenticated);
      console.log("nefiksuoja false");
    }    
  }, [history, isTokenFalse, token]);
  
  
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

    return (

      <div className="App">
        <nav className="nav">
          <Image src={F} alt="logo" />
          <Button onclick={ logout }>Logout</Button>
        </nav>

        <section className="displayItems">
          
          <div className="displayItemsWr">
            
         
          {

            movies.map(el => ( 
              <Item 
                firstChild="movieImage" 
                secondChild="movieDescription" 
                //button={favorites.includes(el.id) ? "Remove" : "Favorite"} 
                imgSrc={el.image} 
                title={el.title} 
                description={el.description} 
                //onclick={() => changeButton(el.id)}
                id={el.id}
                //isFavorite={favorites.includes(el.id)}
              /> 
              ))

          }    
          </div>
        </section>
        <footer className="footer">

          <a>We care about your entertainment. Copyright © 2019–2020 felix.com</a>
          <div>
            cards
          </div>
        </footer>
      </div>
    )

}

//export default Private;

const enhance = compose(
  withRouter,
  connect(
    (state) => {
      return {
        movies: content.selectors.moviesFromSelectors(state),
        token: content.selectors.tokenFromSelectors(state),
        isTokenFalse: !!content.selectors.tokenFromSelectors(state),
      };
    },
    (dispatch) => {
      return {
        getMovies: bindActionCreators(content.actions.getMovies, dispatch),
        signOut: bindActionCreators(content.actions.signOut, dispatch),
      };
    }
  )
);

// const enhance = connect(
//   // (state) => ({
//   //   error: content.selectors.getMoviesError(state),
//   // }),
//   null,
//   (dispatch) => ({
//     getMovies: bindActionCreators(content.actions.getMovies, dispatch),
//   })
// );

export default enhance(Private);

// function mapStateToProps({ movies }) {
//   console.log(movies);
//   return {
//     movies: movies,
//     token: "",
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//       setMovies: movies => dispatch({ type: "SHOW_MOVIES", movies }), //sitai yra tai, kas keliauja i content/index.js action
//       setToken: token => dispatch({ type: "SET_TOKEN", token })
//   }
// }
 
// export default connect(mapStateToProps, mapDispatchToProps)(Private);
