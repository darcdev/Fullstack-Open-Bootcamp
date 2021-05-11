import React, { useEffect, useState } from "react";
import axios from "axios";

const DetailsCountry = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.name}`
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {country && weather ? (
        <>
          <h2>{country.name}</h2>
          <p>
            <b>Capital</b> : {country.capital}{" "}
          </p>
          <p>
            <b>Population</b> : {country.population}{" "}
          </p>
          <h4>Languages</h4>
          <ul>
            {country.languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <div>
            <img width="150" src={country.flag} alt={country.name} />
          </div>
          <h4>Weather in {country.name}</h4>
          <p>
            <b>Temperature</b> : {weather.current.temperature} Celsius
          </p>
          <div>
            <img
              src={weather.current.weather_icons[0]}
              alt={weather.current.weather_descriptions[0]}
            />
          </div>
          <b>{weather.current.weather_descriptions[0]}</b>
          {weather.current.wind_speed} mph direction {weather.current.wind_dir}
        </>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
};

export default DetailsCountry;
