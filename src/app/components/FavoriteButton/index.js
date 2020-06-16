import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { compose, bindActionCreators } from "redux";

import content from "../../../content";

function FavoriteButton ({children, onclick, id, isFavorite, toggleFavorite}) {

    //  const changeButton = event => {
    //     //console.log(event.target.value);
    //     console.log("veikia");
    // }

    const changeButton = () => toggleFavorite(id);

    // const changeButton = id => {
    //   console.log(id);
    //   if (favorites.includes(id)) {
    //     console.log(id, favorites);
    //     //setFavorites(favorites.filter(el => el != id));
    //     //favorites = favorites.filter(el => el != id); //cia bandymas stata tiesiogiai mutuoti, todel neveikia, nes jis nemutabilus
    //     //zodziu, esme tokia, kad viskas vyksta per funkcijas. nori kazka state pakeisti - kvieti funkcija, kuri ta pakeitima atlieka
    //   } else {
    //     //setFavorites(favorites.concat(id));
    //     console.log(id + ", nerado");
    //     //favorites = favorites.concat(id);
    //   }
    // } 

    let mode = isFavorite ? "outline" : "regular";

    let modeClass = mode === "outline" ? "btn-outline btn" : "btn"; 
    return (

            // <button className={modeClass} id={id} onClick={ () => changeButton(id) }>{favorites.includes(id) ? "Remove" : "Favorite"}</button>
            <button className={modeClass} id={id} onClick={ () => changeButton(id) }>{isFavorite ? "Remove" : "Favorite"}</button>
    );
}


const enhance = compose(
  withRouter,
  connect(
    (state, {id}) => {
      return {
        isFavorite: content.selectors.isFavoriteById(state, id),
        //favorites: favorites,
      };
    },
    (dispatch) => {
      return {
        //toggleFavorite: bindActionCreators(content.actions.toggleFavorite, dispatch),
        //toggleFavorite: id => dispatch({ type: "TOGGLE_FAVORITE", id })
        toggleFavorite: bindActionCreators(content.actions.toggleFavorite, dispatch),
      };
    }
  )
);

export default enhance(FavoriteButton);


// function mapStateToProps({ favorites }) {
//     //console.log(favorites);
//     return {
//       favorites: favorites,
//     };
//   }

// function mapDispatchToProps(dispatch) {
//     return {
//         toggleFavorite: id => dispatch({ type: "TOGGLE_FAVORITE", id })
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);