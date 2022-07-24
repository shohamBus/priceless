import { Button, ButtonGroup } from "@mui/material";

import React, { useEffect, useState } from "react";
const getData = (setAllCategories) => {
  fetch(`/api/category`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => setAllCategories(res));
};
function Category() {
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => getData(setAllCategories), []);
  console.log(allCategories);
  return (
    <ButtonGroup sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <Button>Add category</Button>
      <Button>Update category</Button>
      <Button>Delete category</Button>
    </ButtonGroup>
  );
}

export default Category;
