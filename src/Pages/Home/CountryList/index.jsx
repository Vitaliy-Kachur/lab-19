import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CountryList.css";

function CountryList({ allCountry }) {
  const [selectedCountryCoat, setSelectedCountryCoat] = useState(null);
  const [selectedCountryName, setSelectedCountryName] = useState(null);

  if (allCountry.length === 0) return <div>Loading....</div>;

  const getCountryData = async (countryName) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      return response.data[0];
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="country">
      <div className="country-list">
        {allCountry.map((item) => (
          <Link
            to={`/country/${item.name.common}`}
            key={item.name.common}
            className="country-item-link"
          >
            <div
              className="country-item"
              onMouseEnter={async () => {
                if (item.name.common === "Russia") {
                  setSelectedCountryCoat(null);
                  setSelectedCountryName("Russia");
                } else {
                  const countryData = await getCountryData(item.name.common);
                  setSelectedCountryCoat(
                    countryData?.coatOfArms?.svg ||
                      item.flags?.svg ||
                      item.coatOfArms?.png ||
                      item.coatOfArms?.emojione
                  );
                  setSelectedCountryName(item.name.common);
                }
              }}
              onMouseLeave={() => {
                setSelectedCountryCoat(null);
                setSelectedCountryName(null);
              }}
            >
              <div className="item-left">
                <div className="index">{item.id}</div>
                <img src={item.flags.svg} alt="" />
              </div>
              <div className="item-right">
                <div className="country-info">
                  <div className="text">{item.name.common}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {selectedCountryCoat && (
        <div className="country-list2">
          <img className="coat-of-arms" src={selectedCountryCoat} alt="" />
          <div className="region white">
            Region:{" "}
            {
              allCountry.find(
                (item) =>
                  item.coatOfArms?.svg === selectedCountryCoat ||
                  item.flags?.svg === selectedCountryCoat
              )?.region
            }
          </div>
          <div className="region white">
            Subregion:{" "}
            {
              allCountry.find(
                (item) =>
                  item.coatOfArms?.svg === selectedCountryCoat ||
                  item.flags?.svg === selectedCountryCoat
              )?.subregion
            }
          </div>
          <div className="languages white">
            {allCountry.find(
              (item) =>
                item.coatOfArms?.svg === selectedCountryCoat ||
                item.flags?.svg === selectedCountryCoat
            )?.languages && (
              <>
                <span>Languages: </span>
                {Object.values(
                  allCountry.find(
                    (item) =>
                      item.coatOfArms?.svg === selectedCountryCoat ||
                      item.flags?.svg === selectedCountryCoat
                  ).languages
                ).join(", ")}
              </>
            )}
          </div>
          <div className="region white">
            Population:{" "}
            {
              allCountry.find(
                (item) =>
                  item.coatOfArms?.svg === selectedCountryCoat ||
                  item.flags?.svg === selectedCountryCoat
              )?.population
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryList;


