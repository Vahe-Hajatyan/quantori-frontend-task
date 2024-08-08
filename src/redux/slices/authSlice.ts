import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface userI {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  refreshToken: string;
}

export interface authI {
  user: userI;
  isAuthenticated: boolean;
  error: string;
}

const initialState: authI = {
  user: {
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    image: '',
    refreshToken: '',
  },
  isAuthenticated: false,
  error: '',
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    payload: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        'https://dummyjson.com/auth/login',
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getMy = createAsyncThunk('auth/getMy', async (token: string) => {
  const response = await axios.get('https://dummyjson.com/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const refresh = createAsyncThunk(
  'auth/refresh',
  async (refreshToken: string) => {
    const response = await axios.post('https://dummyjson.com/auth/refresh', {
      refreshToken: refreshToken,
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = initialState.user;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(login.rejected, (state) => {
        state.isAuthenticated = false;
        state.error = 'Incorrect username or password';
      })
      .addCase(getMy.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(refresh.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
