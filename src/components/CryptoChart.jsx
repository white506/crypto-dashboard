import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadChart, setDays } from "../store/chartSlice";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CryptoChart = ({ coinId }) => {
  const dispatch = useDispatch();
  const { data, status, days } = useSelector((state) => state.chart);
  const { currency } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(loadChart({ coinId, days, currency }));
  }, [dispatch, coinId, days, currency]);

  if (status === "loading") return <p>Загрузка графика...</p>;
  if (status === "failed") return <p>Ошибка загрузки данных</p>;

  const formattedData = data.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    price: price.toFixed(2),
  }));

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">График цены ({days} дней)</h2>

      {/* Кнопки выбора диапазона */}
      <div className="flex space-x-2 mb-4">
        {[1, 7, 30, 90, 365].map((d) => (
          <button
            key={d}
            className={`px-4 py-2 border rounded ${
              days === d ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => dispatch(setDays(d))}
          >
            {d} дн.
          </button>
        ))}
      </div>

      {/* График */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;
