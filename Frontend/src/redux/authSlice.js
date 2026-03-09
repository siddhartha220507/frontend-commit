import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, signupUser, logoutUser } from '../services/authApi';

// Async Thunks
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const data = await loginUser(credentials);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
});

export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
    try {
        const data = await signupUser(userData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await logoutUser();
        localStorage.removeItem('token');
        return null;
    } catch (error) {
        return thunkAPI.rejectWithValue('Logout failed');
    }
});

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => { state.isLoading = true; })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            // Signup
            .addCase(signup.pending, (state) => { state.isLoading = true; })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                localStorage.removeItem('user');
            });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
