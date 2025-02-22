import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeather API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });

      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("City not found or an error occurred.");
      setWeather(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white">
      <motion.h1 
        className="text-4xl font-extrabold mb-8 drop-shadow-xl tracking-wide" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        Weather App
      </motion.h1>
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-400 w-80 shadow-md transition-all"
          placeholder="Enter city name..."
        />
        <motion.button
          onClick={fetchWeather}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded-lg shadow-lg transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Get Weather
        </motion.button>
      </div>
      {error && <p className="text-red-300 font-semibold text-lg">{error}</p>}
      {weather && (
        <motion.div 
          className="p-8 bg-white rounded-2xl shadow-2xl text-gray-900 text-center w-96 hover:shadow-3xl transition-all transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-3 text-indigo-700">{weather.name}</h2>
          <p className="text-lg text-gray-600 capitalize font-medium">{weather.weather[0].description}</p>
          <p className="text-5xl font-extrabold mt-3 text-indigo-800">{weather.main.temp}°C</p>
        </motion.div>
      )}
    </div>
  );
};

export default WeatherApp;
