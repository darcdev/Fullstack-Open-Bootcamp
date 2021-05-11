import React, { useState } from "react";
import DetailsCountry from "./DetailsCountry";

const CountryContainer = ({ country }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <p>
        {country.name}{" "}
        <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      </p>
      {show && <DetailsCountry key={country.name} country={country} />}
    </>
  );
};

export default CountryContainer;
