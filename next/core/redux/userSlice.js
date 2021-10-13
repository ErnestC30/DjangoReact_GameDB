import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userID: "",
    username: "",
    email: "",
    image: "",
    description: "",
  },
  isLoggedIn: false,
};

/* Configuration of reducers for the redux store */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      //Receieve a payload containg serialized Profile data to update store.
      state.user.username = action.payload.user.username;
      state.user.email = action.payload.user.email;
      state.user.userID = action.payload.user_id;
      state.user.image = action.payload.image;
      state.user.description = action.payload.description;
      state.isLoggedIn = true;
    },
    loggedOut(state) {
      //Resets the store to initial state.
      state.user.userID = "";
      state.user.username = "";
      state.user.email = "";
      state.user.image = "";
      state.user.description = "";
      state.isLoggedIn = false;
    },
  },
});

export const { updateUserInfo, loggedOut } = userSlice.actions;
export default userSlice;
