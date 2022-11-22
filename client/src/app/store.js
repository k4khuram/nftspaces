import { configureStore } from '@reduxjs/toolkit'
import {userSlice} from '../features/user/userSlice'
import {twitterSlice} from '../features/twitter/twitterSlice'



const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    twitter:twitterSlice.reducer
  }
})
export default store