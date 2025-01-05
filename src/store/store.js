import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./cryptoSlice";
import chartReducer from "./chartSlice";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    chart: chartReducer,
  },
});
