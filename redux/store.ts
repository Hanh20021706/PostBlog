import { configureStore } from "@reduxjs/toolkit";
import postSclice from "./postSclice";
import  userSlice  from "./useSlice";


export const store = configureStore({
    reducer:{
        posts : postSclice,
        user : userSlice

    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;