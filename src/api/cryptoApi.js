import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";
// const CURRENCY = "btc"; // Можно изменить на eur или usd

export const fetchCryptoData = async (currency) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return [];
    }
  };
  
  export const fetchCryptoChart = async (coinId, days, currency) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
        {
          params: {
            vs_currency: currency,
            days: days, // 1, 7, 30, 90, 365
            interval: "daily",
          },
        }
      );
      return response.data.prices; // Берем только цены
    } catch (error) {
      console.error("Ошибка загрузки графика:", error);
      return [];
    }
  };
  