import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import DetailsCountry from "./DetailsCountry";
import Countries from "./Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  useEffect(() => {
    if (country) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${country}`)
        .then((response) => {
          setCountries(response.data);
        });
    }
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
            <DetailsCountry country={countries[0]} />
          ) : (
            <Countries countries={countries} />
          )}
        </>
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
