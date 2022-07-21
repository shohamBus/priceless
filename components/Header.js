import { AppBar, Toolbar, Typography, Container, Card } from "@mui/material";
import Image from "next/image";
import * as React from "react";
import Box from "@mui/material/Box";
import Session from "./login-btn";
import DropDownCart from "./DropDownCart";
import DropDownLocation from "./DropDownLocation";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "whitesmoke",
        display: "flex",
      }}
    >
      <Card
        sx={{
          background: "whitesmoke",
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <div>
          <h4>:העגלות שלך </h4>
          <DropDownCart />
        </div>
        <div>
          <h4>:המיקום שלך </h4>
          <DropDownLocation />
        </div>
      </Card>
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
            <Session />
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
};
export default Header;
