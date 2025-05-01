import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"
import contactReducer from "./contact/contactSlice"
import loaderReducer from "./Loader/loaderSlice"
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import { combineReducers } from "@reduxjs/toolkit";
// import persistReducer from "redux-persist/es/persistReducer";

const persistConfig={
    key:'auth',
    storage,
};

const rootReducer=combineReducers({
  auth: persistReducer(persistConfig, authReducer), // Only auth is persisted
    contact:contactReducer,
    loader:loaderReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST', 
          'persist/REHYDRATE', 
          'persist/PAUSE', 
          'persist/FLUSH', 
          'persist/PURGE', 
          'persist/REGISTER'
        ],
      },
    }),
});

export const persistor = persistStore(store);