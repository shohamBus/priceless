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
import { Update } from "@mui/icons-material";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    // bottom: theme.spacing(2),
    // right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    // top: theme.spacing(2),
    // left: theme.spacing(2),
  },
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
      checked: false,
      comp: <DropDownLocation />,
    },
  ]);
  console.log("actions", actions);
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
          : item;
      });
      return newAction;
    });
  };
  return (
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
      <FormControl
        component="fieldset"
        sx={{ mt: 1, display: "flex" }}
      ></FormControl>
      <Box sx={{ position: "absolute", mt: 0, height: 0 }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<AccountCircleIcon />}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => Update(action)}
            ></SpeedDialAction>
          ))}
        </StyledSpeedDial>
        <div>
          {actions.map((action) => (action.checked ? action.comp : ""))}
        </div>
      </Box>
    </Box>
  );
}