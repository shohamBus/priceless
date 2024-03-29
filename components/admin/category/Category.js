import { Button, ButtonGroup, Input } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DialogCategory from "./DialogCategory";
const getData = (setAllCategories) => {
  fetch(`/api/category`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => setAllCategories(res));
};

function Category() {
  const [allCategories, setAllCategories] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [categoryId, setCategoryId] = useState([]);
  const [newCategory, setNewCategory] = useState({
    title: "",
    titleheb: "",
    img: "",
  });
  useEffect(() => getData(setAllCategories), []);
  const updateState = (change, val) => {
    change == "title"
      ? setNewCategory({ ...newCategory, title: val })
      : change == "titleheb"
      ? setNewCategory({ ...newCategory, titleheb: val })
      : change == "img"
      ? setNewCategory({ ...newCategory, img: val })
      : "";
  };
  const addCategory = (newCategory) => {
    fetch(`/api/category`, {
      method: "POST",
      body: JSON.stringify(newCategory),
    });
  };
  const columns = [
    { field: "category_name", headerName: "Name", width: 300 },
    { field: "titleheb", headerName: "Name in hebrew", width: 300 },
    { field: "img", headerName: "src for image", width: 300 },
  ];

  const rows = [
    ...allCategories.map((v) => {
      return {
        id: v._id,
        category_name: v.title,
        titleheb: v.titleheb,
        img: v.img,
      };
    }),
  ];
  const dialog = (categoryId) => {
    setOpen(true);
    setCategoryId(categoryId);
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
      <DialogCategory categoryId={categoryId} open={open} setOpen={setOpen} />
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
        <h3>Add new category</h3>
        <Input
          onChange={(e) => updateState("title", e.target.value)}
          type="text"
          placeholder="enter title"
        ></Input>
        <Input
          onChange={(e) => updateState("titleheb", e.target.value)}
          type="text"
          placeholder="enter title in hebrew"
        ></Input>
        <Input
          onChange={(e) => updateState("img", e.target.value)}
          type="text"
          placeholder="enter src fot image"
        ></Input>
        <Button onClick={() => addCategory(newCategory)}>Add category</Button>
      </ButtonGroup>
    </>
  );
}
export default Category;
