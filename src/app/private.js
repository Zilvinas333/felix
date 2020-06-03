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



class Private extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        items: [],
        button: "Favorite",
        favorites: [],
      };

  }

  changeButton = id => {
    let {favorites} = this.state;
    console.log(id);
    if (favorites.includes(id)) {
      console.log(id);
      this.setState({favorites: favorites.filter(el => el != id)})
    } else {
      this.setState({favorites: favorites.concat(id)}) 
    }

  }

  async  componentDidMount () {
        try {
            //let items = await fetch(`https://academy-video-api.herokuapp.com/content/items`)

            let response = await fetch(`https://academy-video-api.herokuapp.com/content/items`, {
                method: "GET",
                headers: { authorization: localStorage.getItem("token") }
            })
            console.log(response);
            response = await response.json();
            this.setState(
                {
                  items: response,
                }, 
              );
            // console.log(json.token);
            // localStorage.setItem('token', json.token);

            // items = await items.json();
            // console.log(items);
            // this.setState(
            //     {
            //         items: items,
            //     }, 
            // );
        } catch (e) {
             console.log(e);
        }

    
    }

  render () {
    const { items } = this.state; 
    //console.log(this.state.button);

    //console.log("home", this.props);

    return (

      <div className="App">
        <nav className="nav">
          <Image src={F} alt="logo" />
          <Button>Logout</Button>
        </nav>
       
       <div>
           Private content
       </div>
        
       <section className="displayItems">
          
          <div className="displayItemsWr">
         
          {

            items.map(el => ( //deka skliaustelio galima i kita eilute perkelt
              <Item 
                firstChild="movieImage" 
                secondChild="movieDescription" 
                button={this.state.favorites.includes(el.id) ? "Remove" : "Favorite"} 
                imgSrc={el.image} 
                title={el.title} 
                description={el.description} 
                onclick={() => this.changeButton(el.id)}
                id={el.id}
                isFavorite={this.state.favorites.includes(el.id)}
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
  };
}

//export default Private;
export default withRouter(Private);
