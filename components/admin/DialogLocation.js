import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { ButtonGroup, Input } from "@mui/material";

export default function DialogCategory({ locationId, open, setOpen }) {
  const [location, setLocation] = useState({
    city: "",
    latitude: "",
    longitude: "",
  });
  useEffect(() => {
    fetch(`/api/location/${locationId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setLocation(res);
      });
  }, [locationId]);

  const updateState = (change, val) => {
    change == "city"
      ? setLocation({ ...location, city: val })
      : change == "latitude"
      ? setLocation({ ...location, latitude: val })
      : change == "longitude"
      ? setLocation({ ...location, longitude: val })
      : "";
  };

  const deleteLocation = (location) => {
    fetch(`/api/location`, {
      method: "DELETE",
      body: JSON.stringify(location),
    });
  };
  const updateLocation = (location) => {
    fetch(`/api/location`, {
      method: "PATCH",
      body: JSON.stringify(location),
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
            city of the location:{" "}
          </DialogContentText>
          <Input
            onChange={(e) => updateState("city", e.target.value)}
            type="text"
            value={location.city}
          />

          <DialogContentText id="alert-dialog-description">
            Latitude:{" "}
          </DialogContentText>
          <Input
            onChange={(e) => updateState("latitude", e.target.value)}
            type="text"
            value={location.latitude}
          />
          <DialogContentText id="alert-dialog-description">
            Longitude:{" "}
          </DialogContentText>
          <Input
            onChange={(e) => updateState("longitude", e.target.value)}
            type="text"
            value={location.longitude}
          />
          <ButtonGroup
            sx={{ display: "flex", justifyContent: "center", py: 4 }}
          >
            <Button onClick={() => updateLocation(location)}>
              Update location
            </Button>
            <Button onClick={() => deleteLocation(location._id)}>
              Delete location
            </Button>
          </ButtonGroup>
        </DialogContent>
      </Dialog>
    </div>
  );
}
