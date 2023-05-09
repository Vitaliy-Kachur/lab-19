import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AboutCountry.css";

function CountryDetails() {
  const { name } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [allCountries, setAllCountries] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((response) => {
        setCountryData(response.data[0]);
      })
      .catch((error) => {});
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((error) => {});

    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((error) => {});
  }, [name]);

  return (
    <div className="about">
      <Link to="/">Back to Home</Link>
      {countryData && allCountries ? (
        <div className="flex">
          <div>
            <div className="country-details">{countryData.name.common}</div>
            <img
              className="img-details"
              src={countryData.flags.svg}
              alt={countryData.name.common}
            />
          </div>
          <div className="details-container">
            {countryData.region && (
              <div className="region-details">Region: {countryData.region}</div>
            )}
            {countryData.subregion && (
              <div className="region-details">
                Subregion: {countryData.subregion}
              </div>
            )}
            {countryData.status && (
              <div className="region-details">Status: {countryData.status}</div>
            )}
            {countryData.capital && (
              <div className="region-details">
                Capital: {countryData.capital}
              </div>
            )}
            {countryData.altSpellings && (
              <div className="region-details">
                AltSpellings: {countryData.altSpellings}
              </div>
            )}
            {countryData.languages && (
              <div className="region-details">
                Languages: {Object.values(countryData.languages).join(", ")}
              </div>
            )}
            {countryData.borders && (
              <div className="region-details">
                Borders: {countryData.borders.join(", ")}
              </div>
            )}
            {countryData.area && (
              <div className="region-details">Area: {countryData.area}</div>
            )}
            {countryData.continents && (
              <div className="region-details">
                Continents: {countryData.continents}
              </div>
            )}
            {countryData.startOfWeek && (
              <div className="region-details">
                StartOfWeek: {countryData.startOfWeek}
              </div>
            )}
            {countryData.fifa && (
              <div className="region-details">Fifa: {countryData.fifa}</div>
            )}
            {countryData.population && (
              <div className="region-details">
                Population: {countryData.population}
              </div>
            )}
            {countryData.tld && (
              <div className="region-details">Td: {countryData.tld}</div>
            )}
            {countryData.name.official && (
              <div className="region-details">
                Official: {countryData.name.official}
              </div>
            )}
            {countryData.flag && (
              <div className="region-details">Flag: {countryData.flag}</div>
            )}
          </div>
          <div className="details-container-gerb">
            <img
              className="img-details2"
              src={countryData.coatOfArms.svg}
              alt={countryData.coatOfArms}
            />
          </div>
        </div>
      ) : countryData === null ? (
        <div>Loading....</div>
      ) : (
        <div>There was an error loading the data.</div>
      )}
    </div>
  );
}
export default CountryDetails;
