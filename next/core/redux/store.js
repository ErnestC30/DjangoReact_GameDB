import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import rootReducer from "./combineReducers";

const persistConfig = {
  //timeout -> loading time for page, if states are not loading properly increase timeout
  timeout: 50,
  key: "root",
  storage,
};

//userSlice.reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore() {
  /* Initialize a persistent redux store */
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

const store = makeStore();
export default store;
