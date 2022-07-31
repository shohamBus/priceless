import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { ButtonGroup, Input } from "@mui/material";

export default function DialogCategory({ supermarketId, open, setOpen }) {
  const [supermarket, setSupermarket] = useState({
    title: "",
    titleheb: "",
    url: "",
  });
  useEffect(() => {
    fetch(`/api/supermarket/${supermarketId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setSupermarket(res);
      });
  }, [supermarketId]);

  const updateState = (change, val) => {
    change == "title"
      ? setSupermarket({ ...supermarket, title: val })
      : change == "titleheb"
      ? setSupermarket({ ...supermarket, titleheb: val })
      : change == "url"
      ? setSupermarket({ ...supermarket, url: val })
      : "";
  };

  const deleteSupermarket = (supermarket) => {
    fetch(`/api/supermarket`, {
      method: "DELETE",
      body: JSON.stringify(supermarket),
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
            name of supermarket:{" "}
          </DialogContentText>
          <Input
            onChange={(e) => updateState("title", e.target.value)}
            type="text"
            value={supermarket.title}
          />
          <DialogContentText id="alert-dialog-description">
            name in hebrew supermarket:{" "}
          </DialogContentText>
          <Input
            onChange={(e) => updateState("titleheb", e.target.value)}
            type="text"
            value={supermarket.titleheb}
          />
          <DialogContentText id="alert-dialog-description">
            web site of the supermarket:{" "}
          </DialogContentText>
          <Input
            onChange={(e) => updateState("url", e.target.value)}
            type="text"
            value={supermarket.url}
          />
          <ButtonGroup
            sx={{ display: "flex", justifyContent: "center", py: 4 }}
          >
            <Button>Update supermarket</Button>
            <Button onClick={() => deleteSupermarket(supermarket._id)}>
              Delete supermarket
            </Button>
          </ButtonGroup>
        </DialogContent>
      </Dialog>
    </div>
  );
}
