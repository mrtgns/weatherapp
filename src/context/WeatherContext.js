import { useState, createContext } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  let weatherData = JSON.parse(localStorage.getItem("city")) || [];
  const [local, setLocal] = useState(weatherData);

  const value = {
    weatherData,
    local,
    setLocal,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export default WeatherContext;
