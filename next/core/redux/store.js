import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";

export function makeStore() {
  return configureStore({
    reducer: userSlice.reducer,
  });
}

const store = makeStore();

export default store;
