export const isFavoriteById = (state, id) => state.content.favorites.includes(id);

export const tokenFromSelectors = (state) => {
    console.log("autentikacija", state.content.token);
    return state.content.token
};

export const moviesFromSelectors = (state) => {
   // console.log("sitas selectorius", state);
    return state.content.movies.data;
}