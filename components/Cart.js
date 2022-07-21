import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useCompare } from "../context/CompareContext";
import { Button, ButtonGroup } from "@mui/material";
import Dialog from "./Dialog";
import style from "../styles/SumSupers.module.css";

import SumSupers from "./SumSupers";
export default function DataTable() {
  const { supers, cartProducts, setCartProducts, addToCart, decrement } =
    useCompare();

  const columns = [
    {
      field: "index",
      headerName: "מספר מוצר",
      sortable: false,
      width: 80,
    },
    { field: "title", headerName: "שם מוצר", width: 130 },
    {
      field: "amount",
      headerName: "כמות",
      renderCell: (params) => {
        return (
          <>
            <ButtonGroup variant="#76e346">
              <Button
                sx={{ backgroundColor: "whitesmokesx" }}
                onClick={() => addToCart(params.row)}
              >
                <strong>+</strong>
              </Button>
              <strong> {params.row.qty} </strong>
              <Button
                sx={{ backgroundColor: "whitesmokesx" }}
                onClick={() => decrement(params.row)}
              >
                <strong>-</strong>
              </Button>
            </ButtonGroup>
          </>
        );
      },
      width: 100,
    },

    ...supers
      .filter((currentSuper) => currentSuper.checked)
      .map((item) => ({
        field: item.name,
        headerName: item.nameheb,
      })),
  ];
  const supersPrices = {};
  const supersPricesSum = {};
  const rows = [
    ...cartProducts.map((row, index) => {
      //each row of product and compare betwrrn the supers
      row.product.prices.forEach((price) => {
        const supermarket = price.supermarket;
        const superChecked = supers.find(
          (currentSuper) =>
            currentSuper._id === supermarket._id && currentSuper.checked
        );

        if (superChecked) {
          const priceSum = price.price * row.qty;
          supersPrices[superChecked.name] = priceSum.toFixed(2);

          supersPricesSum[superChecked.nameheb] =
            (supersPricesSum[superChecked.nameheb] ?? 0) + priceSum;
        }
      });
      return {
        ...row,
        id: row.product._id,
        index: index + 1,
        title: row.product.title,
        ...supersPrices,
      };
    }),
  ];
  //sum in the footer of the cart
  let min = Infinity;
  let max = 0;
  function sum() {
    let entries = Object.entries(supersPricesSum);
    let sum = entries.map(([key, val] = entry) => {
      return (
        <span
          key={key}
          className={
            val <= min
              ? ((min = val), style.spanSumMin)
              : val >= max
              ? ((max = val), style.spanSumMax)
              : style.spanSum
          }
        >
          {`סכום הקנייה של  ${key} הוא ${val.toFixed(2)}`}{" "}
        </span>
      );
    });
    return sum;
  }

  return (
    <div dir="rtl" style={{ height: 600, width: "100%" }}>
      <DataGrid
        // autoHeight
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[10]}
        // checkboxSelection
        // disableSelectionOnClick
      />
      {supers.some((v) => v.checked) && <SumSupers sum={sum} />}
      <div className={style.buttons}>
        <Dialog />
        <Button
          sx={{ backgroundColor: "#76e346", color: "black", p: 2, m: 2 }}
          onClick={() => setCartProducts([])}
        >
          {" "}
          נקה עגלה
        </Button>
      </div>
    </div>
  );
}
