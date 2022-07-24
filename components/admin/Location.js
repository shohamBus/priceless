import { Button, ButtonGroup } from "@mui/material";
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
  useEffect(() => getData(setAllLocations), []);
  console.log(allLocations);
  return (
    <ButtonGroup sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <Button>Add location</Button>
      <Button>Update location</Button>
      <Button>Delete location</Button>
    </ButtonGroup>
  );
}

export default Location;
