import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { ButtonGroup, Input } from "@mui/material";

export default function DialogCategory({ productId, open, setOpen }) {
  useEffect(() => {
    fetch(`/api/product/${productId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);
      });
  }, [productId]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    prices: [],
    img: "",
  });

  const updateState = (change, val) => {
    change == "title"
      ? setProduct({ ...product, title: val })
      : change == "description"
      ? setProduct({ ...product, description: val })
      : change == "category"
      ? setProduct({ ...product, category: val })
      : change == "prices"
      ? setProduct({ ...product, prices: val })
      : change == " img"
      ? setProduct({ ...product, img: val })
      : "";
  };

  const deleteProduct = (productId) => {
    fetch(`/api/product`, {
      method: "DELETE",
      body: JSON.stringify(productId),
    });
  };
  const updateProduct = (product) => {
    fetch(`/api/product`, {
      method: "PATCH",
      body: JSON.stringify(product),
    });
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
            name of the product:{" "}
          </DialogContentText>
          <Input
            onChange={(e) => updateState("title", e.target.value)}
            type="text"
            value={product.title}
          />
          <DialogContentText id="alert-dialog-description">
            description of product:{" "}
          </DialogContentText>
          <Input
            onChange={(e) => updateState("description", e.target.value)}
            type="text"
            value={product.description}
          />
          <DialogContentText id="alert-dialog-description">
            category of product:{" "}
          </DialogContentText>
          <Input
            onChange={(e) => updateState("category", e.target.value)}
            type="text"
            value={product.category?.title}
          />
          <DialogContentText id="alert-dialog-description">
            src image of the product:{" "}
          </DialogContentText>
          <Input
            onChange={(e) => updateState("img", e.target.value)}
            type="text"
            value={product.img}
          />
          <DialogContentText id="alert-dialog-description">
            ditails of supermarkets:{" "}
          </DialogContentText>
          {product.prices?.map((v) => {
            return (
              <>
                <Input
                  onChange={(e) => updateState("img", e.target.value)}
                  type="text"
                  value={v.supermarket.title}
                />
                <Input
                  onChange={(e) => updateState("img", e.target.value)}
                  type="text"
                  value={v.price}
                />
                <Input
                  onChange={(e) => updateState("img", e.target.value)}
                  type="text"
                  value={v.quantity}
                />
              </>
            );
          })}

          <ButtonGroup
            sx={{ display: "flex", justifyContent: "center", py: 4 }}
          >
            <Button onClick={() => updateProduct(product)}>
              Update product
            </Button>
            <Button onClick={() => deleteProduct(product._id)}>
              Delete product
            </Button>
          </ButtonGroup>
        </DialogContent>
      </Dialog>
    </div>
  );
}
