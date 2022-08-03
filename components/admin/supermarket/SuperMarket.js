import { Button, ButtonGroup, Input, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import DialogSupermarket from "./DialogSupermarket";
const getData = (setAllSupers, setAllLocations) => {
  fetch(`/api/supermarket`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => setAllSupers(res));
  fetch(`/api/location`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => setAllLocations(res));
};
function SuperMarket() {
  const [allSupers, setAllSupers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [supermarketId, setSupermarketId] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [newSupermarket, setNewSupermarket] = useState({
    title: "",
    titleheb: "",
    url: "",
    img: "",
    location: "",
  });
  useEffect(() => getData(setAllSupers, setAllLocations), []);
  const updateState = (change, val) => {
    change == "title"
      ? setNewSupermarket({ ...newSupermarket, title: val })
      : change == "titleheb"
      ? setNewSupermarket({ ...newSupermarket, titleheb: val })
      : change == "url"
      ? setNewSupermarket({ ...newSupermarket, url: val })
      : change == "img"
      ? setNewSupermarket({ ...newSupermarket, img: val })
      : change == "location"
      ? setNewSupermarket({ ...newSupermarket, location: val })
      : "";
  };
  const addSupermarket = (newSupermarket) => {
    fetch(`/api/supermarket`, {
      method: "POST",
      body: JSON.stringify(newSupermarket),
    });
  };
  const columns = [
    { field: "supermarket", headerName: "supermarket", width: 200 },
    { field: "titleheb", headerName: "titleheb", width: 200 },
    { field: "website", headerName: "site", width: 200 },
    { field: "img", headerName: "src", width: 200 },
    { field: "location", headerName: "location", width: 200 },
  ];

  const rows = [
    ...allSupers.map((v) => {
      return {
        id: v._id,
        supermarket: v.title,
        titleheb: v.titleheb,
        website: v.url,
        img: v.img,
        location: v?.location?.city,
      };
    }),
  ];
  const dialog = (supermarketId) => {
    setOpen(true);
    setSupermarketId(supermarketId);
  };
  const [city, setCity] = React.useState("");

  const handleChange = (event) => {
    setCity(event.target.value);
  };
  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={(supermarketId) => dialog(supermarketId)}
        />
      </Box>
      <DialogSupermarket
        supermarketId={supermarketId}
        open={open}
        setOpen={setOpen}
      />
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
        <h3>Add new supermarket</h3>
        <Input
          onChange={(e) => updateState("title", e.target.value)}
          type="text"
          placeholder="name"
        ></Input>
        <Input
          onChange={(e) => updateState("titleheb", e.target.value)}
          type="text"
          placeholder=" hebrew name "
        ></Input>
        <Input
          onChange={(e) => updateState("url", e.target.value)}
          type="text"
          placeholder="website"
        ></Input>
        <Input
          onChange={(e) => updateState("img", e.target.value)}
          type="text"
          placeholder="src img"
        ></Input>

        <Select
          sx={{ width: 200 }}
          id="demo-simple-select"
          value={city}
          label="Location"
          placeholder="location"
          onChange={(e) => {
            updateState("location", e.target.value), handleChange(e);
          }}
        >
          {allLocations.map((location) => (
            <MenuItem value={location._id} key={location._id}>
              {location.city}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={() => addSupermarket(newSupermarket)}>
          Add supermarket
        </Button>
      </ButtonGroup>
    </>
  );
}

export default SuperMarket;
