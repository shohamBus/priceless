import React from "react";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";

function Fruit({ fruit }) {
  console.log(fruit);
  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {fruit.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {fruit.name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Fruit;
