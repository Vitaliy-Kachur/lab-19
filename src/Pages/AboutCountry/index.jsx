import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AboutCountry.css";

import CountryMap from "../../components/CountryMap";

function CountryDetails() {
  const { name } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [allCountries, setAllCountries] = useState(null);
  const navigate = useNavigate();
  const [displayMap, setDisplayMap] = useState(false);
  const [activeButton, setActiveButton] = useState("details");

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
  }, [name]);

  const handleLanguageClick = (language) => {
    navigate(`/home?language=${language}`);
  };

  const showDetailedInfo = () => {
    setDisplayMap(false);
    setActiveButton("details");
  };

  const showMap = () => {
    setDisplayMap(true);
    setActiveButton("map");
  };

  if (countryData && countryData.name.common === "Russia") {
    return <div>Дані не знайдено</div>;
  }

  return (
    <div className="about">
      <Link className="strong2" to="/">
        Back to Home
      </Link>
      {countryData && allCountries ? (
        <div className="flex">
          <div className="flex2">
            <div className="country-details">{countryData.name.common}</div>
            <div className="flex3">
              <img
                className="img-details"
                src={countryData.flags.svg}
                alt={countryData.name.common}
              />
              <img
                className="img-details2"
                src={countryData.coatOfArms.svg}
                alt={countryData.coatOfArms}
              />
            </div>
          </div>

          <div className="width2">
            <div className="flex1">
              <div
                className={`butto ${
                  activeButton === "details" ? "active" : ""
                }`}
                onClick={showDetailedInfo}
              >
                Show Details
              </div>
              <div
                className={`butto ${activeButton === "map" ? "active" : ""}`}
                onClick={showMap}
              >
                Show Map
              </div>
            </div>
            <div className="details-container">
              {displayMap ? (
                <CountryMap countryName={countryData.name.common} />
              ) : (
                <>
                  {countryData.region && (
                    <div className="region-details">
                      Region: {countryData.region}
                    </div>
                  )}
                  {countryData.subregion && (
                    <div className="region-details">
                      Subregion: {countryData.subregion}
                    </div>
                  )}
                  {countryData.status && (
                    <div className="region-details">
                      Status: {countryData.status}
                    </div>
                  )}
                  {countryData.capital && (
                    <div className="region-details">
                      Capital: {countryData.capital}
                    </div>
                  )}
                  {countryData.altSpellings && (
                    <div className="region-details">
                      AltSpellings:{" "}
                      {Object.values(countryData.altSpellings).join(", ")}
                    </div>
                  )}
                  {countryData.area && (
                    <div className="region-details">
                      Area: {countryData.area}
                    </div>
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
                    <div className="region-details">
                      Fifa: {countryData.fifa}
                    </div>
                  )}
                  {countryData.population && (
                    <div className="region-details">
                      Population: {countryData.population}
                    </div>
                  )}
                  {countryData.tld && (
                    <div className="region-details">Tld: {countryData.tld}</div>
                  )}
                  {countryData.name.official && (
                    <div className="region-details">
                      Official: {countryData.name.official}
                    </div>
                  )}
                  {countryData.flag && (
                    <div className="region-details">
                      Flag: {countryData.flag}
                    </div>
                  )}
                  {countryData.landlocked !== undefined && (
                    <div className="region-details">
                      Landlocked: {countryData.landlocked ? "true" : "false"}
                    </div>
                  )}
                  {countryData.independent !== undefined && (
                    <div className="region-details">
                      Independent: {countryData.independent ? "true" : "false"}
                    </div>
                  )}
                  {countryData.unMember !== undefined && (
                    <div className="region-details">
                      UnMember: {countryData.unMember ? "true" : "false"}
                    </div>
                  )}
                  {countryData.timezones && (
                    <div className="region-details">
                      Timezones:{" "}
                      {Object.values(countryData.timezones).join(", ")}
                    </div>
                  )}
                  {countryData.currencies && (
                    <div className="region-details">
                      Currencies:{" "}
                      {Object.values(countryData.currencies)
                        .map(
                          (currency) => `${currency.name} (${currency.symbol})`
                        )
                        .join(", ")}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="details-container-gerb">
            {countryData.borders && (
              <div className="region-details2">
                Borders:{" "}
                {countryData.borders
                  .map((border) => {
                    const borderCountry = allCountries.find(
                      (country) => country.cca3 === border
                    );
                    return (
                      <Link
                        className="strong"
                        to={`/country/${borderCountry.name.common}`}
                        key={border}
                      >
                        {borderCountry.name.common}
                      </Link>
                    );
                  })
                  .reduce((prev, curr) => [prev, ", ", curr])}
              </div>
            )}
            {countryData.languages && (
              <div className="region-details2">
                Languages:{" "}
                {Object.values(countryData.languages)
                  .map((language) => (
                    <strong
                      className="strong"
                      onClick={() => handleLanguageClick(language)}
                      key={language}
                    >
                      {language}
                    </strong>
                  ))
                  .reduce((prev, curr) => [prev, ", ", curr])}
              </div>
            )}
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
