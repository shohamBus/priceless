import * as React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import styles from "../../styles/SupersCheckbox.module.css";
import { useCompare } from "../../context/CompareContext";
import { AppBar, MenuItem, Toolbar } from "@mui/material";
import { Container } from "react-bootstrap";

export const SupersCheckbox = () => {
  const { allSupers, setAllSupers, positions } = useCompare();
  //check or not check the choosen super
  const handleChange = (obj) => {
    setAllSupers((prevState) => {
      const newSuper = prevState.map((item) => {
        return item.title === obj.title
          ? {
              ...item,
              checked: !item.checked,
            }
          : item;
      });
      return newSuper;
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
              {allSupers.map((v) => (
                <MenuItem
                  key={v._id}
                  className={styles.imageclass}
                  onClick={(e) => handleChange(v)}
                >
                  {v.checked && (
                    <div style={{ position: "absolute", zIndex: 1 }}>
                      <Image
                        src="/super.png"
                        width={40}
                        height={40}
                        alt={v.title}
                      />
                    </div>
                  )}

                  <Image src={v.img} width={120} height={40} alt={v.title} />

                  {positions.map((p) =>
                    p.name == v.title ? `המרחק ממקומך הוא: ${p.d} קמ` : null
                  )}
                </MenuItem>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
