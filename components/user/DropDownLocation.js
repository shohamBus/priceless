import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCompare } from "../../context/CompareContext";
function DropDownLocation() {
  const { locations, allSupers, positions, setPositions } = useCompare();
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
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          })
          .then(distance());
      });
    } else {
    }
  }, [allSupers]);

  //calculate the distance from the current location to the supers
  const distance = () => {
    let pos = [];
    allSupers.map((v) => {
      let name = v.title;
      let lat1 = locationDisplay.latitude;
      let lon1 = locationDisplay.longitude;
      let lat2 = v.location.latitude;
      let lon2 = v.location.longitude;

      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2 - lat1); // deg2rad below
      var dLon = deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      pos.push({ name: name, d: d.toFixed() });
      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }
    });
    setPositions(pos);
  };
  //on change take the new location
  const handleChange = (event) => {
    setLocationDisplay(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          position: "flex",
          minWidth: 200,
          background: "whitesmoke",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="locations"> {locationDisplay.city}</InputLabel>
          <TextField
            select
            placeholder="בחר מקום"
            id="locations"
            value={locationDisplay.city || ""}
            onChange={(e) => {
              handleChange(e);
              distance();
            }}
          >
            {locations.map((location) => (
              <MenuItem value={location} key={location._id}>
                {location.city}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Box>
    </>
  );
}

export default DropDownLocation;
