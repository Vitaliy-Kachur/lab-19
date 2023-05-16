import { Navigate, Route, Routes } from "react-router"
import React from "react"
import Home from "../Pages/Home"
import AboutCountry from "../Pages/AboutCountry"

import CountryDetails from "../Pages/AboutCountry";

function APPRouter() {
  sessionStorage.setItem("currentPage",1)
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<AboutCountry />} />
      <Route path="/country/:name" element={<CountryDetails />} />
      <Route path="" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default APPRouter;