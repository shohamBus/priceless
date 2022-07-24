import React from "react";
import { AppBar, Button, Container, Typography } from "@mui/material";

function Nav({ navs, setSelectedNav }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#76e346",
        display: "flex",
      }}
    >
      <Container
        sx={{
          maxWidth: "xl",
          display: "flex",
          justifyContent: "center",
          padding: "5px",
        }}
      >
        {navs.map((nav) => (
          <Typography key={nav.name}>
            <Button
              onClick={() =>
                setSelectedNav(nav.name.replace(" ", "").toLowerCase())
              }
            >
              {nav.name}
            </Button>
          </Typography>
        ))}
      </Container>
    </AppBar>
  );
}

export default Nav;
