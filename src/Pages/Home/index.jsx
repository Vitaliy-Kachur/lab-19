import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CountryList from "./CountryList";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import { slide as Menu } from "react-burger-menu";
import "./Home.css";

function Home() {
  const [allCountry, setAllCountry] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("currentPage")) || 1
  );
  const [countItems, setCountItems] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [Save, getSave] = useState([]);
  const [selectedSubregion, setSelectedSubregion] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredRegions, setFilteredRegions] = useState([]);

  const [isAscendingSort, setIsAscendingSort] = useState(
    sessionStorage.getItem("isAscendingSort") === "true" || true
  );
  const [isAscendingSortById, setIsAscendingSortById] = useState(
    sessionStorage.getItem("isAscendingSortById") === "true" || true
  );

  const regions = allCountry.reduce((acc, country) => {
    const { continents, subregion } = country;
    if (acc[continents]) {
      acc[continents].add(subregion);
    } else {
      acc[continents] = new Set([subregion]);
    }
    return acc;
  }, {});

  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = allCountry
    .filter(
      (country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRegion === "" ||
          country.continents.includes(selectedRegion)) &&
        (selectedSubregion === "" ||
          country.subregion.includes(selectedSubregion))
    )
    .slice(firstCountryIndex, lastCountryIndex);

  const totalItems = allCountry
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (country) =>
        selectedRegion === "" || country.continents.includes(selectedRegion)
    )
    .filter(
      (country) =>
        selectedSubregion === "" ||
        country.subregion.includes(selectedSubregion)
    ).length;

  const paginate = (pageNumber) => {
    sessionStorage.setItem("currentPage", pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  const sortAlphabetically = () => {
    const sorted = [...allCountry].sort((a, b) => {
      const nameA = a.name.common.toLowerCase();
      const nameB = b.name.common.toLowerCase();
      if (isAscendingSort) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setAllCountry(sorted);
    setIsAscendingSort(!isAscendingSort);
    setCurrentPage(1);
    sessionStorage.setItem("isAscendingSort", !isAscendingSort);
  };

  const sortById = () => {
    const sorted = [...allCountry].sort((a, b) => {
      if (isAscendingSortById) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setAllCountry(sorted);
    setIsAscendingSortById(!isAscendingSortById);
    setCurrentPage(1);
    sessionStorage.setItem("isAscendingSortById", !isAscendingSortById);
  };

  const sortContinent = (continent) => {
    setSelectedRegion(continent);
    setSelectedSubregion("");
    if (continent === "") {
      setFilteredRegions(Object.keys(regions));
    } else {
      setFilteredRegions(Array.from(regions[continent]));
    }
    setCurrentPage(1);
  };

  const sortSubregion = (subregion) => {
    setSelectedSubregion(subregion);
    setCurrentPage(1);
  };

  const resetSort = async () => {
    try {
      const result = await axios("https://restcountries.com/v3.1/all");
      const resultAddId = result.data.map((item, ind) => {
        return { ...item, id: ind + 1 };
      });
      setAllCountry(resultAddId);
      setIsAscendingSort(true);
      setIsAscendingSortById(true);
      setSelectedRegion("");
      setSelectedSubregion("");
      setSelectedSubregion("");
      setCurrentPage(1);
    } catch {
      setAllCountry("Error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios("https://restcountries.com/v3.1/all");
        const resultAddId = result.data.map((item, ind) => {
          return { ...item, id: ind + 1 };
        });
        setAllCountry(resultAddId);
        setFilteredRegions(Object.keys(regions));
      } catch {
        setAllCountry("Error");
        setFilteredRegions([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  if (allCountry.length === 0) return <div>Loading....</div>;

  return (
    <>
      <div className="content">
        <div>
          <div className="blok">
            <button className="button burger2" onClick={sortAlphabetically}>
              Sort A-Ua
            </button>
            <button className="button burger2" onClick={sortById}>
              Sort ID
            </button>
            <button className="button burger2" onClick={resetSort}>
              Reset sort
            </button>
            <div className="start">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={handleSearchTermChange}
              />
            </div>
          </div>
          <div className="blok2">
            <div className="rozmir-blok">
              <CountryList allCountry={currentCountry}></CountryList>
            </div>
            <div className="vidobrazutu">
              <div className="top">
                {Object.keys(regions).map((item) => (
                  <div key={item}>
                    <button
                      className={`button ${
                        selectedRegion === item ? "active" : ""
                      } burger`}
                      onClick={() => sortContinent(item)}
                    >
                      {item}
                    </button>
                  </div>
                ))}
              </div>
              {selectedRegion !== "Antarctica" && (
                <div className="subregions">
                  {selectedRegion !== "" &&
                    filteredRegions.map((subregion) => (
                      <button
                        key={subregion}
                        className={`button subregion ${
                          selectedSubregion === subregion ? "active" : ""
                        }`}
                        onClick={() => sortSubregion(subregion)}
                      >
                        {subregion}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <Pagination
            countItems={countItems}
            totalItems={totalItems}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
