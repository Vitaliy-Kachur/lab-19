import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import CountryList from "./CountryList";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
function Home() {
  const [allCountry, setAllCountry] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [countItems, setCountItems] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = allCountry
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(firstCountryIndex, lastCountryIndex);

  const totalItems = allCountry.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  ).length;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", pageNumber);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${urlParams}`
    );
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await axios("https://restcountries.com/v3.1/all");
        const resultAddId = result.data.map((item, i) => {
          return { ...item, id: i + 1 };
        });
        setAllCountry(resultAddId);
      } catch {
        setAllCountry("Error query");
      }
    };
    fetchCountries();
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get("page")) || 1;
    setCurrentPage(page);
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  if (allCountry.length === 0) return <div>Loading....</div>;
  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CountryList allCountry={currentCountry}></CountryList>
      <Pagination
        countItems={countItems}
        totalItems={totalItems}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
}

export default Home;
