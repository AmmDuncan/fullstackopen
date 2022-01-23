import React, { useEffect, useState } from "react";
import axios from "axios";

const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${
          country.capital && country.capital[0]
        }&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      });
  }, [country.capital]);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital && country.capital[0]}</p>
      <p>Population {country.population.toLocaleString()}</p>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      {weather && (
        <div>
          <h2>Weather in {country.capital && country.capital[0]}</h2>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>
            <strong>Wind:</strong> {weather.wind.speed} m/s, direction{" "}
            {weather.wind.deg}°
          </p>
        </div>
      )}
    </>
  );
};

export default CountryDetails;
