import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
const CONFIG = require("../../config/config");

export const getSpaces = createAsyncThunk('twitter/getspaces',
async({query,state,userId},{ rejectWithValue }) => {

    try {
        // make request to backend
        const { data } = await axios.get(CONFIG.API_URL+'/twitter/getspaces',{params:{q:query,state:state,user_id:userId}})
        console.log(data);
        return data;

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

const initialState = {
    spaces:[], // for user object
    isLoading: false,
    isError: false,
    isSuccess: false, // for monitoring the registration process.
    errMessage: '',
  }

export const twitterSlice = createSlice({
    name: 'twitter',
    initialState,
    reducers: {

      clearState: (state) => {
        state.spaces = [];
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.errMessage= "";
        return state;
      },

    },
    extraReducers: {

      [getSpaces.pending]: (state) => {
        state.isLoading = true
        state.isError = false
        
      },
      [getSpaces.fulfilled]: (state, { payload }) => {
        state.authData = payload
        state.isLoading = false
        state.isSuccess = true 
        state.isError = false
        state.spaces = payload.data
      },
      [getSpaces.rejected]: (state, { payload }) => {
        state.isLoading = false
        state.errorMessage = payload.message
      },

    },
  })
  export const {clearState } = twitterSlice.actions;
  export const twitterSelector = (state) => state.twitter;