import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import Image from "next/image";
import * as React from "react";
import UserDetails from "./UserDetails";
import Box from "@mui/material/Box";
import Session from "./login-btn";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import Link from "next/link";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "whitesmoke",
        display: "flex",
      }}
    >
      <UserDetails />
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
        <Link href="./admin">
          <AdminPanelSettingsIcon
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              cursor: "pointer",
              height: 40,
              width: 40,
            }}
          />
        </Link>
      </Container>
    </AppBar>
  );
};
export default Header;
