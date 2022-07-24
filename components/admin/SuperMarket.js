import { Button, ButtonGroup, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "../../styles/Compare.module.css";
const getData = (setAllSupers) => {
  fetch(`/api/supermarket`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => setAllSupers(res));
};
function SuperMarket(props) {
  const [allSupers, setAllSupers] = useState([]);
  useEffect(() => getData(setAllSupers), []);
  return (
    <>
      <div className={style.products}>
        {allSupers.map((superm) => (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              p: 1,
              margin: 3,
              boxSizing: "border-box",
            }}
            key={superm._id}
          >
            <h4>title: {superm.title}</h4>
            <h6>titleheb: {superm.titleheb}</h6>
            <h6>location: {superm.location.city}</h6>
            <h6>
              coordinates: {superm.location.latitude} /{" "}
              {superm.location.longitude}
            </h6>

            <h6>url:{superm.url}</h6>
            <ButtonGroup
              sx={{ display: "flex", justifyContent: "center", py: 4 }}
            >
              <Button title="update">Update </Button>
              <Button title="delete">Delete </Button>
            </ButtonGroup>
          </Card>
        ))}
      </div>
      <Button>Add super market</Button>
    </>
  );
}

export default SuperMarket;
