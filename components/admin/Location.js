import { Button, ButtonGroup } from "@mui/material";
import FormControl from "@mui/material/FormControl";
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
      <DialogLocation locationId={locationId} open={open} setOpen={setOpen} />;
      <h3>Add new location</h3>
      <ButtonGroup sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <input
          onChange={(e) => updateState("city", e.target.value)}
          type="text"
          placeholder="city"
        ></input>
        <input
          onChange={(e) => updateState("latitude", e.target.value)}
          type="text"
          placeholder=" Latitude"
        ></input>
        <input
          onChange={(e) => updateState("longitude", e.target.value)}
          type="text"
          placeholder="Longitude"
        ></input>
        <Button onClick={() => addLocation(newLocation)}>Add location</Button>
      </ButtonGroup>
    </>
  );
}

export default Location;
