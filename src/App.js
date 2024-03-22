import { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import Card from "./card";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      <input
        className="search"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
      />

      {weather.main ? (
        <Card weather={weather} />
      ) : (
        <div className="empty">
          <p>No data is here, type in the search bar and hit enter.</p>
        </div>
      )}
    </div>
  );
};

export default App;
