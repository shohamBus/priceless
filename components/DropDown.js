import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useCompare } from "../context/CompareContext";
function DropDown() {
  const [cart, setCart] = useState([]);
  const { currentUser, setCartProducts } = useCompare();
  const handleChange = (event) => {
    setCartProducts(event.target.value.products);
    setCart(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="carts-for-user-label"> עגלה</InputLabel>
        <Select
          placeholder="בחר עגלה"
          labelId="carts-for-user-label"
          id="carts-for-user"
          value={cart}
          label="עגלה"
          onChange={handleChange}
        >
          {currentUser.map((cart) => (
            <MenuItem value={cart} key={cart._id}>
              {cart.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropDown;
