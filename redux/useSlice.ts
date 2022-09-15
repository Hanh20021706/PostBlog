


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export const getUser:any = createAsyncThunk(
  "user/getUser",
   async () => {
     try {
      const { data } = await axios.get(`/api/user/signin`)
      return data
     } catch (error) {
      console.log(error);
      
     }
  }
)
export const login:any = createAsyncThunk(
  "user/login",
   async (user:any) => {
     try {
      const {data} = await axios.post(`/api/user/signin`,user);
      return data
     } catch (error) {
      console.log(error);
      
     }
  }
)
export const addPost:any = createAsyncThunk(
    "user/add",
    async (post:any) => {
        
    }
)

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    value:[]
  },
  reducers: {
 
  },
  extraReducers: (builer) =>{ 

    builer.addCase(getUser.fulfilled, (state, action) => {
        state.value = action.payload;
    })
    builer.addCase(login.fulfilled, (state:any, action) => {
        state.value = [...state.value, action.payload]
    })

  }
})


export default userSlice.reducer





