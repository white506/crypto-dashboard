import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCryptoChart } from "../api/cryptoApi";

// Асинхронное действие для загрузки графика
export const loadChart = createAsyncThunk(
  "chart/loadChart",
  async ({ coinId, days, currency }) => {
    return await fetchCryptoChart(coinId, days, currency);
  }
);

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    data: [],
    status: "idle",
    days: 7, // По умолчанию показываем 7 дней
  },
  reducers: {
    setDays: (state, action) => {
      state.days = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadChart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadChart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(loadChart.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setDays } = chartSlice.actions;
export default chartSlice.reducer;
