import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: "",
  username: "",
  email: "",
  image: "",
  description: "",
  likes: [],
  isLoggedIn: false,
};

/* Configuration of user reducer functions for the redux store */
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      //Receieve a payload containg serialized Profile data to update store.
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.userID = action.payload.user_id;
      state.image = action.payload.image;
      state.description = action.payload.description;
      state.likes = action.payload.likes;
      state.isLoggedIn = true;
    },
    loggedOut: (state) => {
      //Resets the store to initial state.
      state.userID = "";
      state.username = "";
      state.email = "";
      state.image = "";
      state.description = "";
      state.likes = [];
      state.isLoggedIn = false;
    },
    addUserLike: (state, action) => {
      //Add newly liked game title to the redux state.
      const gameTitle = action.payload;
      state.likes = [...state.likes, gameTitle];
    },
    removeUserLike: (state, action) => {
      //Remove the game title from the redux state.
      const gameTitle = action.payload;
      const index = state.likes.indexOf(gameTitle);
      state.likes.splice(index, 1);
    },
  },
});

export const { updateUserInfo, loggedOut, addUserLike, removeUserLike } =
  userSlice.actions;
export default userSlice;
