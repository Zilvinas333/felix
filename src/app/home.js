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



class App extends React.Component {

  //let [item, displayItems] = useState(props.value);
  //let [stateItems, displayItems] = React.useState(props.value);

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      button: "Favorite",
      favorites: [],

    };

    //console.log(this.state.item); //cia dar nieko nera
  }

  changeButton = id => {
    let {favorites} = this.state;
    console.log(id);
    if (favorites.includes(id)) {
      console.log(id);
      this.setState({favorites: favorites.filter(el => el != id)}) //removina? nes filter grazina array be perduodamo id ir ideda ji i favorites dali objekte? tipo grazinti tuos el, kurie nelygus sitam id
    } else {
      this.setState({favorites: favorites.concat(id)}) //prideda i favoritus esama id, taigi, cia followina
    }
    //console.log(event.target.value);
    //console.log("veikia");
    // if (this.state.button === "Favorite") {
      
    //   this.setState(
    //     {
    //       button: "Remove",
    //     }, 
    //   );
    //   console.log(this.state.id);
    //   // console.log(this.state.button);
    //   event.target.style.backgroundColor = "green";
    // } else if (this.state.button === "Remove") {
    //   this.setState(
    //     {
    //       button: "Favorite",
    //     }, 
    //   );
    //   console.log(this.state.id);
    //   // console.log(this.state.button);
    //   event.target.style.backgroundColor = "red";
    // }
  }
  
async  componentDidMount () {

      try {
        let items = await fetch(`https://academy-video-api.herokuapp.com/content/free-items`)
        items = await items.json();
        console.log(items);
        //console.log(await items.json());
        //displayItems(items);
        this.setState(
          {
            items: items,
          }, 
        );
        //return items;
      } catch (e) {
        console.log(e);
      }

    //console.log(getItems);
    //getItems();
    //window.addEventListener('load', getItems);
    
    //console.log(this.state.item);
  }

  render () {
    const { items } = this.state; 
    //console.log(items[0]);
    console.log(this.state.button);
    // if (this.state.button === "Remove") {
    //  // document.getElementById(items[1].id).backgroundColor = "green";
    //   console.log(this.state.id);
    // }
    
    //kodel neveikia
    // const history = useHistory();
    // const location = useLocation();

    // console.log("Home", { history, location });
    console.log("home", this.props);

    return (

      <div className="App">
        <nav className="nav">
          <Image src={F} alt="logo" />
          <Button>Sign In</Button>
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
            
            {/*items.map(item => <Item firstChild="movieImage" secondChild="movieDescription" button="Favorite" imgSrc={item.image} />)*/}
          {/* { items.map(el => console.log(el)) } */}
         
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

//export default App;
export default withRouter(App);
