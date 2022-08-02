import { Button, ButtonGroup, Input } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DialogLocation from "./DialogLocation";
import React, { useEffect, useState } from "react";
const getData = (setAllLocations) => {
  fetch(`/api/location`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => setAllLocations(res));
};

function Location() {
  const [allLocations, setAllLocations] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [locationId, setLocationId] = useState([]);
  const [newLocation, setNewLocation] = useState({
    city: "",
    latitude: "",
    longitude: "",
  });
  useEffect(() => getData(setAllLocations), []);
  const updateState = (change, val) => {
    change == "city"
      ? setNewLocation({ ...newLocation, city: val })
      : change == "latitude"
      ? setNewLocation({ ...newLocation, latitude: val })
      : change == "longitude"
      ? setNewLocation({ ...newLocation, longitude: val })
      : "";
  };
  const addLocation = (newLocation) => {
    fetch(`/api/location`, {
      method: "POST",
      body: JSON.stringify(newLocation),
    });
  };
  const columns = [
    { field: "city", headerName: "City", width: 300 },
    { field: "latitude", headerName: "latitude", width: 300 },
    { field: "longitude", headerName: "longitude", width: 300 },
  ];

  const rows = [
    ...allLocations.map((v) => {
      return {
        id: v._id,
        city: v.city,
        latitude: v.latitude,
        longitude: v.longitude,
      };
    }),
  ];
  const dialog = (locationId) => {
    setOpen(true);
    setLocationId(locationId);
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
          onSelectionModelChange={(locationId) => dialog(locationId)}
        />
      </Box>
      <DialogLocation locationId={locationId} open={open} setOpen={setOpen} />
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
        <h3>Add new location</h3>
        <Input
          onChange={(e) => updateState("city", e.target.value)}
          type="text"
          placeholder="city"
        ></Input>
        <Input
          onChange={(e) => updateState("latitude", e.target.value)}
          type="text"
          placeholder=" Latitude"
        ></Input>
        <Input
          onChange={(e) => updateState("longitude", e.target.value)}
          type="text"
          placeholder="Longitude"
        ></Input>
        <Button onClick={() => addLocation(newLocation)}>Add location</Button>
      </ButtonGroup>
    </>
  );
}

export default Location;
