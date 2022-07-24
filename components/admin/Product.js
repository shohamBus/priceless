import { Button, ButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
const getData = (setAllProducts) => {
  fetch(`/api/product`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => setAllProducts(res));
};

function Product() {
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => getData(setAllProducts), []);
  console.log(allProducts);
  return (
    <ButtonGroup sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <Button>Add product</Button>
      <Button>Update product</Button>
      <Button>Delete product</Button>
    </ButtonGroup>
  );
}

export default Product;
