import React, { useState, useCallback, useEffect } from 'react';
import './index.scss';
import Image from './components/Image';
import FavoriteButton from './components/FavoriteButton';
import Button from './components/Button';
import F from './images/F.png';
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import { connect } from 'react-redux';


function SingleMovie ({ favorites, movie, setMovie }) {
    //let [movie, setMovie] = useState([]);
    let { id } = useParams();

    const getMovie = useCallback( 
        async () => {

        const response = await fetch(`https://academy-video-api.herokuapp.com/content/items/${id}`, {
            method: "GET",
            headers: { authorization: localStorage.getItem("token") }
          })
        if (response.ok) {
        setMovie(await response.json())
        }

        },
        [setMovie]
    );
    


  useEffect(() => {
    getMovie()
  },[getMovie])

  //console.log(movie);
  
    return (
        <div className="App">
            <nav className="nav">
            <Image src={F} alt="logo" />
            <Button>Sign In</Button>
            </nav>

            <div className="Item">
                <div>
                    <div className="movieImage">
                        <img src={movie.image} />
                    </div>
                    <div className="movieDescription">
                        <a>{movie.title}</a><br/>
                        <a>{movie.description}</a>
                    </div>
                </div>
                <FavoriteButton onclick={onclick} id={id}></FavoriteButton>
            </div>

            <footer className="footer">

                <a>We care about your entertainment. Copyright © 2019–2020 felix.com</a>
                <div>
                    cards
                </div>
            </footer>
        </div>
    );
}

//export default SingleMovie;

function mapStateToProps({ movie }) {
    console.log(movie);
    return {
      movie: movie,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        setMovie: movie => dispatch({ type: "SHOW_SINGLE_MOVIE", movie }) //sitai yra tai, kad keliauja i content/index.js action
    }
  }
   
  export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);