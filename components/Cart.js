import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useCompare } from "../context/CompareContext";
import { Button, ButtonGroup } from "@mui/material";

export default function DataTable() {
  const {
    supers,
    products,
    setProductsFilter,
    productsFilter,
    cartProducts,
    setCartProducts,
    addToCart,
    decrement,
  } = useCompare();

  const columns = [
    {
      field: "index",
      headerName: "מספר מוצר",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 80,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "title", headerName: "שם מוצר", width: 130 },
    {
      field: "amount",
      headerName: "כמות",
      renderCell: (params) => {
        return (
          <>
            <ButtonGroup
              variant="#76e346"
              // aria-label="outlined primary button group"
            >
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
        headerName: item.name,
      })),
  ];
  const supersPrices = {};
  const supersPricesSum = {};
  const rows = [
    ...cartProducts.map((row, index) => {
      row.prices.forEach((price) => {
        const supermarket = price.supermarket;
        const superChecked = supers.find(
          (currentSuper) =>
            currentSuper._id === supermarket._id && currentSuper.checked
        );

        if (superChecked) {
          const priceSum = price.price * row.qty;
          supersPrices[superChecked.name] = priceSum.toFixed(2);

          supersPricesSum[superChecked.name] =
            (supersPricesSum[superChecked.name] ?? 0) + priceSum;

          console.log("supersPricesSum", supersPricesSum);
        }
      });
      return {
        ...row,
        id: row._id,
        index: index + 1,
        title: row.title,
        ...supersPrices,
      };
    }),
  ];
  function Sum() {
    let entries = Object.entries(supersPricesSum);
    let sum = entries.map(([key, val] = entry) => {
      return <div key={key}>{`The ${key} sum is ${val.toFixed(2)}`} </div>;
    });
    return sum;
  }

  return (
    <div dir="rtl" style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        // loading={data.rows.length === 0}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Footer: () => Sum(),
        }}
      />
      <Button sx={{ backgroundColor: "#76e346", color: "black", p: 2, m: 2 }}>
        שמור עגלה
      </Button>
    </div>
  );
}
