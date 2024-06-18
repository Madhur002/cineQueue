// reducers/movieReducer.js

const initialState = {
  movies: [],
  userMovie: null,
  usermovies: []
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MOVIES":
      return { ...state, movies: action.payload };
    case "FETCH_USER_MOVIES":
      return { ...state, usermovies: action.payload };
    case "ADD_MOVIE":
      return { ...state, movies: [...state.movies, action.payload] };
    case "EDIT_MOVIE":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        ),
      };
    case "DELETE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };
      case "TOGGLE_WATCHED":
        return {
          ...state,
          movies: state.movies.map((movie) => {
            console.log("movie._id, action.payload.id",movie._id, action.payload.id);
            if (movie._id === action.payload.id) {
              return { ...movie, watched: action.payload.watched };
            }
            return movie;
          }),
        };
      case "RATE_MOVIE":
        return {
          ...state,
          movies: state.movies.map((movie) => {
            console.log("movie._id, action.payload.id",movie._id, action.payload.id);
            if (movie._id === action.payload.id) {
              console.log("Movie matched")
              console.log(movie)
              return { ...movie, rating: action.payload.rating };
            }
            return movie;
          }),
        };
    case "USER_MOVIE":
      return { ...state, userMovie: action.payload };  // Handle USER_MOVIE action
    default:
      return state;
  }
};

export default movieReducer;
