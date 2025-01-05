import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCryptoData } from "../api/cryptoApi";

// Асинхронное действие для загрузки данных
export const loadCrypto = createAsyncThunk(
    "crypto/loadCrypto",
    async (_, { getState }) => {
      const { currency } = getState().crypto;
      return await fetchCryptoData(currency);
    }
  );

const cryptoSlice = createSlice({
    name: "crypto",
    initialState: {
      data: [],
      status: "idle",
      searchQuery: "",
      currency: "usd", // Валюта по умолчанию
    },
    reducers: {
      setSearchQuery: (state, action) => {
        state.searchQuery = action.payload;
      },
      setCurrency: (state, action) => {
        state.currency = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loadCrypto.pending, (state) => {
          state.status = "loading";
        })
        .addCase(loadCrypto.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.data = action.payload;
        })
        .addCase(loadCrypto.rejected, (state) => {
          state.status = "failed";
        });
    },
  });
  
  export const { setSearchQuery, setCurrency } = cryptoSlice.actions;
  export default cryptoSlice.reducer;
  
  
