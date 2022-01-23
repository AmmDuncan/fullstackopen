import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./components/Country";

const contains = (a, b) => {
  return a.toLowerCase().includes(b.toLowerCase());
};

function App() {
  const [countries, setCoutries] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState({});
  const matches = countries.length
    ? countries.filter((country) => contains(country.name.common, search))
    : [];
  const countriesOptimal =
    matches.length <= 10 && matches.length > 0 && matches.length !== 1;
  const countriesMoreThan10 = matches.length > 10;
  const onlyOneCountry = matches.length === 1;

  /* HANDLERS */
  const createShowHandler = (country) => {
    const key = country.name.common;
    return () => setShow({ ...show, [key]: !show[key] });
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCoutries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      Find countries{" "}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {countriesOptimal &&
        matches.map((country) => (
          <div key={country.name.common}>
            <p>
              {country.name.common}{" "}
              <button onClick={createShowHandler(country)}>
                {show[country.name.common] ? "hide" : "show"}
              </button>
            </p>

            {show[country.name.common] && <CountryDetails country={country} />}
          </div>
        ))}
      {countriesMoreThan10 && <p>Too many matches, specify another filter</p>}
      {onlyOneCountry && <CountryDetails country={matches[0]} />}
    </div>
  );
}

export default App;
