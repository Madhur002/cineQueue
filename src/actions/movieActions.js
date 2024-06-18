/* eslint-disable no-unused-vars */
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = 'http://localhost:3000';

export const fetchMovies = () => async dispatch => {
  const response = await axios.get(`${apiUrl}/movies`);
  dispatch({ type: 'FETCH_MOVIES', payload: response.data });
};
export const fetchUserMovies = () => async dispatch => {
  const response = await axios.get(`${apiUrl}/usermovies`);
  dispatch({ type: 'FETCH_USER_MOVIES', payload: response.data });
};  

export const addMovie = (movie) => async dispatch => {
  const response = await axios.post(`${apiUrl}/movies`, movie);
  dispatch({ type: 'ADD_MOVIE', payload: response.data });
};

export const editMovie = (id, updatedMovie) => async dispatch => {
  const response = await axios.put(`${apiUrl}/usermovieedit/${id}`, updatedMovie);
  toast.success(`${updatedMovie.original_title} Updated`);
  dispatch({ type: 'EDIT_MOVIE', payload: response.data });
};

export const deleteMovie = (id) => async dispatch => {
  await axios.delete(`${apiUrl}/usermovies/${id}`);
  dispatch({ type: 'DELETE_MOVIE', payload: id });
};

// actions/movieActions.js
export const getUserMovie = (movieId, user) => async dispatch => {
  try {
    const userId = user._id;
    const response = await axios.post(`${apiUrl}/getUserMovie`, { movieId, userId });
    dispatch({ type: 'USER_MOVIE', payload: response.data });
  } catch (error) {
    console.error('Error getting movie:', error);
  }
};


export const toggleWatched = (movieId, watchStatus, user, movieData ) => async dispatch => {
  try {
    console.log("Updated rating:", watchStatus);
    const userId = user._id;
    // Check if the movie already exists in the user's collection
    const response = await axios.post(`${apiUrl}/usermoviewatch`, { movieId, userId, watchStatus, ...movieData });
    toast.success(`Status Updated`);
    dispatch({
      type: "TOGGLE_WATCHED",
      payload: { id: movieId, watched: watchStatus },
    });
  } catch (error) {
    console.error('Error updating movie:', error);
  }
};

export const rateMovie = (movieId, newRating, user, movieData) => async dispatch => {
  try {
    console.log("Updated rating:", newRating);
    const userId = user._id;
    // Check if the movie already exists in the user's collection
    const response = await axios.post(`${apiUrl}/usermovies`, { movieId, userId, newRating, ...movieData });
    toast.success(`${movieData?.original_title} Rated ${newRating}`);
    dispatch({
      type: "RATE_MOVIE",
      payload: { id: movieId, rating: newRating },
    });
  } catch (error) {
    console.error('Error rating movie:', error);
  }
};

export const reviewMovie = (id, review) => async dispatch => {
  const response = await axios.put(`${apiUrl}/${id}`, { review });
  dispatch({ type: 'REVIEW_MOVIE', payload: response.data });
};
