import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
const CONFIG = require("../../config/config");


export const registerUser = createAsyncThunk(
  // action type string
  'user/register',
  // callback function
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      // make request to backend
      await axios.post(
        CONFIG.API_URL + '/signup',
        { username, email, password },
        config
      )
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }

  }
)

export const userLogin = createAsyncThunk(
  'user/signin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        CONFIG.API_URL + '/signin',
        { email, password },
        config
      )
      // store user's token in local storage

      localStorage.setItem('user', JSON.stringify(data.data))
      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

const userInfo = JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : null);

const initialState = {
  userInfo, // for user object
  isLoading: false,
  isError: false,
  isSuccess: false, // for monitoring the registration process.
  errMessage: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.errMessage = '';
      return state;
    },

    logout: (state) => {
      localStorage.removeItem('user')
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.userInfo = null;
      state.errMessage = '';
    }

  },
  extraReducers: {

    [userLogin.pending]: (state) => {
      state.isLoading = true
      state.isError = false
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.isSuccess = true;
      state.userInfo = payload.data
    },
    [userLogin.rejected]: (state, { payload }) => {

      state.isLoading = false
      state.isError = true
      state.errMessage = payload
    },


    [registerUser.pending]: (state) => {
      state.isLoading = true
      state.isError = false

    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.isSuccess = true // registration successful
      state.isError = false
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.errorMessage = payload.message
    },


  },
})

export const { logout, clearState } = userSlice.actions;
export const userSelector = (state) => state.user;
