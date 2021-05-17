import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const api = {
  key: "59f0bb968639853d3197f23d8583d81e",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

 
  const search = evt => {
    if(evt.key == "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => setWeather(result));
        setQuery('')
    }
  }

  const dateBuilder = (d) =>{
    let months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "JUL"];
    let days =["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${year}`
  }
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp - 273.15 > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Sök.."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {/* To convert from kelvin to celsius */}
                {Math.round(weather.main.temp - 273.15)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
