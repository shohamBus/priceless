import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { ButtonGroup, Input } from "@mui/material";

export default function DialogCategory({ categoryId, open, setOpen }) {
  useEffect(() => {
    fetch(`/api/category/${categoryId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setCategory(res);
      });
  }, [categoryId]);
  const [category, setCategory] = useState({
    title: "",
    titleheb: "",
    img: "",
  });
  console.log("category", category);

  const updateState = (change, val) => {
    change == "title"
      ? setCategory({ ...category, title: val })
      : change == "titleheb"
      ? setCategory({ ...category, titleheb: val })
      : change == "img"
      ? setCategory({ ...category, img: val })
      : "";
  };
  const deleteCategory = (categoryId) => {
    fetch(`/api/category`, {
      method: "DELETE",
      body: JSON.stringify(categoryId),
    });
  };
  const updateCategory = (category) => {
    fetch(`/api/category`, {
      method: "PATCH",
      body: JSON.stringify(category),
    });
    console.log("category", category);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleContent = (e) => {
    return (newTitle = e.target.value);
  };
  //send the cart product the title and the email
  //   const handleClick = async () => {
  // await axios.patch(`/api/user`, { cartProducts, email, title });
  //   };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            name of the category:{" "}
          </DialogContentText>
          <Input
            onChange={(e) => updateState("title", e.target.value)}
            type="text"
            value={category.title}
          />
          <DialogContentText id="alert-dialog-description">
            name in hebrew category:{" "}
          </DialogContentText>
          <Input
            onChange={(e) => updateState("titleheb", e.target.value)}
            type="text"
            value={category.titleheb}
          />
          <DialogContentText id="alert-dialog-description">
            src image of the category:{" "}
          </DialogContentText>
          <Input
            onChange={(e) => updateState("img", e.target.value)}
            type="text"
            value={category.img}
          />

          <ButtonGroup
            sx={{ display: "flex", justifyContent: "center", py: 4 }}
          >
            <Button onClick={() => updateCategory(category)}>
              Update category
            </Button>
            <Button onClick={() => deleteCategory(category._id)}>
              Delete category
            </Button>
          </ButtonGroup>
        </DialogContent>
      </Dialog>
    </div>
  );
}
