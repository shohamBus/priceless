import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Container,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import style from "../styles/Header.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Session from "./login-btn";

const Header = () => {
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
            >
              <Image
                // className={style.logo}
                src="/logo.png"
                height={53}
                width={297}
                alt="logo"
              />
              <Link href="/about">
                <MenuItem>
                  {" "}
                  <Typography href="#about">אודות</Typography>
                </MenuItem>
              </Link>
            </Typography>
            <MenuItem>
              <Typography href="#articles">מאמרים</Typography>
            </MenuItem>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>{" "}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
