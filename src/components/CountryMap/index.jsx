import React from "react";
import "./CountryMap.css";

function CountryMap({ countryName }) {
  return (
    <div>
      <h2 className="rozmir">Map of {countryName}</h2>
      <iframe 
        className="country-map"
        title="Country Map"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBcbQOenBrouiGdjYHHIpHvAD9Lzxn3K84&q=${countryName}`}
        width="99.4%"
        height="500px"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default CountryMap;