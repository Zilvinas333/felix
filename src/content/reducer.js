import * as types from "./types";

const DEFAULT_CONTENT_STATE = {
    favorites: [],
    //movies: [],
    movies: {
      loading: false,
      data: [],
      error: null
    },
    token: localStorage.getItem("token"), //cia ideja yra tame, kad jeigu vartotojas uzdare browseri ir i ji grizo, tokenas
    //vis tiek issisaugos, nes kas liecia SET_TOKEN, tai jis setinasi tik su loginu
    login: {
      loading: false,
      error: null,
    },
    //movie: [],
    singleMovie: {
      loading: false,
      data: [],
      error: null
    },
    logout: {
      loading: false,
      error: null,
    },
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

      case types.MOVIES_REQ: //aukstesni movies tipai neveiks su redux-api-middleware, pastarajam reikalinga kitokia 
      //sintakse, kaip kad cia, nurodant visus payload, turis yra sitos bibliotekos objektas ir pan.
        return { ...state, movies: { ...state.movies, loading: true } };
      case types.MOVIES_FAILURE:
        return {
          ...state,
          movies: {
            ...state.movies,
            loading: false,
            data: action.payload,
            error: action.error,
          },
        };
      case types.MOVIES_SUCESS:
        return { ...state, movies: { ...state.movies, loading: false, data: action.payload } };
      //cia jeigu ka, pabandyti pasiloginti movies, galbut filmai datoje randasi. reduxo devtoolsuose arba consoleje.


      case types.SINGLE_MOVIE_REQ: //aukstesni movies tipai neveiks su redux-api-middleware, pastarajam reikalinga kitokia 
      //sintakse, kaip kad cia, nurodant visus payload, turis yra sitos bibliotekos objektas ir pan.
        return { ...state, singleMovie: { ...state.singleMovie, loading: true } };
      case types.SINGLE_MOVIE_FAILURE:
        return {
          ...state,
          singleMovie: {
            ...state.singleMovie,
            loading: false,
            data: action.payload,
            error: action.error,
          },
        };
      case types.SINGLE_MOVIE_SUCESS:
        return { ...state, singleMovie: { ...state.singleMovie, loading: false, data: action.payload } };
      //cia jeigu ka, pabandyti pasiloginti movies, galbut filmai datoje randasi. reduxo devtoolsuose arba consoleje.

      case types.LOGIN_REQ:
        return { ...state, login: { ...state.login, loading: true } };
      case types.LOGIN_FAILURE:
        return {
          ...state,
          login: {
            ...state.login,
            loading: false,
            error: action.payload,
          },
        };
      case types.LOGIN_SUCESS:
        return { ...state, token: action.payload.token, login: { ...state.login, loading: false } }; 
        //payload cia defaultinis objektas is redux-api-middleware, per kuri persiduoda duomenys

      case types.LOGOUT_REQ:
        return { ...state, logout: { ...state.logout, loading: true } };
      case types.LOGOUT_FAILURE:
        return {
          ...state,
          logout: {
            ...state.logout,
            loading: false,
            error: action.payload,
          },
        };
      case types.LOGOUT_SUCESS:
        return { ...state, token: null, logout: { ...state.logout, loading: false } }; 
      
      default:
        return state;
    }
    
  }
   
  export default contentReducer;