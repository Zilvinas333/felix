//import React from 'react';
import React, { useState, useCallback, useEffect } from 'react';
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

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
 

const App = ( { favorites, movies, setMovies } ) => {
  //let [movies, setMovies] = useState([]);
  //let [favorites, setFavorites] = useState([]);

  const getMovies = useCallback( 
    async () => {

    const response = await fetch(`https://academy-video-api.herokuapp.com/content/free-items`)
    if (response.ok) {
      setMovies(await response.json())
    }

    },
    [setMovies]
  );
    
  let history = useHistory();

  const goTo = () => {
      history.push('/login');
  }

  useEffect(() => {
    getMovies()
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
  

//console.log(favorites);
    return (

      <div className="App">
        <nav className="nav">
          <Image src={F} alt="logo" />
          <Button onclick={ () => goTo() }>Sign In</Button>
        </nav>
        <header className="header">
          <Image src={header} alt="header" />
          <div className="CTA">
              Wanna More Content?<br/>
              <a className="btn link" href="/login">Get Access</a>
          </div>
        </header>
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
                // onclick={() => changeButton(el.id)}
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

// function mapStateToProps({ favorites }) {
//   //console.log(favorites);
//   return {
//     favorites: favorites,
//   };
// }

// export default connect(mapStateToProps)(App);
//export default App;

function mapStateToProps({ movies }) {
  console.log(movies);
  return {
    movies: movies,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      setMovies: movies => dispatch({ type: content.types.SHOW_MOVIES_CONST, movies }) //sitai yra tai, kad keliauja i content/index.js action
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);