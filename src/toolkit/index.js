import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toolkitSlice from "./toolkitSlice";
import catalogSlice from "./catalogSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//redux-persist - для взаимодействи я с localStorege

const rootReducer = combineReducers(
   {toolkit: toolkitSlice,
    catalog: catalogSlice,
   } 
);

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['catalog'] // этот слайс не добавляется в локалсторедж
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore( {
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

