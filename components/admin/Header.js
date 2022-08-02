import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "whitesmoke",
        display: "flex",
      }}
    >
      <Container
        sx={{
          maxWidth: "xl",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          color: "black",
        }}
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
            }}
          >
            <h1>Admin Page</h1>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "flex" },
                color: "inherit",
                textDecoration: "none",
              }}
            />
            <Image src="/logo.png" height={53} width={297} alt="logo" />
          </Box>{" "}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
