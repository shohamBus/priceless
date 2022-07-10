import * as React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import styles from "../styles/SupersCheckbox.module.css";
import { useCompare } from "../context/CompareContext";
import { AppBar, MenuItem, Toolbar } from "@mui/material";
import { Container } from "react-bootstrap";

export const SupersCheckbox = () => {
  const { supers, setSupers } = useCompare();
  const handleChange = (obj) => {
    setSupers((prevState) => {
      const newSupers = prevState.map((item) => {
        return item.name === obj.name
          ? {
              name: item.name,
              checked: !item.checked,
              _id: item._id,
            }
          : item;
      });
      return newSupers;
    });
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#76e346",
          display: "flex",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "5px",
          }}
        >
          <Toolbar disableGutters className={styles.supers}>
            <Box
              className={styles.supers}
              sx={{
                flexGrow: 1,
                maxWidth: 400,
                p: 2,
                display: { xs: "flex", md: "flex" },
              }}
            >
              <MenuItem className={styles.imageclass}>
                {" "}
                <Image
                  src="/victory.png"
                  width={120}
                  height={40}
                  alt="victory"
                  onClick={(e) => handleChange(supers[0])}
                />
              </MenuItem>
              <MenuItem className={styles.imageclass}>
                <Image
                  src="/shufersal.png"
                  width={120}
                  height={40}
                  alt="sufersal"
                  onClick={(e) => handleChange(supers[1])}
                />
              </MenuItem>
              <MenuItem className={styles.imageclass}>
                <Image
                  src="/rami-levi.png"
                  width={120}
                  height={40}
                  alt="rami-levi"
                  onClick={(e) => handleChange(supers[2])}
                />
              </MenuItem>
            </Box>{" "}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
