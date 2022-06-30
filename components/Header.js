import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Container,
} from "@mui/material";
import Image from "next/image";
import style from "../styles/Header.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "black",
        display: "flex",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
            }}
          >
            <MenuItem>
              {" "}
              <Typography href="#about">אודות</Typography>
            </MenuItem>
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
            >
              <Image
                className={style.logo}
                src="/logo.png"
                height={100}
                width={100}
                alt="logo"
              />
            </Typography>
            <MenuItem>
              <Typography href="#articles">מאמרים</Typography>
            </MenuItem>
          </Box>{" "}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
