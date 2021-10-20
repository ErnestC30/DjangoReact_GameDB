import { combineReducers } from "redux";

import userSlice from "./userSlice";
import alertSlice from "./alertSlice";

const userReducer = userSlice.reducer;
const alertReducer = alertSlice.reducer;

//Combine reducers into a single reducer to put into redux store.
const rootReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
});

export default rootReducer;
