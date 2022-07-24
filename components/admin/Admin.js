import React, { useEffect, useState } from "react";
import Header from "./Header";
import Nav from "./Nav";

import Supermarket from "./SuperMarket";
import Category from "./Category";
import Location from "./Location";
import Product from "./Product";

const navs = [
  { name: "Super Market" },
  { name: "Category" },
  { name: "Location" },
  { name: "Product" },
];

function Admin(props) {
  const [selectedNav, setSelectedNav] = useState("");
  return (
    <>
      <Header />
      <Nav navs={navs} setSelectedNav={setSelectedNav} />
      {(selectedNav === "supermarket" && <Supermarket />) ||
        (selectedNav === "category" && <Category />) ||
        (selectedNav === "location" && <Location />) ||
        (selectedNav === "product" && <Product />)}
    </>
  );
}

export default Admin;
