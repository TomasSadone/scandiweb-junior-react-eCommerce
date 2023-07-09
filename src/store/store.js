import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currencySelectorReducer from "../slices/currencySelectorSlice";
import cartReducer from "../slices/cartSlice";
import categorySlice from "../slices/categorySlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "persist-key",
  storage,
};

const reducers = combineReducers({
  currency: currencySelectorReducer,
  cart: cartReducer,
  category: categorySlice,
});
//creo que si no se usara el persist el store se configuraria solo con reducer: combineReducers.

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
