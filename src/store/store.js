import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../reducers/movieReducer';
import userReducer from '../reducers/userReducer';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer
  }
});

export default store;
