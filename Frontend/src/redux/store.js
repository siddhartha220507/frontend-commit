import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import favoriteReducer from './favoriteSlice';
import historyReducer from './historySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        favorites: favoriteReducer,
        history: historyReducer
        // movies: movieReducer
    }
});
