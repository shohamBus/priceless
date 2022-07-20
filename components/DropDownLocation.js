import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCompare } from "../context/CompareContext";
function DropDownLocation() {
  const { locations } = useCompare();
  const [locationDisplay, setLocationDisplay] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
        )
          .then((res) => res.json())
          .then((res) => {
            setLocationDisplay({
              city: `${res.localityInfo.administrative[2].name}`,
              Latitude: position.coords.latitude,
              Longitude: position.coords.longitude,
            });
          });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleChange = (event) => {
    setLocationDisplay(event.target.value);
  };
  console.log(locationDisplay);
  return (
    <>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="locations"> מיקום</InputLabel>
          <Select
            placeholder="בחר מקום"
            id="locations"
            value={locationDisplay}
            label="מיקום"
            onChange={handleChange}
          >
            {locations.map((location) => (
              <MenuItem value={location} key={location._id}>
                {location.city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default DropDownLocation;
