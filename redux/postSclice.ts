import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PostType } from "../type/post";


type initialStateType = {
  // khai báo Type
  postList: PostType[];
};

const postList: PostType[] = [
  //

];

const initialState: initialStateType = {
    postList,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPost: (state, action: PayloadAction<PostType>) => {
      state.postList.push(action.payload); // du
    },

    removePost: (state, action: PayloadAction<{ id: number }>) => {
      state.postList = state.postList.filter(
        (post) => post.id !== action.payload.id
      );
    },
    updatePost: (state, action: PayloadAction<PostType>) => {
        const {
            payload: { title, id, categories, content},
          } = action;
    
          state.postList = state.postList.map((post) =>
            post.id === id ? { ...post, title, categories, content } : post
          ); 

      // state.todoList.map((item: TodoType) =>
      //   item.id == action.payload.id ? (item = action.payload) : item
      // );
    },
  },
});

// Action creators are generated for each case reducer function
export const { createPost, removePost , updatePost } = postSlice.actions;

export default postSlice.reducer;
