import * as React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import styles from "../styles/SupersCheckbox.module.css";
import { useCompare } from "../context/CompareContext";
import { AppBar, MenuItem, Toolbar } from "@mui/material";
import { Container } from "react-bootstrap";

export const SupersCheckbox = () => {
  const { supers, setSupers } = useCompare();
  //check or not check the choosen super
  const handleChange = (obj) => {
    setSupers((prevState) => {
      const newSupers = prevState.map((item) => {
        return item.name === obj.name
          ? {
              name: item.name,
              nameheb: item.nameheb,
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
          sx={{
            maxWidth: "xl",
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
              <MenuItem
                className={styles.imageclass}
                onClick={(e) => handleChange(supers[0])}
              >
                {supers[0].checked && (
                  <Image
                    src="/super.png"
                    width={40}
                    height={40}
                    alt="rami-levi"
                  />
                )}

                <Image
                  src="/victory.png"
                  width={120}
                  height={40}
                  alt="victory"
                />
                {!supers[0].checked && (
                  <Image
                    src="/click.png"
                    width={20}
                    height={20}
                    alt="rami-levi"
                  />
                )}
              </MenuItem>
              <MenuItem
                className={styles.imageclass}
                onClick={(e) => handleChange(supers[1])}
              >
                {supers[1].checked && (
                  <Image
                    src="/super.png"
                    width={40}
                    height={40}
                    alt="rami-levi"
                  />
                )}
                <Image
                  src="/shufersal.png"
                  width={120}
                  height={40}
                  alt="sufersal"
                />
                {!supers[1].checked && (
                  <Image
                    src="/click.png"
                    width={20}
                    height={20}
                    alt="rami-levi"
                  />
                )}
              </MenuItem>
              <MenuItem
                className={styles.imageclass}
                onClick={(e) => handleChange(supers[2])}
              >
                {supers[2].checked && (
                  <Image
                    src="/super.png"
                    width={40}
                    height={40}
                    alt="rami-levi"
                  />
                )}
                <Image
                  src="/rami-levi.png"
                  width={120}
                  height={40}
                  alt="rami-levi"
                />
                {!supers[2].checked && (
                  <Image
                    src="/click.png"
                    width={20}
                    height={20}
                    alt="rami-levi"
                  />
                )}
              </MenuItem>
            </Box>{" "}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
