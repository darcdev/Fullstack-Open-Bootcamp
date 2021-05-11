import React from "react";
import CountryContainer from "./CountryContainer";

const Countries = ({ countries }) => {
  return (
    <>
      {countries.map((country) => (
        <CountryContainer key={country.name} country={country} />
      ))}
    </>
  );
};
export default Countries;
