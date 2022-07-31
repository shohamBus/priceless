import { Button, ButtonGroup, Input, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DialogProduct from "./DialogProduct";
const getData = (setAllProducts, setAllCategories) => {
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
};

function Product() {
  const [allProducts, setAllProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [productId, setProductId] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    cat: "",
    // prices: [{ supermarket }],
    img: "",
  });
  console.log("newProduct", newProduct);
  useEffect(() => getData(setAllProducts, setAllCategories), []);
  const updateState = (change, val) => {
    change == "title"
      ? setNewProduct({ ...newProduct, title: val })
      : change == "description"
      ? setNewProduct({ ...newProduct, description: val })
      : change == "cat"
      ? setNewProduct({ ...newProduct, cat: val })
      : change == "prices"
      ? setNewProduct({ ...newProduct, prices: val })
      : change == " img"
      ? setNewProduct({ ...newProduct, img: val })
      : "";
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
    // { field: "prices", headerName: "prices", width: 200 },
    { field: "img", headerName: "src for image", width: 200 },
  ];

  const rows = [
    ...allProducts.map((v) => {
      return {
        id: v._id,
        product_name: v.title,
        description: v.description,
        category: v.category.title,
        // prices: [{ supermarket }],
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
          checkboxSelection
          disableSelectionOnClick
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
        {/* <Input
          onChange={(e) => updateState("prices", e.target.value)}
          type="text"
          placeholder="enter prices"
        ></Input> */}
        <Select
          sx={{ width: 200 }}
          id="demo-simple-select"
          value={category}
          label="Category"
          placeholder="category"
          onChange={(e) => {
            updateState("cat", e.target.value), handleChange(e);
          }}
        >
          {allCategories.map((category) => (
            <MenuItem value={category._id} key={category._id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
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
