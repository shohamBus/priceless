import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DropDownCart from "./DropDownCart";
import DropDownLocation from "./DropDownLocation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Card } from "@mui/material";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "block",

  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {},
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {},
}));

export default function UserDetails() {
  const [actions, setActions] = useState([
    {
      icon: <ShoppingCartIcon />,
      name: "cart",
      checked: false,
      comp: <DropDownCart />,
    },
    {
      icon: <LocationOnIcon />,
      name: "location",
      checked: true,
      comp: <DropDownLocation />,
    },
  ]);
  const direction = "right";
  const Update = (action) => {
    setActions((prevState) => {
      const newAction = prevState.map((item) => {
        return item.name === action.name
          ? {
              icon: item.icon,
              name: item.name,
              checked: !item.checked,
              comp: item.comp,
            }
          : {
              icon: item.icon,
              name: item.name,
              checked: !item.checked,
              comp: item.comp,
            };
      });
      return newAction;
    });
  };
  return (
    <Box
      sx={{
        transform: "translateZ(0px)",
        flexGrow: 1,
        display: "block",
      }}
    >
      <FormControl
        component="fieldset"
        sx={{ mt: 1, display: "flex" }}
      ></FormControl>
      <Box sx={{ position: "absolute", m: 2, height: 20, left: 0, top: 0 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          FabProps={{
            color: "",
          }}
          icon={<AccountCircleIcon />}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              ButtonProps={{ color: "black" }}
              sx={{ display: "flex", my: 2 }}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => Update(action)}
            ></SpeedDialAction>
          ))}
        </StyledSpeedDial>
        <Card sx={{ display: "block" }}>
          {actions.map((action) => action.checked && action.comp)}
        </Card>
      </Box>
    </Box>
  );
}
