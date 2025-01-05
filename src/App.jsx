import CryptoList from "./components/CryptoList";
import "./App.css";

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Крипто Дашборд</h1>
      <CryptoList />
    </div>
  );
}

export default App;
