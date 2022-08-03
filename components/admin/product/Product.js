import {
  Button,
  ButtonGroup,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DialogProduct from "./DialogProduct";
const getData = (setAllProducts, setAllCategories, setAllSupers) => {
  fetch(`/api/product`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => setAllProducts(res));
  fetch(`/api/category`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => setAllCategories(res));
  fetch(`/api/supermarket`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => setAllSupers(res));
};

function Product() {
  const [allProducts, setAllProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [productId, setProductId] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allSupers, setAllSupers] = useState([]);

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    category: "",
    prices: [],
    img: "",
  });
  const [newPrices, setNewPrices] = useState([]);
  useEffect(() => getData(setAllProducts, setAllCategories, setAllSupers), []);
  useEffect(() => {
    setNewPrices(
      allSupers.map((s) => ({ supermarket: s._id, price: "", quantity: "" }))
    );
  }, [allSupers]);
  const updateState = (change, val) => {
    change == "title"
      ? setNewProduct({ ...newProduct, title: val })
      : change == "description"
      ? setNewProduct({ ...newProduct, description: val })
      : change == "category"
      ? setNewProduct({ ...newProduct, category: val })
      : change == "prices"
      ? setNewProduct({ ...newProduct, prices: val })
      : change == " img"
      ? setNewProduct({ ...newProduct, img: val })
      : "";
  };
  const updatePricesState = (supermarketId, key, val) => {
    setNewPrices((prevState) => {
      const newPrice = prevState.map((item) => {
        return item.supermarket == supermarketId
          ? {
              ...item,
              [key]: val,
            }
          : item;
      });
      return newPrice;
    });
    updateState("prices", newPrices);
  };
  const addProduct = (newProduct) => {
    fetch(`/api/product`, {
      method: "POST",
      body: JSON.stringify(newProduct),
    });
  };
  const columns = [
    { field: "product_name", headerName: "Name", width: 200 },
    { field: "description", headerName: "description", width: 200 },
    { field: "category", headerName: "category name", width: 200 },
    { field: "img", headerName: "src for image", width: 200 },
  ];

  const rows = [
    ...allProducts.map((v) => {
      return {
        id: v._id,
        product_name: v.title,
        description: v.description,
        category: v.category.title,
        img: v.img,
      };
    }),
  ];
  const dialog = (productId) => {
    setOpen(true);
    setProductId(productId);
  };
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={(categoryId) => dialog(categoryId)}
        />
      </Box>
      <DialogProduct productId={productId} open={open} setOpen={setOpen} />
      <ButtonGroup
        sx={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: "5px  100px",
        }}
      >
        <h3>Add new product</h3>
        <Input
          onChange={(e) => updateState("title", e.target.value)}
          type="text"
          placeholder="enter product name"
        ></Input>
        <Input
          onChange={(e) => updateState("description", e.target.value)}
          type="text"
          placeholder="enter description"
        ></Input>
        <Select
          sx={{ width: 200 }}
          id="demo-simple-select"
          value={category}
          label="Category"
          placeholder="category"
          onChange={(e) => {
            updateState("category", e.target.value), handleChange(e);
          }}
        >
          {allCategories.map((category) => (
            <MenuItem value={category._id} key={category._id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
        {allSupers.map((supermarket) => (
          <InputLabel
            sx={{ display: "flex", justifyContent: "center" }}
            key={supermarket._id}
          >
            <Input
              value={supermarket.title}
              onChange={(e) =>
                updatePricesState(
                  supermarket._id,
                  "supermarket",
                  e.target.value
                )
              }
              type="text"
              key={supermarket.title}
            />
            <Input
              placeholder="price"
              onChange={(e) =>
                updatePricesState(supermarket._id, "price", e.target.value)
              }
              type="text"
              key={supermarket._id}
            />
            <Input
              placeholder="quantity"
              onChange={(e) =>
                updatePricesState(supermarket._id, "quantity", e.target.value)
              }
              type="text"
              key={supermarket._id}
            />
          </InputLabel>
        ))}

        <Input
          onChange={(e) => updateState("img", e.target.value)}
          type="text"
          placeholder="enter src fot image"
        ></Input>
        <Button onClick={() => addProduct(newProduct)}>Add product</Button>
      </ButtonGroup>
    </>
  );
}
export default Product;
