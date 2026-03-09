import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoriteApi';

export const fetchFavorites = createAsyncThunk('favorites/getAll', async (_, thunkAPI) => {
    try {
        return await getFavorites();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch favorites');
    }
});

export const addToFavorites = createAsyncThunk('favorites/add', async (movieData, thunkAPI) => {
    try {
        return await addFavorite(movieData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add favorite');
    }
});

export const removeFromFavorites = createAsyncThunk('favorites/remove', async (movieId, thunkAPI) => {
    try {
        await removeFavorite(movieId);
        return movieId;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to remove favorite');
    }
});

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [],
        isLoading: false,
        isError: false,
        message: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchFavorites.pending, (state) => { state.isLoading = true; })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.favorites || [];
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Add
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.items.push(action.payload.favorite);
            })
            // Remove
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.movieId !== action.payload.toString());
            })
            // Clear on Logout
            .addCase('auth/logout/fulfilled', (state) => {
                state.items = [];
            });
    }
});

export default favoriteSlice.reducer;
