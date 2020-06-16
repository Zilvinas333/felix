import * as types from "./types";

const DEFAULT_CONTENT_STATE = {
    favorites: [],
    movies: [],
    token: localStorage.getItem("token"), //cia ideja yra tame, kad jeigu vartotojas uzdare browseri ir i ji grizo, tokenas
    //vis tiek issisaugos, nes kas liecia SET_TOKEN, tai jis setinasi tik su loginu
    movie: []
  };
  
  function contentReducer(state = DEFAULT_CONTENT_STATE, action) {
    switch (action.type) {
      case types.TOGGLE_FAVORITE_CONST: {
        if (!state.favorites.includes(action.id)) {
          console.log(state);
          return { ...state, favorites: [...state.favorites, action.id] }; //pirmas ...state iki kablelio yra apie tai, kad
          //issaugoti tai, kas nepakito, nes su situo returnu persiraso visas DEFAULT_CONTENT_STATE objektas
          //po state kablelio jis tiesiog paima favorites masyva ir salia jo deda nauja elementa - nauja atkeliavusi id per action.id
        } else {
          console.log(state);
          return { ...state, favorites: state.favorites.filter((id) => id !== action.id) }; //cia jis grazina tuos, kurie neatitinka
          //action.id, t.y. istrina ta tureta id
        }
      }

      case types.SHOW_MOVIES_CONST: {
        return { ...state, movies: action.movies };
      } 
      
      case types.SET_TOKEN_CONST: {
        return { ...state, token: action.token };
      }

      case types.SHOW_SINGLE_MOVIE_CONST: {
        //return { ...state, movie: [...state.movie, action.movie] }; //sitas neuzkraus single, nes cia kruva tu filmu
        return { ...state, movie: action.movie }; //single irasyt i state ideja yra ne tame, kad vaiksciosi per linkus i filmus,
        //ir jie turi visi isirasineti, o tame, kad jeigu pvz linka nusiusiu draugeliui tai jis nueis tiesiai per linka
        //ir kad tas vienas filmas jam ir isirasyti. todel cia ir irasom tik viena ta filma.
      }

      default:
        return state;
    }
    
  }
   
  export default contentReducer;