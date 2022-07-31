import { Button, ButtonGroup } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DialogSupermarket from "./DialogSupermarket";
const getData = (setAllSupers) => {
  fetch(`/api/supermarket`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => setAllSupers(res));
};
function SuperMarket() {
  const [allSupers, setAllSupers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [supermarketId, setSupermarketId] = useState([]);
  const [newSupermarket, setNewSupermarket] = useState({
    title: "",
    titleheb: "",
    url: "",
  });
  useEffect(() => getData(setAllSupers), []);
  const updateState = (change, val) => {
    change == "title"
      ? setNewSupermarket({ ...newSupermarket, title: val })
      : change == "titleheb"
      ? setNewSupermarket({ ...newSupermarket, titleheb: val })
      : change == "url"
      ? setNewSupermarket({ ...newSupermarket, url: val })
      : "";
  };
  const addSupermarket = (newSupermarket) => {
    fetch(`/api/supermarket`, {
      method: "POST",
      body: JSON.stringify(newSupermarket),
    });
  };
  const columns = [
    { field: "supermarket", headerName: "supermarket", width: 300 },
    { field: "titleheb", headerName: "titleheb", width: 300 },
    { field: "website", headerName: "site", width: 300 },
  ];

  const rows = [
    ...allSupers.map((v) => {
      return {
        id: v._id,
        supermarket: v.title,
        titleheb: v.titleheb,
        website: v.url,
        img: v.img,
      };
    }),
  ];
  const dialog = (supermarketId) => {
    setOpen(true);
    setSupermarketId(supermarketId);
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
          onSelectionModelChange={(supermarketId) => dialog(supermarketId)}
        />
      </Box>
      <DialogSupermarket
        supermarketId={supermarketId}
        open={open}
        setOpen={setOpen}
      />
      <h3>Add new supermarket</h3>
      <ButtonGroup sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <input
          onChange={(e) => updateState("title", e.target.value)}
          type="text"
          placeholder="name"
        ></input>
        <input
          onChange={(e) => updateState("titleheb", e.target.value)}
          type="text"
          placeholder=" hebrew name "
        ></input>
        <input
          onChange={(e) => updateState("url", e.target.value)}
          type="text"
          placeholder="website"
        ></input>
        <input
          onChange={(e) => updateState("img", e.target.value)}
          type="text"
          placeholder="src img"
        ></input>
        <Button onClick={() => addSupermarket(newSupermarket)}>
          Add supermarket
        </Button>
      </ButtonGroup>
    </>
  );
}

export default SuperMarket;
