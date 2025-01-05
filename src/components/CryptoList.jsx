import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCrypto, setSearchQuery } from "../store/cryptoSlice";
import CryptoChart from "./CryptoChart";

const CryptoList = () => {
  const dispatch = useDispatch();
  const { data, status, searchQuery } = useSelector((state) => state.crypto);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    dispatch(loadCrypto());
  }, [dispatch]);

  const filteredData = data.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === "loading") return <p>Загрузка...</p>;
  if (status === "failed") return <p>Ошибка загрузки данных</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Топ-10 криптовалют</h2>

      {/* Поле поиска */}
      <input
        type="text"
        placeholder="Поиск по названию или тикеру..."
        className="w-full p-2 border rounded mb-4"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((coin) => (
          <div
            key={coin.id}
            className="p-4 border rounded-lg shadow-md cursor-pointer"
            onClick={() => setSelectedCoin(coin.id)}
          >
            <div className="flex items-center space-x-3">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <h3 className="text-lg font-semibold">{coin.name} ({coin.symbol.toUpperCase()})</h3>
            </div>
            <p className="mt-2">Цена: ${coin.current_price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* График выбранной криптовалюты */}
      {selectedCoin && (
        <div className="mt-6">
          <CryptoChart coinId={selectedCoin} />
        </div>
      )}
    </div>
  );
};

export default CryptoList;
