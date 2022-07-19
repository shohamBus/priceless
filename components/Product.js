import React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import style from "../styles/Product.module.css";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useCompare } from "../context/CompareContext";

function Product({ product }) {
  const { addToCart } = useCompare();
  //product card
  return (
    <div className={style.product}>
      <Card onClick={() => addToCart(product)}>
        <CardActionArea>
          <CardMedia>
            <Image
              src={product.img}
              height={100}
              width={100}
              alt={product.title}
            />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Product;
