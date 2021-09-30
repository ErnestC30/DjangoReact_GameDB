import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: "initial state",
    email: "",
    image: "",
    description: "",
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedIn(state, action) {
      //action payload will be the dictionary containing Profile model data
      state.user.username = action.payload.user.username;
      state.user.email = action.payload.user.email;
      state.user.image = action.payload.image;
      state.user.description = action.payload.description;
      state.isLoggedIn = true;
    },
    loggedOut(state) {
      //reset to initial state?
      state.user.username = "logged out";
      state.user.email = "";
      state.user.image = "";
      state.user.description = "";
      state.isLoggedIn = false;
    },
  },
});

export const { loggedIn, loggedOut } = userSlice.actions;
export default userSlice;
