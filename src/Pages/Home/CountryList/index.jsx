import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CountryList.css";

function CountryList({ allCountry }) {
  const [selectedCountryCoat, setSelectedCountryCoat] = useState(null);
  const [selectedCountryName, setSelectedCountryName] = useState(null);

  if (allCountry.length === 0) return <div>Loading....</div>;

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
              onMouseEnter={() => {
                setSelectedCountryCoat(item.coatOfArms && item.coatOfArms.svg);
                setSelectedCountryName(item.name.common);
              }}
              onMouseLeave={() => setSelectedCountryCoat(null)}
            >
              <div className="item-left">
                <div className="index">{item.id}</div>
                <img src={item.flags.svg} alt="" />
              </div>
              <div className="item-right">
                <div className="country-info">
                  <div>{item.name.common}</div>
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
            Region:
            {
              allCountry.find(
                (item) => item.coatOfArms?.svg === selectedCountryCoat
              )?.region
            }
          </div>
          <div className="region white">
            Subregion:
            {
              allCountry.find(
                (item) => item.coatOfArms?.svg === selectedCountryCoat
              )?.subregion
            }
          </div>
          <div className="languages white">
            {allCountry.find(
              (item) => item.coatOfArms?.svg === selectedCountryCoat
            )?.languages && (
              <>
                <span>Languages: </span>
                {Object.values(
                  allCountry.find(
                    (item) => item.coatOfArms?.svg === selectedCountryCoat
                  ).languages
                ).join(", ")}
              </>
            )}
          </div>
          <div className="region white">
            Population:{" "}
            {
              allCountry.find(
                (item) => item.coatOfArms?.svg === selectedCountryCoat
              )?.population
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryList;
