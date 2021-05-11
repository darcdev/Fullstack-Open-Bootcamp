import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${country}`)
      .then((response) => {
        console.log(response.data);
        setCountries(response.data);
      });
  }, [country]);

  return (
    <>
      find countries{" "}
      <input value={country} onChange={(evt) => setCountry(evt.target.value)} />
      {countries.length > 10 ? (
        <p>Too many matches , specify another filter</p>
      ) : (
        <>
          {countries.length === 1 ? (
            <div>
              <h2>{countries[0].name}</h2>
              <p>
                <b>Capital</b> : {countries[0].capital}{" "}
              </p>
              <p>
                <b>Population</b> : {countries[0].population}{" "}
              </p>

              <h4>Languages</h4>

              <ul>
                {countries[0].languages.map((language) => (
                  <li key={language.name}>{language.name}</li>
                ))}
              </ul>
              <div>
                <img
                  width="150"
                  src={countries[0].flag}
                  alt={countries[0].name}
                />
              </div>
            </div>
          ) : (
            <>
              {countries.map((country) => (
                <div key={country.name}>{country.name}</div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
