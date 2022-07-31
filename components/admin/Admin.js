import React, { useState } from "react";
import Header from "./Header";
import Nav from "./Nav";
import HomeIcon from "@mui/icons-material/Home";
import RefreshIcon from "@mui/icons-material/Refresh";

import Supermarket from "./SuperMarket";
import Category from "./Category";
import Location from "./Location";
import Product from "./Product";
import Link from "next/link";

const navs = [
  { name: "Super Market" },
  { name: "Category" },
  { name: "Location" },
  { name: "Product" },
];

function Admin() {
  const [selectedNav, setSelectedNav] = useState("");
  return (
    <>
      <Link href="./">
        <HomeIcon
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            cursor: "pointer",
            height: 40,
            width: 40,
          }}
        />
      </Link>
      <Link href="./admin">
        <RefreshIcon
          sx={{
            position: "absolute",
            right: 0,
            top: 60,
            cursor: "pointer",
            height: 40,
            width: 40,
          }}
        />
      </Link>
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
