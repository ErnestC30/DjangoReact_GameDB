import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: [],
};

/* Configuration of alert reducer functions for the redux store */

const alertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    createAlert: (state, action) => {
      //Create an alert object that contains a message and alert type
      state.alerts.push({
        message: action.payload.message,
        type: action.payload.type,
      });
    },
    //MAYBE NOT NEEDED?
    removeAlert: (state) => {
      //Remove alert object from the list
      state.alerts.shift();
    },
  },
});

export const { createAlert, removeAlert } = alertSlice.actions;
export default alertSlice;
