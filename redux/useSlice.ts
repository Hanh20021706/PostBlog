


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
//   builer.addCase(getListPostByCategoryPost.fulfilled, (state, action) => {
//     state.value = action.payload;
// })
  
  }
})


export default userSlice.reducer






// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { PostType } from "../type/post";
// import { UserType } from "../type/user";


// type initialStateType = {
//   // khai báo Type
//   userList: UserType[];
// };

// const userList: UserType[] = [
//   //
//   {
//     id : 1,
//     name : "hanh",
//     email:"hanh@gmail.com",
//     password :"1234"
//   },
// ];

// const initialState: initialStateType = {
//   userList,
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     createUser: (state, action: PayloadAction<UserType>) => {
//       state.userList.push(action.payload); // du
//     },

//     removeUser: (state, action: PayloadAction<{ id: number }>) => {
//       state.userList = state.userList.filter(
//         (user) => user.id !== action.payload.id
//       );
//     },
//     // updatePost: (state, action: PayloadAction<UserType>) => {
//     //     const {
//     //         payload: { email, id, password, name},
//     //       } = action;
    
//     //       state.userList = state.userList.map((user) =>
//     //         user.id === id ? { ...user, email,password, name } : user
//     //       ); 

//     //   // state.todoList.map((item: TodoType) =>
//     //   //   item.id == action.payload.id ? (item = action.payload) : item
//     //   // );
//     // },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { createUser ,removeUser } = userSlice.actions;

// export default userSlice.reducer;
