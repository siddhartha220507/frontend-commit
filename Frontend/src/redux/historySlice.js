import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHistory, addHistory, clearHistory } from '../services/historyApi';

export const fetchHistory = createAsyncThunk('history/getAll', async (_, thunkAPI) => {
    try {
        return await getHistory();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch history');
    }
});

export const addToHistory = createAsyncThunk('history/add', async (movieData, thunkAPI) => {
    try {
        return await addHistory(movieData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add history');
    }
});

export const clearAllHistory = createAsyncThunk('history/clear', async (_, thunkAPI) => {
    try {
        await clearHistory();
        return null;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to clear history');
    }
});

const historySlice = createSlice({
    name: 'history',
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
            .addCase(fetchHistory.pending, (state) => { state.isLoading = true; })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.history || [];
            })
            .addCase(fetchHistory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Add
            .addCase(addToHistory.fulfilled, (state, action) => {
                // If the movie exists in history, we could move it to the front or update, but our API returns the added/updated doc
                // Let's just append it or update it. For simplicity, we just trigger fetchHistory on the frontend usually, but pushing works.
            })
            // Clear
            .addCase(clearAllHistory.fulfilled, (state) => {
                state.items = [];
            })
            // Clear on Logout
            .addCase('auth/logout/fulfilled', (state) => {
                state.items = [];
            });
    }
});

export default historySlice.reducer;
