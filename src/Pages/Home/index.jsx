import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import CountryList from "./CountryList";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
function Home() {

  const [allCountry, setAllCountry] = useState([]);
  const [filterlCountry, setFilterCountry] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(sessionStorage.getItem("currentPage")));
  const [countItems, setCountItems] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const [isAscendingSort, setIsAscendingSort] = useState(true);

  const [isAscendingSortById, setIsAscendingSortById] = useState(true);

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
  const currentCountry = (filterlCountry.length===0? allCountry:filterlCountry)
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(firstCountryIndex, lastCountryIndex);

  const totalItems = allCountry.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  ).length;
  const paginate = (pageNumber) => {
    sessionStorage.setItem("currentPage", pageNumber);
    setCurrentPage(pageNumber);
    // const urlParams = new URLSearchParams(window.location.search);
    // urlParams.set("page", pageNumber);
    // window.history.pushState(
    //   {},
    //   "",
    //   `${window.location.pathname}?${urlParams}`
    // );
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
    localStorage.setItem("isAscendingSort", !isAscendingSort);
    localStorage.setItem("allCountry", JSON.stringify(sorted));
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
    localStorage.setItem("isAscendingSortById", !isAscendingSortById);
    localStorage.setItem("allCountry", JSON.stringify(sorted));
  };
  const resetSort = async () => {
    try {
      const result = await axios.get("https://restcountries.com/v3.1/all");
      const resultAddId = result.data.map((item, i) => {
        return { ...item, id: i + 1 };
      });
      setAllCountry(resultAddId);
    } catch (error) {
      setAllCountry([]);
    }
    setIsAscendingSort(true);
    setIsAscendingSortById(true);
    setCurrentPage(1);
    localStorage.removeItem("isAscendingSort");
    localStorage.removeItem("isAscendingSortById");
  };
  const sortContinent = (continent) => {
    const sorted = [allCountry].filter(
      (country)=>String(country.continents) === String(continent)
    )
    setAllCountry(sorted)
  };


  useEffect(() => {
    const storedCountry = JSON.parse(localStorage.getItem("allCountry"));
    if (storedCountry) {
      setAllCountry(storedCountry);
    } else {
      const fetchCountries = async () => {
        try {
          const result = await axios.get("https://restcountries.com/v3.1/all");
          const resultAddId = result.data.map((item, i) => {
            return { ...item, id: i + 1 };
          });
          setAllCountry(resultAddId);
        } catch (error) {
          console.log("Error fetching countries:", error);
          setAllCountry([]);
        }
      };
      fetchCountries();
    }
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get("page")) || 1;
    setCurrentPage(page);
    localStorage.setItem("currentPage", page);
    const storedSort = localStorage.getItem("isAscendingSort");
    if (storedSort) {
      setIsAscendingSort(JSON.parse(storedSort));
    }
    const storedSortById = localStorage.getItem("isAscendingSortById");
    if (storedSortById) {
      setIsAscendingSortById(JSON.parse(storedSortById));
    }
    if (searchTerm) {
      setCurrentPage(1);
      localStorage.setItem("currentPage", 1);
    }
  }, [searchTerm]);

  if (allCountry.length === 0) return <div>Loading....</div>;
  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="conteinerSort">
        <button className="button" onClick={sortAlphabetically}>
          Sort A-Ua{" "}
        </button>
        <button className="button" onClick={sortById}>
          Sort ID
        </button>
        {
          Object.keys(regions).map((item)=>(
            <button className="button" onClick={sortContinent(item)}>
            {item}
          </button>

          ))
          
        }
        <button className="button" onClick={resetSort}>
          Reset sort
        </button>
      </div>
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
